import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { Upload, AlertCircle, RefreshCw, Zap } from 'lucide-react'
import UploadSection from '../components/UploadSection'

const CATEGORIES = [
  { id: 'fashion', label: 'Fashion & Apparel', icon: '👕' },
  { id: 'art', label: 'Art & Crafts', icon: '🎨' },
  { id: 'clothing', label: 'Clothing', icon: '👗' },
  { id: 'accessories', label: 'Accessories', icon: '💍' },
  { id: 'electronics', label: 'Electronics', icon: '📱' },
  { id: 'home', label: 'Home & Garden', icon: '🏠' },
  { id: 'beauty', label: 'Beauty & Personal Care', icon: '💄' },
  { id: 'sports', label: 'Sports & Outdoors', icon: '⚽' },
]

export default function GeneratorPage() {
  const { user, loading } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login')
    }
  }, [loading, user, navigate])

  if (loading || !user) return null
  const [uploadedImage, setUploadedImage] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState('fashion')
  const [processing, setProcessing] = useState(false)
  const [error, setError] = useState(null)
  const [results, setResults] = useState({
    removedBg: null,
    enhanced: null,
    listing: null,
    poster: null,
    shareLink: null,
  })

  if (!user) {
    navigate('/login')
    return null
  }

  const handleImageUpload = (imageUrl) => {
    setUploadedImage(imageUrl)
    setResults({ removedBg: null, enhanced: null, listing: null, poster: null, shareLink: null })
    setError(null)
  }

  const handleProcess = async () => {
    if (!uploadedImage) return

    setProcessing(true)
    setError(null)
    try {
      const response = await fetch('/api/process-product', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageUrl: uploadedImage, category: selectedCategory }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Processing failed')
      }

      const data = await response.json()

      const listingId = Date.now().toString()
      const shareLink = `${window.location.origin}/listing/${listingId}`

      setResults({ ...data, shareLink })
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Processing failed. Please try again.'
      setError(message)
    } finally {
      setProcessing(false)
    }
  }

  const handleReset = () => {
    setUploadedImage(null)
    setResults({ removedBg: null, enhanced: null, listing: null, poster: null, shareLink: null })
    setError(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 pt-24 pb-16">
      <main className="max-w-7xl mx-auto px-6">
        {!uploadedImage ? (
          <div className="space-y-8">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-white mb-4">Product Listing Generator</h1>
              <p className="text-xl text-slate-400">Upload a product photo and let AI create your listing</p>
            </div>

            <UploadSection onImageUpload={handleImageUpload} />

            <div className="grid md:grid-cols-3 gap-6 mt-12">
              <div className="p-6 border border-slate-700 bg-slate-800/50 rounded-lg">
                <Upload size={24} className="text-orange-400 mb-3" />
                <h3 className="text-lg font-semibold text-white mb-2">Upload</h3>
                <p className="text-slate-400 text-sm">Drop or select your product image</p>
              </div>
              <div className="p-6 border border-slate-700 bg-slate-800/50 rounded-lg">
                <Zap size={24} className="text-cyan-400 mb-3" />
                <h3 className="text-lg font-semibold text-white mb-2">Process</h3>
                <p className="text-slate-400 text-sm">AI enhances and generates listing</p>
              </div>
              <div className="p-6 border border-slate-700 bg-slate-800/50 rounded-lg">
                <RefreshCw size={24} className="text-green-400 mb-3" />
                <h3 className="text-lg font-semibold text-white mb-2">Publish</h3>
                <p className="text-slate-400 text-sm">List your product and start selling</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold text-white">Product Processing</h2>
              <button
                onClick={handleReset}
                className="px-4 py-2 border border-slate-600 text-slate-300 hover:bg-slate-800 rounded-lg flex items-center gap-2"
              >
                <RefreshCw size={16} />
                Start Over
              </button>
            </div>

            <div className="p-6 border border-slate-700 bg-slate-800/50 rounded-lg">
              <h3 className="text-sm font-semibold text-slate-300 mb-4">Product Category</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      selectedCategory === cat.id
                        ? 'border-orange-400 bg-orange-500/10 text-orange-300'
                        : 'border-slate-600 bg-slate-700/30 text-slate-400 hover:border-slate-500'
                    }`}
                  >
                    <div className="text-2xl mb-1">{cat.icon}</div>
                    <div className="text-xs font-medium">{cat.label}</div>
                  </button>
                ))}
              </div>
            </div>

            {error && (
              <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg flex items-start gap-3">
                <AlertCircle size={20} className="text-red-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-red-300 font-semibold">Processing Error</h4>
                  <p className="text-red-200/80 text-sm">{error}</p>
                </div>
              </div>
            )}

            <div className="grid lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="p-6 border border-slate-700 bg-slate-800/50 rounded-lg">
                  <h3 className="text-sm font-semibold text-slate-300 mb-4">Original Image</h3>
                  <div className="aspect-square rounded-lg overflow-hidden bg-slate-900 border border-slate-700">
                    <img
                      src={uploadedImage || "/placeholder.svg"}
                      alt="Original product"
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>

                <button
                  onClick={handleProcess}
                  disabled={processing}
                  className="w-full px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold rounded-lg disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  <Zap size={18} />
                  {processing ? 'Processing...' : 'Start Processing'}
                </button>
              </div>

              <div className="space-y-4">
                {processing ? (
                  <div className="flex items-center justify-center h-96">
                    <div className="text-center space-y-4">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-400 mx-auto"></div>
                      <p className="text-slate-400">Processing your image...</p>
                    </div>
                  </div>
                ) : results.listing ? (
                  <>
                    {results.enhanced && (
                      <div className="p-4 border border-slate-700 bg-slate-800/50 rounded-lg">
                        <h4 className="text-sm font-semibold text-slate-300 mb-3">Enhanced Image</h4>
                        <img src={results.enhanced || "/placeholder.svg"} alt="Enhanced" className="w-full rounded-lg" />
                      </div>
                    )}
                    {results.poster && (
                      <div className="p-4 border border-slate-700 bg-slate-800/50 rounded-lg">
                        <h4 className="text-sm font-semibold text-slate-300 mb-3">Social Poster</h4>
                        <img src={results.poster || "/placeholder.svg"} alt="Poster" className="w-full rounded-lg" />
                      </div>
                    )}
                    <div className="p-4 border border-slate-700 bg-slate-800/50 rounded-lg">
                      <h4 className="text-sm font-semibold text-slate-300 mb-3">Generated Listing</h4>
                      <div className="space-y-3 text-sm">
                        <div>
                          <p className="text-slate-400">Title</p>
                          <p className="text-white font-medium">{results.listing?.title}</p>
                        </div>
                        <div>
                          <p className="text-slate-400">Description</p>
                          <p className="text-white text-xs">{results.listing?.description}</p>
                        </div>
                        <div>
                          <p className="text-slate-400">Price Range</p>
                          <p className="text-orange-400 font-bold">₦{results.listing?.priceMin} - ₦{results.listing?.priceMax}</p>
                        </div>
                      </div>
                    </div>
                  </>
                ) : null}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
