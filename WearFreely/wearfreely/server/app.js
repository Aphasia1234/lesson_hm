const Koa = require('koa');
const Router = require('@koa/router');
const bodyParser = require('koa-bodyparser');
const fs = require('fs');
const path = require('path');
const { OpenAI } = require('openai');
require('dotenv').config();
const cors = require('@koa/cors');
// 引入数据库连接
const { generateToken, hashPassword, comparePassword } = require('./utils');
const pool = require('./db');

// 实例化openai
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: process.env.OPENAI_BASE_URL,
});

const app = new Koa();
const router = new Router();
// 跨域
app.use(cors());
// 中间件
app.use(bodyParser());

// 读取配色信息
const readCourseInfo = () => {
  return new Promise((resolve, reject) => {
    try {
      const filePath = path.join(__dirname, '配色.txt');
      fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
          reject(err);
        }
        resolve(data);
      });
    } catch (err) {
      reject(err);
    }
  });
};

// 回答问题函数
const answerQuestion = async (question) => {
  const colorInfo = await readCourseInfo();
  
  if (!colorInfo) {
    return '没有配色信息';
  }

  try {
    const prompt = `
    # 角色
    你是一名专业的服装色彩搭配顾问，结合权威色彩知识库与设计原则，
    为用户提供精准的配色建议。 
    你的回答基于用户问题和提供的<颜色知识>内容生成，精简一点，50字左右。

    # 核心能力
    1. 解析色彩理论（色轮/对比度/饱和度）
    2. 推荐场景化配色方案（服装）
    3. 解释色彩心理学效应

    # 知识库标记
     <颜色知识>
       ${colorInfo}
     </颜色知识>
    # 问题
    问题：${question}
    `;

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: '你是一个专业颜色搭配助手，请根据以下配色信息回答问题。'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.2,
      max_tokens: 1000,
    });
    
    return response.choices[0].message.content;
  } catch (err) {
    console.error(err);
    return '处理问题时出错';
  }
};

// 定义API路由
router.post('/api/ask', async (ctx) => {
  const { question } = ctx.request.body;
  
  if (!question) {
    ctx.status = 400;
    ctx.body = { error: '请提供问题参数' };
    return;
  }

  try {
    const answer = await answerQuestion(question);
    ctx.body = { answer };
  } catch (err) {
    console.error(err);
    ctx.status = 500;
    ctx.body = { error: '服务器内部错误' };
  }
});

// jwt验证

// 注册接口
router.post('/api/register', async (ctx) => {
  const { username, password } = ctx.request.body;
  const [rows] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);

  if (rows.length > 0) {
    ctx.status = 400;
    ctx.body = { message: '用户名已存在' };
    return;
  }

  const hashedPassword = await hashPassword(password);
  await pool.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword]);
  ctx.status = 200;
  ctx.body = { message: '注册成功' };
});

// 登录接口
router.post('/api/login', async (ctx) => {
  const { username, password } = ctx.request.body;
  const [rows] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);

  if (rows.length === 0) {
    ctx.status = 400;
    ctx.body = { message: '用户名或密码错误' };
    return;
  }

  const isPasswordValid = await comparePassword(password, rows[0].password);

  if (!isPasswordValid) {
    ctx.status = 400;
    ctx.body = { message: '用户名或密码错误' };
    return;
  }

  const token = generateToken(username);
    ctx.status = 200;
    ctx.body = { token };
});


// 应用路由
app.use(router.routes()).use(router.allowedMethods());

// 启动服务器
app.listen(3000, () => {
  console.log(`Server running on http://localhost:3000`);
});