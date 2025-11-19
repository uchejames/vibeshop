import { useParams } from 'react-router-dom'
import { Star, ShoppingCart, ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'

const MOCK_STORE = {
  id: 'store_1',
  name: 'Artisan Crafts',
  description: 'Handmade quality products from passionate creatives',
  image: '/store-banner.jpg',
  products: [
    { id: '1', title: 'Handmade Leather Bag', price_ngn: 15000, image: '/bag.jpg' },
    { id: '2', title: 'Cotton Summer Dress', price_ngn: 12000, image: '/elegant-flowing-dress.png' },
  ]
}

export default function CreativeStorePage() {
  const { storeId } = useParams()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 pt-20 pb-12">
      <main className="max-w-7xl mx-auto px-6">
        <Link to="/shop" className="flex items-center gap-2 text-orange-400 hover:text-orange-300 mb-8">
          <ArrowLeft size={20} />
          Back to Shop
        </Link>

        {/* Store Header */}
        <div className="border border-slate-700 bg-slate-800/50 rounded-lg overflow-hidden mb-12">
          <img src={MOCK_STORE.image || "/placeholder.svg"} alt={MOCK_STORE.name} className="w-full h-48 object-cover" />
          <div className="p-6">
            <h1 className="text-3xl font-bold text-white mb-2">{MOCK_STORE.name}</h1>
            <p className="text-slate-400">{MOCK_STORE.description}</p>
          </div>
        </div>

        {/* Products Grid */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-6">Featured Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {MOCK_STORE.products.map((product) => (
              <div key={product.id} className="border border-slate-700 bg-slate-800/50 overflow-hidden hover:border-orange-400 transition-colors rounded-lg">
                <div className="aspect-square overflow-hidden bg-slate-900">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-white mb-2">{product.title}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-orange-400">₦{product.price_ngn.toLocaleString()}</span>
                    <ShoppingCart size={20} className="text-slate-400 hover:text-orange-400" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
