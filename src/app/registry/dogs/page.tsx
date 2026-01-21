import Link from 'next/link'
import Image from 'next/image'
import { Dog as DogIcon, MapPin } from 'lucide-react'
import { prisma } from '@/lib/prisma'
import { DogFilters } from '@/components/registry/DogFilters'
import { calculateAge } from '@/lib/utils'

interface SearchParams {
  search?: string
  sex?: string
  kennel?: string
  year?: string
}

export default async function DogsPage({
  searchParams,
}: {
  searchParams: SearchParams
}) {
  const { search, sex, kennel, year } = searchParams

  // Build where clause
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const where: any = {}

  if (search) {
    where.OR = [
      { registeredName: { contains: search, mode: 'insensitive' } },
      { registrationNumber: { contains: search, mode: 'insensitive' } },
      { microchipNumber: { contains: search, mode: 'insensitive' } },
    ]
  }

  if (sex) {
    where.sex = sex
  }

  if (kennel) {
    where.kennelId = kennel
  }

  if (year) {
    const yearNum = parseInt(year)
    where.dateOfBirth = {
      gte: new Date(yearNum, 0, 1),
      lt: new Date(yearNum + 1, 0, 1),
    }
  }

  // Fetch dogs
  const dogs = await prisma.dog.findMany({
    where,
    include: {
      kennel: true,
      photos: {
        where: { isPrimary: true },
        take: 1,
      },
      sire: {
        select: { id: true, registeredName: true },
      },
      dam: {
        select: { id: true, registeredName: true },
      },
    },
    orderBy: { dateOfBirth: 'desc' },
    take: 50,
  })

  // Fetch kennels for filter
  const kennels = await prisma.kennel.findMany({
    where: { active: true },
    select: { id: true, name: true },
    orderBy: { name: 'asc' },
  })

  return (
    <div className="min-h-screen bg-ivory">
      {/* Header */}
      <div className="bg-espresso text-ivory py-16 md:py-24">
        <div className="container-custom">
          <div className="max-w-3xl">
            <span className="label mb-6">SABMA Registry</span>
            <h1 className="font-display text-display-md md:text-display-lg font-light mb-4">
              Browse Dogs
            </h1>
            <p className="text-ivory/70 text-lg">
              Search and explore the complete SABMA dog registry. View pedigrees, health records, and breeding information.
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container-custom py-12">
        {/* Filters */}
        <DogFilters kennels={kennels} />

        {/* Results */}
        <div className="mt-8">
          {dogs.length === 0 ? (
            <div className="text-center py-16">
              <DogIcon className="w-16 h-16 text-warm-300 mx-auto mb-4" />
              <h3 className="text-xl font-display font-semibold text-espresso mb-2">
                No dogs found
              </h3>
              <p className="text-warm-600">
                Try adjusting your search criteria or clear the filters.
              </p>
            </div>
          ) : (
            <>
              <p className="text-warm-600 mb-6">
                Showing {dogs.length} {dogs.length === 1 ? 'dog' : 'dogs'}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {dogs.map((dog) => (
                  <Link
                    key={dog.id}
                    href={`/registry/dogs/${dog.id}`}
                    className="group bg-white rounded-2xl border border-warm-200 overflow-hidden shadow-card transition-all duration-500 ease-out-expo hover:shadow-card-hover hover:border-bronze-200 hover:-translate-y-2"
                  >
                    {/* Image */}
                    <div className="aspect-[4/3] relative bg-warm-100">
                      {dog.photos[0]?.url ? (
                        <Image
                          src={dog.photos[0].url}
                          alt={dog.registeredName}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <DogIcon className="w-16 h-16 text-warm-300" />
                        </div>
                      )}
                      {/* Sex Badge */}
                      <div className="absolute top-3 right-3">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            dog.sex === 'MALE'
                              ? 'bg-blue-100 text-blue-700'
                              : 'bg-pink-100 text-pink-700'
                          }`}
                        >
                          {dog.sex === 'MALE' ? 'Male' : 'Female'}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      <h3 className="font-display text-lg font-semibold text-espresso mb-1 group-hover:text-bronze-600 transition-colors">
                        {dog.registeredName}
                      </h3>

                      {dog.registrationNumber && (
                        <p className="text-sm text-warm-500 mb-3">
                          {dog.registrationNumber}
                        </p>
                      )}

                      <div className="space-y-2 text-sm">
                        <p className="text-warm-600">
                          <span className="font-medium">Age:</span>{' '}
                          {calculateAge(dog.dateOfBirth)}
                        </p>

                        {dog.kennel && (
                          <p className="text-warm-600 flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {dog.kennel.name}
                          </p>
                        )}

                        {(dog.sire || dog.dam) && (
                          <div className="pt-2 border-t border-warm-100">
                            {dog.sire && (
                              <p className="text-warm-500 text-xs">
                                <span className="font-medium">Sire:</span>{' '}
                                {dog.sire.registeredName}
                              </p>
                            )}
                            {dog.dam && (
                              <p className="text-warm-500 text-xs">
                                <span className="font-medium">Dam:</span>{' '}
                                {dog.dam.registeredName}
                              </p>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
