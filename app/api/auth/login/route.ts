import { NextRequest } from 'next/server'
import { getCloudflareContext } from '@opennextjs/cloudflare'
import { verifyPassword } from '@/lib/password'

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return new Response(
        JSON.stringify({ success: false, error: '请输入邮箱和密码' }),
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

    // 查询用户
    const result = await db
      .prepare('SELECT * FROM User WHERE email = ?')
      .bind(email)
      .first()

    if (!result) {
      return new Response(
        JSON.stringify({ success: false, error: '用户不存在' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      )
    }

    // 验证密码
    const isValid = await verifyPassword(password, result.password)
    if (!isValid) {
      return new Response(
        JSON.stringify({ success: false, error: '密码错误' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      )
    }

    // 登录成功
    return new Response(
      JSON.stringify({
        success: true,
        data: {
          id: result.id,
          email: result.email,
          username: result.username,
          role: result.role,
        },
      }),
      { headers: { 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('登录失败:', error)
    return new Response(
      JSON.stringify({ success: false, error: '登录失败' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}