'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, LogOut, Upload, TrendingUp, ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import { mockAuth, MockUser } from '@/lib/mock-auth';

interface Product {
  id: string;
  title: string;
  price_ngn: number;
  enhanced_image_url: string;
  is_approved: boolean;
  views_count: number;
}

export default function CreativeDashboard() {
  const [user, setUser] = useState<MockUser | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const { user: authUser } = await mockAuth.getUser();
      if (!authUser) {
        router.push('/login');
        return;
      }

      if (authUser.userType !== 'creative') {
        router.push('/shop');
        return;
      }

      setUser(authUser);
      setProducts([]);
    } catch (err) {
      console.error('Error:', err);
      router.push('/login');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await mockAuth.signOut();
    router.push('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-400"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <nav className="border-b border-slate-800 bg-slate-900/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-amber-500 rounded-lg flex items-center justify-center font-bold text-white">
              V
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Vibeshop</h1>
              <p className="text-xs text-slate-400">Creative Dashboard</p>
            </div>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/generator">
              <Button className="bg-orange-500 hover:bg-orange-600">
                <Plus className="w-5 h-5 mr-2" />
                List Product
              </Button>
            </Link>
            <Button variant="outline" onClick={handleLogout} className="border-slate-600 text-slate-300">
              <LogOut className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <Card className="border-slate-700 bg-slate-800/50 p-8 mb-12">
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <p className="text-slate-400 text-sm mb-2">Your Store</p>
              <h2 className="text-2xl font-bold text-white">{user?.fullName}'s Store</h2>
              <p className="text-slate-500 text-sm mt-2">/{user?.fullName.toLowerCase().replace(/\s+/g, '-')}</p>
            </div>
            <div>
              <p className="text-slate-400 text-sm mb-2">Total Products</p>
              <p className="text-3xl font-bold text-orange-400">{products.length}</p>
            </div>
            <div>
              <p className="text-slate-400 text-sm mb-2">Total Views</p>
              <p className="text-3xl font-bold text-blue-400">0</p>
            </div>
          </div>
        </Card>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="border-slate-700 bg-slate-800/50 p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-slate-400 text-sm">Approved Products</p>
                <p className="text-3xl font-bold text-green-400">0</p>
              </div>
              <ShoppingBag className="w-8 h-8 text-green-400 opacity-30" />
            </div>
          </Card>
          <Card className="border-slate-700 bg-slate-800/50 p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-slate-400 text-sm">Pending Approval</p>
                <p className="text-3xl font-bold text-yellow-400">0</p>
              </div>
              <Upload className="w-8 h-8 text-yellow-400 opacity-30" />
            </div>
          </Card>
          <Card className="border-slate-700 bg-slate-800/50 p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-slate-400 text-sm">Total Views</p>
                <p className="text-3xl font-bold text-purple-400">0</p>
              </div>
              <TrendingUp className="w-8 h-8 text-purple-400 opacity-30" />
            </div>
          </Card>
        </div>

        <Card className="border-slate-700 bg-slate-800/50 overflow-hidden">
          <div className="p-6 border-b border-slate-700">
            <h3 className="text-lg font-semibold text-white">Your Products</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-slate-700 bg-slate-900/50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium text-slate-400">Product</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-slate-400">Price</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-slate-400">Views</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-slate-400">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700">
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-slate-400">
                    No products yet. Start by <Link href="/generator" className="text-orange-400 hover:text-orange-300 underline">uploading your first product</Link>!
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>
      </main>
    </div>
  );
}
