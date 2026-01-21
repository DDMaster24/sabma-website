import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { z } from 'zod'
import { authOptions, isAdmin } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

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

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || !isAdmin(session.user.role)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const validatedData = kennelSchema.parse(body)

    const kennel = await prisma.kennel.create({
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

    return NextResponse.json(kennel, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors[0].message }, { status: 400 })
    }

    console.error('Error creating kennel:', error)
    return NextResponse.json({ error: 'Failed to create kennel' }, { status: 500 })
  }
}

export async function GET() {
  try {
    const kennels = await prisma.kennel.findMany({
      include: {
        _count: {
          select: { dogs: true },
        },
      },
      orderBy: { name: 'asc' },
    })

    return NextResponse.json(kennels)
  } catch (error) {
    console.error('Error fetching kennels:', error)
    return NextResponse.json({ error: 'Failed to fetch kennels' }, { status: 500 })
  }
}
