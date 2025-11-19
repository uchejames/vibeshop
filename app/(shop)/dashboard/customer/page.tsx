'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { mockAuth } from '@/lib/mock-auth';
import { ShoppingBag, Heart, Clock } from 'lucide-react';

export default function CustomerDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const currentUser = mockAuth.getCurrentUser();
    if (!currentUser) {
      router.push('/login');
      return;
    }
    if (currentUser.userType !== 'customer') {
      router.push('/dashboard/creative');
      return;
    }
    setUser(currentUser);
  }, [router]);

  if (!user) return <div className="text-white">Loading...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Welcome, {user.email.split('@')[0]}!</h1>
          <p className="text-slate-400">Manage your orders and wishlist</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="p-6 border-slate-700 bg-slate-800/50">
            <div className="w-12 h-12 bg-orange-500/10 rounded-lg flex items-center justify-center mb-4">
              <ShoppingBag className="w-6 h-6 text-orange-400" />
            </div>
            <h3 className="text-2xl font-bold text-white">0</h3>
            <p className="text-slate-400 text-sm">Orders</p>
          </Card>

          <Card className="p-6 border-slate-700 bg-slate-800/50">
            <div className="w-12 h-12 bg-pink-500/10 rounded-lg flex items-center justify-center mb-4">
              <Heart className="w-6 h-6 text-pink-400" />
            </div>
            <h3 className="text-2xl font-bold text-white">0</h3>
            <p className="text-slate-400 text-sm">Wishlist Items</p>
          </Card>

          <Card className="p-6 border-slate-700 bg-slate-800/50">
            <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center mb-4">
              <Clock className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="text-2xl font-bold text-white">0</h3>
            <p className="text-slate-400 text-sm">In Progress</p>
          </Card>
        </div>

        <Card className="p-8 border-slate-700 bg-slate-800/50">
          <h2 className="text-2xl font-bold text-white mb-6">Recent Orders</h2>
          <div className="text-center py-12">
            <ShoppingBag className="w-16 h-16 text-slate-600 mx-auto mb-4" />
            <p className="text-slate-400 text-lg mb-6">No orders yet</p>
            <Button className="bg-orange-500 hover:bg-orange-600">
              Start Shopping
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
