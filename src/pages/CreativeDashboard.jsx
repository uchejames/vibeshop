import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { BarChart3, Package, Eye, CheckCircle, Clock } from 'lucide-react'

const MOCK_STATS = {
  totalProducts: 24,
  approvedProducts: 18,
  pendingProducts: 4,
  rejectedProducts: 2,
  totalViews: 2445,
  totalSales: 156,
}

const MOCK_PRODUCTS = [
  { id: '1', title: 'Handmade Leather Bag', status: 'approved', views: 245 },
  { id: '2', title: 'Beaded Art Piece', status: 'pending', views: 0 },
  { id: '3', title: 'Cotton Summer Dress', status: 'approved', views: 523 },
]

export default function CreativeDashboard() {
  const { user, loading } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!loading && (!user || user.userType !== 'creative')) {
      navigate('/login')
    }
  }, [loading, user, navigate])

  if (loading || !user) return null

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 pt-20 pb-12">
      <main className="max-w-7xl mx-auto px-6">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-white mb-2">Creative Dashboard</h1>
          <p className="text-slate-400">Welcome back, {user.fullName}</p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="border border-slate-700 bg-slate-800/50 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm mb-1">Total Products</p>
                <p className="text-3xl font-bold text-white">{MOCK_STATS.totalProducts}</p>
              </div>
              <Package size={32} className="text-orange-400" />
            </div>
          </div>

          <div className="border border-slate-700 bg-slate-800/50 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm mb-1">Approved</p>
                <p className="text-3xl font-bold text-white">{MOCK_STATS.approvedProducts}</p>
              </div>
              <CheckCircle size={32} className="text-green-400" />
            </div>
          </div>

          <div className="border border-slate-700 bg-slate-800/50 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm mb-1">Total Views</p>
                <p className="text-3xl font-bold text-white">{MOCK_STATS.totalViews}</p>
              </div>
              <Eye size={32} className="text-cyan-400" />
            </div>
          </div>
        </div>

        {/* Products Table */}
        <div className="border border-slate-700 bg-slate-800/50 rounded-lg overflow-hidden">
          <div className="p-6 border-b border-slate-700">
            <h3 className="text-lg font-bold text-white">Your Products</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-700 bg-slate-900/50">
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-400">Product</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-400">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-400">Views</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-400">Action</th>
                </tr>
              </thead>
              <tbody>
                {MOCK_PRODUCTS.map((product) => (
                  <tr key={product.id} className="border-b border-slate-700 hover:bg-slate-800/30">
                    <td className="px-6 py-4 text-white">{product.title}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        product.status === 'approved'
                          ? 'bg-green-500/10 text-green-400'
                          : 'bg-yellow-500/10 text-yellow-400'
                      }`}>
                        {product.status === 'approved' ? 'Approved' : 'Pending'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-400">{product.views}</td>
                    <td className="px-6 py-4">
                      <button className="text-orange-400 hover:text-orange-300 text-sm">Edit</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  )
}
