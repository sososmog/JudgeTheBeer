import { NextRequest, NextResponse } from 'next/server'

// @ts-expect-error - Cloudflare Workers 环境
function getDB(): D1Database | null {
  try {
    // @ts-expect-error
    return process.env.DB || null
  } catch {
    return null
  }
}

export async function POST(request: NextRequest) {
  try {
    const { email, username, password } = await request.json()

    if (!email || !username || !password) {
      return NextResponse.json(
        { success: false, error: '请填写完整信息' },
        { status: 400 }
      )
    }

    const db = getDB()

    if (!db) {
      return NextResponse.json(
        { success: false, error: '数据库连接失败' },
        { status: 500 }
      )
    }

    // 检查邮箱是否已存在
    const existing = await db
      .prepare('SELECT id FROM User WHERE email = ?')
      .bind(email)
      .first()

    if (existing) {
      return NextResponse.json(
        { success: false, error: '该邮箱已被注册' },
        { status: 400 }
      )
    }

    // 生成用户 ID
    const id = `user_${Date.now()}`

    // 插入新用户（默认 role 为 'user'）
    await db
      .prepare(
        'INSERT INTO User (id, email, username, password, role) VALUES (?, ?, ?, ?, ?)'
      )
      .bind(id, email, username, password, 'user')
      .run()

    return NextResponse.json({
      success: true,
      data: {
        id,
        email,
        username,
        role: 'user',
      },
    })
  } catch (error) {
    console.error('注册失败:', error)
    return NextResponse.json(
      { success: false, error: '注册失败' },
      { status: 500 }
    )
  }
}