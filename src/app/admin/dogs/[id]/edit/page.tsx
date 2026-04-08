'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { DogForm } from '@/components/admin/DogForm'
import { ChevronLeft, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface Kennel {
  id: string
  name: string
}

interface DogOption {
  id: string
  registeredName: string
  sex: string
}

interface DogData {
  id: string
  registeredName: string
  registrationNumber: string | null
  microchipNumber: string | null
  sex: string
  dateOfBirth: string
  color: string | null
  markings: string | null
  status: string
  sireId: string | null
  damId: string | null
  kennelId: string | null
  breederName: string | null
  currentOwner: string | null
  registryName: string | null
  registrationType: string | null
  appraisalScore: number | null
  appraisalClassification: string | null
  inbreedingCoefficient: number | null
  dnaVerified: boolean
  hipScore: string | null
  elbowScore: string | null
  healthNotes: string | null
  notes: string | null
}

export default function EditDogPage() {
  const params = useParams()
  const id = params.id as string

  const [dog, setDog] = useState<DogData | null>(null)
  const [kennels, setKennels] = useState<Kennel[]>([])
  const [dogs, setDogs] = useState<DogOption[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true)
      try {
        const [dogRes, kennelsRes, dogsRes] = await Promise.all([
          fetch(`/api/dogs/${id}`),
          fetch('/api/kennels'),
          fetch('/api/dogs'),
        ])

        if (!dogRes.ok) {
          throw new Error('Dog not found')
        }

        const dogData = await dogRes.json()
        const kennelsData = kennelsRes.ok ? await kennelsRes.json() : []
        const dogsData = dogsRes.ok ? await dogsRes.json() : []

        // Format date for input
        const formattedDog = {
          ...dogData,
          dateOfBirth: dogData.dateOfBirth
            ? new Date(dogData.dateOfBirth).toISOString().split('T')[0]
            : '',
        }

        setDog(formattedDog)
        setKennels(kennelsData.map((k: Kennel) => ({ id: k.id, name: k.name })))
        setDogs(
          dogsData.map((d: DogData) => ({
            id: d.id,
            registeredName: d.registeredName,
            sex: d.sex,
          }))
        )
      } catch (err) {
        console.error('Error fetching data:', err)
        setError(err instanceof Error ? err.message : 'Failed to load dog data')
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [id])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-bronze-500" />
      </div>
    )
  }

  if (error || !dog) {
    return (
      <div className="container-custom py-8">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-4">
          {error || 'Dog not found'}
        </div>
        <Button variant="outline" asChild>
          <Link href="/admin/dogs">
            <ChevronLeft className="w-4 h-4 mr-2" />
            Back to Dogs
          </Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="container-custom py-8">
      {/* Header */}
      <div className="mb-8">
        <Button variant="ghost" size="sm" asChild className="mb-4">
          <Link href="/admin/dogs">
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back to Dogs
          </Link>
        </Button>
        <h1 className="font-display text-display-sm font-semibold text-espresso">
          Edit Dog: {dog.registeredName}
        </h1>
        <p className="text-warm-600 mt-1">
          Update the registration details for this dog.
        </p>
      </div>

      <DogForm
        kennels={kennels}
        dogs={dogs}
        initialData={{
          id: dog.id,
          registeredName: dog.registeredName,
          registrationNumber: dog.registrationNumber || undefined,
          microchipNumber: dog.microchipNumber || undefined,
          sex: dog.sex,
          dateOfBirth: dog.dateOfBirth,
          color: dog.color || undefined,
          markings: dog.markings || undefined,
          status: dog.status,
          sireId: dog.sireId || undefined,
          damId: dog.damId || undefined,
          kennelId: dog.kennelId || undefined,
          breederName: dog.breederName || undefined,
          currentOwner: dog.currentOwner || undefined,
          registryName: dog.registryName || undefined,
          registrationType: dog.registrationType || undefined,
          appraisalScore: dog.appraisalScore || undefined,
          appraisalClassification: dog.appraisalClassification || undefined,
          inbreedingCoefficient: dog.inbreedingCoefficient || undefined,
          dnaVerified: dog.dnaVerified,
          hipScore: dog.hipScore || undefined,
          elbowScore: dog.elbowScore || undefined,
          healthNotes: dog.healthNotes || undefined,
          notes: dog.notes || undefined,
        }}
      />
    </div>
  )
}
