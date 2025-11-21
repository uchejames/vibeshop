import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { User, Star, Search, ChevronDown, Filter, X, MapPin, Package } from 'lucide-react'

const MOCK_SELLERS = [
  {
    id: 'creative_1',
    name: "Ella's Collection",
    subtitle: 'Dealers of wears collection',
    products: 24,
    rating: 4.9,
    avatar: '/assets/Ellipse 6.png',
    banner: '/assets/about2.jpg',
    bio: "Ella curates timeless, handcrafted fashions inspired by West African patterns. She focuses on quality materials and slow-made production.",
    location: 'Lagos, NG',
    category: 'Fashion',
    verified: true
  },
  {
    id: 'creative_2',
    name: 'Modern Timepieces',
    subtitle: 'Timeless wristwear',
    products: 18,
    rating: 4.8,
    avatar: '/assets/Ellipse 6-1.png',
    banner: '/assets/about1.jpg',
    bio: "A small studio restoring and reimagining classic watches — each piece is serviced and styled with a contemporary edge.",
    location: 'Abuja, NG',
    category: 'Accessories',
    verified: true
  },
  {
    id: 'creative_3',
    name: 'Andy Crafts',
    subtitle: 'Handmade crafts',
    products: 32,
    rating: 5.0,
    avatar: '/assets/Ellipse 6-2.png',
    banner: '/assets/about.jpg',
    bio: "Andy makes one-of-a-kind homewares using reclaimed materials. Sustainability and storytelling are at the heart of every item.",
    location: 'Enugu, NG',
    category: 'Home',
    verified: false
  },
  {
    id: 'creative_4',
    name: 'Wave Audio',
    subtitle: 'Audio gear & accessories',
    products: 15,
    rating: 4.7,
    avatar: '/assets/Ellipse 6-3.png',
    banner: '/assets/about.jpg',
    bio: "Wave Audio hand-builds audio accessories for creators — from custom cables to acoustic treatments.",
    location: 'Port Harcourt, NG',
    category: 'Electronics',
    verified: true
  },
  {
    id: 'creative_5',
    name: 'Bella Beads',
    subtitle: 'Artisan jewelry',
    products: 28,
    rating: 4.9,
    avatar: '/assets/Ellipse 6.png',
    banner: '/assets/about2.jpg',
    bio: "Creating unique beaded jewelry with traditional African designs. Each piece tells a story.",
    location: 'Lagos, NG',
    category: 'Jewelry',
    verified: true
  },
  {
    id: 'creative_6',
    name: 'Urban Canvas',
    subtitle: 'Contemporary art',
    products: 12,
    rating: 4.6,
    avatar: '/assets/Ellipse 6-1.png',
    banner: '/assets/about1.jpg',
    bio: "Urban Canvas brings street art into homes with bold, modern pieces that make statements.",
    location: 'Lagos, NG',
    category: 'Art',
    verified: false
  },
]

export default function ShopPage() {
  const [query, setQuery] = useState('')
  const [selectedLocation, setSelectedLocation] = useState('All')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [minRating, setMinRating] = useState(0)
  const [sortBy, setSortBy] = useState('rating')
  const [showFilters, setShowFilters] = useState(false)
  const [verifiedOnly, setVerifiedOnly] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 6

  const locations = useMemo(() => ['All', ...new Set(MOCK_SELLERS.map(s => s.location))], [])
  const categories = useMemo(() => ['All', ...new Set(MOCK_SELLERS.map(s => s.category))], [])

  // Filter sellers
  const filtered = useMemo(() => {
    return MOCK_SELLERS.filter(s => {
      const matchesQuery =
        !query ||
        s.name.toLowerCase().includes(query.toLowerCase()) ||
        s.subtitle.toLowerCase().includes(query.toLowerCase()) ||
        s.bio.toLowerCase().includes(query.toLowerCase())

      const matchesLocation = selectedLocation === 'All' || s.location === selectedLocation
      const matchesCategory = selectedCategory === 'All' || s.category === selectedCategory
      const matchesRating = s.rating >= minRating
      const matchesVerified = !verifiedOnly || s.verified

      return matchesQuery && matchesLocation && matchesCategory && matchesRating && matchesVerified
    })
  }, [query, selectedLocation, selectedCategory, minRating, verifiedOnly])

  // Sort sellers
  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating
      if (sortBy === 'products') return b.products - a.products
      if (sortBy === 'name') return a.name.localeCompare(b.name)
      return 0
    })
  }, [filtered, sortBy])

  // Pagination
  const totalPages = Math.ceil(sorted.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedSellers = sorted.slice(startIndex, startIndex + itemsPerPage)

  const clearFilters = () => {
    setQuery('')
    setSelectedLocation('All')
    setSelectedCategory('All')
    setMinRating(0)
    setVerifiedOnly(false)
    setCurrentPage(1)
  }

  const activeFiltersCount = 
    (selectedLocation !== 'All' ? 1 : 0) +
    (selectedCategory !== 'All' ? 1 : 0) +
    (minRating > 0 ? 1 : 0) +
    (verifiedOnly ? 1 : 0) +
    (query ? 1 : 0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 pt-2">
      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white">Discover Creatives</h1>
          <p className="text-lg text-slate-400 mt-2">Browse makers, learn their stories, and shop directly from their stores.</p>
        </div>

        {/* Search and Filter Bar */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value)
                  setCurrentPage(1)
                }}
                placeholder="Search creatives, bios, or subtitle..."
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-700 bg-slate-800 focus:outline-none focus:border-orange-400 text-white placeholder-slate-500"
              />
            </div>

            {/* Sort */}
            <div className="relative md:w-64">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none w-full px-4 py-3 rounded-lg border border-slate-700 bg-slate-800 text-white focus:outline-none focus:border-orange-400 cursor-pointer"
              >
                <option value="rating">Sort: Highest Rated</option>
                <option value="products">Most Products</option>
                <option value="name">Name: A-Z</option>
              </select>
              <ChevronDown size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            </div>

            {/* Filter Toggle */}
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

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {/* Location */}
                <div>
                  <label className="text-sm font-semibold text-slate-400 mb-3 block">Location</label>
                  <select
                    value={selectedLocation}
                    onChange={(e) => {
                      setSelectedLocation(e.target.value)
                      setCurrentPage(1)
                    }}
                    className="w-full px-3 py-2 rounded-lg border border-slate-700 bg-slate-900 text-white focus:outline-none focus:border-orange-400"
                  >
                    {locations.map(loc => (
                      <option key={loc} value={loc}>{loc}</option>
                    ))}
                  </select>
                </div>

                {/* Category */}
                <div>
                  <label className="text-sm font-semibold text-slate-400 mb-3 block">Category</label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => {
                      setSelectedCategory(e.target.value)
                      setCurrentPage(1)
                    }}
                    className="w-full px-3 py-2 rounded-lg border border-slate-700 bg-slate-900 text-white focus:outline-none focus:border-orange-400"
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                {/* Minimum Rating */}
                <div>
                  <label className="text-sm font-semibold text-slate-400 mb-3 block">Minimum Rating</label>
                  <select
                    value={minRating}
                    onChange={(e) => {
                      setMinRating(Number(e.target.value))
                      setCurrentPage(1)
                    }}
                    className="w-full px-3 py-2 rounded-lg border border-slate-700 bg-slate-900 text-white focus:outline-none focus:border-orange-400"
                  >
                    <option value="0">Any Rating</option>
                    <option value="4.0">4.0+ Stars</option>
                    <option value="4.5">4.5+ Stars</option>
                    <option value="4.8">4.8+ Stars</option>
                  </select>
                </div>

                {/* Verified Only */}
                <div>
                  <label className="text-sm font-semibold text-slate-400 mb-3 block">Verification</label>
                  <label className="flex items-center gap-3 cursor-pointer group mt-2">
                    <input
                      type="checkbox"
                      checked={verifiedOnly}
                      onChange={(e) => {
                        setVerifiedOnly(e.target.checked)
                        setCurrentPage(1)
                      }}
                      className="w-4 h-4 rounded border-slate-600 bg-slate-900 text-orange-500 focus:ring-orange-500 focus:ring-offset-slate-800"
                    />
                    <span className="text-slate-300 group-hover:text-orange-400 transition-colors">
                      Verified only
                    </span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Results Count */}
          <div className="flex items-center justify-between text-sm">
            <p className="text-slate-400">
              Showing <span className="text-white font-semibold">{startIndex + 1}-{Math.min(startIndex + itemsPerPage, sorted.length)}</span> of <span className="text-white font-semibold">{sorted.length}</span> creatives
            </p>
          </div>
        </div>

        {/* Grid */}
        {paginatedSellers.length === 0 ? (
          <div className="text-center py-20 bg-slate-800/30 rounded-xl border border-slate-700">
            <User size={48} className="mx-auto text-slate-600 mb-4" />
            <p className="text-slate-400 text-lg mb-2">No creatives found</p>
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
              {paginatedSellers.map((seller) => (
                <div key={seller.id} className="bg-slate-800/50 rounded-2xl shadow-md border border-slate-700 overflow-hidden hover:border-orange-400 transition-colors">
                  {/* Banner */}
                  <div className="h-36 relative">
                    <img
                      src={seller.banner || '/assets/banner-placeholder.png'}
                      alt={`${seller.name} banner`}
                      className="w-full h-full object-cover"
                    />
                    {seller.verified && (
                      <div className="absolute top-3 right-3 px-2 py-1 bg-orange-500 rounded-full text-xs font-semibold text-white flex items-center gap-1">
                        <Star size={12} className="fill-white" />
                        Verified
                      </div>
                    )}
                    {/* Avatar overlaps */}
                    <div className="absolute -bottom-10 left-6">
                      <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-slate-800 bg-slate-700 shadow">
                        {seller.avatar ? (
                          <img src={seller.avatar} alt={seller.name} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-lg font-semibold text-slate-300">
                            {seller.name.split(' ').map(n => n[0]).join('').slice(0,2).toUpperCase()}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="pt-12 px-6 pb-6">
                    <div className="mb-4">
                      <h3 className="text-xl font-semibold text-white">{seller.name}</h3>
                      <p className="text-sm text-slate-400 mt-1">{seller.subtitle}</p>
                    </div>

                    <p className="text-sm text-slate-300 mb-4 line-clamp-2">{seller.bio}</p>

                    <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-700">
                      <div className="flex items-center gap-1">
                        <Star size={16} className="text-amber-400 fill-amber-400" />
                        <span className="text-sm font-semibold text-white">{seller.rating}</span>
                        <span className="text-xs text-slate-400 ml-1">rating</span>
                      </div>

                      <div className="flex items-center gap-1 text-slate-300">
                        <Package size={16} className="text-orange-400" />
                        <span className="text-sm font-semibold">{seller.products}</span>
                        <span className="text-xs text-slate-400 ml-1">products</span>
                      </div>

                      <div className="flex items-center gap-1 text-slate-400">
                        <MapPin size={14} className="text-orange-400" />
                        <span className="text-xs">{seller.location.split(',')[0]}</span>
                      </div>
                    </div>

                    <div className="mt-6 flex gap-3">
                      <Link to={`/store/${seller.id}`} className="flex-1">
                        <button className="w-full px-4 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-semibold shadow transition-colors">
                          View Store
                        </button>
                      </Link>

                      <Link to={`/store/${seller.id}/contact`} className="w-28">
                        <button className="w-full px-3 py-3 border border-slate-700 rounded-lg text-slate-300 hover:bg-slate-700 transition-colors">
                          Message
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
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