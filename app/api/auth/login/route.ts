import { NextRequest, NextResponse } from 'next/server'

// @ts-ignore - Cloudflare Workers 环境
function getDB(): D1Database | null {
  try {
    // @ts-ignore
    return process.env.DB || null
  } catch {
    return null
  }
}

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: '请输入邮箱和密码' },
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

    // 查询用户
    const result = await db
      .prepare('SELECT * FROM User WHERE email = ?')
      .bind(email)
      .first()

    if (!result) {
      return NextResponse.json(
        { success: false, error: '用户不存在' },
        { status: 401 }
      )
    }

    // 验证密码（后续改成加密比对）
    if (result.password !== password) {
      return NextResponse.json(
        { success: false, error: '密码错误' },
        { status: 401 }
      )
    }

    // 登录成功，返回用户信息（不含密码）
    return NextResponse.json({
      success: true,
      data: {
        id: result.id,
        email: result.email,
        username: result.username,
        role: result.role,
      },
    })
  } catch (error) {
    console.error('登录失败:', error)
    return NextResponse.json(
      { success: false, error: '登录失败' },
      { status: 500 }
    )
  }
}