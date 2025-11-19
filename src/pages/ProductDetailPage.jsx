import { useParams } from 'react-router-dom'
import { ShoppingCart, Heart, Star } from 'lucide-react'
import { useCart } from '../context/CartContext'

const MOCK_PRODUCT = {
  id: '1',
  title: 'Handmade Leather Bag',
  price_ngn: 15000,
  description: 'Premium handcrafted leather bag made from sustainable materials. Perfect for daily use or special occasions.',
  enhanced_image_url: '/leather-bag.jpg',
  category: 'Fashion',
  creative_id: 'creative_1',
  views_count: 245,
  rating: 4.5,
  reviews: 12,
}

export default function ProductDetailPage() {
  const { productId } = useParams()
  const { addToCart } = useCart()

  const handleAddToCart = () => {
    addToCart(MOCK_PRODUCT, 1)
    alert('Added to cart!')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 pt-20 pb-12">
      <main className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="flex items-center justify-center">
            <div className="aspect-square rounded-lg overflow-hidden bg-slate-800 border border-slate-700">
              <img
                src={MOCK_PRODUCT.enhanced_image_url || "/placeholder.svg"}
                alt={MOCK_PRODUCT.title}
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <span className="inline-block px-3 py-1 bg-orange-500/10 text-orange-400 rounded-full text-sm mb-3">
                {MOCK_PRODUCT.category}
              </span>
              <h1 className="text-4xl font-bold text-white mb-4">{MOCK_PRODUCT.title}</h1>

              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      className={i < Math.floor(MOCK_PRODUCT.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-slate-600'}
                    />
                  ))}
                </div>
                <span className="text-slate-400">({MOCK_PRODUCT.reviews} reviews)</span>
              </div>
            </div>

            <div className="border-t border-b border-slate-700 py-6">
              <div className="flex items-baseline gap-3 mb-4">
                <span className="text-5xl font-bold text-orange-400">₦{MOCK_PRODUCT.price_ngn.toLocaleString()}</span>
              </div>
              <p className="text-slate-400">{MOCK_PRODUCT.views_count} people viewing this item</p>
            </div>

            <div className="space-y-4">
              <p className="text-slate-300 leading-relaxed">{MOCK_PRODUCT.description}</p>
            </div>

            <div className="space-y-3">
              <button
                onClick={handleAddToCart}
                className="w-full py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg flex items-center justify-center gap-2"
              >
                <ShoppingCart size={20} />
                Add to Cart
              </button>
              <button className="w-full py-3 border border-slate-600 text-slate-300 hover:bg-slate-800 rounded-lg flex items-center justify-center gap-2">
                <Heart size={20} />
                Add to Wishlist
              </button>
            </div>

            {/* Product Info */}
            <div className="border border-slate-700 bg-slate-800/50 rounded-lg p-6">
              <h3 className="font-semibold text-white mb-4">Product Information</h3>
              <dl className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <dt className="text-slate-400">Category</dt>
                  <dd className="text-white">{MOCK_PRODUCT.category}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-slate-400">Condition</dt>
                  <dd className="text-white">New</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-slate-400">Shipping</dt>
                  <dd className="text-white">Available Nationwide</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
