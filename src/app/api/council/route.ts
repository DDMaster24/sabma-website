import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { z } from 'zod'
import { authOptions, isAdmin } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

const councilMemberSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  role: z.string().min(1, 'Role is required'),
  email: z.string().optional(),
  phone: z.string().optional(),
  image: z.string().optional(),
  sortOrder: z.number().default(0),
  active: z.boolean().default(true),
})

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || !isAdmin(session.user.role)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const validatedData = councilMemberSchema.parse(body)

    const councilMember = await prisma.councilMember.create({
      data: {
        name: validatedData.name,
        role: validatedData.role,
        email: validatedData.email || null,
        phone: validatedData.phone || null,
        image: validatedData.image || null,
        sortOrder: validatedData.sortOrder,
        active: validatedData.active,
      },
    })

    return NextResponse.json(councilMember, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors[0].message }, { status: 400 })
    }

    console.error('Error creating council member:', error)
    return NextResponse.json({ error: 'Failed to create council member' }, { status: 500 })
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const all = searchParams.get('all') === 'true'

    const councilMembers = await prisma.councilMember.findMany({
      where: all ? {} : { active: true },
      orderBy: { sortOrder: 'asc' },
    })

    return NextResponse.json(councilMembers)
  } catch (error) {
    console.error('Error fetching council members:', error)
    return NextResponse.json({ error: 'Failed to fetch council members' }, { status: 500 })
  }
}
