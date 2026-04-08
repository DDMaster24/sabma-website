import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { z } from 'zod'
import { authOptions, isAdmin } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

const breederSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  kennel: z.string().min(1, 'Kennel is required'),
  owners: z.string().min(1, 'Owners is required'),
  location: z.string().min(1, 'Location is required'),
  phone: z.string().optional(),
  email: z.string().optional(),
  image: z.string().optional(),
  description: z.string().optional(),
  sortOrder: z.number().default(0),
  active: z.boolean().default(true),
})

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const breeder = await prisma.breeder.findUnique({
      where: { id: params.id },
    })

    if (!breeder) {
      return NextResponse.json({ error: 'Breeder not found' }, { status: 404 })
    }

    return NextResponse.json(breeder)
  } catch (error) {
    console.error('Error fetching breeder:', error)
    return NextResponse.json({ error: 'Failed to fetch breeder' }, { status: 500 })
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
    const validatedData = breederSchema.parse(body)

    const breeder = await prisma.breeder.update({
      where: { id: params.id },
      data: {
        name: validatedData.name,
        kennel: validatedData.kennel,
        owners: validatedData.owners,
        location: validatedData.location,
        phone: validatedData.phone || null,
        email: validatedData.email || null,
        image: validatedData.image || null,
        description: validatedData.description || null,
        sortOrder: validatedData.sortOrder,
        active: validatedData.active,
      },
    })

    return NextResponse.json(breeder)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors[0].message }, { status: 400 })
    }

    console.error('Error updating breeder:', error)
    return NextResponse.json({ error: 'Failed to update breeder' }, { status: 500 })
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

    await prisma.breeder.delete({
      where: { id: params.id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting breeder:', error)
    return NextResponse.json({ error: 'Failed to delete breeder' }, { status: 500 })
  }
}
