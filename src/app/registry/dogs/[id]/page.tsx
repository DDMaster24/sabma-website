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
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

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
    <div className="min-h-screen bg-ivory">
      {/* Header */}
      <div className="bg-espresso text-ivory py-12 md:py-16">
        <div className="container-custom">
          {/* Back Button */}
          <Link href="/registry/dogs" className="inline-flex items-center text-ivory/70 hover:text-ivory mb-6 transition-colors">
            <ChevronLeft className="w-5 h-5 mr-1" />
            Back to Registry
          </Link>

          <div className="flex flex-col md:flex-row md:items-start gap-6">
            <div className="flex-1">
              <span className="label mb-4">{dog.sex === 'MALE' ? 'Male' : 'Female'}</span>
              <h1 className="font-display text-display-md md:text-display-lg font-light mb-2">
                {dog.registeredName}
              </h1>
              {dog.registrationNumber && (
                <p className="text-ivory/60 text-lg">{dog.registrationNumber}</p>
              )}
              <div className="flex flex-wrap gap-4 mt-4 text-ivory/70">
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {formatDate(dog.dateOfBirth)} ({calculateAge(dog.dateOfBirth)})
                </span>
                {dog.kennel && (
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
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
            <Card className="overflow-hidden">
              <div className="aspect-square relative bg-warm-100">
                {primaryPhoto?.url ? (
                  <Image
                    src={primaryPhoto.url}
                    alt={dog.registeredName}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <DogIcon className="w-24 h-24 text-warm-300" />
                  </div>
                )}
              </div>
            </Card>

            {/* Photo Gallery */}
            {dog.photos.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {dog.photos.slice(0, 8).map((photo) => (
                  <div
                    key={photo.id}
                    className="aspect-square relative rounded-lg overflow-hidden bg-warm-100"
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
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Hash className="w-5 h-5 text-bronze-600" />
                  Basic Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
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
              </CardContent>
            </Card>

            {/* Breeder & Owner */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-bronze-600" />
                  Breeder & Owner
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {dog.kennel && (
                  <div>
                    <span className="text-sm text-warm-500">Kennel</span>
                    <Link
                      href={`/registry/kennels/${dog.kennel.id}`}
                      className="block text-espresso font-medium hover:text-bronze-600 transition-colors"
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
              </CardContent>
            </Card>

            {/* Health & Appraisal */}
            {(dog.appraisalScore || dog.hipScore || dog.elbowScore || dog.dnaVerified) && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="w-5 h-5 text-bronze-600" />
                    Health & Appraisal
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {dog.appraisalScore && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-warm-500">Appraisal Score</span>
                      <span className="flex items-center gap-2">
                        <Award className="w-4 h-4 text-bronze-600" />
                        <span className="font-semibold text-bronze-700">
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
                    <div className="flex items-center gap-2 text-green-600">
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
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Column - Pedigree & Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Pedigree Tree */}
            <Card>
              <CardHeader>
                <CardTitle>Pedigree (3 Generations)</CardTitle>
              </CardHeader>
              <CardContent>
                <PedigreeTree dog={dog} />
              </CardContent>
            </Card>

            {/* Parents */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Sire */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-blue-700">Sire (Father)</CardTitle>
                </CardHeader>
                <CardContent>
                  {dog.sire ? (
                    <Link
                      href={`/registry/dogs/${dog.sire.id}`}
                      className="group"
                    >
                      <p className="font-medium text-espresso group-hover:text-bronze-600 transition-colors">
                        {dog.sire.registeredName}
                      </p>
                    </Link>
                  ) : (
                    <p className="text-warm-500">Unknown</p>
                  )}
                </CardContent>
              </Card>

              {/* Dam */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-pink-700">Dam (Mother)</CardTitle>
                </CardHeader>
                <CardContent>
                  {dog.dam ? (
                    <Link
                      href={`/registry/dogs/${dog.dam.id}`}
                      className="group"
                    >
                      <p className="font-medium text-espresso group-hover:text-bronze-600 transition-colors">
                        {dog.dam.registeredName}
                      </p>
                    </Link>
                  ) : (
                    <p className="text-warm-500">Unknown</p>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Offspring */}
            {offspring.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Offspring ({offspring.length})</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {offspring.map((child) => (
                      <Link
                        key={child.id}
                        href={`/registry/dogs/${child.id}`}
                        className="flex items-center gap-3 p-3 rounded-lg bg-warm-50 hover:bg-bronze-50 transition-colors"
                      >
                        <span
                          className={`w-2 h-2 rounded-full ${
                            child.sex === 'MALE' ? 'bg-blue-500' : 'bg-pink-500'
                          }`}
                        />
                        <span className="text-sm font-medium text-espresso">
                          {child.registeredName}
                        </span>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Notes */}
            {(dog.markings || dog.healthNotes || dog.notes) && (
              <Card>
                <CardHeader>
                  <CardTitle>Additional Notes</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {dog.markings && (
                    <div>
                      <h4 className="text-sm font-medium text-warm-500 mb-1">Markings</h4>
                      <p className="text-espresso">{dog.markings}</p>
                    </div>
                  )}
                  {dog.healthNotes && (
                    <div>
                      <h4 className="text-sm font-medium text-warm-500 mb-1">Health Notes</h4>
                      <p className="text-espresso">{dog.healthNotes}</p>
                    </div>
                  )}
                  {dog.notes && (
                    <div>
                      <h4 className="text-sm font-medium text-warm-500 mb-1">Notes</h4>
                      <p className="text-espresso">{dog.notes}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Back Button */}
            <div className="pt-6">
              <Button variant="outline" asChild>
                <Link href="/registry/dogs">
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  Back to Registry
                </Link>
              </Button>
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
      <span className="text-sm text-warm-500">{label}</span>
      <span className="text-sm font-medium text-espresso">{value}</span>
    </div>
  )
}
