'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Upload, Sparkles, Download, RefreshCw, Zap, AlertCircle, Share2, LinkIcon, ShoppingBag, ArrowRight, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import UploadSection from '@/components/upload-section';
import ProcessingPipeline from '@/components/processing-pipeline';
import ResultsDisplay from '@/components/results-display';

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

export default function Home() {
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

  const handleImageUpload = (imageUrl: string) => {
    console.log('[v0] Image uploaded, URL length:', imageUrl.length);
    setUploadedImage(imageUrl);
    setResults({ removedBg: null, enhanced: null, listing: null, poster: null, shareLink: null });
    setError(null);
  };

  const handleProcess = async () => {
    if (!uploadedImage) return;
    
    console.log('[v0] Starting processing for category:', selectedCategory);
    setProcessing(true);
    setError(null);
    try {
      const response = await fetch('/api/process-product', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageUrl: uploadedImage, category: selectedCategory }),
      });

      console.log('[v0] API response status:', response.status);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Processing failed');
      }
      
      const data = await response.json();
      console.log('[v0] Processing complete, results:', data);
      
      // Generate shareable link
      const listingId = Date.now().toString();
      const shareLink = `${window.location.origin}/listing/${listingId}`;
      
      setResults({ ...data, shareLink });
      
      // Add to history
      setHistory(prev => [{
        id: listingId,
        original: uploadedImage,
        category: selectedCategory,
        results: { ...data, shareLink },
        timestamp: Date.now(),
      }, ...prev.slice(0, 9)]);
    } catch (err) {
      console.error('[v0] Error processing image:', err);
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-slate-800 bg-slate-900/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-amber-500 rounded-lg flex items-center justify-center font-bold text-white">
              V
            </div>
            <h1 className="text-xl font-bold text-white">Vibeshop</h1>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/shop">
              <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-800">
                Browse Shop
              </Button>
            </Link>
            <Link href="/login">
              <Button className="bg-orange-500 hover:bg-orange-600">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          {!uploadedImage ? (
            <div className="space-y-8">
              {/* Hero Section */}
              <div className="grid lg:grid-cols-2 gap-12 items-center py-20">
                <div className="space-y-6">
                  <div className="inline-block px-4 py-2 bg-orange-500/10 border border-orange-500/30 rounded-full">
                    <p className="text-sm text-orange-300">AI-Powered E-Commerce Mall</p>
                  </div>
                  <h2 className="text-6xl font-bold text-white leading-tight">
                    Sell Professional
                    <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-500">
                      Product Listings
                    </span>
                  </h2>
                  <p className="text-xl text-slate-400 leading-relaxed">
                    Transform your product photos into professional listings instantly. For customers, discover unique products from talented creatives across Africa. Join Vibeshop today.
                  </p>
                  <div className="flex gap-4 pt-4">
                    <Link href="/shop">
                      <Button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-6 text-lg h-auto">
                        Browse Products
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </Button>
                    </Link>
                    <Link href="/signup">
                      <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-800 px-8 py-6 text-lg h-auto">
                        Start Selling
                      </Button>
                    </Link>
                  </div>
                </div>

                {/* Hero Image */}
                <div className="relative">
                  <div className="aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-orange-500/20 to-amber-500/20 border border-orange-500/30 flex items-center justify-center">
                    <div className="text-center space-y-4">
                      <ShoppingBag className="w-24 h-24 text-orange-400 mx-auto" />
                      <p className="text-slate-400 text-lg">AI-Powered Product Listings</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Features Section */}
              <div className="grid md:grid-cols-3 gap-6 py-20">
                <Card className="p-8 border-slate-700 bg-slate-800/50 hover:border-orange-400 transition-colors">
                  <div className="w-12 h-12 bg-orange-500/10 rounded-lg flex items-center justify-center mb-4">
                    <Upload className="w-6 h-6 text-orange-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Upload Once</h3>
                  <p className="text-slate-400">Upload a single product photo and let AI do the work for you</p>
                </Card>

                <Card className="p-8 border-slate-700 bg-slate-800/50 hover:border-orange-400 transition-colors">
                  <div className="w-12 h-12 bg-cyan-500/10 rounded-lg flex items-center justify-center mb-4">
                    <Sparkles className="w-6 h-6 text-cyan-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">AI Powered</h3>
                  <p className="text-slate-400">Background removal, enhancement, and listing generation in seconds</p>
                </Card>

                <Card className="p-8 border-slate-700 bg-slate-800/50 hover:border-orange-400 transition-colors">
                  <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center mb-4">
                    <TrendingUp className="w-6 h-6 text-green-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Grow Your Business</h3>
                  <p className="text-slate-400">Sell to customers across Africa with easy-to-use tools and payments</p>
                </Card>
              </div>

              {/* How It Works */}
              <div className="py-20 space-y-12">
                <div className="text-center mb-12">
                  <h3 className="text-4xl font-bold text-white mb-4">How Vibeshop Works</h3>
                  <p className="text-xl text-slate-400">Three simple steps to success</p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                  {[
                    {
                      step: 1,
                      title: 'For Customers',
                      desc: 'Browse curated products from talented creatives, add to cart, and checkout securely',
                    },
                    {
                      step: 2,
                      title: 'For Creatives',
                      desc: 'Upload products, let AI generate listings, and start earning from your creations',
                    },
                    {
                      step: 3,
                      title: 'For Everyone',
                      desc: 'Safe, secure transactions with support for multiple payment methods',
                    },
                  ].map(({ step, title, desc }) => (
                    <Card key={step} className="p-8 border-slate-700 bg-slate-800/50">
                      <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center font-bold text-white mb-4">
                        {step}
                      </div>
                      <h4 className="text-lg font-bold text-white mb-2">{title}</h4>
                      <p className="text-slate-400">{desc}</p>
                    </Card>
                  ))}
                </div>
              </div>

              {/* CTA Section */}
              <div className="rounded-2xl bg-gradient-to-r from-orange-500/20 to-amber-500/20 border border-orange-500/30 p-12 text-center mb-12">
                <h3 className="text-3xl font-bold text-white mb-4">Ready to Start?</h3>
                <p className="text-lg text-slate-400 mb-6">Join thousands of creatives and customers on Vibeshop</p>
                <div className="flex gap-4 justify-center">
                  <Link href="/signup">
                    <Button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-6 text-lg h-auto">
                      Create Creative Account
                    </Button>
                  </Link>
                  <Link href="/shop">
                    <Button variant="outline" className="border-orange-400 text-orange-300 hover:bg-orange-500/10 px-8 py-6 text-lg h-auto">
                      Browse as Customer
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-8">
              {/* Processing View */}
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

              {/* Error Display */}
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
                {/* Left: Original Image & Pipeline */}
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

                {/* Right: Results */}
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
