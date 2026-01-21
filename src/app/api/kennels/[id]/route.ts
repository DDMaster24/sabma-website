import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { z } from 'zod'
import { authOptions, isAdmin } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

const kennelSchema = z.object({
  name: z.string().min(1, 'Kennel name is required'),
  registrationNumber: z.string().optional(),
  ownerName: z.string().optional(),
  email: z.string().email().optional().or(z.literal('')),
  phone: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  province: z.string().optional(),
  country: z.string().default('South Africa'),
  website: z.string().url().optional().or(z.literal('')),
  description: z.string().optional(),
  isActive: z.boolean().default(true),
})

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const kennel = await prisma.kennel.findUnique({
      where: { id: params.id },
      include: {
        dogs: {
          include: {
            photos: { where: { isPrimary: true }, take: 1 },
          },
          orderBy: { registeredName: 'asc' },
        },
      },
    })

    if (!kennel) {
      return NextResponse.json({ error: 'Kennel not found' }, { status: 404 })
    }

    return NextResponse.json(kennel)
  } catch (error) {
    console.error('Error fetching kennel:', error)
    return NextResponse.json({ error: 'Failed to fetch kennel' }, { status: 500 })
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
    const validatedData = kennelSchema.parse(body)

    const kennel = await prisma.kennel.update({
      where: { id: params.id },
      data: {
        name: validatedData.name,
        registrationNumber: validatedData.registrationNumber || null,
        ownerName: validatedData.ownerName || null,
        email: validatedData.email || null,
        phone: validatedData.phone || null,
        address: validatedData.address || null,
        city: validatedData.city || null,
        province: validatedData.province || null,
        country: validatedData.country,
        website: validatedData.website || null,
        description: validatedData.description || null,
        isActive: validatedData.isActive,
      },
    })

    return NextResponse.json(kennel)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors[0].message }, { status: 400 })
    }

    console.error('Error updating kennel:', error)
    return NextResponse.json({ error: 'Failed to update kennel' }, { status: 500 })
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

    await prisma.kennel.delete({
      where: { id: params.id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting kennel:', error)
    return NextResponse.json({ error: 'Failed to delete kennel' }, { status: 500 })
  }
}
