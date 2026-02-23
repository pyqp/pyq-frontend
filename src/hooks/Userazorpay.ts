import { useCallback, useRef } from 'react';
import { paymentApi } from '../api/Payment.api';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

// Extend window for Razorpay SDK
declare global {
  interface Window { Razorpay: any; }
}

// ── Lazy-load Razorpay checkout script ────────────────────────────────────────
const loadRazorpayScript = (): Promise<boolean> =>
  new Promise((resolve) => {
    if (window.Razorpay) return resolve(true);
    const script  = document.createElement('script');
    script.src    = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });

// ── Types ─────────────────────────────────────────────────────────────────────
export interface UseRazorpayOptions {
  onSuccess?: (paymentId: string, creditsAdded: number) => void;
  onFailure?: (error: string) => void;
  onDismiss?: () => void;
}

export interface UseRazorpayReturn {
  initiatePayment: (packageId: string, offerCode?: string) => Promise<void>;
}

// ── Hook ──────────────────────────────────────────────────────────────────────
export const useRazorpay = (options: UseRazorpayOptions = {}): UseRazorpayReturn => {
  const { user, refreshUser } = useAuth();
  // Keep options stable without triggering re-renders
  const optionsRef = useRef(options);
  optionsRef.current = options;

  const initiatePayment = useCallback(async (packageId: string, offerCode?: string) => {
    // 1. Load Razorpay SDK
    const scriptLoaded = await loadRazorpayScript();
    if (!scriptLoaded) {
      toast.error('Payment gateway failed to load. Please refresh.');
      return;
    }

    // 2. Create backend order
    const toastId = toast.loading('Creating order...');
    let order: Awaited<ReturnType<typeof paymentApi.createOrder>>['data']['data'];

    try {
      const { data: orderRes } = await paymentApi.createOrder(packageId, offerCode);
      order = orderRes.data;
      toast.dismiss(toastId);
    } catch (err: any) {
      toast.dismiss(toastId);
      toast.error(err.response?.data?.message || 'Failed to create order');
      optionsRef.current.onFailure?.(err.message);
      return;
    }

    // 3. Open Razorpay modal
    const rzpOptions: Record<string, any> = {
      key:         order.razorpayKey,
      amount:      order.amount * 100,       // paise
      currency:    order.currency,
      name:        'PYQPB',
      description: `${order.package.name} — ${order.package.credits} credits`,
      order_id:    order.orderId,
      prefill:     { name: user?.name, email: user?.email },
      theme:       { color: '#000000' },
      notes:       { packageId },

      handler: async (response: {
        razorpay_order_id:   string;
        razorpay_payment_id: string;
        razorpay_signature:  string;
      }) => {
        const verifyId = toast.loading('Verifying payment...');
        try {
          const { data: verifyRes } = await paymentApi.verifyPayment({
            orderId:   response.razorpay_order_id,
            paymentId: response.razorpay_payment_id,
            signature: response.razorpay_signature,
          });
          toast.dismiss(verifyId);
          toast.success(
            `🎉 Payment successful! ${verifyRes.data.creditsAdded} credits added to your account.`
          );
          // Refresh user from API to get accurate credit balance
          await refreshUser();
          optionsRef.current.onSuccess?.(
            response.razorpay_payment_id,
            verifyRes.data.creditsAdded
          );
        } catch (verifyErr: any) {
          toast.dismiss(verifyId);
          toast.error('Payment verification failed. Contact support if amount was deducted.');
          optionsRef.current.onFailure?.(verifyErr.message);
        }
      },

      modal: {
        ondismiss: () => {
          toast('Payment cancelled', { icon: 'ℹ️' });
          optionsRef.current.onDismiss?.();
        },
      },
    };

    const rzp = new window.Razorpay(rzpOptions);
    rzp.on('payment.failed', (response: any) => {
      toast.error(`Payment failed: ${response.error.description}`);
      optionsRef.current.onFailure?.(response.error.description);
    });
    rzp.open();
  }, [user, refreshUser]);

  return { initiatePayment };
};