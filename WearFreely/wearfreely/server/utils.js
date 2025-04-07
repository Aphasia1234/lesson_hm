// 签发JWT
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// JWT 密钥
const secret = 'r@a!y$8fsdfgd';

// 创建 JWT
const generateToken = (username) => {
  return jwt.sign({ username }, secret, { 
    expiresIn: '1h' // 过期时间
 });
};

// 密码加密
const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

// 密码验证
const comparePassword = async (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
};

module.exports = { generateToken, hashPassword, comparePassword };
