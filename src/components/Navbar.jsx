import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'
import { ShoppingCart, LogOut, User, LayoutDashboard } from 'lucide-react'

export default function Navbar() {
  const { user, logout } = useAuth()
  const { items } = useCart()
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await logout()
      navigate('/login')
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  const getDashboardLink = () => {
    if (!user) return '/login'
    return user.userType === 'creative' ? '/dashboard/creative' : '/dashboard/customer'
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/90 backdrop-blur-sm border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-amber-500 rounded-lg flex items-center justify-center font-bold text-white">
              V
            </div>
            <span className="text-xl font-bold text-white">Vibeshop</span>
          </Link>

          <div className="flex items-center gap-6">
            <Link to="/shop" className="text-slate-300 hover:text-white transition-colors">
              Shop
            </Link>
            
            {user && user.userType === 'creative' && (
              <Link to="/generator" className="text-slate-300 hover:text-white transition-colors">
                Generator
              </Link>
            )}

            {user ? (
              <>
                <Link 
                  to={getDashboardLink()} 
                  className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors"
                >
                  <LayoutDashboard size={18} />
                  <span>Dashboard</span>
                </Link>

                <Link to="/cart" className="relative text-slate-300 hover:text-white transition-colors">
                  <ShoppingCart size={20} />
                  {items.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {items.length}
                    </span>
                  )}
                </Link>

                <div className="flex items-center gap-3 pl-3 border-l border-slate-700">
                  <div className="text-right">
                    <p className="text-sm text-white font-medium">{user.fullName}</p>
                    <p className="text-xs text-slate-400 capitalize">{user.userType}</p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                    title="Logout"
                  >
                    <LogOut size={18} />
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link to="/cart" className="relative text-slate-300 hover:text-white transition-colors">
                  <ShoppingCart size={20} />
                  {items.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {items.length}
                    </span>
                  )}
                </Link>
                <Link to="/login">
                  <button className="px-4 py-2 text-slate-300 hover:text-white transition-colors">
                    Login
                  </button>
                </Link>
                <Link to="/signup">
                  <button className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors">
                    Sign Up
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}