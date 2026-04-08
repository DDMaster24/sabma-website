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

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const studDog = await prisma.studDog.findUnique({
      where: { id: params.id },
    })

    if (!studDog) {
      return NextResponse.json({ error: 'Stud dog not found' }, { status: 404 })
    }

    return NextResponse.json(studDog)
  } catch (error) {
    console.error('Error fetching stud dog:', error)
    return NextResponse.json({ error: 'Failed to fetch stud dog' }, { status: 500 })
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
    const validatedData = studDogSchema.parse(body)

    const studDog = await prisma.studDog.update({
      where: { id: params.id },
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

    return NextResponse.json(studDog)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors[0].message }, { status: 400 })
    }

    console.error('Error updating stud dog:', error)
    return NextResponse.json({ error: 'Failed to update stud dog' }, { status: 500 })
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

    await prisma.studDog.delete({
      where: { id: params.id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting stud dog:', error)
    return NextResponse.json({ error: 'Failed to delete stud dog' }, { status: 500 })
  }
}
