import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { z } from 'zod'
import { authOptions, isAdmin } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

const galleryImageSchema = z.object({
  src: z.string().min(1, 'Image source is required'),
  alt: z.string().optional(),
  caption: z.string().optional(),
  category: z.string().optional(),
  sortOrder: z.number().default(0),
  active: z.boolean().default(true),
})

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const galleryImage = await prisma.galleryImage.findUnique({
      where: { id: params.id },
    })

    if (!galleryImage) {
      return NextResponse.json({ error: 'Gallery image not found' }, { status: 404 })
    }

    return NextResponse.json(galleryImage)
  } catch (error) {
    console.error('Error fetching gallery image:', error)
    return NextResponse.json({ error: 'Failed to fetch gallery image' }, { status: 500 })
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
    const validatedData = galleryImageSchema.parse(body)

    const galleryImage = await prisma.galleryImage.update({
      where: { id: params.id },
      data: {
        src: validatedData.src,
        alt: validatedData.alt || null,
        caption: validatedData.caption || null,
        category: validatedData.category || null,
        sortOrder: validatedData.sortOrder,
        active: validatedData.active,
      },
    })

    return NextResponse.json(galleryImage)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors[0].message }, { status: 400 })
    }

    console.error('Error updating gallery image:', error)
    return NextResponse.json({ error: 'Failed to update gallery image' }, { status: 500 })
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

    await prisma.galleryImage.delete({
      where: { id: params.id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting gallery image:', error)
    return NextResponse.json({ error: 'Failed to delete gallery image' }, { status: 500 })
  }
}
