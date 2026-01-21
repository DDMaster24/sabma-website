import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date
  return d.toLocaleDateString('en-ZA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function calculateAge(birthDate: Date | string): string {
  const birth = typeof birthDate === 'string' ? new Date(birthDate) : birthDate
  const now = new Date()

  let years = now.getFullYear() - birth.getFullYear()
  let months = now.getMonth() - birth.getMonth()

  if (months < 0) {
    years--
    months += 12
  }

  if (now.getDate() < birth.getDate()) {
    months--
    if (months < 0) {
      years--
      months += 12
    }
  }

  if (years === 0) {
    return months === 1 ? '1 month' : `${months} months`
  }

  if (months === 0) {
    return years === 1 ? '1 year' : `${years} years`
  }

  const yearStr = years === 1 ? '1 year' : `${years} years`
  const monthStr = months === 1 ? '1 month' : `${months} months`

  return `${yearStr}, ${monthStr}`
}
