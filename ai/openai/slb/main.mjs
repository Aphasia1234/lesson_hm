 //引入OpenAI模块
 // AI模块es6推出
import OpenAI from 'openai';

 //实例化Openai
 const openai=new OpenAI({
    //付费
    apiKey:'sk-wags4RbPLYvA1e9jCZFnPt8bLtTf0Kwh9wnodJhgDiwNLHuC',
    // 免费 国内转发
    baseURL:'https://api.302.ai/v1'
 });
// 完成生成 GC
 const response= await openai.completions.create({
    model:'gpt-3.5-turbo-instruct',
    prompt:'假如你是林夕这样的爱情歌曲作词大家，请你写一首主题为爱上森林北的摇滚歌曲。森林北是一位美丽、洒脱、有活力的女孩。'
 })

 console.log(response)
