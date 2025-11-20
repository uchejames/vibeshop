// src/components/Navbar.jsx
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'
import { 
  ShoppingCart, 
  LogOut, 
  User, 
  LayoutDashboard,
  Menu,
  X 
} from 'lucide-react'
import { useState } from 'react'

export default function Navbar() {
  const { user, logout } = useAuth()
  const { items } = useCart()
  const navigate = useNavigate()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleLogout = async () => {
    try {
      await logout()
      navigate('/login')
      setMobileMenuOpen(false)
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="relative flex justify-center md:justify-center lg:justify-end">
                <img
                  src="/assets/logo.png"
                  alt="Hero"
                  loading="lazy"
                  className="w-10 object-cover rounded-lg"
                />
              </div>
            <span className="text-xl font-bold text-white hidden sm:block">Vibeshop</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/product" className="text-slate-300 hover:text-white transition-colors">
              Products
            </Link>
            <Link to="/shop" className="text-slate-300 hover:text-white transition-colors">
              Shop
            </Link>
            {user && user.userType === 'creative' && (
              <Link to="/generator" className="text-slate-300 hover:text-white transition-colors font-medium">
                Generator
              </Link>
            )}
          </div>

          {/* Desktop Right Side */}
          <div className="hidden md:flex items-center gap-6">
            {user ? (
              <>
                <Link to={getDashboardLink()} className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors">
                  <LayoutDashboard size={18} />
                  <span>Dashboard</span>
                </Link>

                <Link to="/cart" className="relative text-slate-300 hover:text-white transition-colors">
                  <ShoppingCart size={22} />
                  {items.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                      {items.length}
                    </span>
                  )}
                </Link>

                <div className="flex items-center gap-4 pl-4 border-l border-slate-700">
                  <div className="text-right">
                    <p className="text-sm text-white font-medium">{user.fullName}</p>
                    <p className="text-xs text-slate-400 capitalize">{user.userType}</p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="p-2 text-slate-400 hover:text-red-400 hover:bg-slate-800 rounded-lg transition-all"
                    title="Logout"
                  >
                    <LogOut size={18} />
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link to="/cart" className="relative text-slate-300 hover:text-white transition-colors">
                  <ShoppingCart size={22} />
                  {items.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {items.length}
                    </span>
                  )}
                </Link>
                <Link to="/login">
                  <button className="px-5 py-2 text-slate-300 hover:text-white transition-colors">
                    Login
                  </button>
                </Link>
                <Link to="/signup">
                  <button className="px-5 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-all shadow-lg">
                    Sign Up
                  </button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
            <Link to="/cart" className="relative text-slate-300">
              <ShoppingCart size={22} />
              {items.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {items.length}
                </span>
              )}
            </Link>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-800">
            <div className="px-4 py-4 space-y-3">
              <Link 
                to="/product" 
                className="block py-2 text-slate-300 hover:text-white"
                onClick={() => setMobileMenuOpen(false)}
              >
                Products
              </Link>
              <Link 
                to="/shop" 
                className="block py-2 text-slate-300 hover:text-white"
                onClick={() => setMobileMenuOpen(false)}
              >
                Shop
              </Link>
              {user && user.userType === 'creative' && (
                <Link 
                  to="/generator" 
                  className="block py-3 text-orange-400 font-medium hover:text-orange-300 border-b border-orange-500/30"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Generator
                </Link>
              )}

              <div className="pt-4 border-t border-slate-700">
                {user ? (
                  <>
                    <div className="flex items-center justify-between py-3">
                      <div>
                        <p className="text-white font-medium">{user.fullName}</p>
                        <p className="text-sm text-slate-400 capitalize">{user.userType}</p>
                      </div>
                      <button
                        onClick={handleLogout}
                        className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg"
                      >
                        <LogOut size={20} />
                      </button>
                    </div>

                    <Link 
                      to={getDashboardLink()} 
                      className="block py-3 text-cyan-400 font-medium hover:text-cyan-300"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Dashboard
                    </Link>
                  </>
                ) : (
                  <div className="space-y-3 pt-4">
                    <Link 
                      to="/login" 
                      className="block w-full text-center py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-lg"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Login
                    </Link>
                    <Link 
                      to="/signup" 
                      className="block w-full text-center py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Sign Up
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}