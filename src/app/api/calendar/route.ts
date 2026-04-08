import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { z } from 'zod'
import { authOptions, isAdmin } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

const calendarEventSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  date: z.string().min(1, 'Date is required'),
  time: z.string().optional(),
  location: z.string().optional(),
  type: z.string().default('Event'),
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
    const validatedData = calendarEventSchema.parse(body)

    const calendarEvent = await prisma.calendarEvent.create({
      data: {
        title: validatedData.title,
        date: new Date(validatedData.date),
        time: validatedData.time || null,
        location: validatedData.location || null,
        type: validatedData.type,
        description: validatedData.description || null,
        active: validatedData.active,
      },
    })

    return NextResponse.json(calendarEvent, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors[0].message }, { status: 400 })
    }

    console.error('Error creating calendar event:', error)
    return NextResponse.json({ error: 'Failed to create calendar event' }, { status: 500 })
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    let showAll = searchParams.get('all') === 'true'

    if (showAll) {
      const session = await getServerSession(authOptions)
      if (!session || !isAdmin(session.user?.role)) {
        showAll = false
      }
    }

    const calendarEvents = await prisma.calendarEvent.findMany({
      where: showAll ? {} : { active: true },
      orderBy: { date: 'asc' },
    })

    return NextResponse.json(calendarEvents)
  } catch (error) {
    console.error('Error fetching calendar events:', error)
    return NextResponse.json({ error: 'Failed to fetch calendar events' }, { status: 500 })
  }
}
