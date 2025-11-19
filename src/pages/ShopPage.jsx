import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Heart, ShoppingCart, Star, Search } from 'lucide-react'

const MOCK_PRODUCTS = [
  {
    id: '1',
    title: 'Handmade Leather Bag',
    price_ngn: 15000,
    enhanced_image_url: '/leather-bag.jpg',
    category: 'Fashion',
    creative_id: 'creative_1',
    store_id: 'store_1',
    views_count: 245,
  },
  {
    id: '2',
    title: 'Organic Skincare Set',
    price_ngn: 8500,
    enhanced_image_url: '/skincare.jpg',
    category: 'Beauty',
    creative_id: 'creative_2',
    store_id: 'store_2',
    views_count: 189,
  },
  {
    id: '3',
    title: 'Beaded Art Piece',
    price_ngn: 25000,
    enhanced_image_url: '/art-beads.jpg',
    category: 'Art',
    creative_id: 'creative_3',
    store_id: 'store_3',
    views_count: 412,
  },
  {
    id: '4',
    title: 'Cotton Summer Dress',
    price_ngn: 12000,
    enhanced_image_url: '/summer-dress.jpg',
    category: 'Clothing',
    creative_id: 'creative_1',
    store_id: 'store_1',
    views_count: 523,
  },
]

export default function ShopPage() {
  const [products, setProducts] = useState(MOCK_PRODUCTS)
  const [filteredProducts, setFilteredProducts] = useState(MOCK_PRODUCTS)
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')

  const categories = ['Fashion', 'Art', 'Clothing', 'Accessories', 'Electronics', 'Home', 'Beauty', 'Sports']

  useEffect(() => {
    let filtered = products

    if (selectedCategory) {
      filtered = filtered.filter(p => p.category === selectedCategory)
    }

    if (searchQuery) {
      filtered = filtered.filter(p =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    setFilteredProducts(filtered)
  }, [selectedCategory, searchQuery, products])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 pt-20">
      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Search & Filter Section */}
        <div className="mb-12 space-y-6">
          <div className="relative">
            <Search size={20} className="absolute left-4 top-3 text-slate-500" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-orange-400"
            />
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                selectedCategory === null
                  ? 'bg-orange-500 text-white'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              All Products
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                  selectedCategory === cat
                    ? 'bg-orange-500 text-white'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-slate-400 text-lg">No products found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <Link key={product.id} to={`/store/${product.store_id}/${product.id}`}>
                <div className="border border-slate-700 bg-slate-800/50 overflow-hidden hover:border-orange-400 transition-colors cursor-pointer group h-full rounded-lg">
                  <div className="aspect-square overflow-hidden bg-slate-900 relative">
                    <img
                      src={product.enhanced_image_url || "/placeholder.svg"}
                      alt={product.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                    <button className="absolute top-2 right-2 p-2 bg-slate-900/80 rounded-lg hover:bg-orange-500 transition-colors">
                      <Heart size={20} className="text-slate-300" />
                    </button>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-white mb-2 line-clamp-2">{product.title}</h3>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <span className="text-xs text-slate-400">(12 reviews)</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-orange-400">₦{product.price_ngn.toLocaleString()}</span>
                      <ShoppingCart size={20} className="text-slate-400 group-hover:text-orange-400 transition-colors" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
