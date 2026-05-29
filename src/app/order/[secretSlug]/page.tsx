'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { CheckCircle, Clock, Package, Truck } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { apiClient } from '@/lib/api/client';
import type { Order } from '@/lib/api/types';

export default function OrderTrackingPage() {
  const params = useParams();
  const secretSlug = params.secretSlug as string;
  
  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setIsLoading(true);
        const response = await apiClient.getOrder(secretSlug);
        setOrder(response.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load order');
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrder();
  }, [secretSlug]);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto space-y-6">
          <Skeleton className="h-12 w-3/4" />
          <Skeleton className="h-64 w-full" />
          <Skeleton className="h-48 w-full" />
        </div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-destructive">{error || 'Order not found'}</p>
        </div>
      </div>
    );
  }

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return <CheckCircle className="h-6 w-6 text-accent" />;
      case 'processing':
        return <Package className="h-6 w-6 text-primary" />;
      case 'shipped':
        return <Truck className="h-6 w-6 text-primary" />;
      default:
        return <Clock className="h-6 w-6 text-muted-foreground" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'bg-accent text-white';
      case 'processing':
        return 'bg-primary text-on-primary';
      case 'shipped':
        return 'bg-primary text-on-primary';
      case 'cancelled':
        return 'bg-destructive text-white';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'paid':
        return 'bg-accent text-white';
      case 'pending':
        return 'bg-warning text-white';
      case 'failed':
        return 'bg-destructive text-white';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex justify-center mb-4">
            {getStatusIcon(order.status)}
          </div>
          <h1 
            className="text-3xl font-bold text-foreground"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Order #{order.order_number}
          </h1>
          <div className="flex justify-center gap-2">
            <Badge className={getStatusColor(order.status)}>
              {order.status}
            </Badge>
            <Badge className={getPaymentStatusColor(order.payment_status)}>
              Payment: {order.payment_status}
            </Badge>
          </div>
        </div>

        {/* Payment Instructions */}
        {order.payment_instructions && order.payment_status.toLowerCase() === 'pending' && (
          <div className="bg-surface border border-border rounded-lg p-6 space-y-4">
            <h2 className="text-xl font-semibold text-foreground" style={{ fontFamily: 'var(--font-heading)' }}>
              Payment Instructions
            </h2>

            {order.payment_instructions.type === 'bank_transfer' && (
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Transfer to:</p>
                <div className="bg-background border border-border rounded-md p-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Bank</span>
                    <span className="text-sm font-medium">{order.payment_instructions.bank_name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Account Number</span>
                    <span className="text-sm font-medium font-mono">{order.payment_instructions.account_number}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Account Name</span>
                    <span className="text-sm font-medium">{order.payment_instructions.account_name}</span>
                  </div>
                  <div className="flex justify-between border-t border-border pt-2">
                    <span className="text-sm text-muted-foreground">Amount</span>
                    <span className="text-lg font-bold text-primary">
                      Rp {parseFloat(order.payment_instructions.amount).toLocaleString('id-ID')}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {order.payment_instructions.type === 'virtual_account' && (
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Virtual Account Number:</p>
                <div className="bg-background border border-border rounded-md p-4">
                  <p className="text-2xl font-bold font-mono text-center text-primary">
                    {order.payment_instructions.va_number}
                  </p>
                  <p className="text-sm text-center text-muted-foreground mt-2">
                    {order.payment_instructions.bank_name}
                  </p>
                </div>
              </div>
            )}

            {order.payment_instructions.type === 'qris' && order.payment_instructions.qr_code && (
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground text-center">Scan QR Code to pay:</p>
                <div className="flex justify-center">
                  <img 
                    src={order.payment_instructions.qr_code} 
                    alt="QRIS Code" 
                    className="w-64 h-64 border border-border rounded-md"
                  />
                </div>
              </div>
            )}

            {order.payment_instructions.expired_at && (
              <p className="text-sm text-destructive text-center">
                Expires at: {new Date(order.payment_instructions.expired_at).toLocaleString('id-ID')}
              </p>
            )}
          </div>
        )}

        {/* Order Items */}
        <div className="bg-surface border border-border rounded-lg p-6 space-y-4">
          <h2 className="text-xl font-semibold text-foreground" style={{ fontFamily: 'var(--font-heading)' }}>
            Order Items
          </h2>

          <div className="space-y-3">
            {order.items.map((item) => (
              <div key={item.id} className="flex justify-between items-start py-3 border-b border-border last:border-0">
                <div className="flex-1">
                  <p className="font-medium text-foreground">{item.product_name}</p>
                  {item.variant_name && (
                    <p className="text-sm text-muted-foreground">{item.variant_name}</p>
                  )}
                  <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                </div>
                <p className="font-medium text-foreground">
                  Rp {parseFloat(item.subtotal).toLocaleString('id-ID')}
                </p>
              </div>
            ))}
          </div>

          <div className="border-t border-border pt-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="text-foreground">Rp {parseFloat(order.subtotal).toLocaleString('id-ID')}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Shipping</span>
              <span className="text-foreground">Rp {parseFloat(order.shipping_cost).toLocaleString('id-ID')}</span>
            </div>
            <div className="flex justify-between border-t border-border pt-2">
              <span className="font-semibold text-foreground">Total</span>
              <span 
                className="text-xl font-bold text-primary"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                Rp {parseFloat(order.total).toLocaleString('id-ID')}
              </span>
            </div>
          </div>
        </div>

        {/* Shipping Address */}
        <div className="bg-surface border border-border rounded-lg p-6 space-y-4">
          <h2 className="text-xl font-semibold text-foreground" style={{ fontFamily: 'var(--font-heading)' }}>
            Shipping Address
          </h2>

          <div className="space-y-1 text-sm">
            <p className="font-medium text-foreground">{order.shipping_address.name}</p>
            <p className="text-muted-foreground">{order.shipping_address.phone}</p>
            <p className="text-muted-foreground">{order.shipping_address.email}</p>
            <p className="text-muted-foreground mt-2">{order.shipping_address.address}</p>
            <p className="text-muted-foreground">{order.shipping_address.postal_code}</p>
          </div>
        </div>

        {/* Order Info */}
        <div className="bg-surface border border-border rounded-lg p-6 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Payment Method</span>
            <span className="text-foreground font-medium">{order.payment_method}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Order Date</span>
            <span className="text-foreground">{new Date(order.created_at).toLocaleString('id-ID')}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
