import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'
import { LogOut, ShoppingBag, LayoutDashboard, Menu, X } from 'lucide-react'
import { useState } from 'react'

export default function Navbar() {
  const { user, logout } = useAuth()
  const { items } = useCart()
  const navigate = useNavigate()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-slate-800 bg-slate-900/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-amber-500 rounded-lg flex items-center justify-center font-bold text-white">
            V
          </div>
          <h1 className="text-xl font-bold text-white hidden md:block">Vibeshop</h1>
        </Link>

        <button 
          className="md:hidden text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <div className={`${
          mobileMenuOpen ? 'flex' : 'hidden md:flex'
        } absolute md:static top-full left-0 right-0 md:right-auto flex-col md:flex-row md:items-center gap-4 p-4 md:p-0 bg-slate-900 md:bg-transparent border-b md:border-b-0 border-slate-800`}>
          {user ? (
            <>
              <Link to="/shop">
                <button className="px-4 py-2 border border-slate-600 text-slate-300 hover:bg-slate-800 rounded-lg flex items-center gap-2 w-full md:w-auto justify-center">
                  <ShoppingBag size={16} />
                  Shop
                </button>
              </Link>

              {user.userType === 'creative' ? (
                <>
                  <Link to="/dashboard/creative">
                    <button className="px-4 py-2 border border-slate-600 text-slate-300 hover:bg-slate-800 rounded-lg flex items-center gap-2 w-full md:w-auto justify-center">
                      <LayoutDashboard size={16} />
                      Dashboard
                    </button>
                  </Link>
                  <Link to="/generator">
                    <button className="px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg w-full md:w-auto">
                      Generate Product
                    </button>
                  </Link>
                </>
              ) : (
                <Link to="/cart">
                  <button className="px-4 py-2 border border-slate-600 text-slate-300 hover:bg-slate-800 rounded-lg flex items-center gap-2 w-full md:w-auto justify-center relative">
                    <ShoppingBag size={16} />
                    Cart {items.length > 0 && <span className="ml-1 bg-orange-500 text-white text-xs px-2 py-1 rounded-full">{items.length}</span>}
                  </button>
                </Link>
              )}

              <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-slate-800 rounded-lg">
                <span className="text-sm text-slate-300">{user.email}</span>
              </div>

              <button
                onClick={handleLogout}
                className="px-4 py-2 border border-red-600/30 text-red-400 hover:bg-red-500/10 rounded-lg flex items-center gap-2 w-full md:w-auto justify-center"
              >
                <LogOut size={16} />
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/shop">
                <button className="px-4 py-2 border border-slate-600 text-slate-300 hover:bg-slate-800 rounded-lg w-full md:w-auto">
                  Browse Shop
                </button>
              </Link>
              <Link to="/login">
                <button className="px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg w-full md:w-auto">
                  Sign In
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
