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

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const calendarEvent = await prisma.calendarEvent.findUnique({
      where: { id: params.id },
    })

    if (!calendarEvent) {
      return NextResponse.json({ error: 'Calendar event not found' }, { status: 404 })
    }

    return NextResponse.json(calendarEvent)
  } catch (error) {
    console.error('Error fetching calendar event:', error)
    return NextResponse.json({ error: 'Failed to fetch calendar event' }, { status: 500 })
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
    const validatedData = calendarEventSchema.parse(body)

    const calendarEvent = await prisma.calendarEvent.update({
      where: { id: params.id },
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

    return NextResponse.json(calendarEvent)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors[0].message }, { status: 400 })
    }

    console.error('Error updating calendar event:', error)
    return NextResponse.json({ error: 'Failed to update calendar event' }, { status: 500 })
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

    await prisma.calendarEvent.delete({
      where: { id: params.id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting calendar event:', error)
    return NextResponse.json({ error: 'Failed to delete calendar event' }, { status: 500 })
  }
}
