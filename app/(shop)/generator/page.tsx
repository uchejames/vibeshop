'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Upload, Sparkles, Download, RefreshCw, Zap, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import UploadSection from '@/components/upload-section';
import ProcessingPipeline from '@/components/processing-pipeline';
import ResultsDisplay from '@/components/results-display';
import { mockAuth, MockUser } from '@/lib/mock-auth';

const CATEGORIES = [
  { id: 'fashion', label: 'Fashion & Apparel', icon: '👕' },
  { id: 'art', label: 'Art & Crafts', icon: '🎨' },
  { id: 'clothing', label: 'Clothing', icon: '👗' },
  { id: 'accessories', label: 'Accessories', icon: '💍' },
  { id: 'electronics', label: 'Electronics', icon: '📱' },
  { id: 'home', label: 'Home & Garden', icon: '🏠' },
  { id: 'beauty', label: 'Beauty & Personal Care', icon: '💄' },
  { id: 'sports', label: 'Sports & Outdoors', icon: '⚽' },
];

export default function GeneratorPage() {
  const router = useRouter();
  const [user, setUser] = useState<MockUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('fashion');
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<{
    removedBg: string | null;
    enhanced: string | null;
    listing: any | null;
    poster: string | null;
    shareLink: string | null;
  }>({ removedBg: null, enhanced: null, listing: null, poster: null, shareLink: null });
  const [history, setHistory] = useState<Array<{
    id: string;
    original: string;
    category: string;
    results: any;
    timestamp: number;
  }>>([]);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const { user: authUser } = await mockAuth.getUser();
      if (!authUser) {
        router.push('/login');
        return;
      }

      if (authUser.userType !== 'creative') {
        router.push('/shop');
        return;
      }

      setUser(authUser);
    } catch (err) {
      console.error('Auth error:', err);
      router.push('/login');
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = (imageUrl: string) => {
    setUploadedImage(imageUrl);
    setResults({ removedBg: null, enhanced: null, listing: null, poster: null, shareLink: null });
    setError(null);
  };

  const handleProcess = async () => {
    if (!uploadedImage) return;
    
    setProcessing(true);
    setError(null);
    try {
      const response = await fetch('/api/process-product', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageUrl: uploadedImage, category: selectedCategory }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Processing failed');
      }
      
      const data = await response.json();
      const listingId = Date.now().toString();
      const shareLink = `${window.location.origin}/listing/${listingId}`;
      
      setResults({ ...data, shareLink });
      setHistory(prev => [{
        id: listingId,
        original: uploadedImage,
        category: selectedCategory,
        results: { ...data, shareLink },
        timestamp: Date.now(),
      }, ...prev.slice(0, 9)]);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Processing failed. Please try again.';
      setError(message);
    } finally {
      setProcessing(false);
    }
  };

  const handleReset = () => {
    setUploadedImage(null);
    setResults({ removedBg: null, enhanced: null, listing: null, poster: null, shareLink: null });
    setError(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-400"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-slate-800 bg-slate-900/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-amber-500 rounded-lg flex items-center justify-center font-bold text-white">
              V
            </div>
            <h1 className="text-xl font-bold text-white">Vibeshop</h1>
          </div>
          <div className="text-sm text-slate-400">Product Listing Generator</div>
        </div>
      </nav>

      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          {!uploadedImage ? (
            <div className="space-y-8">
              <div className="text-center mb-12">
                <h2 className="text-5xl font-bold text-white mb-4">
                  Professional Product Listings
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-500 mt-2">
                    Powered by AI
                  </span>
                </h2>
                <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                  Transform one product photo into a complete listing with background removal, enhancement, pricing, and a shareable link for direct sales.
                </p>
              </div>

              <UploadSection onImageUpload={handleImageUpload} />

              <div className="grid md:grid-cols-3 gap-4 mt-12">
                <Card className="p-6 border-slate-700 bg-slate-800/50">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-cyan-500/10 rounded-lg flex items-center justify-center">
                      <Zap className="w-6 h-6 text-cyan-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white mb-2">Background Removal</h3>
                      <p className="text-sm text-slate-400">AI-powered background removal creates professional, clean product images</p>
                    </div>
                  </div>
                </Card>
                <Card className="p-6 border-slate-700 bg-slate-800/50">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center">
                      <Sparkles className="w-6 h-6 text-blue-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white mb-2">Image Enhancement</h3>
                      <p className="text-sm text-slate-400">Automatic enhancement improves clarity, color, and professional appearance</p>
                    </div>
                  </div>
                </Card>
                <Card className="p-6 border-slate-700 bg-slate-800/50">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center">
                      <Download className="w-6 h-6 text-purple-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white mb-2">Listing Generation</h3>
                      <p className="text-sm text-slate-400">AI generates compelling titles, descriptions, and tags for your products</p>
                    </div>
                  </div>
                </Card>
              </div>

              {history.length > 0 && (
                <div className="mt-16">
                  <h3 className="text-lg font-semibold text-white mb-4">Recent Listings</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {history.map((item) => (
                      <div
                        key={item.id}
                        onClick={() => {
                          setUploadedImage(item.original);
                          setResults(item.results);
                        }}
                        className="cursor-pointer group"
                      >
                        <div className="aspect-square rounded-lg overflow-hidden border border-slate-700 group-hover:border-cyan-400 transition-colors bg-slate-800">
                          <img
                            src={item.original || "/placeholder.svg"}
                            alt="Recent listing"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold text-white">Product Processing</h2>
                <Button
                  variant="outline"
                  onClick={handleReset}
                  className="border-slate-600 text-slate-300 hover:bg-slate-800"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Start Over
                </Button>
              </div>

              <Card className="p-6 border-slate-700 bg-slate-800/50">
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
              </Card>

              {error && (
                <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-red-300 font-semibold">Processing Error</h4>
                    <p className="text-red-200/80 text-sm">{error}</p>
                  </div>
                </div>
              )}

              <div className="grid lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <Card className="p-6 border-slate-700 bg-slate-800/50">
                    <h3 className="text-sm font-semibold text-slate-300 mb-4">Original Image</h3>
                    <div className="aspect-square rounded-lg overflow-hidden bg-slate-900 border border-slate-700">
                      <img
                        src={uploadedImage || "/placeholder.svg"}
                        alt="Original product"
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </Card>

                  <ProcessingPipeline
                    isProcessing={processing}
                    onProcess={handleProcess}
                  />
                </div>

                <ResultsDisplay
                  results={results}
                  isProcessing={processing}
                />
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
