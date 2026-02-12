import { getCloudflareContext } from '@opennextjs/cloudflare'
import { hashPassword } from '@/lib/password'

// 临时 API：初始化管理员账号（用完后删除此文件）
export async function GET(request: Request) {
  try {
    // 简单的安全校验
    const { searchParams } = new URL(request.url)
    const secret = searchParams.get('secret')
    
    if (secret !== 'setup_admin_2026') {
      return new Response(
        JSON.stringify({ success: false, error: '无权访问' }),
        { status: 403, headers: { 'Content-Type': 'application/json' } }
      )
    }

    // 获取 D1 数据库
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let db: any = null
    try {
      const ctx = await getCloudflareContext() as unknown as { env: { DB: any } }
      db = ctx.env.DB
    } catch {
      return new Response(
        JSON.stringify({ success: false, error: '数据库连接失败' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      )
    }

    // 加密密码
    const hashedPassword = await hashPassword('admin123')
    
    // 更新管理员密码
    await db
      .prepare('UPDATE User SET password = ? WHERE id = ?')
      .bind(hashedPassword, 'admin1')
      .run()

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: '管理员密码已加密',
        email: 'admin@judgethebeer.com',
        password: 'admin123'
      }),
      { headers: { 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('初始化失败:', error)
    return new Response(
      JSON.stringify({ success: false, error: '初始化失败' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}