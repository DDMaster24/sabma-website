import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { z } from 'zod'
import { authOptions, isAdmin } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

const dogSchema = z.object({
  registeredName: z.string().min(1, 'Name is required'),
  registrationNumber: z.string().optional(),
  microchipNumber: z.string().optional(),
  sex: z.enum(['MALE', 'FEMALE']),
  dateOfBirth: z.string(),
  color: z.string().optional(),
  markings: z.string().optional(),
  status: z.enum(['ALIVE', 'DECEASED', 'EXPORTED', 'PET_ONLY', 'BREEDING', 'RETIRED']).default('ALIVE'),
  sireId: z.string().optional(),
  damId: z.string().optional(),
  kennelId: z.string().optional(),
  breederName: z.string().optional(),
  currentOwner: z.string().optional(),
  registryName: z.string().optional(),
  registrationType: z.enum(['STUDBOOK', 'PET_REGISTER', 'PROVISIONAL']).optional(),
  appraisalScore: z.number().optional(),
  appraisalClassification: z.string().optional(),
  inbreedingCoefficient: z.number().optional(),
  dnaVerified: z.boolean().optional(),
  hipScore: z.string().optional(),
  elbowScore: z.string().optional(),
  healthNotes: z.string().optional(),
  notes: z.string().optional(),
})

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const dog = await prisma.dog.findUnique({
      where: { id: params.id },
      include: {
        kennel: true,
        photos: { orderBy: [{ isPrimary: 'desc' }, { order: 'asc' }] },
        certificates: true,
        sire: { include: { sire: true, dam: true } },
        dam: { include: { sire: true, dam: true } },
      },
    })

    if (!dog) {
      return NextResponse.json({ error: 'Dog not found' }, { status: 404 })
    }

    return NextResponse.json(dog)
  } catch (error) {
    console.error('Error fetching dog:', error)
    return NextResponse.json({ error: 'Failed to fetch dog' }, { status: 500 })
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
    const validatedData = dogSchema.parse(body)

    const dog = await prisma.dog.update({
      where: { id: params.id },
      data: {
        registeredName: validatedData.registeredName,
        registrationNumber: validatedData.registrationNumber || null,
        microchipNumber: validatedData.microchipNumber || null,
        sex: validatedData.sex,
        dateOfBirth: new Date(validatedData.dateOfBirth),
        color: validatedData.color || null,
        markings: validatedData.markings || null,
        status: validatedData.status,
        sireId: validatedData.sireId || null,
        damId: validatedData.damId || null,
        kennelId: validatedData.kennelId || null,
        breederName: validatedData.breederName || null,
        currentOwner: validatedData.currentOwner || null,
        registryName: validatedData.registryName || null,
        registrationType: validatedData.registrationType || null,
        appraisalScore: validatedData.appraisalScore || null,
        appraisalClassification: validatedData.appraisalClassification || null,
        inbreedingCoefficient: validatedData.inbreedingCoefficient || null,
        dnaVerified: validatedData.dnaVerified || false,
        hipScore: validatedData.hipScore || null,
        elbowScore: validatedData.elbowScore || null,
        healthNotes: validatedData.healthNotes || null,
        notes: validatedData.notes || null,
      },
    })

    return NextResponse.json(dog)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors[0].message }, { status: 400 })
    }

    console.error('Error updating dog:', error)
    return NextResponse.json({ error: 'Failed to update dog' }, { status: 500 })
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

    await prisma.dog.delete({
      where: { id: params.id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting dog:', error)
    return NextResponse.json({ error: 'Failed to delete dog' }, { status: 500 })
  }
}
