"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { XCircle, ArrowLeft, RefreshCw } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

export default function CashfreeFailurePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [paymentData, setPaymentData] = useState(null);

  useEffect(() => {
    // Get payment data from URL parameters
    const orderId = searchParams.get('orderId');
    const paymentSessionId = searchParams.get('paymentSessionId');
    const referenceId = searchParams.get('referenceId');
    const orderAmount = searchParams.get('orderAmount');
    const txStatus = searchParams.get('txStatus');
    const txTime = searchParams.get('txTime');
    const errorMessage = searchParams.get('errorMessage');

    setPaymentData({
      orderId,
      paymentSessionId,
      referenceId,
      orderAmount,
      txStatus,
      txTime,
      errorMessage
    });

    if (txStatus === 'FAILED') {
      toast.error('Payment failed. Please try again.');
    } else if (txStatus === 'CANCELLED') {
      toast.error('Payment was cancelled.');
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Payment Failed
        </h1>
        <p className="text-gray-600 mb-6">
          Unfortunately, your payment could not be processed. Please try again or contact support if the problem persists.
        </p>
        
        {paymentData && (
          <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
            <h3 className="font-semibold text-gray-900 mb-2">Payment Details:</h3>
            <div className="space-y-1 text-sm text-gray-600">
              <p><span className="font-medium">Order ID:</span> {paymentData.orderId}</p>
              {paymentData.referenceId && (
                <p><span className="font-medium">Reference ID:</span> {paymentData.referenceId}</p>
              )}
              <p><span className="font-medium">Amount:</span> ₹{paymentData.orderAmount}</p>
              <p><span className="font-medium">Status:</span> {paymentData.txStatus}</p>
              {paymentData.errorMessage && (
                <p><span className="font-medium">Error:</span> {paymentData.errorMessage}</p>
              )}
            </div>
          </div>
        )}

        <div className="space-y-3">
          <Button 
            onClick={() => router.back()}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Try Again
          </Button>
          <Link href="/">
            <Button variant="outline" className="w-full">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          <Link href="/contact">
            <Button variant="outline" className="w-full">
              Contact Support
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
} 