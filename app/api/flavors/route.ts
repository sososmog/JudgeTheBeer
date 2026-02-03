// import { NextRequest, NextResponse } from 'next/server'

// export const runtime = 'edge'

// const staticFlavors = [
//   { id: '1', name: '葡萄柚', nameEn: 'Grapefruit', category: '水果', subCategory: '柑橘', type: 'good', description: '柑橘类水果香气' },
//   { id: '2', name: '热带水果', nameEn: 'Tropical', category: '水果', subCategory: '热带', type: 'good', description: '芒果、菠萝等热带水果风味' },
//   { id: '3', name: '焦糖', nameEn: 'Caramel', category: '麦芽', subCategory: '甜香', type: 'good', description: '烘烤麦芽带来的焦糖甜香' },
// ]

// export async function GET(request: NextRequest) {
//   try {
//     const { searchParams } = new URL(request.url)
//     const query = searchParams.get('q')?.toLowerCase() || ''
//     const type = searchParams.get('type') || ''

//     let flavors = staticFlavors

//     if (query) {
//       flavors = flavors.filter(f => 
//         f.name.toLowerCase().includes(query) || 
//         f.nameEn?.toLowerCase().includes(query) ||
//         f.category.toLowerCase().includes(query)
//       )
//     }

//     if (type) {
//       flavors = flavors.filter(f => f.type === type)
//     }

//     return NextResponse.json({
//       success: true,
//       data: flavors,
//       count: flavors.length,
//     })
//   } catch (error) {
//     console.error('搜索失败:', error)
//     return NextResponse.json(
//       { success: false, error: '搜索失败' },
//       { status: 500 }
//     )
//   }
// }



// 最简化测试
// export const runtime = 'edge'  // debug

export async function GET() {
  return new Response(
    JSON.stringify({
      success: true,
      data: [
        { id: '1', name: '葡萄柚', category: '水果', type: 'good' },
        { id: '2', name: '焦糖', category: '麦芽', type: 'good' },
      ],
      count: 2,
    }),
    {
      headers: { 'Content-Type': 'application/json' },
    }
  )
}