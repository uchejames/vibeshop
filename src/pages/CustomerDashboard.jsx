import { ShoppingBag, Heart, Users, User, LogOut } from 'lucide-react'

const MOCK_ORDERS = [
  { id: '#VS123A', product: 'Ankara Male Jacket', date: 'Oct 12, 2025', store: 'Stitches by OBS', total: 'N12,500', status: 'Delivered' },
  { id: '#VS223B', product: 'Wooden Hand crafted Bowl', date: 'Nov 1, 2025', store: 'Crafted by Mandy', total: 'N14,000', status: 'Waybill' },
  { id: '#VS323C', product: 'Wool crated Female Slippers', date: 'Nov 8, 2025', store: 'Bella Collections', total: 'N8,000', status: 'Processing' },
]

export default function CustomerDashboard() {
  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="flex">
      {/* Sidebar */}
      <aside className="w-60 bg-white min-h-screen border-r border-gray-200 flex flex-col fixed left-0 top-16">
        <div className="p-6">
          {/* User Profile */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
              <User size={24} className="text-gray-500" />
            </div>
            <div>
              <div className="text-base font-semibold text-gray-900">Ngozi M.</div>
              <div className="text-sm text-gray-500">ngozieM@gmail.com</div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="space-y-1">
            <button className="w-full flex items-center gap-3 px-4 py-3 bg-purple-50 text-purple-700 rounded-lg text-sm font-medium transition-colors">
              <ShoppingBag size={20} />
              My Orders
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg text-sm transition-colors">
              <Heart size={20} />
              Saved Items
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg text-sm transition-colors">
              <Users size={20} />
              Following
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg text-sm transition-colors">
              <User size={20} />
              Profile
            </button>
          </nav>
        </div>

        {/* Log Out Button */}
        <div className="mt-auto p-6">
          <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg text-sm transition-colors">
            <LogOut size={20} />
            Log Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 ml-60">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Orders</h1>
          <p className="text-gray-500">Views and tracks your purchase history.</p>
        </div>

        {/* Orders Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {/* Filter Tabs */}
          <div className="flex gap-2 p-6 border-b border-gray-200">
            <button className="px-5 py-2.5 bg-purple-600 text-white rounded-lg text-sm font-medium shadow-sm">
              All
            </button>
            <button className="px-5 py-2.5 bg-gray-50 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors">
              Processing
            </button>
            <button className="px-5 py-2.5 bg-gray-50 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors">
              Shipped
            </button>
            <button className="px-5 py-2.5 bg-gray-50 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors">
              Delivered
            </button>
          </div>

          {/* Orders Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Order ID</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Product</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Store</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Total</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {MOCK_ORDERS.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-5 text-sm font-semibold text-gray-900">{order.id}</td>
                    <td className="px-6 py-5 text-sm text-gray-700">{order.product}</td>
                    <td className="px-6 py-5 text-sm text-gray-500">{order.date}</td>
                    <td className="px-6 py-5 text-sm text-gray-700">{order.store}</td>
                    <td className="px-6 py-5 text-sm font-semibold text-gray-900">{order.total}</td>
                    <td className="px-6 py-5">
                      <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold ${
                        order.status === 'Delivered'
                          ? 'bg-green-100 text-green-700'
                          : order.status === 'Waybill'
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-center gap-1 p-6 border-t border-gray-200">
            <button className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
              ←
            </button>
            <button className="px-4 py-2 text-sm bg-purple-600 text-white rounded-lg font-medium shadow-sm">
              1
            </button>
            <button className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
              2
            </button>
            <button className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
              3
            </button>
            <span className="px-3 text-sm text-gray-400">······</span>
            <button className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
              8
            </button>
            <button className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
              9
            </button>
            <button className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
              10
            </button>
            <button className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
              →
            </button>
          </div>
        </div>
      </main>
      </div>
    </div>
  )
}