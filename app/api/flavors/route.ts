import { NextRequest } from 'next/server'
import { getCloudflareContext } from '@opennextjs/cloudflare'

// 静态数据作为 fallback
const staticFlavors = [
  { id: '1', name: '葡萄柚', nameEn: 'Grapefruit', category: '水果', subCategory: '柑橘', type: 'good', description: '柑橘类水果香气' },
  { id: '2', name: '热带水果', nameEn: 'Tropical', category: '水果', subCategory: '热带', type: 'good', description: '芒果、菠萝等热带水果风味' },
  { id: '3', name: '焦糖', nameEn: 'Caramel', category: '麦芽', subCategory: '甜香', type: 'good', description: '烘烤麦芽带来的焦糖甜香' },
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get('q')?.toLowerCase() || ''
    const type = searchParams.get('type') || ''

    // 尝试获取 D1 数据库
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let db: any = null
    try {
      const ctx = await getCloudflareContext() as unknown as { env: { DB: any } }
      db = ctx.env.DB
    } catch {
      // 本地开发环境没有 Cloudflare context
    }
    
    // 如果有 D1 数据库，使用数据库查询
    if (db) {
      let sql = 'SELECT * FROM Flavor WHERE 1=1'
      const params: string[] = []

      if (query) {
        sql += ' AND (name LIKE ? OR nameEn LIKE ? OR category LIKE ? OR description LIKE ?)'
        const q = `%${query}%`
        params.push(q, q, q, q)
      }

      if (type) {
        sql += ' AND type = ?'
        params.push(type)
      }

      sql += ' ORDER BY name ASC LIMIT 50'

      const result = await db.prepare(sql).bind(...params).all()
      
      return new Response(
        JSON.stringify({
          success: true,
          data: result.results,
          count: result.results.length,
        }),
        { headers: { 'Content-Type': 'application/json' } }
      )
    }

    // Fallback 到静态数据
    let flavors = staticFlavors

    if (query) {
      flavors = flavors.filter(f => 
        f.name.toLowerCase().includes(query) || 
        f.nameEn?.toLowerCase().includes(query) ||
        f.category.toLowerCase().includes(query)
      )
    }

    if (type) {
      flavors = flavors.filter(f => f.type === type)
    }

    return new Response(
      JSON.stringify({
        success: true,
        data: flavors,
        count: flavors.length,
      }),
      { headers: { 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('搜索失败:', error)
    return new Response(
      JSON.stringify({ success: false, error: '搜索失败' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}



// 最简化测试
// export const runtime = 'edge'  // debug

// export async function GET() {
//   return new Response(
//     JSON.stringify({
//       success: true,
//       data: [
//         { id: '1', name: '葡萄柚', category: '水果', type: 'good' },
//         { id: '2', name: '焦糖', category: '麦芽', type: 'good' },
//       ],
//       count: 2,
//     }),
//     {
//       headers: { 'Content-Type': 'application/json' },
//     }
//   )
// }