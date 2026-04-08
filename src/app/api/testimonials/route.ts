import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { z } from 'zod'
import { authOptions, isAdmin } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

const testimonialSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  quote: z.string().min(1, 'Quote is required'),
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
    const validatedData = testimonialSchema.parse(body)

    const testimonial = await prisma.testimonial.create({
      data: {
        name: validatedData.name,
        quote: validatedData.quote,
        image: validatedData.image || null,
        sortOrder: validatedData.sortOrder,
        active: validatedData.active,
      },
    })

    return NextResponse.json(testimonial, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors[0].message }, { status: 400 })
    }

    console.error('Error creating testimonial:', error)
    return NextResponse.json({ error: 'Failed to create testimonial' }, { status: 500 })
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const all = searchParams.get('all') === 'true'

    const testimonials = await prisma.testimonial.findMany({
      where: all ? {} : { active: true },
      orderBy: { sortOrder: 'asc' },
    })

    return NextResponse.json(testimonials)
  } catch (error) {
    console.error('Error fetching testimonials:', error)
    return NextResponse.json({ error: 'Failed to fetch testimonials' }, { status: 500 })
  }
}
