// src/components/UploadSection.jsx
import { useState } from 'react'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { Upload, ImageIcon, AlertCircle, Loader2 } from 'lucide-react'

export default function UploadSection({ onImageUpload }) {
  const supabase = useSupabaseClient()
  const [isDragging, setIsDragging] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => setIsDragging(false)

  const handleFile = async (file) => {
    setError(null)

    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file')
      return
    }
    if (file.size > 10 * 1024 * 1024) {
      setError('File size must be less than 10MB')
      return
    }

    setIsLoading(true)

    try {
      const fileExt = file.name.split('.').pop()?.toLowerCase() || 'png'
      const fileName = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}.${fileExt}`
      const filePath = `originals/${fileName}`

      // Upload
      const { error: uploadError } = await supabase.storage
        .from('processed-images')
        .upload(filePath, file, { upsert: false })

      if (uploadError) throw uploadError

      // Use PUBLIC URL (this works with remove.bg!)
      const { data } = supabase.storage
        .from('processed-images')
        .getPublicUrl(filePath)

      onImageUpload(data.publicUrl)
    } catch (err) {
      console.error(err)
      setError('Upload failed: ' + err.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)
    if (e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0])
  }

  const handleFileInput = (e) => {
    if (e.target.files?.[0]) handleFile(e.target.files[0])
  }

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`border-2 border-dashed rounded-xl p-12 text-center transition-all cursor-pointer ${
        isDragging ? 'border-cyan-400 bg-cyan-500/5' : 'border-slate-600 bg-slate-800/30 hover:border-slate-500'
      }`}
    >
      <div className="flex flex-col items-center gap-4">
        <div className="w-16 h-16 bg-gradient-to-br from-cyan-400/20 to-blue-500/20 rounded-full flex items-center justify-center">
          {isLoading ? <Loader2 className="animate-spin text-cyan-400" size={32} /> : <Upload size={32} className="text-cyan-400" />}
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white mb-2">Drop your product photo here</h3>
          <p className="text-slate-400 mb-4">or click to browse files</p>
        </div>

        <input
          type="file"
          accept="image/*"
          onChange={handleFileInput}
          className="hidden"
          id="file-input"
          disabled={isLoading}
        />

        <button
          onClick={() => document.getElementById('file-input')?.click()}
          disabled={isLoading}
          className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:from-cyan-600 hover:to-blue-600 rounded-lg flex items-center gap-2 disabled:opacity-50 transition-all"
        >
          <ImageIcon size={16} />
          {isLoading ? 'Uploading...' : 'Select Image'}
        </button>

        <p className="text-xs text-slate-500 mt-4">JPG, PNG, WebP • Max 10MB</p>

        {error && (
          <div className="mt-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg flex items-center gap-2 text-red-400 text-sm">
            <AlertCircle size={16} />
            {error}
          </div>
        )}
      </div>
    </div>
  )
}