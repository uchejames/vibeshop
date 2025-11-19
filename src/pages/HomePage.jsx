import { Link } from 'react-router-dom'
import { ShoppingBag, Upload, Sparkles, TrendingUp, ArrowRight } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 pt-20">
      <main className="max-w-7xl mx-auto px-6">
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
                <Link to="/shop">
                  <button className="px-8 py-6 bg-orange-500 hover:bg-orange-600 text-white text-lg font-semibold rounded-lg flex items-center gap-2">
                    Browse Products
                    <ArrowRight size={20} />
                  </button>
                </Link>
                <Link to="/signup">
                  <button className="px-8 py-6 border border-slate-600 text-slate-300 hover:bg-slate-800 text-lg font-semibold rounded-lg">
                    Start Selling
                  </button>
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-orange-500/20 to-amber-500/20 border border-orange-500/30 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <ShoppingBag size={96} className="text-orange-400 mx-auto" />
                  <p className="text-slate-400 text-lg">AI-Powered Product Listings</p>
                </div>
              </div>
            </div>
          </div>

          {/* Features Section */}
          <div className="grid md:grid-cols-3 gap-6 py-20">
            <div className="p-8 border border-slate-700 bg-slate-800/50 hover:border-orange-400 transition-colors rounded-lg">
              <div className="w-12 h-12 bg-orange-500/10 rounded-lg flex items-center justify-center mb-4">
                <Upload size={24} className="text-orange-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Upload Once</h3>
              <p className="text-slate-400">Upload a single product photo and let AI do the work for you</p>
            </div>

            <div className="p-8 border border-slate-700 bg-slate-800/50 hover:border-orange-400 transition-colors rounded-lg">
              <div className="w-12 h-12 bg-cyan-500/10 rounded-lg flex items-center justify-center mb-4">
                <Sparkles size={24} className="text-cyan-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">AI Powered</h3>
              <p className="text-slate-400">Background removal, enhancement, and listing generation in seconds</p>
            </div>

            <div className="p-8 border border-slate-700 bg-slate-800/50 hover:border-orange-400 transition-colors rounded-lg">
              <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp size={24} className="text-green-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Grow Your Business</h3>
              <p className="text-slate-400">Sell to customers across Africa with easy-to-use tools and payments</p>
            </div>
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
                <div key={step} className="p-8 border border-slate-700 bg-slate-800/50 rounded-lg">
                  <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center font-bold text-white mb-4">
                    {step}
                  </div>
                  <h4 className="text-lg font-bold text-white mb-2">{title}</h4>
                  <p className="text-slate-400">{desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="rounded-2xl bg-gradient-to-r from-orange-500/20 to-amber-500/20 border border-orange-500/30 p-12 text-center mb-12">
            <h3 className="text-3xl font-bold text-white mb-4">Ready to Start?</h3>
            <p className="text-lg text-slate-400 mb-6">Join thousands of creatives and customers on Vibeshop</p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link to="/signup">
                <button className="px-8 py-6 bg-orange-500 hover:bg-orange-600 text-white text-lg font-semibold rounded-lg">
                  Create Creative Account
                </button>
              </Link>
              <Link to="/shop">
                <button className="px-8 py-6 border border-orange-400 text-orange-300 hover:bg-orange-500/10 text-lg font-semibold rounded-lg">
                  Browse as Customer
                </button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
