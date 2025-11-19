import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { ShoppingBag, Heart, Package, Settings } from 'lucide-react'

export default function CustomerDashboard() {
  const { user, loading } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!loading && (!user || user.userType !== 'customer')) {
      navigate('/login')
    }
  }, [loading, user, navigate])

  if (loading || !user) return null

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 pt-20 pb-12">
      <main className="max-w-7xl mx-auto px-6">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-white mb-2">My Dashboard</h1>
          <p className="text-slate-400">Welcome back, {user.fullName}</p>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="border border-slate-700 bg-slate-800/50 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm mb-1">Total Orders</p>
                <p className="text-3xl font-bold text-white">0</p>
              </div>
              <ShoppingBag size={32} className="text-orange-400" />
            </div>
          </div>

          <div className="border border-slate-700 bg-slate-800/50 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm mb-1">Wishlist Items</p>
                <p className="text-3xl font-bold text-white">0</p>
              </div>
              <Heart size={32} className="text-red-400" />
            </div>
          </div>

          <div className="border border-slate-700 bg-slate-800/50 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm mb-1">Active Orders</p>
                <p className="text-3xl font-bold text-white">0</p>
              </div>
              <Package size={32} className="text-cyan-400" />
            </div>
          </div>
        </div>

        {/* Menu */}
        <div className="grid md:grid-cols-2 gap-6">
          <button className="border border-slate-700 bg-slate-800/50 hover:border-orange-400 rounded-lg p-6 text-left transition-colors">
            <ShoppingBag size={32} className="text-orange-400 mb-4" />
            <h3 className="text-lg font-semibold text-white">My Orders</h3>
            <p className="text-slate-400 text-sm">View and track your purchases</p>
          </button>

          <button className="border border-slate-700 bg-slate-800/50 hover:border-orange-400 rounded-lg p-6 text-left transition-colors">
            <Heart size={32} className="text-red-400 mb-4" />
            <h3 className="text-lg font-semibold text-white">Wishlist</h3>
            <p className="text-slate-400 text-sm">Your saved favorite items</p>
          </button>

          <button className="border border-slate-700 bg-slate-800/50 hover:border-orange-400 rounded-lg p-6 text-left transition-colors">
            <Package size={32} className="text-cyan-400 mb-4" />
            <h3 className="text-lg font-semibold text-white">Deliveries</h3>
            <p className="text-slate-400 text-sm">Track your shipments</p>
          </button>

          <button className="border border-slate-700 bg-slate-800/50 hover:border-orange-400 rounded-lg p-6 text-left transition-colors">
            <Settings size={32} className="text-slate-400 mb-4" />
            <h3 className="text-lg font-semibold text-white">Settings</h3>
            <p className="text-slate-400 text-sm">Manage your account</p>
          </button>
        </div>
      </main>
    </div>
  )
}
