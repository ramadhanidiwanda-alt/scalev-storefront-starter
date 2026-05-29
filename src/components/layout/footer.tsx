import Link from 'next/link';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-surface mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground" style={{ fontFamily: 'var(--font-heading)' }}>
              Scalev Store
            </h3>
            <p className="text-sm text-muted-foreground">
              Modern e-commerce storefront powered by Scalev API
            </p>
          </div>

          {/* Shop */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-foreground" style={{ fontFamily: 'var(--font-heading)' }}>
              Shop
            </h4>
            <ul className="space-y-2">
              <li>
                <Link 
                  href="/products" 
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  All Products
                </Link>
              </li>
              <li>
                <Link 
                  href="/categories" 
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Categories
                </Link>
              </li>
              <li>
                <Link 
                  href="/products?sort=new" 
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  New Arrivals
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-foreground" style={{ fontFamily: 'var(--font-heading)' }}>
              Support
            </h4>
            <ul className="space-y-2">
              <li>
                <Link 
                  href="/contact" 
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link 
                  href="/faq" 
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link 
                  href="/shipping" 
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Shipping Info
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-foreground" style={{ fontFamily: 'var(--font-heading)' }}>
              Legal
            </h4>
            <ul className="space-y-2">
              <li>
                <Link 
                  href="/privacy" 
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link 
                  href="/terms" 
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link 
                  href="/returns" 
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Return Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-muted-foreground">
              © {currentYear} Scalev Store. All rights reserved.
            </p>
            <p className="text-sm text-muted-foreground">
              Powered by <span className="text-primary font-medium">Scalev API</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
