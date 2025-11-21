import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Star, ShoppingCart, ArrowLeft, MapPin, Package, Award, Heart, Share2, ChevronDown, Search, Filter, X } from 'lucide-react'

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
  followers: 1542,
  isFollowing: false,
  products: [
    { id: '1', title: 'Handmade Leather Bag', price_ngn: 15000, image: '/bag.jpg', category: 'Fashion', rating: 4.8, inStock: true },
    { id: '2', title: 'Cotton Summer Dress', price_ngn: 12000, image: '/elegant-flowing-dress.png', category: 'Clothing', rating: 4.9, inStock: true },
    { id: '3', title: 'Beaded Art Piece', price_ngn: 25000, image: '/art-beads.jpg', category: 'Art', rating: 5.0, inStock: false },
    { id: '4', title: 'Leather Wallet', price_ngn: 8500, image: '/wallet.jpg', category: 'Accessories', rating: 4.7, inStock: true },
    { id: '5', title: 'Handwoven Basket', price_ngn: 18000, image: '/basket.jpg', category: 'Home', rating: 4.8, inStock: true },
    { id: '6', title: 'Ceramic Vase', price_ngn: 14000, image: '/vase.jpg', category: 'Home', rating: 4.9, inStock: true },
    { id: '7', title: 'Designer Scarf', price_ngn: 9500, image: '/scarf.jpg', category: 'Fashion', rating: 4.6, inStock: true },
    { id: '8', title: 'Wooden Clock', price_ngn: 22000, image: '/clock.jpg', category: 'Home', rating: 4.9, inStock: false },
    { id: '9', title: 'Silk Pillowcase', price_ngn: 11000, image: '/pillow.jpg', category: 'Home', rating: 4.7, inStock: true },
    { id: '10', title: 'Leather Belt', price_ngn: 7500, image: '/belt.jpg', category: 'Accessories', rating: 4.8, inStock: true },
  ]
}

export default function CreativeStorePage() {
  const { storeId } = useParams()
  const [selectedCategories, setSelectedCategories] = useState([])
  const [sortBy, setSortBy] = useState('featured')
  const [isFollowing, setIsFollowing] = useState(MOCK_STORE.isFollowing)
  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState('')
  const [priceRange, setPriceRange] = useState([0, 30000])
  const [showInStockOnly, setShowInStockOnly] = useState(false)
  const [showFilters, setShowFilters] = useState(false)
  
  const itemsPerPage = 6

  const categories = ['Fashion', 'Art', 'Clothing', 'Accessories', 'Home']

  const toggleCategory = (category) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    )
    setCurrentPage(1)
  }

  // Filter products
  let filteredProducts = MOCK_STORE.products.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category)
    const matchesPrice = product.price_ngn >= priceRange[0] && product.price_ngn <= priceRange[1]
    const matchesStock = !showInStockOnly || product.inStock
    
    return matchesSearch && matchesCategory && matchesPrice && matchesStock
  })

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-low') return a.price_ngn - b.price_ngn
    if (sortBy === 'price-high') return b.price_ngn - a.price_ngn
    if (sortBy === 'rating') return b.rating - a.rating
    if (sortBy === 'name') return a.title.localeCompare(b.title)
    return 0
  })

  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedProducts = sortedProducts.slice(startIndex, startIndex + itemsPerPage)

  const clearFilters = () => {
    setSelectedCategories([])
    setPriceRange([0, 30000])
    setShowInStockOnly(false)
    setSearchQuery('')
    setCurrentPage(1)
  }

  const activeFiltersCount = selectedCategories.length + (showInStockOnly ? 1 : 0) + (searchQuery ? 1 : 0)

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
          <div className="relative h-64 md:h-72 overflow-hidden">
            <img 
              src={MOCK_STORE.image || "/placeholder.svg"} 
              alt={MOCK_STORE.name} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent"></div>
            
            <div className="absolute top-4 right-4 flex gap-2">
              <button className="p-3 bg-slate-900/80 backdrop-blur-sm rounded-lg hover:bg-orange-500 transition-colors border border-slate-700">
                <Share2 size={20} className="text-slate-300" />
              </button>
              <button className="p-3 bg-slate-900/80 backdrop-blur-sm rounded-lg hover:bg-orange-500 transition-colors border border-slate-700">
                <Heart size={20} className="text-slate-300" />
              </button>
            </div>

            {/* Store Info Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <div className="flex flex-col md:flex-row md:items-end gap-6">
                {/* Avatar */}
                <div className="w-24 h-24 rounded-2xl overflow-hidden border-4 border-slate-900 bg-slate-800 shadow-2xl flex-shrink-0">
                  {MOCK_STORE.avatar ? (
                    <img src={MOCK_STORE.avatar} alt={MOCK_STORE.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-3xl font-bold text-white bg-gradient-to-br from-orange-500 to-orange-600">
                      {MOCK_STORE.name.charAt(0)}
                    </div>
                  )}
                </div>

                {/* Store Details */}
                <div className="flex-1">
                  <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{MOCK_STORE.name}</h1>
                  <p className="text-lg text-orange-400 font-medium mb-3">{MOCK_STORE.tagline}</p>
                  <div className="flex flex-wrap items-center gap-4 text-sm">
                    <div className="flex items-center gap-2 text-slate-300">
                      <MapPin size={16} className="text-orange-400" />
                      <span>{MOCK_STORE.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-300">
                      <Star size={16} className="text-yellow-400 fill-yellow-400" />
                      <span className="font-semibold">{MOCK_STORE.rating}</span>
                      <span className="text-slate-400">({MOCK_STORE.totalReviews} reviews)</span>
                    </div>
                    <div className="text-slate-300">
                      <span className="font-semibold">{MOCK_STORE.followers.toLocaleString()}</span> followers
                    </div>
                  </div>
                </div>

                {/* Action Button */}
                <button
                  onClick={() => setIsFollowing(!isFollowing)}
                  className={`px-6 py-3 rounded-lg font-semibold transition-colors whitespace-nowrap ${
                    isFollowing
                      ? 'bg-slate-700 text-white hover:bg-slate-600'
                      : 'bg-orange-500 text-white hover:bg-orange-600'
                  }`}
                >
                  {isFollowing ? 'Following' : 'Follow'}
                </button>
              </div>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-3 divide-x divide-slate-700 bg-slate-900/50">
            <div className="p-4 text-center">
              <div className="text-2xl font-bold text-white">{MOCK_STORE.totalProducts}</div>
              <div className="text-sm text-slate-400">Products</div>
            </div>
            <div className="p-4 text-center">
              <div className="text-2xl font-bold text-white">{MOCK_STORE.rating}</div>
              <div className="text-sm text-slate-400">Store Rating</div>
            </div>
            <div className="p-4 text-center">
              <div className="text-2xl font-bold text-white">{MOCK_STORE.yearsActive}+</div>
              <div className="text-sm text-slate-400">Years Active</div>
            </div>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value)
                  setCurrentPage(1)
                }}
                className="w-full pl-12 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-orange-400"
              />
            </div>

            {/* Sort */}
            <div className="relative md:w-64">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 pr-10 text-white focus:outline-none focus:border-orange-400 cursor-pointer"
              >
                <option value="featured">Sort: Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="name">Name: A-Z</option>
              </select>
              <ChevronDown size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            </div>

            {/* Filter Toggle Button */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white hover:border-orange-400 transition-colors relative"
            >
              <Filter size={20} />
              <span>Filters</span>
              {activeFiltersCount > 0 && (
                <span className="absolute -top-2 -right-2 w-6 h-6 bg-orange-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                  {activeFiltersCount}
                </span>
              )}
            </button>
          </div>

          {/* Filter Panel */}
          {showFilters && (
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-white">Filters</h3>
                {activeFiltersCount > 0 && (
                  <button
                    onClick={clearFilters}
                    className="text-sm text-orange-400 hover:text-orange-300 flex items-center gap-1"
                  >
                    <X size={16} />
                    Clear all
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Categories */}
                <div>
                  <h4 className="text-sm font-semibold text-slate-400 mb-3">Categories</h4>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <label key={category} className="flex items-center gap-3 cursor-pointer group">
                        <input
                          type="checkbox"
                          checked={selectedCategories.includes(category)}
                          onChange={() => toggleCategory(category)}
                          className="w-4 h-4 rounded border-slate-600 bg-slate-900 text-orange-500 focus:ring-orange-500 focus:ring-offset-slate-800"
                        />
                        <span className="text-slate-300 group-hover:text-orange-400 transition-colors">
                          {category}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <h4 className="text-sm font-semibold text-slate-400 mb-3">Price Range</h4>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <input
                        type="number"
                        value={priceRange[0]}
                        onChange={(e) => {
                          setPriceRange([Number(e.target.value), priceRange[1]])
                          setCurrentPage(1)
                        }}
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-orange-400"
                        placeholder="Min"
                      />
                      <span className="text-slate-500">-</span>
                      <input
                        type="number"
                        value={priceRange[1]}
                        onChange={(e) => {
                          setPriceRange([priceRange[0], Number(e.target.value)])
                          setCurrentPage(1)
                        }}
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-orange-400"
                        placeholder="Max"
                      />
                    </div>
                    <div className="text-xs text-slate-400">
                      ₦{priceRange[0].toLocaleString()} - ₦{priceRange[1].toLocaleString()}
                    </div>
                  </div>
                </div>

                {/* Availability */}
                <div>
                  <h4 className="text-sm font-semibold text-slate-400 mb-3">Availability</h4>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={showInStockOnly}
                      onChange={(e) => {
                        setShowInStockOnly(e.target.checked)
                        setCurrentPage(1)
                      }}
                      className="w-4 h-4 rounded border-slate-600 bg-slate-900 text-orange-500 focus:ring-orange-500 focus:ring-offset-slate-800"
                    />
                    <span className="text-slate-300 group-hover:text-orange-400 transition-colors">
                      In stock only
                    </span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Results Count */}
          <div className="flex items-center justify-between text-sm">
            <p className="text-slate-400">
              Showing <span className="text-white font-semibold">{startIndex + 1}-{Math.min(startIndex + itemsPerPage, sortedProducts.length)}</span> of <span className="text-white font-semibold">{sortedProducts.length}</span> products
            </p>
          </div>
        </div>

        {/* Products Grid */}
        {paginatedProducts.length === 0 ? (
          <div className="text-center py-20 bg-slate-800/30 rounded-xl border border-slate-700">
            <Package size={48} className="mx-auto text-slate-600 mb-4" />
            <p className="text-slate-400 text-lg mb-2">No products found</p>
            <p className="text-slate-500 text-sm mb-4">Try adjusting your filters or search terms</p>
            {activeFiltersCount > 0 && (
              <button
                onClick={clearFilters}
                className="px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-semibold transition-colors"
              >
                Clear Filters
              </button>
            )}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {paginatedProducts.map((product) => (
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
                      {!product.inStock && (
                        <div className="absolute inset-0 bg-slate-900/70 flex items-center justify-center">
                          <span className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-300 font-semibold">
                            Out of Stock
                          </span>
                        </div>
                      )}
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
                        {product.inStock && (
                          <button 
                            onClick={(e) => e.preventDefault()}
                            className="p-2 bg-slate-900 rounded-lg hover:bg-orange-500 transition-colors group/cart"
                          >
                            <ShoppingCart size={20} className="text-slate-400 group-hover/cart:text-white transition-colors" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 flex-wrap">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 rounded-lg border border-slate-700 text-slate-300 hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Previous
                </button>

                {[...Array(totalPages)].map((_, i) => {
                  const pageNum = i + 1
                  // Show first page, last page, current page, and pages around current
                  const showPage = pageNum === 1 || 
                                   pageNum === totalPages || 
                                   (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)
                  
                  if (!showPage && pageNum === currentPage - 2) {
                    return <span key={pageNum} className="px-2 text-slate-500">...</span>
                  }
                  if (!showPage && pageNum === currentPage + 2) {
                    return <span key={pageNum} className="px-2 text-slate-500">...</span>
                  }
                  if (!showPage) return null

                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`w-10 h-10 rounded-lg font-semibold transition-colors ${
                        currentPage === pageNum
                          ? 'bg-orange-500 text-white'
                          : 'border border-slate-700 text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      {pageNum}
                    </button>
                  )
                })}

                <button
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 rounded-lg border border-slate-700 text-slate-300 hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  )
}