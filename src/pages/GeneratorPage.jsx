import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { Upload, AlertCircle, RefreshCw, Zap, CheckCircle, Loader2 } from 'lucide-react'
import UploadSection from '../components/UploadSection'

const CATEGORIES = [
  { id: 'fashion', label: 'Fashion & Apparel', icon: 'shirt' },
  { id: 'art', label: 'Art & Crafts', icon: 'art' },
  { id: 'clothing', label: 'Clothing', icon: 'dress' },
  { id: 'accessories', label: 'Accessories', icon: 'bag' },
  { id: 'electronics', label: 'Electronics', icon: 'phone' },
  { id: 'home', label: 'Home & Garden', icon: 'home' },
  { id: 'beauty', label: 'Beauty & Personal Care', icon: 'makeup' },
  { id: 'sports', label: 'Sports & Outdoors', icon: 'ball' },
]

const IMAGE_TRANSFORM_URL = 'https://hzqpiwlunhtfpqipjzka.supabase.co/functions/v1/image-transform'
const SAVE_PRODUCT_URL = 'https://hzqpiwlunhtfpqipjzka.supabase.co/functions/v1/save-product'

export default function GeneratorPage() {
  const { user, loading } = useAuth()
  const navigate = useNavigate()
  const [uploadedImage, setUploadedImage] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState('fashion')
  const [processing, setProcessing] = useState(false)
  const [error, setError] = useState(null)
  const [currentStep, setCurrentStep] = useState('')
  const [results, setResults] = useState({
    removedBg: null,
    enhanced: null,
    listing: null,
    poster: null,
  })

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login')
    }
  }, [loading, user, navigate])

  if (loading || !user) return null

  const handleImageUpload = (imageUrl) => {
    setUploadedImage(imageUrl)
    setResults({ removedBg: null, enhanced: null, listing: null, poster: null })
    setError(null)
    setCurrentStep('')
  }

  const handleProcess = async () => {
    if (!uploadedImage) return

    setProcessing(true)
    setError(null)
    setCurrentStep('Removing background...')

    try {
      const response = await fetch(IMAGE_TRANSFORM_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageUrl: uploadedImage,
          category: selectedCategory,
          userId: user.id,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.error || `Server error ${response.status}`)
      }

      const data = await response.json()
      setResults(data)
      setCurrentStep('Complete!')
    } catch (err) {
      setError(err.message || 'Processing failed. Please try again.')
      setCurrentStep('')
    } finally {
      setProcessing(false)
    }
  }

  const handleReset = () => {
    setUploadedImage(null)
    setResults({ removedBg: null, enhanced: null, listing: null, poster: null })
    setError(null)
    setCurrentStep('')
  }

  // FIXED: removed the stray word "rotating"
  const handleSaveListing = async () => {
    if (!results.listing || !uploadedImage) return

    try {
      const response = await fetch(SAVE_PRODUCT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: results.listing.title,
          description: results.listing.description,
          priceMin: results.listing.priceMin,
          priceMax: results.listing.priceMax,
          enhanced_image_url: results.enhanced,
          original_image_url: uploadedImage,
          creative_id: user.id,
          category: selectedCategory,
          poster: results.poster || null,
        }),
      })

      if (!response.ok) {
        const err = await response.json().catch(() => ({}))
        throw new Error(err.error || 'Failed to save product')
      }

      alert('Product saved successfully!')
      navigate('/dashboard/creative')
    } catch (err) {
      console.error('Save error:', err)
      alert('Save failed: ' + (err.message || 'Unknown error'))
    }
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
                <CheckCircle size={24} className="text-green-400 mb-3" />
                <h3 className="text-lg font-semibold text-white mb-2">Publish</h3>
                <p className="text-slate-400 text-sm">Save and list your product</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold text-white">Product Processing</h2>
              <button
                onClick={handleReset}
                className="px-4 py-2 border border-slate-600 text-slate-300 hover:bg-slate-800 rounded-lg flex items-center gap-2 transition-colors"
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
                    disabled={processing}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      selectedCategory === cat.id
                        ? 'border-orange-400 bg-orange-500/10 text-orange-300'
                        : 'border-slate-600 bg-slate-700/30 text-slate-400 hover:border-slate-500'
                    } ${processing ? 'opacity-50 cursor-not-allowed' : ''}`}
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

            {processing && currentStep && (
              <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg flex items-center gap-3">
                <Loader2 size={20} className="text-blue-400 animate-spin" />
                <p className="text-blue-300 font-medium">{currentStep}</p>
              </div>
            )}

            <div className="grid lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="p-6 border border-slate-700 bg-slate-800/50 rounded-lg">
                  <h3 className="text-sm font-semibold text-slate-300 mb-4">Original Image</h3>
                  <div className="aspect-square rounded-lg overflow-hidden bg-slate-900 border border-slate-700">
                    <img
                      src={uploadedImage}
                      alt="Original product"
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>

                <button
                  onClick={handleProcess}
                  disabled={processing}
                  className="w-full px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold rounded-lg disabled:opacity-50 flex items-center justify-center gap-2 transition-colors"
                >
                  {processing ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Zap size={18} />
                      Start Processing
                    </>
                  )}
                </button>
              </div>

              <div className="space-y-4">
                {processing && !results.listing && (
                  <div className="flex items-center justify-center h-96">
                    <div className="text-center space-y-4">
                      <Loader2 size={48} className="animate-spin text-orange-400 mx-auto" />
                      <p className="text-slate-400">AI is working on your product...</p>
                    </div>
                  </div>
                )}

                {results.enhanced && (
                  <div className="p-4 border border-slate-700 bg-slate-800/50 rounded-lg">
                    <h4 className="text-sm font-semibold text-slate-300 mb-3">Enhanced Image</h4>
                    <img src={results.enhanced} alt="Enhanced" className="w-full rounded-lg shadow-xl" />
                  </div>
                )}

                {results.poster && (
                  <div className="p-4 border border-slate-700 bg-slate-800/50 rounded-lg">
                    <h4 className="text-sm font-semibold text-slate-300 mb-3">Social Poster (Ready to Share)</h4>
                    <img src={results.poster} alt="Poster" className="w-full rounded-lg shadow-xl" />
                  </div>
                )}

                {results.listing && (
                  <div className="p-6 border border-green-500/30 bg-slate-800/50 rounded-lg">
                    <h4 className="text-lg font-semibold text-white mb-4">Generated Listing</h4>
                    <div className="space-y-4 text-sm">
                      <div>
                        <p className="text-slate-400">Title</p>
                        <p className="text-white font-bold text-lg">{results.listing.title}</p>
                      </div>
                      <div>
                        <p className="text-slate-400">Description</p>
                        <p className="text-white leading-relaxed">{results.listing.description}</p>
                      </div>
                      <div>
                        <p className="text-slate-400">Suggested Price</p>
                        <p className="text-orange-400 font-bold text-2xl">
                          ₦{results.listing.priceMin?.toLocaleString()} - ₦{results.listing.priceMax?.toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={handleSaveListing}
                      className="w-full mt-6 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold rounded-lg transition-all transform hover:scale-105 shadow-lg"
                    >
                      Save to My Products
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}