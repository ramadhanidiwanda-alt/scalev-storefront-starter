'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/lib/stores/auth-store';
import { User, Package, LogOut } from 'lucide-react';

export default function AccountPage() {
  const router = useRouter();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const customer = useAuthStore((state) => state.customer);
  const logout = useAuthStore((state) => state.logout);
  const fetchCustomer = useAuthStore((state) => state.fetchCustomer);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    if (!customer) {
      fetchCustomer();
    }
  }, [isAuthenticated, customer, router, fetchCustomer]);

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  if (!isAuthenticated || !customer) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 
          className="text-3xl font-bold text-foreground mb-8"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          My Account
        </h1>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Profile Card */}
          <div className="md:col-span-2 bg-surface border border-border rounded-lg p-6 space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
                <User className="h-8 w-8 text-on-primary" />
              </div>
              <div>
                <h2 
                  className="text-xl font-semibold text-foreground"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  {customer.name}
                </h2>
                <p className="text-sm text-muted-foreground">{customer.email}</p>
              </div>
            </div>

            <div className="border-t border-border pt-4 space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Name</span>
                <span className="text-sm font-medium text-foreground">{customer.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Email</span>
                <span className="text-sm font-medium text-foreground">{customer.email}</span>
              </div>
              {customer.phone && (
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Phone</span>
                  <span className="text-sm font-medium text-foreground">{customer.phone}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Member Since</span>
                <span className="text-sm font-medium text-foreground">
                  {new Date(customer.created_at).toLocaleDateString('id-ID')}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-4">
            <div className="bg-surface border border-border rounded-lg p-6 space-y-3">
              <h3 
                className="text-lg font-semibold text-foreground mb-4"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                Quick Actions
              </h3>
              
              <Link href="/account/orders" className="block">
                <Button
                  variant="outline"
                  className="w-full justify-start"
                >
                  <Package className="h-4 w-4 mr-2" />
                  My Orders
                </Button>
              </Link>

              <Button
                variant="outline"
                className="w-full justify-start text-destructive hover:text-destructive"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>

        {/* Orders Section Placeholder */}
        <div className="mt-8 bg-surface border border-border rounded-lg p-6">
          <h2 
            className="text-xl font-semibold text-foreground mb-4"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Recent Orders
          </h2>
          <p className="text-muted-foreground text-center py-8">
            Order history feature coming soon
          </p>
        </div>
      </div>
    </div>
  );
}
