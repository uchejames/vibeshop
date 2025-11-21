import { Link } from 'react-router-dom'
import { ShoppingBag, Star, Heart, User, ArrowRight } from 'lucide-react'

export default function HomePage() {
  const featuredCreatives = [
    { name: 'Ella’s Collection', products: 24, rating: 4.9, image: '/assets/Ellipse 6.png', subtitle: 'Dealers of wears collection',/* bio: 'Sells all types beautiful and classic shoes, bags, jewelry, clothes'*/ },
    { name: 'Modern Timepieces', products: 18, rating: 4.8, image: '/assets/Ellipse 6-1.png', subtitle: 'Timeless wristwear',/* bio: 'Handmade and restored timepieces with a modern twist'*/ },
    { name: 'Andy Crafts', products: 32, rating: 5.0, image: '/assets/Ellipse 6-2.png', subtitle: 'Handmade crafts',/* bio: 'Unique handcrafted homewares made from sustainable materials'*/ },
    { name: 'Wave Audio', products: 15, rating: 4.7, image: '/assets/Ellipse 6-3.png', subtitle: 'Audio gear & accessories',/* bio: 'High-quality audio gear built for creators and listeners'*/ },
  ]

  const marketplaceProducts = [
    { name: 'Handcrafted Drums', price: '₦129,000.00', category: 'Music', image: '/assets/Rectangle 39.png' },
    { name: 'Premium Headphones', price: '₦149.000.00', category: 'Electronics', image: '/assets/Rectangle 39-1.png' },
    { name: 'Beaded Necklace', price: '₦34.000.00', category: 'Jewelry', image: '/assets/Rectangle 39-2.png' },
    { name: 'Cotton Tote Bag', price: '₦24.00.00', category: 'Fashion', image: '/assets/Rectangle 39-3.png' },
  ]

  return (
    <div className="min-h-screen bg-white py-14 md:py-0">
      <main className="pt-5">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-slate-50 to-white">
          <div className="max-w-7xl mx-auto px-6 py-3">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h1 className="text-5xl lg:text-6xl font-bold text-slate-900 leading-tight">
                  Meet the Makers,
                  <span className="block text-slate-900">Find Your Vibe</span>
                </h1>
                <p className="text-xl text-slate-600 leading-relaxed">
                 Discover unique products from a community of independent creatives. Shop directly from makers and find items that tell a story. 
                </p>
                <div className="flex gap-4 pt-4">
                  <Link to="/shop">
                    <button className="px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white text-lg font-semibold rounded-lg flex items-center gap-2 shadow-lg shadow-orange-500/30">
                      Explore Shop
                      <ArrowRight size={20} />
                    </button>
                  </Link>
                  <Link to="/signup">
                    <button className="px-8 py-4 border-2 border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white text-lg font-semibold rounded-lg transition-all">
                      Start Selling
                    </button>
                  </Link>
                </div>
              </div>

              <div className="relative flex justify-center md:justify-center lg:justify-end">
                <img
                  src="/assets/hero-image-artguru.png"
                  alt="Hero"
                  loading="lazy"
                  className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl object-cover rounded-2xl justify-center "
                />
              </div>
            </div>
          </div>
        </section>

        {/* About Us Section */}
        <section className="py-4 md:py-20 bg-alice-600">
          <div className="max-w-7xl mx-auto px-6 text-center md:text-left">
            <h2 className="text-4xl font-bold text-slate-900 text-center py-16">
                  About <span className="text-orange-600">VibeShop</span>
                </h2>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              
              {/* Left: Image */}
              <div className="relative">
                <img 
                  src="/assets/about1.jpg" 
                  alt="About VibeShop" 
                  className="rounded-2xl  w-full h-96 object-cover"
                />
               {/* <div className="absolute -bottom-6 -right-6 bg-orange-500 text-white px-6 py-3 rounded-xl shadow-lg text-lg font-semibold">
                  Powered by Creators
                </div> */}
              </div>

              {/* Right: Content */}
              <div className="space-y-6">
                {/*<h2 className="text-4xl font-bold text-slate-900">
                  About <span className="text-orange-600">VibeShop</span>
                </h2>*/}

                <p className="text-lg text-slate-600 leading-relaxed">
                  VibeShop is a home for creativity — a marketplace built to connect talented 
                  independent makers with the world. We believe every product has a story, and 
                  every creator deserves a platform that helps them shine.
                </p>

                <p className="text-lg text-slate-600 leading-relaxed">
                  From handcrafted pieces to modern accessories, our mission is to empower 
                  creatives with the tools, visibility, and community they need to grow. Whether 
                  you're here to shop unique items or build your own brand, you're in the right place.
                </p>

                <div className="flex gap-4 pt-4">
                  <Link to="/shop">
                    <button className="px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white text-lg font-semibold rounded-lg shadow-lg shadow-orange-500/30">
                      Explore Shop
                    </button>
                  </Link>

                  <Link to="/signup">
                    <button className="px-8 py-4 border-2 border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white text-lg font-semibold rounded-lg transition-all">
                      Become a Seller
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* Featured Creatives */}
        <section className="py-20 bg-slate-900">
          <div className="max-w-7xl mx-auto px-6">
            <div className="mb-12">
              <h2 className="text-4xl font-bold text-white mb-3">Featured Creatives</h2>
              <p className="text-xl text-slate-400">Meet the talented makers behind amazing products</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredCreatives.map((creative, idx) => (
                <div key={idx} className="relative">
                  <div className="bg-white rounded-xl p-8 text-center shadow-lg border border-slate-200">
                    {/* avatar (overlap) */}
                    <div className="absolute top-2 left-1/2 transform -translate-x-1/2">
                      <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-white bg-gray-100">
                        {creative.image ? (
                          <img src={creative.image} alt={creative.name} loading="lazy" className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-xl font-bold text-slate-600">
                            {creative.name.split(' ').map(n => n[0]).join('').slice(0,2).toUpperCase()}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="mt-24">
                      <h3 className="text-xl font-bold text-slate-900">{creative.name}</h3>
                      <p className="text-sm text-slate-500 mt-1">{creative.subtitle}</p>
                      {/*<p className="text-slate-600 mt-4">{creative.bio}</p>*/}

                      <div className="flex items-center justify-center gap-6 mt-4 text-sm text-slate-500">
                        <div className="flex items-center gap-2">
                          <User size={16} className="text-slate-400" />
                          <span>{creative.products} Products</span>
                        </div>
                        <div className="flex items-center gap-2 text-amber-400">
                          <Star size={16} fill="currentColor" />
                          <span className="text-slate-900 font-semibold">{creative.rating}</span>
                        </div>
                      </div>

                      <button className="mt-6 w-full px-6 py-3 bg-[#cc5500] hover:bg-orange-600 text-white font-semibold rounded-full">
                        View Profile
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Explore Marketplace */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex justify-between items-end mb-12">
              <div>
                <h2 className="text-4xl font-bold text-slate-900 mb-3">Explore the marketplace</h2>
                <p className="text-xl text-slate-600">Curated collections from creative minds</p>
              </div>
              <div className="flex gap-3">
                <button className="px-4 py-2 text-slate-600 hover:text-slate-900 font-medium">Categories</button>
                <button className="px-4 py-2 text-slate-600 hover:text-slate-900 font-medium">New</button>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {marketplaceProducts.map((product, idx) => (
                <div key={idx} className="group cursor-pointer">
                  <div className="aspect-square rounded-xl overflow-hidden bg-slate-100 mb-3 relative">
                    {product.image ? (
                      <img
                        src={product.image}
                        alt={product.name}
                        loading="lazy"
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-xl font-bold text-slate-600 bg-gradient-to-br from-slate-200 to-slate-100">
                        {product.name.split(' ').map(n => n[0]).join('').slice(0,2).toUpperCase()}
                      </div>
                    )}
                    <button className="absolute top-3 right-3 w-10 h-10 bg-white rounded-full flex items-center justify-center opacity-20 group-hover:opacity-100 transition-opacity shadow-lg">
                      <Heart size={20} className="text-slate-600" />
                    </button>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-slate-500">{product.category}</p>
                    <h3 className="font-semibold text-slate-900">{product.name}</h3>
                    <p className="text-lg font-bold text-slate-900">{product.price}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center">
              <Link to="/shop">
                <button className="px-8 py-4 bg-[#cc5500] hover:bg-orange-600 text-white text-lg font-semibold rounded-lg shadow-lg shadow-orange-500/30">
                  View More
                </button>
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Sections */}
        <section className="py-20 bg-slate-50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-6 text-center">
              {/* Want to sell yourself */}
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-12 border border-orange-200">
                <h3 className="text-3xl font-bold text-slate-900 mb-4">Ready to sell your craft?</h3>
                <p className="text-lg text-slate-700 mb-6">
                  Join a vibrant community of creators, We provide the AI tools and the platform to help you build your brand and connect with customers
                </p>
                <Link to="/signup">
                  <button className="px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white text-lg font-semibold rounded-lg shadow-lg shadow-orange-500/30">
                    Start Selling
                  </button>
                </Link>
              </div>

              {/* Here's the vibe */}
              <div className="bg-slate-900 rounded-2xl p-12 border border-slate-700">
                <h3 className="text-3xl font-bold text-white mb-4">Stay In The Vibe</h3>
                <p className="text-lg text-slate-300 mb-6">
                 Sign Up to stay connected to our latest update by our creatives and be the first to know
                </p>
                <Link to="/shop">
                  <button className="px-8 py-4 bg-white hover:bg-slate-100 text-slate-900 text-lg font-semibold rounded-lg">
                    Browse Shop
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}