import { PrismaClient } from '@prisma/client'
import { PrismaD1 } from '@prisma/adapter-d1'

// 消除any警告
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getPrismaClient(db: any) {
  const adapter = new PrismaD1(db)
  return new PrismaClient({ adapter })
}

// 本地开发用
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}

export default prisma