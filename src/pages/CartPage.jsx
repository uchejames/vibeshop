import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { Trash2, ShoppingBag, ArrowLeft } from 'lucide-react'

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, total, clearCart } = useCart()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 pt-20 pb-12">
      <main className="max-w-7xl mx-auto px-6">
        <div className="mb-8">
          <Link to="/shop" className="flex items-center gap-2 text-orange-400 hover:text-orange-300 mb-4">
            <ArrowLeft size={20} />
            Continue Shopping
          </Link>
          <h1 className="text-4xl font-bold text-white">Shopping Cart</h1>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            {items.length === 0 ? (
              <div className="border border-slate-700 bg-slate-800/50 rounded-lg p-12 text-center">
                <ShoppingBag size={48} className="text-slate-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Your cart is empty</h3>
                <p className="text-slate-400">Start shopping to add items to your cart</p>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="border border-slate-700 bg-slate-800/50 rounded-lg p-4 flex gap-4">
                    {item.product?.enhanced_image_url && (
                      <img
                        src={item.product.enhanced_image_url || "/placeholder.svg"}
                        alt={item.product.title}
                        className="w-24 h-24 rounded-lg object-cover"
                      />
                    )}
                    <div className="flex-1">
                      <h3 className="font-semibold text-white mb-2">{item.product?.title}</h3>
                      <p className="text-orange-400 font-bold">₦{(item.product?.price_ngn || 0).toLocaleString()}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <select
                        value={item.quantity}
                        onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                        className="px-3 py-1 bg-slate-900 border border-slate-600 rounded-lg text-white"
                      >
                        {[1, 2, 3, 4, 5].map(q => <option key={q} value={q}>{q}</option>)}
                      </select>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Order Summary */}
          {items.length > 0 && (
            <div className="h-fit border border-slate-700 bg-slate-800/50 rounded-lg p-6 sticky top-24">
              <h3 className="text-lg font-bold text-white mb-6">Order Summary</h3>
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-slate-400">
                  <span>Subtotal</span>
                  <span>₦{total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Tax (5%)</span>
                  <span>₦{(total * 0.05).toLocaleString()}</span>
                </div>
                <div className="border-t border-slate-700 pt-4 flex justify-between font-bold text-white">
                  <span>Total</span>
                  <span className="text-orange-400">₦{(total * 1.05).toLocaleString()}</span>
                </div>
              </div>
              <Link to="/checkout">
                <button className="w-full py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg mb-3">
                  Proceed to Checkout
                </button>
              </Link>
              <button
                onClick={clearCart}
                className="w-full py-2 border border-slate-600 text-slate-300 hover:bg-slate-800 rounded-lg"
              >
                Clear Cart
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
