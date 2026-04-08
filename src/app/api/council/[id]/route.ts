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

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const councilMember = await prisma.councilMember.findUnique({
      where: { id: params.id },
    })

    if (!councilMember) {
      return NextResponse.json({ error: 'Council member not found' }, { status: 404 })
    }

    return NextResponse.json(councilMember)
  } catch (error) {
    console.error('Error fetching council member:', error)
    return NextResponse.json({ error: 'Failed to fetch council member' }, { status: 500 })
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || !isAdmin(session.user.role)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const validatedData = councilMemberSchema.parse(body)

    const councilMember = await prisma.councilMember.update({
      where: { id: params.id },
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

    return NextResponse.json(councilMember)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors[0].message }, { status: 400 })
    }

    console.error('Error updating council member:', error)
    return NextResponse.json({ error: 'Failed to update council member' }, { status: 500 })
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || !isAdmin(session.user.role)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    await prisma.councilMember.delete({
      where: { id: params.id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting council member:', error)
    return NextResponse.json({ error: 'Failed to delete council member' }, { status: 500 })
  }
}
