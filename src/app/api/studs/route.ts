import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { z } from 'zod'
import { authOptions, isAdmin } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

const studDogSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  lineage: z.string().optional(),
  classification: z.enum(['BRONZE', 'SILVER', 'GOLD']).default('BRONZE'),
  image: z.string().optional(),
  description: z.string().optional(),
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
    const validatedData = studDogSchema.parse(body)

    const studDog = await prisma.studDog.create({
      data: {
        name: validatedData.name,
        lineage: validatedData.lineage || null,
        classification: validatedData.classification,
        image: validatedData.image || null,
        description: validatedData.description || null,
        sortOrder: validatedData.sortOrder,
        active: validatedData.active,
      },
    })

    return NextResponse.json(studDog, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors[0].message }, { status: 400 })
    }

    console.error('Error creating stud dog:', error)
    return NextResponse.json({ error: 'Failed to create stud dog' }, { status: 500 })
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const all = searchParams.get('all') === 'true'

    const studDogs = await prisma.studDog.findMany({
      where: all ? {} : { active: true },
      orderBy: { sortOrder: 'asc' },
    })

    return NextResponse.json(studDogs)
  } catch (error) {
    console.error('Error fetching stud dogs:', error)
    return NextResponse.json({ error: 'Failed to fetch stud dogs' }, { status: 500 })
  }
}
