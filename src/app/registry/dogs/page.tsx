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
    <div className="min-h-screen bg-noir">
      {/* Header */}
      <div className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 mesh-spotlight" />
        <div className="absolute top-20 right-20 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-64 h-64 bg-amber-600/5 rounded-full blur-2xl" />

        <div className="container-custom relative">
          <div className="max-w-3xl">
            <span className="label-micro mb-4 block">SABMA Registry</span>
            <h1 className="heading-display text-cream mb-4">
              Browse <span className="text-gradient-amber">Dogs</span>
            </h1>
            <p className="text-xl text-stone-400">
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
              <div className="w-20 h-20 bg-amber-500/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-amber-500/20">
                <DogIcon className="w-10 h-10 text-amber-500/50" />
              </div>
              <h3 className="text-xl font-display font-semibold text-cream mb-2">
                No dogs found
              </h3>
              <p className="text-stone-500">
                Try adjusting your search criteria or clear the filters.
              </p>
            </div>
          ) : (
            <>
              <p className="text-stone-500 mb-6">
                Showing {dogs.length} {dogs.length === 1 ? 'dog' : 'dogs'}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {dogs.map((dog) => (
                  <Link
                    key={dog.id}
                    href={`/registry/dogs/${dog.id}`}
                    className="group card-noir overflow-hidden"
                  >
                    {/* Image */}
                    <div className="aspect-[4/3] relative bg-gradient-to-br from-charcoal to-noir overflow-hidden">
                      {dog.photos[0]?.url ? (
                        <Image
                          src={dog.photos[0].url}
                          alt={dog.registeredName}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <DogIcon className="w-16 h-16 text-stone-700" />
                        </div>
                      )}
                      {/* Sex Badge */}
                      <div className="absolute top-3 right-3">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold border ${
                            dog.sex === 'MALE'
                              ? 'bg-blue-500/10 text-blue-400 border-blue-500/30'
                              : 'bg-pink-500/10 text-pink-400 border-pink-500/30'
                          }`}
                        >
                          {dog.sex === 'MALE' ? 'Male' : 'Female'}
                        </span>
                      </div>
                      {/* Gradient overlay on hover */}
                      <div className="absolute inset-0 bg-gradient-to-t from-noir/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      <h3 className="font-display text-lg font-semibold text-cream mb-1 group-hover:text-amber-400 transition-colors">
                        {dog.registeredName}
                      </h3>

                      {dog.registrationNumber && (
                        <p className="text-sm text-stone-600 mb-3">
                          {dog.registrationNumber}
                        </p>
                      )}

                      <div className="space-y-2 text-sm">
                        <p className="text-stone-400">
                          <span className="font-medium text-amber-500/80">Age:</span>{' '}
                          {calculateAge(dog.dateOfBirth)}
                        </p>

                        {dog.kennel && (
                          <p className="text-stone-400 flex items-center gap-1">
                            <MapPin className="w-4 h-4 text-amber-500/60" />
                            {dog.kennel.name}
                          </p>
                        )}

                        {(dog.sire || dog.dam) && (
                          <div className="pt-2 border-t border-stone-800/50">
                            {dog.sire && (
                              <p className="text-stone-500 text-xs">
                                <span className="font-medium">Sire:</span>{' '}
                                {dog.sire.registeredName}
                              </p>
                            )}
                            {dog.dam && (
                              <p className="text-stone-500 text-xs">
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
