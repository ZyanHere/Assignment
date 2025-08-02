"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CheckCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

export default function CashfreeSuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [paymentData, setPaymentData] = useState(null);

  useEffect(() => {
    const handlePaymentSuccess = async () => {
      try {
        // Get payment data from URL parameters
        const orderId = searchParams.get('orderId');
        const paymentSessionId = searchParams.get('paymentSessionId');
        const referenceId = searchParams.get('referenceId');
        const orderAmount = searchParams.get('orderAmount');
        const txStatus = searchParams.get('txStatus');
        const txTime = searchParams.get('txTime');
        const signature = searchParams.get('signature');

        if (txStatus === 'SUCCESS') {
          setPaymentData({
            orderId,
            paymentSessionId,
            referenceId,
            orderAmount,
            txStatus,
            txTime,
            signature
          });

          // Process the successful payment (signature is optional)
          const response = await fetch('/api/payments/cashfree/process', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              order_id: orderId,
              payment_session_id: paymentSessionId,
              reference_id: referenceId,
              order_amount: orderAmount,
              tx_status: txStatus,
              tx_time: txTime,
              signature: signature || null // Handle missing signature gracefully
            })
          });

          const result = await response.json();
          
          if (result.success) {
            toast.success('Payment successful! Your order has been confirmed.');
          } else {
            toast.error('Payment verification failed. Please contact support.');
          }
        } else {
          toast.error('Payment was not successful. Please try again.');
          router.push('/payment-failed');
        }
      } catch (error) {
        console.error('Error processing payment success:', error);
        toast.error('Error processing payment. Please contact support.');
      } finally {
        setLoading(false);
      }
    };

    handlePaymentSuccess();
  }, [searchParams, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Processing your payment...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Payment Successful!
        </h1>
        <p className="text-gray-600 mb-6">
          Your payment has been processed successfully. You will receive a confirmation email shortly.
        </p>
        
        {paymentData && (
          <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
            <h3 className="font-semibold text-gray-900 mb-2">Payment Details:</h3>
            <div className="space-y-1 text-sm text-gray-600">
              <p><span className="font-medium">Order ID:</span> {paymentData.orderId}</p>
              <p><span className="font-medium">Reference ID:</span> {paymentData.referenceId}</p>
              <p><span className="font-medium">Amount:</span> ₹{paymentData.orderAmount}</p>
              <p><span className="font-medium">Status:</span> {paymentData.txStatus}</p>
            </div>
          </div>
        )}

        <div className="space-y-3">
          <Link href="/orders">
            <Button className="w-full bg-green-500 hover:bg-green-600 text-white">
              View My Orders
            </Button>
          </Link>
          <Link href="/">
            <Button variant="outline" className="w-full">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
} 