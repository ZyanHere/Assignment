"use client";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle, Package, CreditCard, Home, Receipt } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/home/Header";
import Link from "next/link";

function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [orderDetails, setOrderDetails] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get parameters from URL (callback from Razorpay)
    const razorpay_payment_id = searchParams.get("razorpay_payment_id");
    const razorpay_order_id = searchParams.get("razorpay_order_id");
    const razorpay_signature = searchParams.get("razorpay_signature");
    
    // Get parameters from internal redirect
    const paymentId = searchParams.get('payment_id');
    const orderId = searchParams.get('order_id');
    const amount = searchParams.get('amount');

    // Check if this is a callback from Razorpay
    if (razorpay_payment_id && razorpay_order_id && razorpay_signature) {
      setPaymentDetails({
        paymentId: razorpay_payment_id,
        orderId: razorpay_order_id,
        signature: razorpay_signature,
        amount: 0, // Will be fetched from backend
        source: "razorpay_callback"
      });
      
      // Process the payment on backend
      processPaymentFromCallback({
        razorpay_payment_id,
        razorpay_order_id,
        razorpay_signature
      });
    } else if (paymentId && orderId) {
      // This is from our internal redirect
      setPaymentDetails({
        paymentId,
        orderId,
        amount: amount ? parseFloat(amount) : 0,
        source: "internal_redirect"
      });
      
      // Fetch order details
      fetchOrderDetails(orderId);
    } else {
      setLoading(false);
    }
  }, [searchParams]);

  const fetchOrderDetails = async (orderId) => {
    try {
      const response = await fetch(`/api/orders/${orderId}`);
      const data = await response.json();
      
      if (data.status === 'success') {
        setOrderDetails(data.data);
      }
    } catch (error) {
      console.error('Error fetching order details:', error);
    } finally {
      setLoading(false);
    }
  };

  const processPaymentFromCallback = async (paymentData) => {
    setIsProcessing(true);
    try {
      const response = await fetch('/api/payments/process', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          razorpay_payment_id: paymentData.razorpay_payment_id,
          razorpay_order_id: paymentData.razorpay_order_id,
          razorpay_signature: paymentData.razorpay_signature,
          payment_method: 'razorpay',
          payment_method_details: {
            source: 'callback'
          }
        })
      });

      if (response.ok) {
        const result = await response.json();
        // Update payment details with amount from backend
        setPaymentDetails(prev => ({
          ...prev,
          amount: result.data?.amount ? result.data.amount / 100 : 0 // Convert from paise
        }));
        
        // Fetch order details if we have order_id
        if (result.data?.order_id) {
          fetchOrderDetails(result.data.order_id);
        }
      } else {
        console.error('Failed to process payment from callback');
        setLoading(false);
      }
    } catch (error) {
      console.error('Error processing payment from callback:', error);
      setLoading(false);
    } finally {
      setIsProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading payment details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!paymentDetails) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <CheckCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold mb-2">Payment Success</h2>
            <p className="text-gray-600 mb-4">Your payment was successful!</p>
            <Button asChild>
              <Link href="/">
                <Home className="w-4 h-4 mr-2" />
                Go Home
              </Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-2xl mx-auto p-6">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Payment Successful!
          </h1>
          <p className="text-gray-600">
            Your order has been confirmed and payment has been processed successfully.
          </p>
          {isProcessing && (
            <p className="text-sm text-yellow-600 mt-2">
              Processing payment details...
            </p>
          )}
        </div>

        {/* Order Details Card */}
        {orderDetails && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Receipt className="w-5 h-5 mr-2" />
              Order Details
            </h2>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-600">Order Number:</span>
                <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">
                  {orderDetails.order_number}
                </span>
              </div>
              
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-600">Order Date:</span>
                <span className="text-sm">
                  {new Date(orderDetails.created_at).toLocaleDateString()}
                </span>
              </div>
              
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-600">Order Status:</span>
                <span className="text-sm font-medium text-green-600">
                  {orderDetails.status}
                </span>
              </div>
              
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-600">Total Amount:</span>
                <span className="text-2xl font-bold text-green-600">
                  ₹{orderDetails.total_amount}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Payment Details Card */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <CreditCard className="w-5 h-5 mr-2" />
            Payment Details
          </h2>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600">Payment ID:</span>
              <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">
                {paymentDetails.paymentId}
              </span>
            </div>
            
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600">Order ID:</span>
              <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">
                {paymentDetails.orderId}
              </span>
            </div>
            
            {paymentDetails.amount > 0 && (
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-600">Amount Paid:</span>
                <span className="text-2xl font-bold text-green-600">
                  ₹{paymentDetails.amount}
                </span>
              </div>
            )}
            
            <div className="flex justify-between items-center py-2 border-t border-gray-100">
              <span className="text-gray-600">Source:</span>
              <span className="text-sm text-gray-500 capitalize">
                {paymentDetails.source?.replace('_', ' ')}
              </span>
            </div>
          </div>
        </div>

        {/* Order Status Card */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Package className="w-5 h-5 mr-2" />
            Order Timeline
          </h2>
          
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-3">
                <CheckCircle className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-medium text-green-600">Payment Confirmed</p>
                <p className="text-sm text-gray-500">Your payment has been processed successfully</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mr-3">
                <div className="w-3 h-3 bg-white rounded-full"></div>
              </div>
              <div>
                <p className="font-medium text-blue-600">Order Processing</p>
                <p className="text-sm text-gray-500">Your order is being prepared</p>
              </div>
            </div>
            
            <div className="flex items-center opacity-50">
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center mr-3">
                <div className="w-3 h-3 bg-white rounded-full"></div>
              </div>
              <div>
                <p className="font-medium text-gray-400">Out for Delivery</p>
                <p className="text-sm text-gray-400">Your order will be delivered soon</p>
              </div>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">What's Next?</h2>
          <div className="space-y-3 text-sm">
            <p className="text-gray-600">
              • You'll receive an email confirmation with your order details
            </p>
            <p className="text-gray-600">
              • We'll send you tracking information once your order ships
            </p>
            <p className="text-gray-600">
              • You can track your order status in your account dashboard
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Button asChild className="flex-1">
            <Link href="/">
              <Home className="w-4 h-4 mr-2" />
              Continue Shopping
            </Link>
          </Button>
          
          {orderDetails && (
            <Button variant="outline" asChild className="flex-1">
              <Link href={`/orders/${orderDetails._id}`}>
                <Receipt className="w-4 h-4 mr-2" />
                View Order
              </Link>
            </Button>
          )}
        </div>

        {/* Contact Information */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600">
            Have questions about your order? Contact us at{' '}
            <a href="mailto:support@lastminutedeal.com" className="text-blue-600 hover:underline">
              support@lastminutedeal.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

// Loading component for Suspense fallback
function PaymentSuccessLoading() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading payment details...</p>
        </div>
      </div>
    </div>
  );
}

// Main component with Suspense wrapper
export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={<PaymentSuccessLoading />}>
      <PaymentSuccessContent />
    </Suspense>
  );
} 