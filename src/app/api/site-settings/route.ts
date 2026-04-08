import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { z } from 'zod'
import { authOptions, isAdmin } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

const siteSettingsSchema = z.record(z.string(), z.string())

export async function GET() {
  try {
    const settings = await prisma.siteSetting.findMany()

    const settingsObject: Record<string, string> = {}
    for (const setting of settings) {
      settingsObject[setting.key] = setting.value
    }

    return NextResponse.json(settingsObject)
  } catch (error) {
    console.error('Error fetching site settings:', error)
    return NextResponse.json({ error: 'Failed to fetch site settings' }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || !isAdmin(session.user.role)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const validatedData = siteSettingsSchema.parse(body)

    const upsertPromises = Object.entries(validatedData).map(([key, value]) =>
      prisma.siteSetting.upsert({
        where: { key },
        update: { value },
        create: { key, value },
      })
    )

    await Promise.all(upsertPromises)

    const settings = await prisma.siteSetting.findMany()
    const settingsObject: Record<string, string> = {}
    for (const setting of settings) {
      settingsObject[setting.key] = setting.value
    }

    return NextResponse.json(settingsObject)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors[0].message }, { status: 400 })
    }

    console.error('Error updating site settings:', error)
    return NextResponse.json({ error: 'Failed to update site settings' }, { status: 500 })
  }
}
