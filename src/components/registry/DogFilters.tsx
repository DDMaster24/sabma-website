'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { Search, X } from 'lucide-react'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'

interface Kennel {
  id: string
  name: string
}

interface DogFiltersProps {
  kennels: Kennel[]
}

export function DogFilters({ kennels }: DogFiltersProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const search = searchParams.get('search') || ''
  const sex = searchParams.get('sex') || ''
  const kennel = searchParams.get('kennel') || ''
  const year = searchParams.get('year') || ''

  const hasFilters = search || sex || kennel || year

  const updateParams = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value && value !== 'all') {
      params.set(key, value)
    } else {
      params.delete(key)
    }
    router.push(`/registry/dogs?${params.toString()}`)
  }

  const clearFilters = () => {
    router.push('/registry/dogs')
  }

  // Generate year options for the last 20 years
  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: 20 }, (_, i) => currentYear - i)

  return (
    <div className="card-noir p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Search */}
        <div className="lg:col-span-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-stone-500" />
            <Input
              placeholder="Search by name, registration, or microchip..."
              value={search}
              onChange={(e) => updateParams('search', e.target.value)}
              className="pl-10 bg-white/5 border-white/10 text-cream placeholder-stone-600 focus:border-amber-500/50 focus:ring-amber-500/20"
            />
          </div>
        </div>

        {/* Sex Filter */}
        <Select value={sex || 'all'} onValueChange={(value) => updateParams('sex', value)}>
          <SelectTrigger className="bg-white/5 border-white/10 text-cream">
            <SelectValue placeholder="All Sexes" />
          </SelectTrigger>
          <SelectContent className="bg-charcoal border-stone-800">
            <SelectItem value="all" className="text-cream hover:bg-white/5">All Sexes</SelectItem>
            <SelectItem value="MALE" className="text-cream hover:bg-white/5">Male</SelectItem>
            <SelectItem value="FEMALE" className="text-cream hover:bg-white/5">Female</SelectItem>
          </SelectContent>
        </Select>

        {/* Kennel Filter */}
        <Select value={kennel || 'all'} onValueChange={(value) => updateParams('kennel', value)}>
          <SelectTrigger className="bg-white/5 border-white/10 text-cream">
            <SelectValue placeholder="All Kennels" />
          </SelectTrigger>
          <SelectContent className="bg-charcoal border-stone-800 max-h-60">
            <SelectItem value="all" className="text-cream hover:bg-white/5">All Kennels</SelectItem>
            {kennels.map((k) => (
              <SelectItem key={k.id} value={k.id} className="text-cream hover:bg-white/5">
                {k.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Year Filter */}
        <Select value={year || 'all'} onValueChange={(value) => updateParams('year', value)}>
          <SelectTrigger className="bg-white/5 border-white/10 text-cream">
            <SelectValue placeholder="Birth Year" />
          </SelectTrigger>
          <SelectContent className="bg-charcoal border-stone-800 max-h-60">
            <SelectItem value="all" className="text-cream hover:bg-white/5">All Years</SelectItem>
            {years.map((y) => (
              <SelectItem key={y} value={y.toString()} className="text-cream hover:bg-white/5">
                {y}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Clear Filters */}
      {hasFilters && (
        <div className="mt-4 flex justify-end">
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="text-stone-400 hover:text-amber-500 hover:bg-transparent"
          >
            <X className="h-4 w-4 mr-1" />
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  )
}
