'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/lib/stores/cart-store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { apiClient } from '@/lib/api/client';
import { formatPrice } from '@/lib/api/helpers';
import type { Province, City, Subdistrict, ShippingMethod, PaymentMethod } from '@/lib/api/types';

export default function CheckoutPage() {
  const router = useRouter();
  const cart = useCartStore((state) => state.cart);
  const clearCart = useCartStore((state) => state.clearCart);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [subdistricts, setSubdistricts] = useState<Subdistrict[]>([]);
  const [shippingMethods, setShippingMethods] = useState<ShippingMethod[]>([]);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    province_id: '',
    city_id: '',
    subdistrict_id: '',
    postal_code: '',
    shipping_method_id: '',
    payment_method: '',
    notes: '',
  });

  useEffect(() => {
    if (!cart || cart.items.length === 0) {
      router.push('/cart');
      return;
    }

    const fetchInitialData = async () => {
      try {
        const [provincesRes, paymentMethodsRes] = await Promise.all([
          apiClient.getProvinces(),
          apiClient.getPaymentMethods(),
        ]);
        setProvinces(provincesRes.data);
        setPaymentMethods(paymentMethodsRes.data);
      } catch (error) {
        console.error('Failed to fetch initial data:', error);
      }
    };

    fetchInitialData();
  }, [cart, router]);

  const handleProvinceChange = async (provinceId: string | null) => {
    if (!provinceId) return;
    
    setFormData({ ...formData, province_id: provinceId, city_id: '', subdistrict_id: '', shipping_method_id: '' });
    setCities([]);
    setSubdistricts([]);
    setShippingMethods([]);

    try {
      const response = await apiClient.getCities(parseInt(provinceId));
      setCities(response.data);
    } catch (error) {
      console.error('Failed to fetch cities:', error);
    }
  };

  const handleCityChange = async (cityId: string | null) => {
    if (!cityId) return;
    
    setFormData({ ...formData, city_id: cityId, subdistrict_id: '', shipping_method_id: '' });
    setSubdistricts([]);
    setShippingMethods([]);

    try {
      const response = await apiClient.getSubdistricts(parseInt(cityId));
      setSubdistricts(response.data);
    } catch (error) {
      console.error('Failed to fetch subdistricts:', error);
    }
  };

  const handleSubdistrictChange = async (subdistrictId: string | null) => {
    if (!subdistrictId) return;
    
    setFormData({ ...formData, subdistrict_id: subdistrictId, shipping_method_id: '' });
    setShippingMethods([]);

    try {
      const response = await apiClient.getShippingMethods({ subdistrict_id: parseInt(subdistrictId) });
      setShippingMethods(response.data);
    } catch (error) {
      console.error('Failed to fetch shipping methods:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      const response = await apiClient.checkout({
        shipping_address: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          province_id: parseInt(formData.province_id),
          city_id: parseInt(formData.city_id),
          subdistrict_id: parseInt(formData.subdistrict_id),
          postal_code: formData.postal_code,
        },
        shipping_method_id: parseInt(formData.shipping_method_id),
        payment_method: formData.payment_method,
        notes: formData.notes,
      });

      clearCart();
      router.push(`/order/${response.data.secret_slug}`);
    } catch (error) {
      console.error('Checkout failed:', error);
      alert('Checkout failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!cart || cart.items.length === 0) {
    return null;
  }

  const cartTotal = typeof cart.total === 'number' ? cart.total : parseFloat(cart.total || '0');
  const selectedShipping = shippingMethods.find(m => m.id.toString() === formData.shipping_method_id);
  const shippingCost = selectedShipping ? (typeof selectedShipping.cost === 'number' ? selectedShipping.cost : parseFloat(selectedShipping.cost || '0')) : 0;
  const grandTotal = cartTotal + shippingCost;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 
        className="text-3xl font-bold text-foreground mb-8"
        style={{ fontFamily: 'var(--font-heading)' }}
      >
        Checkout
      </h1>

      <form onSubmit={handleSubmit}>
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Contact Information */}
            <div className="bg-surface border border-border rounded-lg p-6 space-y-4">
              <h2 className="text-xl font-semibold text-foreground" style={{ fontFamily: 'var(--font-heading)' }}>
                Contact Information
              </h2>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                />
              </div>
            </div>

            {/* Shipping Address */}
            <div className="bg-surface border border-border rounded-lg p-6 space-y-4">
              <h2 className="text-xl font-semibold text-foreground" style={{ fontFamily: 'var(--font-heading)' }}>
                Shipping Address
              </h2>
              
              <div className="space-y-2">
                <Label htmlFor="address">Street Address *</Label>
                <Textarea
                  id="address"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  required
                  rows={3}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="province">Province *</Label>
                  <Select value={formData.province_id} onValueChange={handleProvinceChange} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select province" />
                    </SelectTrigger>
                    <SelectContent>
                      {provinces.map((province) => (
                        <SelectItem key={province.id} value={province.id.toString()}>
                          {province.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="city">City *</Label>
                  <Select value={formData.city_id} onValueChange={handleCityChange} required disabled={!formData.province_id}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select city" />
                    </SelectTrigger>
                    <SelectContent>
                      {cities.map((city) => (
                        <SelectItem key={city.id} value={city.id.toString()}>
                          {city.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="subdistrict">Subdistrict *</Label>
                  <Select value={formData.subdistrict_id} onValueChange={handleSubdistrictChange} required disabled={!formData.city_id}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select subdistrict" />
                    </SelectTrigger>
                    <SelectContent>
                      {subdistricts.map((subdistrict) => (
                        <SelectItem key={subdistrict.id} value={subdistrict.id.toString()}>
                          {subdistrict.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="postal_code">Postal Code *</Label>
                  <Input
                    id="postal_code"
                    value={formData.postal_code}
                    onChange={(e) => setFormData({ ...formData, postal_code: e.target.value })}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Shipping Method */}
            {formData.subdistrict_id && shippingMethods.length > 0 && (
              <div className="bg-surface border border-border rounded-lg p-6 space-y-4">
                <h2 className="text-xl font-semibold text-foreground" style={{ fontFamily: 'var(--font-heading)' }}>
                  Shipping Method
                </h2>
                
                <Select value={formData.shipping_method_id} onValueChange={(value) => value && setFormData({ ...formData, shipping_method_id: value })} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select shipping method" />
                  </SelectTrigger>
                  <SelectContent>
                    {shippingMethods.map((method) => {
                      const cost = typeof method.cost === 'number' ? method.cost : parseFloat(method.cost || '0');
                      return (
                        <SelectItem key={method.id} value={method.id.toString()}>
                          {method.name} - Rp {formatPrice(cost)}
                          {method.estimated_days && ` (${method.estimated_days})`}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Payment Method */}
            <div className="bg-surface border border-border rounded-lg p-6 space-y-4">
              <h2 className="text-xl font-semibold text-foreground" style={{ fontFamily: 'var(--font-heading)' }}>
                Payment Method
              </h2>
              
              <Select value={formData.payment_method} onValueChange={(value) => value && setFormData({ ...formData, payment_method: value })} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select payment method" />
                </SelectTrigger>
                <SelectContent>
                  {paymentMethods.map((method) => (
                    <SelectItem key={method.code} value={method.code}>
                      {method.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Notes */}
            <div className="bg-surface border border-border rounded-lg p-6 space-y-4">
              <h2 className="text-xl font-semibold text-foreground" style={{ fontFamily: 'var(--font-heading)' }}>
                Order Notes (Optional)
              </h2>
              
              <Textarea
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="Any special instructions for your order?"
                rows={3}
              />
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-surface border border-border rounded-lg p-6 sticky top-24 space-y-4">
              <h2 className="text-xl font-semibold text-foreground" style={{ fontFamily: 'var(--font-heading)' }}>
                Order Summary
              </h2>

              <div className="space-y-2">
                {cart.items.map((item) => {
                  // Best-effort read subtotal from unknown fields
                  const subtotalRaw = (item as any).subtotal;
                  const itemSubtotal = typeof subtotalRaw === 'number' 
                    ? subtotalRaw 
                    : typeof subtotalRaw === 'string' 
                      ? parseFloat(subtotalRaw) 
                      : 0;
                  
                  return (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        {(item as any).product?.name || (item as any).bundle_price_option?.name || 'Item'} x {item.quantity}
                      </span>
                      <span className="text-foreground">
                        Rp {formatPrice(itemSubtotal)}
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className="border-t border-border pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="text-foreground">
                    Rp {formatPrice(cartTotal)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="text-foreground">
                    {formData.shipping_method_id 
                      ? `Rp ${formatPrice(shippingCost)}`
                      : 'Select shipping'
                    }
                  </span>
                </div>
                <div className="border-t border-border pt-2 flex justify-between">
                  <span className="font-semibold text-foreground">Total</span>
                  <span 
                    className="text-xl font-bold text-primary"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    Rp {formatPrice(grandTotal)}
                  </span>
                </div>
              </div>

              <Button 
                type="submit"
                disabled={isSubmitting || !formData.shipping_method_id || !formData.payment_method}
                size="lg"
                className="w-full bg-primary hover:bg-primary-hover text-on-primary"
              >
                {isSubmitting ? 'Processing...' : 'Place Order'}
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
