"use client";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { XCircle, AlertCircle } from "lucide-react";
import Link from "next/link";

function PaymentFailedContent() {
  const searchParams = useSearchParams();
  const [errorDetails, setErrorDetails] = useState(null);

  useEffect(() => {
    // Get error parameters from URL (callback from Razorpay)
    const error_code = searchParams.get("error_code");
    const error_description = searchParams.get("error_description");
    const error_source = searchParams.get("error_source");
    const error_step = searchParams.get("error_step");
    const error_reason = searchParams.get("error_reason");
    const razorpay_order_id = searchParams.get("razorpay_order_id");

    if (error_code || error_description) {
      setErrorDetails({
        error_code,
        error_description,
        error_source,
        error_step,
        error_reason,
        razorpay_order_id
      });
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <div className="text-center">
          <XCircle className="w-16 h-16 text-red-500 mx-auto" />
          
          <h1 className="mt-4 text-2xl font-bold text-gray-900">
            Payment Failed
          </h1>
          
          <p className="mt-2 text-gray-600">
            We are sorry, but your payment could not be processed. Please try again or contact support if the problem persists.
          </p>

          {errorDetails && (
            <div className="mt-6 p-4 bg-red-50 rounded-lg">
              <h3 className="font-semibold text-red-900 mb-2">Error Details:</h3>
              <div className="text-sm text-red-700 space-y-1">
                {errorDetails.error_code && (
                  <p><strong>Error Code:</strong> {errorDetails.error_code}</p>
                )}
                {errorDetails.error_description && (
                  <p><strong>Description:</strong> {errorDetails.error_description}</p>
                )}
                {errorDetails.error_source && (
                  <p><strong>Source:</strong> {errorDetails.error_source}</p>
                )}
                {errorDetails.error_step && (
                  <p><strong>Step:</strong> {errorDetails.error_step}</p>
                )}
                {errorDetails.error_reason && (
                  <p><strong>Reason:</strong> {errorDetails.error_reason}</p>
                )}
                {errorDetails.razorpay_order_id && (
                  <p><strong>Order ID:</strong> {errorDetails.razorpay_order_id}</p>
                )}
              </div>
            </div>
          )}

          <div className="mt-8 space-y-3">
            <Link href="/cart">
              <Button className="w-full bg-yellow-500 hover:bg-orange-600">
                Try Again
              </Button>
            </Link>
            
            <Link href="/">
              <Button variant="outline" className="w-full">
                Continue Shopping
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
    </div>
  );
}

// Loading component for Suspense fallback
function PaymentFailedLoading() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading error details...</p>
        </div>
      </div>
    </div>
  );
}

// Main component with Suspense wrapper
export default function PaymentFailedPage() {
  return (
    <Suspense fallback={<PaymentFailedLoading />}>
      <PaymentFailedContent />
    </Suspense>
  );
} 