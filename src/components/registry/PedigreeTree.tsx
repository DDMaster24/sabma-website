'use client'

import Link from 'next/link'

interface Dog {
  id: string
  registeredName: string
  sire?: Dog | null
  dam?: Dog | null
}

interface PedigreeTreeProps {
  dog: Dog
}

function PedigreeBox({
  dog,
  label,
  highlight = false,
}: {
  dog: Dog | null | undefined
  label: string
  highlight?: boolean
}) {
  if (!dog) {
    return (
      <div className="px-3 py-2 rounded-lg bg-warm-100 border border-warm-200 text-center min-w-[140px]">
        <span className="text-xs text-warm-400 block">{label}</span>
        <span className="text-sm text-warm-500">Unknown</span>
      </div>
    )
  }

  return (
    <Link
      href={`/registry/dogs/${dog.id}`}
      className={`block px-3 py-2 rounded-lg border text-center min-w-[140px] transition-all duration-200 hover:-translate-y-0.5 ${
        highlight
          ? 'bg-bronze-50 border-bronze-300 hover:border-bronze-400'
          : 'bg-white border-warm-200 hover:border-bronze-300 hover:bg-bronze-50/50'
      }`}
    >
      <span className="text-xs text-warm-500 block">{label}</span>
      <span className={`text-sm font-medium ${highlight ? 'text-bronze-700' : 'text-espresso'}`}>
        {dog.registeredName}
      </span>
    </Link>
  )
}

export function PedigreeTree({ dog }: PedigreeTreeProps) {
  const sire = dog.sire
  const dam = dog.dam

  const paternalGrandsire = sire?.sire
  const paternalGranddam = sire?.dam
  const maternalGrandsire = dam?.sire
  const maternalGranddam = dam?.dam

  return (
    <div className="overflow-x-auto">
      <div className="min-w-[700px] p-4">
        <div className="flex items-center gap-8">
          {/* Subject */}
          <div className="flex flex-col items-center">
            <PedigreeBox dog={dog} label="Subject" highlight />
          </div>

          {/* Connector */}
          <div className="w-8 h-px bg-warm-300" />

          {/* Parents */}
          <div className="flex flex-col gap-8">
            {/* Sire Line */}
            <div className="flex items-center gap-4">
              <PedigreeBox dog={sire} label="Sire" />
              <div className="w-8 h-px bg-warm-300" />
              <div className="flex flex-col gap-2">
                <PedigreeBox dog={paternalGrandsire} label="Grandsire" />
                <PedigreeBox dog={paternalGranddam} label="Granddam" />
              </div>
            </div>

            {/* Vertical Connector */}
            <div className="h-8 border-l-2 border-warm-300 ml-[70px]" />

            {/* Dam Line */}
            <div className="flex items-center gap-4">
              <PedigreeBox dog={dam} label="Dam" />
              <div className="w-8 h-px bg-warm-300" />
              <div className="flex flex-col gap-2">
                <PedigreeBox dog={maternalGrandsire} label="Grandsire" />
                <PedigreeBox dog={maternalGranddam} label="Granddam" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
