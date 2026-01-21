import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const password = await hash('RikaSabma26!', 12)

  const admin = await prisma.user.upsert({
    where: { email: 'admin@southafricanblackmastiff.com' },
    update: { password, role: 'SUPER_ADMIN', isActive: true },
    create: {
      email: 'admin@southafricanblackmastiff.com',
      name: 'SABMA Admin',
      password,
      role: 'SUPER_ADMIN',
      isActive: true,
    },
  })

  console.log('Admin user created/updated:', admin.email)

  const users = await prisma.user.findMany({
    select: { email: true, role: true, isActive: true }
  })
  console.log('All users:', users)
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
