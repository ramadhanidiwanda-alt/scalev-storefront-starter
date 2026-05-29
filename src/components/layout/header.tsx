'use client';

import Link from 'next/link';
import { ShoppingCart, Menu, User, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCartStore } from '@/lib/stores/cart-store';
import { useAuthStore } from '@/lib/stores/auth-store';
import { useState } from 'react';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const cart = useCartStore((state) => state.cart);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const customer = useAuthStore((state) => state.customer);
  
  const itemCount = cart?.item_count || 0;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between md:h-18">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 hover:bg-muted rounded-md transition-colors"
            aria-label="Toggle menu"
          >
            <Menu className="h-6 w-6" />
          </button>

          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center space-x-2 md:mr-8"
          >
            <span className="text-xl font-bold text-primary" style={{ fontFamily: 'var(--font-heading)' }}>
              Scalev Store
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6 flex-1">
            <Link 
              href="/products" 
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              Products
            </Link>
            <Link 
              href="/categories" 
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              Categories
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-2">
            {/* Search - Desktop only */}
            <Button
              variant="ghost"
              size="icon"
              className="hidden md:flex"
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </Button>

            {/* Cart */}
            <Link href="/cart">
              <Button
                variant="ghost"
                size="icon"
                className="relative"
                aria-label={`Cart with ${itemCount} items`}
              >
                <ShoppingCart className="h-5 w-5" />
                {itemCount > 0 && (
                  <Badge 
                    className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-primary text-on-primary"
                  >
                    {itemCount > 9 ? '9+' : itemCount}
                  </Badge>
                )}
              </Button>
            </Link>

            {/* Account */}
            {isAuthenticated ? (
              <Link href="/account">
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Account"
                >
                  <User className="h-5 w-5" />
                </Button>
              </Link>
            ) : (
              <Link href="/login">
                <Button
                  variant="ghost"
                  size="sm"
                  className="hidden md:flex"
                >
                  Login
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-background">
          <nav className="container mx-auto px-4 py-4 space-y-2">
            <Link 
              href="/products"
              className="block py-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Products
            </Link>
            <Link 
              href="/categories"
              className="block py-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Categories
            </Link>
            {!isAuthenticated && (
              <Link 
                href="/login"
                className="block py-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Login
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
