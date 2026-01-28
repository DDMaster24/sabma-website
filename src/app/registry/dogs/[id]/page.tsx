import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import {
  Dog as DogIcon,
  MapPin,
  Calendar,
  Hash,
  Dna,
  Heart,
  Award,
  ChevronLeft,
} from 'lucide-react'
import { prisma } from '@/lib/prisma'
import { formatDate, calculateAge } from '@/lib/utils'
import { PedigreeTree } from '@/components/registry/PedigreeTree'

interface PageProps {
  params: { id: string }
}

export default async function DogDetailPage({ params }: PageProps) {
  const dog = await prisma.dog.findUnique({
    where: { id: params.id },
    include: {
      kennel: true,
      photos: {
        orderBy: [{ isPrimary: 'desc' }, { order: 'asc' }],
      },
      certificates: {
        orderBy: { createdAt: 'desc' },
      },
      sire: {
        include: {
          sire: true,
          dam: true,
        },
      },
      dam: {
        include: {
          sire: true,
          dam: true,
        },
      },
      sireChildren: {
        select: { id: true, registeredName: true, sex: true },
        take: 10,
      },
      damChildren: {
        select: { id: true, registeredName: true, sex: true },
        take: 10,
      },
    },
  })

  if (!dog) {
    notFound()
  }

  const primaryPhoto = dog.photos.find((p) => p.isPrimary) || dog.photos[0]
  const offspring = [...dog.sireChildren, ...dog.damChildren]

  return (
    <div className="min-h-screen bg-noir">
      {/* Header */}
      <div className="relative py-12 md:py-16 overflow-hidden">
        <div className="absolute inset-0 mesh-spotlight" />
        <div className="absolute top-20 right-20 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />

        <div className="container-custom relative">
          {/* Back Button */}
          <Link
            href="/registry/dogs"
            className="inline-flex items-center text-stone-400 hover:text-amber-500 mb-6 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 mr-1" />
            Back to Registry
          </Link>

          <div className="flex flex-col md:flex-row md:items-start gap-6">
            <div className="flex-1">
              <span
                className={`inline-block px-3 py-1 rounded-full text-xs font-semibold border mb-4 ${
                  dog.sex === 'MALE'
                    ? 'bg-blue-500/10 text-blue-400 border-blue-500/30'
                    : 'bg-pink-500/10 text-pink-400 border-pink-500/30'
                }`}
              >
                {dog.sex === 'MALE' ? 'Male' : 'Female'}
              </span>
              <h1 className="heading-display text-cream mb-2">
                {dog.registeredName}
              </h1>
              {dog.registrationNumber && (
                <p className="text-stone-500 text-lg">{dog.registrationNumber}</p>
              )}
              <div className="flex flex-wrap gap-4 mt-4 text-stone-400">
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4 text-amber-500/60" />
                  {formatDate(dog.dateOfBirth)} ({calculateAge(dog.dateOfBirth)})
                </span>
                {dog.kennel && (
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4 text-amber-500/60" />
                    {dog.kennel.name}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Photo & Info */}
          <div className="space-y-6">
            {/* Photo */}
            <div className="card-noir overflow-hidden">
              <div className="aspect-square relative bg-gradient-to-br from-charcoal to-noir">
                {primaryPhoto?.url ? (
                  <Image
                    src={primaryPhoto.url}
                    alt={dog.registeredName}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <DogIcon className="w-24 h-24 text-stone-700" />
                  </div>
                )}
              </div>
            </div>

            {/* Photo Gallery */}
            {dog.photos.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {dog.photos.slice(0, 8).map((photo) => (
                  <div
                    key={photo.id}
                    className="aspect-square relative rounded-lg overflow-hidden bg-charcoal"
                  >
                    <Image
                      src={photo.url}
                      alt={photo.caption || dog.registeredName}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Basic Information */}
            <div className="card-noir p-6">
              <h3 className="flex items-center gap-2 font-display text-lg font-medium text-cream mb-4">
                <Hash className="w-5 h-5 text-amber-500" />
                Basic Information
              </h3>
              <div className="space-y-3">
                <InfoRow label="Sex" value={dog.sex === 'MALE' ? 'Male' : 'Female'} />
                <InfoRow label="Date of Birth" value={formatDate(dog.dateOfBirth)} />
                <InfoRow label="Age" value={calculateAge(dog.dateOfBirth)} />
                {dog.color && <InfoRow label="Color" value={dog.color} />}
                {dog.microchipNumber && (
                  <InfoRow label="Microchip" value={dog.microchipNumber} />
                )}
                {dog.status && (
                  <InfoRow label="Status" value={dog.status.replace('_', ' ')} />
                )}
                {dog.registryName && (
                  <InfoRow label="Registry" value={dog.registryName} />
                )}
              </div>
            </div>

            {/* Breeder & Owner */}
            <div className="card-noir p-6">
              <h3 className="flex items-center gap-2 font-display text-lg font-medium text-cream mb-4">
                <MapPin className="w-5 h-5 text-amber-500" />
                Breeder & Owner
              </h3>
              <div className="space-y-3">
                {dog.kennel && (
                  <div>
                    <span className="text-sm text-stone-500">Kennel</span>
                    <Link
                      href={`/registry/kennels/${dog.kennel.id}`}
                      className="block text-cream font-medium hover:text-amber-400 transition-colors"
                    >
                      {dog.kennel.name}
                    </Link>
                  </div>
                )}
                {dog.breederName && (
                  <InfoRow label="Breeder" value={dog.breederName} />
                )}
                {dog.currentOwner && (
                  <InfoRow label="Current Owner" value={dog.currentOwner} />
                )}
              </div>
            </div>

            {/* Health & Appraisal */}
            {(dog.appraisalScore || dog.hipScore || dog.elbowScore || dog.dnaVerified) && (
              <div className="card-noir p-6">
                <h3 className="flex items-center gap-2 font-display text-lg font-medium text-cream mb-4">
                  <Heart className="w-5 h-5 text-amber-500" />
                  Health & Appraisal
                </h3>
                <div className="space-y-3">
                  {dog.appraisalScore && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-stone-500">Appraisal Score</span>
                      <span className="flex items-center gap-2">
                        <Award className="w-4 h-4 text-amber-500" />
                        <span className="font-semibold text-amber-400">
                          {dog.appraisalScore}
                        </span>
                      </span>
                    </div>
                  )}
                  {dog.appraisalClassification && (
                    <InfoRow label="Classification" value={dog.appraisalClassification} />
                  )}
                  {dog.hipScore && <InfoRow label="Hip Score" value={dog.hipScore} />}
                  {dog.elbowScore && <InfoRow label="Elbow Score" value={dog.elbowScore} />}
                  {dog.dnaVerified && (
                    <div className="flex items-center gap-2 text-emerald-400">
                      <Dna className="w-4 h-4" />
                      <span className="text-sm font-medium">DNA Verified</span>
                    </div>
                  )}
                  {dog.inbreedingCoefficient && (
                    <InfoRow
                      label="Inbreeding Coefficient"
                      value={`${dog.inbreedingCoefficient.toFixed(2)}%`}
                    />
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Pedigree & Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Pedigree Tree */}
            <div className="card-noir p-6">
              <h3 className="font-display text-lg font-medium text-cream mb-4">
                Pedigree (3 Generations)
              </h3>
              <PedigreeTree dog={dog} />
            </div>

            {/* Parents */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Sire */}
              <div className="card-noir p-6">
                <h3 className="text-blue-400 font-medium mb-3">Sire (Father)</h3>
                {dog.sire ? (
                  <Link
                    href={`/registry/dogs/${dog.sire.id}`}
                    className="group"
                  >
                    <p className="font-medium text-cream group-hover:text-amber-400 transition-colors">
                      {dog.sire.registeredName}
                    </p>
                  </Link>
                ) : (
                  <p className="text-stone-500">Unknown</p>
                )}
              </div>

              {/* Dam */}
              <div className="card-noir p-6">
                <h3 className="text-pink-400 font-medium mb-3">Dam (Mother)</h3>
                {dog.dam ? (
                  <Link
                    href={`/registry/dogs/${dog.dam.id}`}
                    className="group"
                  >
                    <p className="font-medium text-cream group-hover:text-amber-400 transition-colors">
                      {dog.dam.registeredName}
                    </p>
                  </Link>
                ) : (
                  <p className="text-stone-500">Unknown</p>
                )}
              </div>
            </div>

            {/* Offspring */}
            {offspring.length > 0 && (
              <div className="card-noir p-6">
                <h3 className="font-display text-lg font-medium text-cream mb-4">
                  Offspring ({offspring.length})
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {offspring.map((child) => (
                    <Link
                      key={child.id}
                      href={`/registry/dogs/${child.id}`}
                      className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-amber-500/10 transition-colors"
                    >
                      <span
                        className={`w-2 h-2 rounded-full ${
                          child.sex === 'MALE' ? 'bg-blue-500' : 'bg-pink-500'
                        }`}
                      />
                      <span className="text-sm font-medium text-cream">
                        {child.registeredName}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Notes */}
            {(dog.markings || dog.healthNotes || dog.notes) && (
              <div className="card-noir p-6">
                <h3 className="font-display text-lg font-medium text-cream mb-4">
                  Additional Notes
                </h3>
                <div className="space-y-4">
                  {dog.markings && (
                    <div>
                      <h4 className="text-sm font-medium text-stone-500 mb-1">Markings</h4>
                      <p className="text-cream">{dog.markings}</p>
                    </div>
                  )}
                  {dog.healthNotes && (
                    <div>
                      <h4 className="text-sm font-medium text-stone-500 mb-1">Health Notes</h4>
                      <p className="text-cream">{dog.healthNotes}</p>
                    </div>
                  )}
                  {dog.notes && (
                    <div>
                      <h4 className="text-sm font-medium text-stone-500 mb-1">Notes</h4>
                      <p className="text-cream">{dog.notes}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Back Button */}
            <div className="pt-6">
              <Link
                href="/registry/dogs"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/10 text-cream hover:bg-white/5 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                Back to Registry
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <span className="text-sm text-stone-500">{label}</span>
      <span className="text-sm font-medium text-cream">{value}</span>
    </div>
  )
}
