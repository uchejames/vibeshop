'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { createBrowserClient } from '@supabase/ssr';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Heart, Share2, Star, ChevronLeft } from 'lucide-react';
import Link from 'next/link';

const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface Product {
  id: string;
  title: string;
  description: string;
  price_ngn: number;
  enhanced_image_url: string;
  poster_image_url: string;
  category: string;
  creative_id: string;
  store_id: string;
  product_link: string;
  created_at: string;
}

interface Creator {
  id: string;
  full_name: string;
  avatar_url: string;
  bio: string;
}

interface CreativeStore {
  id: string;
  store_name: string;
  store_slug: string;
  description: string;
}

export default function ProductDetailPage() {
  const { storeId, productId } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [creator, setCreator] = useState<Creator | null>(null);
  const [store, setStore] = useState<CreativeStore | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProductDetails();
  }, [productId, storeId]);

  const fetchProductDetails = async () => {
    try {
      // Fetch product
      const { data: productData, error: productError } = await supabase
        .from('products')
        .select('*')
        .eq('id', productId)
        .single();

      if (productError) throw productError;
      setProduct(productData);

      // Fetch creator
      const { data: creatorData, error: creatorError } = await supabase
        .from('users')
        .select('*')
        .eq('id', productData.creative_id)
        .single();

      if (!creatorError) setCreator(creatorData);

      // Fetch store
      const { data: storeData, error: storeError } = await supabase
        .from('creative_stores')
        .select('*')
        .eq('id', storeId)
        .single();

      if (!storeError) setStore(storeData);
    } catch (err) {
      console.error('Error fetching product:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-400"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
        <p className="text-slate-400">Product not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Header */}
      <nav className="border-b border-slate-800 bg-slate-900/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/shop" className="flex items-center gap-2 text-orange-400 hover:text-orange-300">
            <ChevronLeft className="w-5 h-5" />
            Back to Shop
          </Link>
          <Button className="bg-orange-500 hover:bg-orange-600">
            <ShoppingCart className="w-5 h-5 mr-2" />
            Cart
          </Button>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left: Images */}
          <div className="space-y-4">
            <Card className="overflow-hidden border-slate-700 bg-slate-800/50 aspect-square">
              <img
                src={product.enhanced_image_url || '/placeholder.svg?height=600&width=600&query=product'}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            </Card>
            {product.poster_image_url && (
              <Card className="overflow-hidden border-slate-700 bg-slate-800/50 aspect-video">
                <img
                  src={product.poster_image_url || "/placeholder.svg"}
                  alt="Product Poster"
                  className="w-full h-full object-cover"
                />
              </Card>
            )}
          </div>

          {/* Right: Details */}
          <div className="space-y-6">
            <div>
              <p className="text-orange-400 text-sm font-medium mb-2">{product.category}</p>
              <h1 className="text-4xl font-bold text-white mb-4">{product.title}</h1>
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-slate-400">(48 reviews)</span>
              </div>
            </div>

            {product.description && (
              <div>
                <h3 className="font-semibold text-white mb-2">Description</h3>
                <p className="text-slate-400">{product.description}</p>
              </div>
            )}

            {/* Price & Purchase */}
            <Card className="border-slate-700 bg-slate-800/50 p-6">
              <div className="mb-6">
                <p className="text-slate-400 text-sm mb-2">Price</p>
                <p className="text-4xl font-bold text-orange-400">₦{product.price_ngn.toLocaleString()}</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Quantity</label>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-4 py-2 bg-slate-700 rounded-lg text-white hover:bg-slate-600"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-16 px-2 py-2 bg-slate-900 border border-slate-600 rounded-lg text-white text-center"
                    />
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-4 py-2 bg-slate-700 rounded-lg text-white hover:bg-slate-600"
                    >
                      +
                    </button>
                  </div>
                </div>

                <Button className="w-full bg-gradient-to-r from-orange-400 to-amber-500 hover:from-orange-500 hover:to-amber-600 text-white font-semibold py-3 rounded-lg">
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Add to Cart - ₦{(product.price_ngn * quantity).toLocaleString()}
                </Button>

                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1 border-slate-600 text-slate-300 hover:bg-slate-800">
                    <Heart className="w-5 h-5" />
                  </Button>
                  <Button variant="outline" className="flex-1 border-slate-600 text-slate-300 hover:bg-slate-800">
                    <Share2 className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </Card>

            {/* Creator Info */}
            {creator && (
              <Card className="border-slate-700 bg-slate-800/50 p-6">
                <h3 className="font-semibold text-white mb-4">Sold by</h3>
                <Link href={`/store/${store?.id}`} className="flex items-center gap-4 group">
                  {creator.avatar_url && (
                    <img
                      src={creator.avatar_url || "/placeholder.svg"}
                      alt={creator.full_name}
                      className="w-16 h-16 rounded-full object-cover group-hover:ring-2 ring-orange-400 transition-all"
                    />
                  )}
                  <div>
                    <p className="font-semibold text-white group-hover:text-orange-400 transition-colors">{creator.full_name}</p>
                    <p className="text-slate-400 text-sm">{store?.store_name}</p>
                    <p className="text-slate-500 text-sm">Click to view all products</p>
                  </div>
                </Link>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
