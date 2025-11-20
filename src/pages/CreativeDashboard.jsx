import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { BarChart3, Package, Eye, CheckCircle, TrendingUp } from 'lucide-react'

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

const CHART_DATA = [
  { year: '2023', value: 35 },
  { year: '2024', value: 60 },
  { year: '2025', value: 85 }
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
    <div className="min-h-screen bg-slate-950 pt-16">
      <div className="flex">
        <aside className="w-56 bg-slate-900 min-h-screen px-4 py-8 fixed left-0 top-16 border-r border-slate-800">
          <div className="flex items-center gap-3 mb-8 px-3">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
              <Package className="text-white" size={18} />
            </div>
            <div className="text-white font-semibold text-sm">Creative</div>
          </div>

          <nav className="space-y-1">
            <button className="w-full flex items-center gap-3 px-3 py-2.5 bg-white text-slate-900 rounded text-sm font-medium">
              <BarChart3 size={16} />
              Dashboard
            </button>
            <button className="w-full flex items-center gap-3 px-3 py-2.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded text-sm">
              <Package size={16} />
              Products
            </button>
            <button className="w-full flex items-center gap-3 px-3 py-2.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded text-sm">
              <BarChart3 size={16} />
              Statistics
            </button>
            <button 
              onClick={() => navigate('/generator')}
              className="w-full flex items-center gap-3 px-3 py-2.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded text-sm"
            >
              <TrendingUp size={16} />
              AI Generator
            </button>
          </nav>
        </aside>

        <main className="flex-1 ml-56 p-8">
          <div className="grid grid-cols-3 gap-5 mb-8">
            <div className="bg-slate-900 border border-slate-800 text-white rounded-xl p-6">
              <div className="text-xs text-slate-400 mb-1">Total Products</div>
              <div className="text-3xl font-bold mb-1">{MOCK_STATS.totalProducts}</div>
              <div className="text-xs text-green-400">↑ 9.2%</div>
            </div>

            <div className="bg-slate-900 border border-slate-800 text-white rounded-xl p-6">
              <div className="text-xs text-slate-400 mb-1">Approved</div>
              <div className="text-3xl font-bold mb-1">{MOCK_STATS.approvedProducts}</div>
              <div className="text-xs text-green-400">↑ 8%</div>
            </div>

            <div className="bg-slate-900 border border-slate-800 text-white rounded-xl p-6">
              <div className="text-xs text-slate-400 mb-1">Total Views</div>
              <div className="text-3xl font-bold mb-1">{MOCK_STATS.totalViews.toLocaleString()}</div>
              <div className="text-xs text-green-400">↑ 2.8%</div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6 mb-8">
            <div className="col-span-2 bg-slate-900 border border-slate-800 rounded-xl p-6">
              <h3 className="text-base font-bold text-white mb-6">Sales Trend</h3>
              <div className="flex items-end justify-around h-56 gap-8 px-8">
                {CHART_DATA.map((item) => (
                  <div key={item.year} className="flex flex-col items-center flex-1">
                    <div 
                      className="w-full bg-gradient-to-t from-orange-700 via-orange-600 to-orange-500 rounded-t-lg transition-all duration-500 hover:from-orange-600" 
                      style={{ height: `${item.value}%` }}
                    ></div>
                    <div className="text-sm font-semibold text-slate-300 mt-4">{item.year}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 text-white rounded-xl p-6 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4">
                <TrendingUp className="text-slate-900" size={28} />
              </div>
              <h3 className="text-base font-bold mb-2">AI generator</h3>
              <p className="text-xs text-slate-400 mb-6 px-2">Create your Images, Plan content Across your products</p>
              <button 
                onClick={() => navigate('/generator')}
                className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-2.5 rounded-lg text-sm font-semibold transition-colors"
              >
                Generate
              </button>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-800">
              <h3 className="text-base font-bold text-white">Recent Orders</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-950">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-400">Order ID</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-400">Customer</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-400">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-400">Total</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-400">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-slate-900">
                  {MOCK_PRODUCTS.map((product, index) => (
                    <tr key={product.id} className="border-b border-slate-800 hover:bg-slate-800/50 transition-colors">
                      <td className="px-6 py-4 text-sm text-white">#{index + 1}</td>
                      <td className="px-6 py-4 text-sm text-white">{product.title}</td>
                      <td className="px-6 py-4 text-sm text-slate-400">Nov 9, 2025</td>
                      <td className="px-6 py-4 text-sm text-white">N{product.views},000</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded text-xs font-semibold ${
                          product.status === 'approved'
                            ? 'bg-green-500/20 text-green-400'
                            : 'bg-yellow-500/20 text-yellow-400'
                        }`}>
                          {product.status === 'approved' ? 'Delivered' : 'Processing'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}