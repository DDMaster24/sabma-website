'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface Kennel {
  id: string
  name: string
}

interface Dog {
  id: string
  registeredName: string
  sex: string
}

interface DogFormProps {
  kennels: Kennel[]
  dogs: Dog[]
  initialData?: {
    id?: string
    registeredName: string
    registrationNumber?: string
    microchipNumber?: string
    sex: string
    dateOfBirth: string
    color?: string
    markings?: string
    status: string
    sireId?: string
    damId?: string
    kennelId?: string
    breederName?: string
    currentOwner?: string
    registryName?: string
    registrationType?: string
    appraisalScore?: number
    appraisalClassification?: string
    inbreedingCoefficient?: number
    dnaVerified: boolean
    hipScore?: string
    elbowScore?: string
    healthNotes?: string
    notes?: string
  }
}

export function DogForm({ kennels, dogs, initialData }: DogFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const isEditing = !!initialData?.id

  const [formData, setFormData] = useState({
    registeredName: initialData?.registeredName || '',
    registrationNumber: initialData?.registrationNumber || '',
    microchipNumber: initialData?.microchipNumber || '',
    sex: initialData?.sex || 'MALE',
    dateOfBirth: initialData?.dateOfBirth || '',
    color: initialData?.color || '',
    markings: initialData?.markings || '',
    status: initialData?.status || 'ALIVE',
    sireId: initialData?.sireId || '',
    damId: initialData?.damId || '',
    kennelId: initialData?.kennelId || '',
    breederName: initialData?.breederName || '',
    currentOwner: initialData?.currentOwner || '',
    registryName: initialData?.registryName || 'SABMA',
    registrationType: initialData?.registrationType || '',
    appraisalScore: initialData?.appraisalScore?.toString() || '',
    appraisalClassification: initialData?.appraisalClassification || '',
    inbreedingCoefficient: initialData?.inbreedingCoefficient?.toString() || '',
    dnaVerified: initialData?.dnaVerified || false,
    hipScore: initialData?.hipScore || '',
    elbowScore: initialData?.elbowScore || '',
    healthNotes: initialData?.healthNotes || '',
    notes: initialData?.notes || '',
  })

  const handleChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      const payload = {
        ...formData,
        appraisalScore: formData.appraisalScore ? parseFloat(formData.appraisalScore) : undefined,
        inbreedingCoefficient: formData.inbreedingCoefficient
          ? parseFloat(formData.inbreedingCoefficient)
          : undefined,
        sireId: formData.sireId || undefined,
        damId: formData.damId || undefined,
        kennelId: formData.kennelId || undefined,
        registrationType: formData.registrationType || undefined,
      }

      const url = isEditing ? `/api/dogs/${initialData.id}` : '/api/dogs'
      const method = isEditing ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to save dog')
      }

      const dog = await response.json()
      router.push(`/registry/dogs/${dog.id}`)
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  // Filter dogs for sire/dam selection
  const maleDogs = dogs.filter((d) => d.sex === 'MALE' && d.id !== initialData?.id)
  const femaleDogs = dogs.filter((d) => d.sex === 'FEMALE' && d.id !== initialData?.id)

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl">
          {error}
        </div>
      )}

      {/* Basic Information */}
      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <Label htmlFor="registeredName">Registered Name *</Label>
            <Input
              id="registeredName"
              value={formData.registeredName}
              onChange={(e) => handleChange('registeredName', e.target.value)}
              required
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="registrationNumber">Registration Number</Label>
            <Input
              id="registrationNumber"
              value={formData.registrationNumber}
              onChange={(e) => handleChange('registrationNumber', e.target.value)}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="microchipNumber">Microchip Number</Label>
            <Input
              id="microchipNumber"
              value={formData.microchipNumber}
              onChange={(e) => handleChange('microchipNumber', e.target.value)}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="sex">Sex *</Label>
            <Select value={formData.sex} onValueChange={(v) => handleChange('sex', v)}>
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="MALE">Male</SelectItem>
                <SelectItem value="FEMALE">Female</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="dateOfBirth">Date of Birth *</Label>
            <Input
              id="dateOfBirth"
              type="date"
              value={formData.dateOfBirth}
              onChange={(e) => handleChange('dateOfBirth', e.target.value)}
              required
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="color">Color</Label>
            <Input
              id="color"
              value={formData.color}
              onChange={(e) => handleChange('color', e.target.value)}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="status">Status</Label>
            <Select value={formData.status} onValueChange={(v) => handleChange('status', v)}>
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALIVE">Alive</SelectItem>
                <SelectItem value="BREEDING">Breeding</SelectItem>
                <SelectItem value="RETIRED">Retired</SelectItem>
                <SelectItem value="PET_ONLY">Pet Only</SelectItem>
                <SelectItem value="EXPORTED">Exported</SelectItem>
                <SelectItem value="DECEASED">Deceased</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Parentage */}
      <Card>
        <CardHeader>
          <CardTitle>Parentage</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="sireId">Sire (Father)</Label>
            <Select value={formData.sireId} onValueChange={(v) => handleChange('sireId', v)}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select sire" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Unknown</SelectItem>
                {maleDogs.map((dog) => (
                  <SelectItem key={dog.id} value={dog.id}>
                    {dog.registeredName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="damId">Dam (Mother)</Label>
            <Select value={formData.damId} onValueChange={(v) => handleChange('damId', v)}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select dam" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Unknown</SelectItem>
                {femaleDogs.map((dog) => (
                  <SelectItem key={dog.id} value={dog.id}>
                    {dog.registeredName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Breeder & Owner */}
      <Card>
        <CardHeader>
          <CardTitle>Breeder & Owner</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="kennelId">Kennel</Label>
            <Select value={formData.kennelId} onValueChange={(v) => handleChange('kennelId', v)}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select kennel" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">No Kennel</SelectItem>
                {kennels.map((kennel) => (
                  <SelectItem key={kennel.id} value={kennel.id}>
                    {kennel.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="breederName">Breeder Name</Label>
            <Input
              id="breederName"
              value={formData.breederName}
              onChange={(e) => handleChange('breederName', e.target.value)}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="currentOwner">Current Owner</Label>
            <Input
              id="currentOwner"
              value={formData.currentOwner}
              onChange={(e) => handleChange('currentOwner', e.target.value)}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="registrationType">Registration Type</Label>
            <Select
              value={formData.registrationType}
              onValueChange={(v) => handleChange('registrationType', v)}
            >
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Not specified</SelectItem>
                <SelectItem value="STUDBOOK">Studbook</SelectItem>
                <SelectItem value="PET_REGISTER">Pet Register</SelectItem>
                <SelectItem value="PROVISIONAL">Provisional</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Health & Appraisal */}
      <Card>
        <CardHeader>
          <CardTitle>Health & Appraisal</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <Label htmlFor="appraisalScore">Appraisal Score</Label>
            <Input
              id="appraisalScore"
              type="number"
              step="0.1"
              value={formData.appraisalScore}
              onChange={(e) => handleChange('appraisalScore', e.target.value)}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="appraisalClassification">Classification</Label>
            <Input
              id="appraisalClassification"
              value={formData.appraisalClassification}
              onChange={(e) => handleChange('appraisalClassification', e.target.value)}
              placeholder="e.g., Excellent, Very Good"
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="hipScore">Hip Score</Label>
            <Input
              id="hipScore"
              value={formData.hipScore}
              onChange={(e) => handleChange('hipScore', e.target.value)}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="elbowScore">Elbow Score</Label>
            <Input
              id="elbowScore"
              value={formData.elbowScore}
              onChange={(e) => handleChange('elbowScore', e.target.value)}
              className="mt-1"
            />
          </div>

          <div className="flex items-center gap-2 pt-6">
            <input
              type="checkbox"
              id="dnaVerified"
              checked={formData.dnaVerified}
              onChange={(e) => handleChange('dnaVerified', e.target.checked)}
              className="w-4 h-4 rounded border-warm-300 text-bronze-600 focus:ring-bronze-500"
            />
            <Label htmlFor="dnaVerified" className="cursor-pointer">
              DNA Verified
            </Label>
          </div>
        </CardContent>
      </Card>

      {/* Notes */}
      <Card>
        <CardHeader>
          <CardTitle>Additional Notes</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 gap-6">
          <div>
            <Label htmlFor="markings">Markings</Label>
            <textarea
              id="markings"
              value={formData.markings}
              onChange={(e) => handleChange('markings', e.target.value)}
              rows={2}
              className="mt-1 w-full px-4 py-2 rounded-xl border border-warm-300 bg-white text-espresso placeholder:text-warm-400 focus:outline-none focus:ring-2 focus:ring-bronze-500/20 focus:border-bronze-500"
            />
          </div>

          <div>
            <Label htmlFor="healthNotes">Health Notes</Label>
            <textarea
              id="healthNotes"
              value={formData.healthNotes}
              onChange={(e) => handleChange('healthNotes', e.target.value)}
              rows={2}
              className="mt-1 w-full px-4 py-2 rounded-xl border border-warm-300 bg-white text-espresso placeholder:text-warm-400 focus:outline-none focus:ring-2 focus:ring-bronze-500/20 focus:border-bronze-500"
            />
          </div>

          <div>
            <Label htmlFor="notes">General Notes</Label>
            <textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => handleChange('notes', e.target.value)}
              rows={3}
              className="mt-1 w-full px-4 py-2 rounded-xl border border-warm-300 bg-white text-espresso placeholder:text-warm-400 focus:outline-none focus:ring-2 focus:ring-bronze-500/20 focus:border-bronze-500"
            />
          </div>
        </CardContent>
      </Card>

      {/* Submit */}
      <div className="flex justify-end gap-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
          disabled={isLoading}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Saving...
            </>
          ) : isEditing ? (
            'Update Dog'
          ) : (
            'Add Dog'
          )}
        </Button>
      </div>
    </form>
  )
}
