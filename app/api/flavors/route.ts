import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { Prisma } from '@prisma/client'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get('q') || ''
    const type = searchParams.get('type') || ''  // "good" | "bad" | ""

    // 构建查询条件
    const where: Prisma.FlavorWhereInput = {}

    // 搜索词匹配
    if (query) {
      where.OR = [
        { name: { contains: query } },
        { nameEn: { contains: query } },
        { category: { contains: query } },
        { subCategory: { contains: query } },
        { description: { contains: query } },
      ]
    }

    // 类型筛选
    if (type) {
      where.type = type
    }

    const flavors = await prisma.flavor.findMany({
      where,
      orderBy: { name: 'asc' },
      take: 50,
    })

    return NextResponse.json({
      success: true,
      data: flavors,
      count: flavors.length,
    })
  } catch (error) {
    console.error('搜索失败:', error)
    return NextResponse.json(
      { success: false, error: '搜索失败' },
      { status: 500 }
    )
  }
}