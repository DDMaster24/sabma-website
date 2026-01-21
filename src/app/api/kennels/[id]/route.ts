import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { z } from 'zod'
import { authOptions, isAdmin } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

const kennelSchema = z.object({
  name: z.string().min(1, 'Kennel name is required'),
  breederName: z.string().optional(),
  country: z.string().optional(),
  city: z.string().optional(),
  region: z.string().optional(),
  contactEmail: z.string().email().optional().or(z.literal('')),
  contactPhone: z.string().optional(),
  website: z.string().url().optional().or(z.literal('')),
  logo: z.string().optional(),
  description: z.string().optional(),
  active: z.boolean().default(true),
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
        breederName: validatedData.breederName || null,
        country: validatedData.country || null,
        city: validatedData.city || null,
        region: validatedData.region || null,
        contactEmail: validatedData.contactEmail || null,
        contactPhone: validatedData.contactPhone || null,
        website: validatedData.website || null,
        logo: validatedData.logo || null,
        description: validatedData.description || null,
        active: validatedData.active,
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
