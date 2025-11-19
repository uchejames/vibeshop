'use client';

import { useCart } from '@/lib/cart-context';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trash2, ChevronLeft, ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, total, loading } = useCart();
  const router = useRouter();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-400"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Header */}
      <nav className="border-b border-slate-800 bg-slate-900/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/shop" className="flex items-center gap-2 text-orange-400 hover:text-orange-300">
            <ChevronLeft className="w-5 h-5" />
            Continue Shopping
          </Link>
          <h1 className="text-xl font-bold text-white">Shopping Cart</h1>
          <div className="w-24"></div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-12">
        {items.length === 0 ? (
          <div className="text-center py-20">
            <ShoppingBag className="w-16 h-16 text-slate-600 mx-auto mb-4 opacity-50" />
            <h2 className="text-2xl font-bold text-white mb-4">Your cart is empty</h2>
            <p className="text-slate-400 mb-8">Start shopping to add items to your cart</p>
            <Link href="/shop">
              <Button className="bg-orange-500 hover:bg-orange-600">
                Continue Shopping
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <Card key={item.id} className="border-slate-700 bg-slate-800/50 p-4 flex gap-4">
                  {item.product?.enhanced_image_url && (
                    <img
                      src={item.product.enhanced_image_url || "/placeholder.svg"}
                      alt={item.product.title}
                      className="w-24 h-24 rounded-lg object-cover"
                    />
                  )}
                  <div className="flex-1">
                    <h3 className="font-semibold text-white mb-2">{item.product?.title}</h3>
                    <p className="text-orange-400 font-bold mb-4">₦{item.product?.price_ngn.toLocaleString()}</p>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                        className="px-2 py-1 bg-slate-700 rounded text-white hover:bg-slate-600"
                      >
                        -
                      </button>
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => updateQuantity(item.id, Math.max(1, parseInt(e.target.value) || 1))}
                        className="w-12 px-2 py-1 bg-slate-900 border border-slate-600 rounded text-white text-center"
                      />
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-2 py-1 bg-slate-700 rounded text-white hover:bg-slate-600"
                      >
                        +
                      </button>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="ml-auto p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="border-slate-700 bg-slate-800/50 p-6 sticky top-28 space-y-6">
                <h2 className="text-lg font-semibold text-white">Order Summary</h2>

                <div className="space-y-3 pb-6 border-b border-slate-700">
                  <div className="flex justify-between text-slate-400">
                    <span>Subtotal</span>
                    <span>₦{total.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Shipping</span>
                    <span>₦0</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Tax (VAT)</span>
                    <span>₦{Math.round(total * 0.075).toLocaleString()}</span>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-white font-semibold">Total</span>
                  <span className="text-2xl font-bold text-orange-400">₦{Math.round(total * 1.075).toLocaleString()}</span>
                </div>

                <Button
                  onClick={() => router.push('/checkout')}
                  className="w-full bg-gradient-to-r from-orange-400 to-amber-500 hover:from-orange-500 hover:to-amber-600 text-white font-semibold py-3 rounded-lg"
                >
                  Proceed to Checkout
                </Button>

                <Button
                  variant="outline"
                  onClick={() => router.push('/shop')}
                  className="w-full border-slate-600 text-slate-300 hover:bg-slate-800"
                >
                  Continue Shopping
                </Button>
              </Card>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
