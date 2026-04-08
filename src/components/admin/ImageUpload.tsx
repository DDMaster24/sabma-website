'use client'

import { useState, useCallback, useRef } from 'react'
import { Upload, X, Loader2 } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface ImageUploadProps {
  value: string
  onChange: (url: string) => void
  folder?: string
  label?: string
  required?: boolean
}

export default function ImageUpload({
  value,
  onChange,
  folder = 'general',
  label = 'Image',
  required = false,
}: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [error, setError] = useState('')
  const [mode, setMode] = useState<'upload' | 'url'>(value && !value.startsWith('blob:') ? 'url' : 'upload')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const uploadFile = useCallback(async (file: File) => {
    setError('')
    setIsUploading(true)

    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('folder', folder)

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Upload failed')
      }

      const data = await res.json()
      onChange(data.url)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed')
    } finally {
      setIsUploading(false)
    }
  }, [folder, onChange])

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) uploadFile(file)
  }, [uploadFile])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files?.[0]
    if (file) uploadFile(file)
  }, [uploadFile])

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleRemove = () => {
    onChange('')
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <Label>{label} {required && '*'}</Label>
        <button
          type="button"
          onClick={() => setMode(mode === 'upload' ? 'url' : 'upload')}
          className="text-xs text-bronze-600 hover:text-bronze-700 underline"
        >
          {mode === 'upload' ? 'Paste URL instead' : 'Upload file instead'}
        </button>
      </div>

      {mode === 'url' ? (
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="https://..."
          required={required}
          className="mt-1"
        />
      ) : (
        <>
          {value ? (
            <div className="mt-1 relative inline-block">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={value}
                alt="Preview"
                className="w-40 h-40 object-cover rounded-xl border border-warm-200"
              />
              <button
                type="button"
                onClick={handleRemove}
                className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ) : (
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              className={`mt-1 border-2 border-dashed rounded-xl p-6 text-center transition-colors cursor-pointer
                ${isDragging
                  ? 'border-bronze-500 bg-bronze-50'
                  : 'border-warm-300 hover:border-warm-400 bg-warm-50'
                }
                ${isUploading ? 'pointer-events-none opacity-60' : ''}
              `}
              onClick={() => fileInputRef.current?.click()}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif"
                onChange={handleFileSelect}
                className="hidden"
              />
              {isUploading ? (
                <div className="flex flex-col items-center gap-2">
                  <Loader2 className="w-8 h-8 text-bronze-500 animate-spin" />
                  <p className="text-sm text-warm-600">Uploading...</p>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-2">
                  <div className="w-12 h-12 bg-warm-100 rounded-xl flex items-center justify-center">
                    <Upload className="w-6 h-6 text-warm-400" />
                  </div>
                  <p className="text-sm text-warm-600">
                    <span className="font-medium text-bronze-600">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-warm-400">JPEG, PNG, WebP, GIF (max 10MB)</p>
                </div>
              )}
            </div>
          )}
        </>
      )}

      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  )
}
