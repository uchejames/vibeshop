'use client';

import { useState } from 'react';
import { useCart } from '@/lib/cart-context';
import { createBrowserClient } from '@supabase/ssr';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, CheckCircle, AlertCircle } from 'lucide-react';
import Link from 'next/link';

const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function CheckoutPage() {
  const { items, total } = useCart();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    paymentMethod: 'transfer',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const orderNumber = `VB-${Date.now()}`;
      const totalWithTax = Math.round(total * 1.075);

      // Create order
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
          customer_id: user.id,
          order_number: orderNumber,
          total_amount: totalWithTax,
          status: 'pending',
          payment_method: formData.paymentMethod,
          shipping_address: `${formData.address}, ${formData.city}, ${formData.state} ${formData.zipCode}`,
        })
        .select()
        .single();

      if (orderError) throw orderError;

      // Create order items
      const orderItems = items.map(item => ({
        order_id: order.id,
        product_id: item.product_id,
        creative_id: item.product?.id, // This should be the creative_id from products table
        quantity: item.quantity,
        price_at_purchase: item.product?.price_ngn || 0,
      }));

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

      if (itemsError) throw itemsError;

      // Clear cart items
      const cartItemIds = items.map(i => i.id);
      if (cartItemIds.length > 0) {
        await supabase.from('cart_items').delete().in('id', cartItemIds);
      }

      setOrderPlaced(true);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to place order';
      setError(message);
      console.error('Checkout error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0 && !orderPlaced) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
        <div className="text-center">
          <p className="text-slate-400 mb-4">Your cart is empty</p>
          <Link href="/shop">
            <Button className="bg-orange-500 hover:bg-orange-600">
              Back to Shop
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-4">
        <Card className="border-slate-700 bg-slate-800/50 p-12 max-w-md w-full text-center">
          <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-6" />
          <h1 className="text-3xl font-bold text-white mb-2">Order Placed!</h1>
          <p className="text-slate-400 mb-8">
            Thank you for your purchase. Your order has been received and will be processed shortly.
          </p>
          <div className="bg-slate-900 rounded-lg p-4 mb-8">
            <p className="text-slate-400 text-sm">Order Total</p>
            <p className="text-2xl font-bold text-orange-400">₦{Math.round(total * 1.075).toLocaleString()}</p>
          </div>
          <div className="space-y-3">
            <Button
              onClick={() => router.push('/shop')}
              className="w-full bg-orange-500 hover:bg-orange-600"
            >
              Continue Shopping
            </Button>
            <Button
              variant="outline"
              onClick={() => router.push('/dashboard/customer')}
              className="w-full border-slate-600 text-slate-300 hover:bg-slate-800"
            >
              View Orders
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Header */}
      <nav className="border-b border-slate-800 bg-slate-900/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/cart" className="flex items-center gap-2 text-orange-400 hover:text-orange-300">
            <ChevronLeft className="w-5 h-5" />
            Back to Cart
          </Link>
          <h1 className="text-xl font-bold text-white">Checkout</h1>
          <div className="w-24"></div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            {error && (
              <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg flex items-start gap-3 mb-6">
                <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                <p className="text-red-200 text-sm">{error}</p>
              </div>
            )}

            <form onSubmit={handlePlaceOrder} className="space-y-6">
              {/* Shipping Information */}
              <Card className="border-slate-700 bg-slate-800/50 p-6">
                <h2 className="text-lg font-semibold text-white mb-4">Shipping Information</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Full Name</label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 bg-slate-900 border border-slate-600 rounded-lg text-white placeholder-slate-500"
                      placeholder="John Doe"
                      required
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 bg-slate-900 border border-slate-600 rounded-lg text-white placeholder-slate-500"
                        placeholder="john@example.com"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">Phone</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 bg-slate-900 border border-slate-600 rounded-lg text-white placeholder-slate-500"
                        placeholder="+234 8012345678"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Address</label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 bg-slate-900 border border-slate-600 rounded-lg text-white placeholder-slate-500"
                      placeholder="123 Main Street"
                      required
                    />
                  </div>

                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">City</label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 bg-slate-900 border border-slate-600 rounded-lg text-white placeholder-slate-500"
                        placeholder="Lagos"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">State</label>
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 bg-slate-900 border border-slate-600 rounded-lg text-white placeholder-slate-500"
                        placeholder="Lagos"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">Zip Code</label>
                      <input
                        type="text"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 bg-slate-900 border border-slate-600 rounded-lg text-white placeholder-slate-500"
                        placeholder="12345"
                        required
                      />
                    </div>
                  </div>
                </div>
              </Card>

              {/* Payment Method */}
              <Card className="border-slate-700 bg-slate-800/50 p-6">
                <h2 className="text-lg font-semibold text-white mb-4">Payment Method</h2>
                <div className="space-y-3">
                  <label className="flex items-center gap-3 p-3 border-2 border-orange-400 rounded-lg cursor-pointer bg-orange-500/10">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="transfer"
                      checked={formData.paymentMethod === 'transfer'}
                      onChange={handleInputChange}
                      className="w-4 h-4"
                    />
                    <span className="text-white font-medium">Bank Transfer</span>
                  </label>
                  <label className="flex items-center gap-3 p-3 border-2 border-slate-600 rounded-lg cursor-pointer hover:border-slate-500">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="card"
                      checked={formData.paymentMethod === 'card'}
                      onChange={handleInputChange}
                      className="w-4 h-4"
                    />
                    <span className="text-slate-300 font-medium">Card Payment</span>
                  </label>
                  <label className="flex items-center gap-3 p-3 border-2 border-slate-600 rounded-lg cursor-pointer hover:border-slate-500">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="wallet"
                      checked={formData.paymentMethod === 'wallet'}
                      onChange={handleInputChange}
                      className="w-4 h-4"
                    />
                    <span className="text-slate-300 font-medium">Digital Wallet</span>
                  </label>
                </div>
              </Card>

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-orange-400 to-amber-500 hover:from-orange-500 hover:to-amber-600 text-white font-semibold py-3 rounded-lg"
              >
                {loading ? 'Processing...' : 'Place Order'}
              </Button>
            </form>
          </div>

          {/* Order Summary */}
          <div>
            <Card className="border-slate-700 bg-slate-800/50 p-6 sticky top-28 space-y-4">
              <h2 className="text-lg font-semibold text-white">Order Summary</h2>

              <div className="space-y-3 max-h-96 overflow-y-auto">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-slate-400 line-clamp-1">{item.product?.title}</span>
                    <span className="text-white font-medium">₦{(item.product?.price_ngn || 0 * item.quantity).toLocaleString()}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-slate-700 pt-4 space-y-3">
                <div className="flex justify-between text-slate-400">
                  <span>Subtotal</span>
                  <span>₦{total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Tax (7.5%)</span>
                  <span>₦{Math.round(total * 0.075).toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-lg font-bold text-white pt-3 border-t border-slate-700">
                  <span>Total</span>
                  <span className="text-orange-400">₦{Math.round(total * 1.075).toLocaleString()}</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
