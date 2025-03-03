import { NextResponse } from 'next/server';

export async function GET() {
  // 生成10万条模拟数据
  const data = Array.from({ length: 100000 }, (_, index) => ({
    id: index+1,
    name: `Item ${index+1}`,
    value: Math.floor(Math.random() * 1000),
    description: `这是第 ${index+1} 数据`
  }));

  return NextResponse.json(data);
}