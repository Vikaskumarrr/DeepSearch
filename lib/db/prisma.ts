import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  errorFormat: 'pretty',
})

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

// Ensure Prisma client is generated
if (process.env.NODE_ENV === 'production') {
  try {
    // Force Prisma client generation check
    prisma.$connect()
  } catch (error) {
    console.error('Prisma client connection failed:', error)
  }
}

export default prisma
