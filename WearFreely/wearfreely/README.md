# 自由穿搭

## 简介
 

## 技术栈
- 前端：Vue3 + Vite + Vue Router + Pinia + JavaScript + TailwindCSS + element-plus + Iconfont 矢量图标库 + 自定义组件 + Axios
- 后端：koa + MySQL + JWT + OpenAI + RAG + cors

## 项目结构
- src：前端源代码
- server：后端源代码

- components:公共组件
- views:路由组件
- router:路由
- store:状态管理

## 前端页面

1. 首页
    - 衣服颜色搭配器
      - 上衣、裤子、鞋子
      - 主颜色
    - 自我评分
    - AI 测评
      - 连接后端 RAG LLM 提问
    - LLM 提问回答
      - koa、cors、openai
      - 连接后端 RAG LLM 提问

    遇到的问题：
      - 组件通信问题：选择颜色的组件封装在了全局组件中，无法将颜色值传给到父组件再传给后端，后通过自定义事件defineEmit解决。
      - 样式问题：颜色无法和svg图标同步修改，
        使用mask遮罩层解决，再创建一个盒子覆盖原来的svg图片，再通过mask遮罩层修改颜色，使用js动态修改css中背景颜色的值。
        ```js
        const element = document.querySelector('.yifumask');
        element.style.setProperty('--mask-bg-color', color1.value);
        ```
      ``` css
      .yifumask{
         position: absolute;
         inset:0; /* 四个方向都为0,铺满整个元素 */
         background: var(--mask-bg-color,white); /* 使用变量，默认值为原颜色 */
         mask: url('@/assets/home/yifumask.svg') no-repeat center / cover;/* 蒙层*/
         mix-blend-mode: multiply; /*颜色混合 */
         }
      ```
      - 样式问题：导航栏挡住了页面内容导致显示不完整，开始使用padding:0 60px 0 0; 虽然可以显示内容，但是背景图片就会无法覆盖全景，后通过添加一个height:60px的空div盒子解决。
      - 前后端数据交互问题：axios请求后端数据，后端数据返回前端，前端数据渲染到页面上。
      - 跨域问题：跨域问题，后端解决，通过cors解决。

2. 社区
  - 搜索框
  - 轮播图
  - 文章
    - 静态数据
    - 点赞与取消
  - 返回顶部组件

3. 商城
  - 分类
  - 商品列表
    - 调用API，该API会返回一段json数据
  - 商品详情
  - 购物车
    - pinia状态管理库
  - 返回顶部组件

4. 个人中心
  - 注册
    - 连接数据库
  - 登录
    - JWT鉴权  -> 双token
  - 个人信息
    - 昵称修改
    - 头像上传 Element-Plus 组件库
    - 签名修改
    - 个人信息修改
  - 功能 
    - 收藏
    - 创作
    - 点赞
  - 照片墙
    - Element-plus
      测试接口无法成功上传图片，自己在后端写接口处理照片上传并存储到数据库

## 后端
  - koa
  - 各个接口
  - 数据库
    - MySQL
  - OPENAI
    - 连接 OPENAI API
    - 连接 RAG LLM 提问
    - 连接 RAG LLM 回答
  - 跨域
    - 前端代理服务器 
      - proxy
    - 后端cors
  - JWT
    - JWT鉴权
# 项目启动
  - npm i
  - 修改API key
  - 修改db.js 密码
  - 启动前端 npm run dev
  - 启动后端 node app.js