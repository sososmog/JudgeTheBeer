import { NextRequest } from 'next/server'
import { getCloudflareContext } from '@opennextjs/cloudflare'
import { hashPassword } from '@/lib/password'

export async function POST(request: NextRequest) {
  try {
    const { email, username, password } = await request.json()

    if (!email || !username || !password) {
      return new Response(
        JSON.stringify({ success: false, error: '请填写完整信息' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      )
    }

    // 获取 D1 数据库
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let db: any = null
    try {
      const ctx = await getCloudflareContext() as unknown as { env: { DB: any } }
      db = ctx.env.DB
    } catch {
      // 本地开发环境没有 Cloudflare context
    }

    if (!db) {
      return new Response(
        JSON.stringify({ success: false, error: '数据库连接失败' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      )
    }

    // 检查邮箱是否已存在
    const existing = await db
      .prepare('SELECT id FROM User WHERE email = ?')
      .bind(email)
      .first()

    if (existing) {
      return new Response(
        JSON.stringify({ success: false, error: '该邮箱已被注册' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      )
    }

    // 生成用户 ID
    const id = `user_${Date.now()}`

    // 加密密码
    const hashedPassword = await hashPassword(password)

    // 插入新用户
    await db
      .prepare(
        'INSERT INTO User (id, email, username, password, role) VALUES (?, ?, ?, ?, ?)'
      )
      .bind(id, email, username, hashedPassword, 'user')
      .run()

    return new Response(
      JSON.stringify({
        success: true,
        data: {
          id,
          email,
          username,
          role: 'user',
        },
      }),
      { headers: { 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('注册失败:', error)
    return new Response(
      JSON.stringify({ success: false, error: '注册失败' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}