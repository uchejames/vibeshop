import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { User, Star, Search } from 'lucide-react'

const aboutImage = `/mnt/data/A_webpage_section_of_VibeShop’s_“About_Us”_page_fe.png` // local file you uploaded

const MOCK_SELLERS = [
  {
    id: 'creative_1',
    name: "Ella’s Collection",
    subtitle: 'Dealers of wears collection',
    products: 24,
    rating: 4.9,
    avatar: '/assets/Ellipse 6.png',
    banner: '/assets/about2.jpg',
    bio: "Ella curates timeless, handcrafted fashions inspired by West African patterns. She focuses on quality materials and slow-made production.",
    location: 'Lagos, NG'
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
    location: 'Abuja, NG'
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
    location: 'Enugu, NG'
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
    location: 'Port Harcourt, NG'
  },
]

export default function ShopPage() {
  const [query, setQuery] = useState('')
  const [selectedLocation, setSelectedLocation] = useState('All')

  const locations = useMemo(() => ['All', ...new Set(MOCK_SELLERS.map(s => s.location))], [])

  const filtered = useMemo(() => {
    return MOCK_SELLERS.filter(s => {
      const matchesQuery =
        !query ||
        s.name.toLowerCase().includes(query.toLowerCase()) ||
        s.subtitle.toLowerCase().includes(query.toLowerCase()) ||
        s.bio.toLowerCase().includes(query.toLowerCase())

      const matchesLocation = selectedLocation === 'All' || s.location === selectedLocation

      return matchesQuery && matchesLocation
    })
  }, [query, selectedLocation])

 return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 pt-20">
      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white">Discover Creatives</h1>
          <p className="text-lg text-slate-400 mt-2">Browse makers, learn their stories, and shop directly from their stores.</p>
        </div>

        {/* Controls */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-8">
          <div className="relative w-full md:w-1/2">
            <Search size={18} className="absolute left-3 top-3 text-slate-500" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search creatives, bios, or subtitle..."
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-700 bg-slate-800 focus:outline-none focus:border-orange-400 text-white placeholder-slate-500"
            />
          </div>

          <div className="flex items-center gap-3">
            <label className="text-sm text-slate-400">Location:</label>
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="px-3 py-2 rounded-lg border border-slate-700 bg-slate-800 text-white"
            >
              {locations.map(loc => (
                <option key={loc} value={loc}>{loc}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((seller) => (
            <div key={seller.id} className="bg-slate-800/50 rounded-2xl shadow-md border border-slate-700 overflow-hidden hover:border-orange-400 transition-colors">
              {/* Banner */}
              <div className="h-36 relative">
                <img
                  src={seller.banner || '/assets/banner-placeholder.png'}
                  alt={`${seller.name} banner`}
                  className="w-full h-full object-cover"
                />
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
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-semibold text-white">{seller.name}</h3>
                    <p className="text-sm text-slate-400 mt-1">{seller.subtitle}</p>
                    <p className="text-sm text-slate-300 mt-3 line-clamp-3">{seller.bio}</p>
                  </div>

                  <div className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Star size={16} className="text-amber-400" />
                      <span className="text-sm font-semibold text-white">{seller.rating}</span>
                    </div>
                    <div className="text-sm text-slate-400 mt-2">{seller.products} Products</div>
                    <div className="text-xs text-slate-500 mt-1">{seller.location}</div>
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

        {/* Empty state */}
        {filtered.length === 0 && (
          <div className="text-center py-16 text-slate-400">
            No creatives match your search â€" try a different keyword.
          </div>
        )}
      </main>
    </div>
  )
}