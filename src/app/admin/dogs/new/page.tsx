import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import { prisma } from '@/lib/prisma'
import { DogForm } from '@/components/admin/DogForm'

export default async function NewDogPage() {
  // Fetch kennels and dogs for dropdowns
  const [kennels, dogs] = await Promise.all([
    prisma.kennel.findMany({
      where: { active: true },
      select: { id: true, name: true },
      orderBy: { name: 'asc' },
    }),
    prisma.dog.findMany({
      select: { id: true, registeredName: true, sex: true },
      orderBy: { registeredName: 'asc' },
    }),
  ])

  return (
    <div className="container-custom py-8">
      {/* Header */}
      <div className="mb-8">
        <Link
          href="/admin/dogs"
          className="inline-flex items-center text-warm-500 hover:text-espresso mb-4 transition-colors"
        >
          <ChevronLeft className="w-5 h-5 mr-1" />
          Back to Dogs
        </Link>
        <h1 className="font-display text-display-sm font-semibold text-espresso">
          Add New Dog
        </h1>
        <p className="text-warm-600 mt-1">
          Register a new dog in the SABMA registry.
        </p>
      </div>

      {/* Form */}
      <DogForm kennels={kennels} dogs={dogs} />
    </div>
  )
}
