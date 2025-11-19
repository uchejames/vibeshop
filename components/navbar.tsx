'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { LogOut, ShoppingBag, LayoutDashboard } from 'lucide-react';
import { mockAuth } from '@/lib/mock-auth';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentUser = mockAuth.getCurrentUser();
    setUser(currentUser);
    setLoading(false);
  }, []);

  const handleLogout = () => {
    mockAuth.signOut();
    setUser(null);
    router.push('/');
  };

  if (loading) return null;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-slate-800 bg-slate-900/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-amber-500 rounded-lg flex items-center justify-center font-bold text-white">
            V
          </div>
          <h1 className="text-xl font-bold text-white">Vibeshop</h1>
        </Link>

        <div className="flex items-center gap-4">
          {user ? (
            <>
              <Link href="/shop">
                <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-800">
                  <ShoppingBag className="w-4 h-4 mr-2" />
                  Shop
                </Button>
              </Link>

              {user.userType === 'creative' ? (
                <>
                  <Link href="/dashboard/creative">
                    <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-800">
                      <LayoutDashboard className="w-4 h-4 mr-2" />
                      Dashboard
                    </Button>
                  </Link>
                  <Link href="/generator">
                    <Button className="bg-orange-500 hover:bg-orange-600">
                      Generate Product
                    </Button>
                  </Link>
                </>
              ) : (
                <Link href="/cart">
                  <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-800">
                    <ShoppingBag className="w-4 h-4 mr-2" />
                    Cart
                  </Button>
                </Link>
              )}

              <div className="flex items-center gap-2 px-4 py-2 bg-slate-800 rounded-lg">
                <span className="text-sm text-slate-300">{user.email}</span>
              </div>

              <Button
                variant="outline"
                onClick={handleLogout}
                className="border-red-600/30 text-red-400 hover:bg-red-500/10"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link href="/shop">
                <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-800">
                  Browse Shop
                </Button>
              </Link>
              <Link href="/login">
                <Button className="bg-orange-500 hover:bg-orange-600">
                  Sign In
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
