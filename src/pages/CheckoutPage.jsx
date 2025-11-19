import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { AlertCircle, CheckCircle } from 'lucide-react'

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart()
  const { user } = useAuth()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [formData, setFormData] = useState({
    fullName: user?.fullName || '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    paymentMethod: 'transfer',
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const orderNumber = `VB${Date.now()}`

      setSuccess(true)
      clearCart()

      setTimeout(() => {
        navigate('/')
      }, 3000)
    } catch (err) {
      console.error('Checkout error:', err)
    } finally {
      setLoading(false)
    }
  }

  if (items.length === 0 && !success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 pt-24 flex items-center justify-center">
        <div className="text-center">
          <p className="text-slate-400 mb-4">Your cart is empty</p>
          <button onClick={() => navigate('/shop')} className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600">
            Continue Shopping
          </button>
        </div>
      </div>
    )
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 pt-24 flex items-center justify-center">
        <div className="text-center space-y-4">
          <CheckCircle size={64} className="text-green-400 mx-auto" />
          <h1 className="text-4xl font-bold text-white">Order Confirmed!</h1>
          <p className="text-slate-400">Thank you for your purchase. You'll be redirected shortly...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 pt-24 pb-12">
      <main className="max-w-7xl mx-auto px-6">
        <h1 className="text-4xl font-bold text-white mb-8">Checkout</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Shipping Information */}
              <div className="border border-slate-700 bg-slate-800/50 rounded-lg p-6">
                <h3 className="text-lg font-bold text-white mb-4">Shipping Information</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Full Name"
                    className="px-4 py-2 bg-slate-900 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-orange-400"
                    required
                  />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                    className="px-4 py-2 bg-slate-900 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-orange-400"
                    required
                  />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Phone Number"
                    className="px-4 py-2 bg-slate-900 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-orange-400"
                    required
                  />
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Street Address"
                    className="px-4 py-2 bg-slate-900 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-orange-400 md:col-span-2"
                    required
                  />
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="City"
                    className="px-4 py-2 bg-slate-900 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-orange-400"
                    required
                  />
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    placeholder="State"
                    className="px-4 py-2 bg-slate-900 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-orange-400"
                    required
                  />
                  <input
                    type="text"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleChange}
                    placeholder="ZIP Code"
                    className="px-4 py-2 bg-slate-900 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-orange-400"
                    required
                  />
                </div>
              </div>

              {/* Payment Method */}
              <div className="border border-slate-700 bg-slate-800/50 rounded-lg p-6">
                <h3 className="text-lg font-bold text-white mb-4">Payment Method</h3>
                <div className="space-y-3">
                  {[
                    { id: 'transfer', label: 'Bank Transfer' },
                    { id: 'card', label: 'Card Payment' },
                    { id: 'wallet', label: 'Digital Wallet' },
                  ].map(method => (
                    <label key={method.id} className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={method.id}
                        checked={formData.paymentMethod === method.id}
                        onChange={handleChange}
                        className="w-4 h-4"
                      />
                      <span className="text-white">{method.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg disabled:opacity-50"
              >
                {loading ? 'Processing...' : 'Complete Purchase'}
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="h-fit border border-slate-700 bg-slate-800/50 rounded-lg p-6 sticky top-24">
            <h3 className="text-lg font-bold text-white mb-4">Order Summary</h3>
            <div className="space-y-3 mb-6 max-h-64 overflow-y-auto">
              {items.map(item => (
                <div key={item.id} className="flex justify-between text-sm text-slate-400">
                  <span>{item.product?.title} x{item.quantity}</span>
                  <span>₦{((item.product?.price_ngn || 0) * item.quantity).toLocaleString()}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-slate-700 pt-4 space-y-3">
              <div className="flex justify-between text-slate-400">
                <span>Subtotal</span>
                <span>₦{total.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Tax (5%)</span>
                <span>₦{(total * 0.05).toLocaleString()}</span>
              </div>
              <div className="flex justify-between font-bold text-white pt-3 border-t border-slate-700">
                <span>Total</span>
                <span className="text-orange-400">₦{(total * 1.05).toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
