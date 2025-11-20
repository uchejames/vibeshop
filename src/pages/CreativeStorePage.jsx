import { useParams } from 'react-router-dom'
import { Star, ShoppingCart, ArrowLeft, MapPin, Package, Award, Heart, Share2 } from 'lucide-react'
import { Link } from 'react-router-dom'

const MOCK_STORE = {
  id: 'store_1',
  name: 'Artisan Crafts',
  description: 'Handmade quality products from passionate creatives',
  tagline: 'Crafting Excellence, One Piece at a Time',
  image: '/store-banner.jpg',
  avatar: '/assets/Ellipse 6.png',
  location: 'Lagos, Nigeria',
  rating: 4.9,
  totalReviews: 127,
  totalProducts: 24,
  yearsActive: 3,
  products: [
    { id: '1', title: 'Handmade Leather Bag', price_ngn: 15000, image: '/bag.jpg', category: 'Fashion', rating: 4.8 },
    { id: '2', title: 'Cotton Summer Dress', price_ngn: 12000, image: '/elegant-flowing-dress.png', category: 'Clothing', rating: 4.9 },
    { id: '3', title: 'Beaded Art Piece', price_ngn: 25000, image: '/art-beads.jpg', category: 'Art', rating: 5.0 },
    { id: '4', title: 'Leather Wallet', price_ngn: 8500, image: '/wallet.jpg', category: 'Accessories', rating: 4.7 },
    { id: '5', title: 'Handwoven Basket', price_ngn: 18000, image: '/basket.jpg', category: 'Home', rating: 4.8 },
    { id: '6', title: 'Ceramic Vase', price_ngn: 14000, image: '/vase.jpg', category: 'Home', rating: 4.9 },
  ]
}

export default function CreativeStorePage() {
  const { storeId } = useParams()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 pt-20 pb-12">
      <main className="max-w-7xl mx-auto px-6">
        {/* Back Button */}
        <Link to="/shop" className="inline-flex items-center gap-2 text-slate-400 hover:text-orange-400 mb-6 transition-colors">
          <ArrowLeft size={20} />
          <span>Back to Creatives</span>
        </Link>

        {/* Store Header with Banner */}
        <div className="relative border border-slate-700 bg-slate-800/50 rounded-2xl overflow-hidden mb-8 shadow-2xl">
          {/* Banner Image */}
          <div className="relative h-64 md:h-80 overflow-hidden">
            <img 
              src={MOCK_STORE.image || "/placeholder.svg"} 
              alt={MOCK_STORE.name} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent"></div>
            
            {/* Action Buttons */}
            <div className="absolute top-4 right-4 flex gap-2">
              <button className="p-3 bg-slate-900/80 backdrop-blur-sm rounded-lg hover:bg-orange-500 transition-colors border border-slate-700">
                <Share2 size={20} className="text-slate-300" />
              </button>
              <button className="p-3 bg-slate-900/80 backdrop-blur-sm rounded-lg hover:bg-orange-500 transition-colors border border-slate-700">
                <Heart size={20} className="text-slate-300" />
              </button>
            </div>

            {/* Store Avatar - Overlapping */}
            <div className="absolute -bottom-16 left-8">
              <div className="w-32 h-32 rounded-2xl overflow-hidden border-4 border-slate-900 bg-slate-800 shadow-2xl">
                {MOCK_STORE.avatar ? (
                  <img src={MOCK_STORE.avatar} alt={MOCK_STORE.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-3xl font-bold text-slate-300 bg-gradient-to-br from-orange-500 to-orange-600">
                    {MOCK_STORE.name.charAt(0)}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Store Info */}
          <div className="pt-20 px-8 pb-8">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
              <div className="flex-1">
                <h1 className="text-4xl font-bold text-white mb-2">{MOCK_STORE.name}</h1>
                <p className="text-lg text-orange-400 font-medium mb-3">{MOCK_STORE.tagline}</p>
                <p className="text-slate-300 text-base leading-relaxed mb-4">{MOCK_STORE.description}</p>
                
                <div className="flex items-center gap-2 text-slate-400">
                  <MapPin size={18} className="text-orange-400" />
                  <span>{MOCK_STORE.location}</span>
                </div>
              </div>

              {/* Stats Cards */}
              <div className="flex flex-wrap md:flex-col gap-3 min-w-[200px]">
                <div className="flex items-center gap-3 bg-slate-900/50 px-4 py-3 rounded-lg border border-slate-700">
                  <div className="p-2 bg-orange-500/10 rounded-lg">
                    <Star size={20} className="text-orange-400 fill-orange-400" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-white">{MOCK_STORE.rating}</div>
                    <div className="text-xs text-slate-400">{MOCK_STORE.totalReviews} reviews</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-slate-900/50 px-4 py-3 rounded-lg border border-slate-700">
                  <div className="p-2 bg-orange-500/10 rounded-lg">
                    <Package size={20} className="text-orange-400" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-white">{MOCK_STORE.totalProducts}</div>
                    <div className="text-xs text-slate-400">Products</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-slate-900/50 px-4 py-3 rounded-lg border border-slate-700">
                  <div className="p-2 bg-orange-500/10 rounded-lg">
                    <Award size={20} className="text-orange-400" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-white">{MOCK_STORE.yearsActive}+</div>
                    <div className="text-xs text-slate-400">Years Active</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 mt-6">
              <button className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-semibold shadow-lg transition-colors">
                Contact Seller
              </button>
              <button className="px-6 py-3 border border-slate-700 text-slate-300 hover:bg-slate-800 rounded-lg font-semibold transition-colors">
                View All Products
              </button>
            </div>
          </div>
        </div>

        {/* Products Section */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-white">Featured Products</h2>
            <span className="text-slate-400">{MOCK_STORE.products.length} items</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {MOCK_STORE.products.map((product) => (
              <Link key={product.id} to={`/store/${storeId}/${product.id}`}>
                <div className="border border-slate-700 bg-slate-800/50 overflow-hidden hover:border-orange-400 transition-all duration-300 rounded-xl group h-full">
                  <div className="aspect-square overflow-hidden bg-slate-900 relative">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-3 right-3 px-3 py-1 bg-slate-900/90 backdrop-blur-sm rounded-full text-xs font-medium text-orange-400 border border-slate-700">
                      {product.category}
                    </div>
                    <button 
                      onClick={(e) => e.preventDefault()}
                      className="absolute top-3 left-3 p-2 bg-slate-900/80 backdrop-blur-sm rounded-lg hover:bg-orange-500 transition-colors opacity-0 group-hover:opacity-100 border border-slate-700"
                    >
                      <Heart size={18} className="text-slate-300" />
                    </button>
                  </div>
                  <div className="p-5">
                    <h3 className="font-semibold text-white mb-3 text-lg line-clamp-2 group-hover:text-orange-400 transition-colors">
                      {product.title}
                    </h3>
                    
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            size={14} 
                            className={i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-slate-600"} 
                          />
                        ))}
                      </div>
                      <span className="text-xs text-slate-400">({product.rating})</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold text-orange-400">₦{product.price_ngn.toLocaleString()}</span>
                      <button 
                        onClick={(e) => e.preventDefault()}
                        className="p-2 bg-slate-900 rounded-lg hover:bg-orange-500 transition-colors group/cart"
                      >
                        <ShoppingCart size={20} className="text-slate-400 group-hover/cart:text-white transition-colors" />
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}