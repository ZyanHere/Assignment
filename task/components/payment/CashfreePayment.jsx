"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { createCashfreeOrder, processCashfreePayment } from "@/lib/api/cashfree";
import { useSelectedItems } from "@/lib/contexts/selected-items-context";
import { toast } from "react-hot-toast";
import { initializeCashfree, createCashfreePaymentConfig, handleCashfreePaymentResponse, processCashfreeCheckout } from "@/lib/utils/cashfree";

const CashfreePayment = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [cashfree, setCashfree] = useState(null);
  const router = useRouter();
  const { selectedItems } = useSelectedItems();

  // Calculate total amount
  const totalAmount = selectedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0) + 20; // Adding transaction fee

  // Initialize Cashfree SDK
  useEffect(() => {
    const loadCashfreeSDK = async () => {
      try {
        const cashfreeInstance = await initializeCashfree();
        setCashfree(cashfreeInstance);
      } catch (error) {
        console.error('Error loading Cashfree SDK:', error);
        setError('Failed to load payment gateway');
      }
    };

    loadCashfreeSDK();
  }, []);

  const handlePayment = async () => {
    setIsLoading(true);
    setError("");

    try {
      // Step 1: Create Cashfree order
      const orderData = await createCashfreeOrder({
        amount: totalAmount,
        currency: 'INR',
        orderId: `order_${Date.now()}`,
        customerDetails: {
          customerId: 'temp-customer-id', // This should come from user context
          customerName: 'John Doe', // This should come from user context
          customerEmail: 'john@example.com', // This should come from user context
          customerPhone: '1234567890', // This should come from user context
        },
        orderNote: 'Payment for order',
        orderTags: {}
      });

      // Step 2: Initialize Cashfree payment with new SDK
      if (cashfree && orderData) {
        const paymentConfig = createCashfreePaymentConfig(orderData, {
          customerName: 'John Doe', // This should come from user context
          customerEmail: 'john@example.com', // This should come from user context
          customerPhone: '1234567890', // This should come from user context
        }, {
          redirectTarget: "_modal"
        });

        // Step 3: Process checkout with new SDK
        const paymentResult = await processCashfreeCheckout(cashfree, paymentConfig);
        
        // Step 4: Handle payment response
        const processedResult = handleCashfreePaymentResponse(paymentResult, orderData);

        if (processedResult.success) {
          // Step 5: Process payment on backend
                     const processResult = await processCashfreePayment({
             order_id: orderData.order_id,
             order_number: orderData.order_id,
             customer_id: 'temp-customer-id', // This should come from user context
             amount: parseFloat(totalAmount), // Convert to number
             payment_method: 'cashfree',
             cashfree_order_id: orderData.cashfree_order_id || orderData.order_id,
             reference_id: processedResult.data.reference_id,
             payment_status: 'success',
             payment_method_details: processedResult.data.payment_method_details || {},
             // Only include signature if it's available from the SDK
             ...(processedResult.data.signature && { signature: processedResult.data.signature }),
             tx_time: processedResult.data.tx_time || new Date().toISOString()
           });

          if (processResult.success) {
            toast.success('Payment successful!');
            // Redirect to success page or update order status
            router.push('/payment-success');
          } else {
            setError(processResult.error || 'Payment processing failed');
            toast.error('Payment processing failed');
          }
        } else {
          setError(processedResult.error || 'Payment failed');
          toast.error('Payment failed');
        }
      } else {
        setError('Payment gateway not available');
        toast.error('Payment gateway not available');
      }
    } catch (error) {
      console.error('Payment error:', error);
      setError(error.message || 'Payment failed');
      toast.error('Payment failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUPIPayment = async () => {
    setIsLoading(true);
    setError("");

    try {
      // Create Cashfree order for UPI payment
      const orderData = await createCashfreeOrder({
        amount: totalAmount,
        currency: 'INR',
        orderId: `order_${Date.now()}`,
        customerDetails: {
          customerId: 'temp-customer-id',
          customerName: 'John Doe',
          customerEmail: 'john@example.com',
          customerPhone: '1234567890',
        },
        orderNote: 'UPI Payment for order',
        orderTags: { payment_method: 'upi' }
      });

      if (cashfree && orderData) {
        const upiConfig = createCashfreePaymentConfig(orderData, {
          customerName: 'John Doe',
          customerEmail: 'john@example.com',
          customerPhone: '1234567890',
        }, {
          redirectTarget: "_modal",
          paymentModes: ['upi']
        });

        const paymentResult = await processCashfreeCheckout(cashfree, upiConfig);
        const processedResult = handleCashfreePaymentResponse(paymentResult, orderData);

        if (processedResult.success) {
                     const processResult = await processCashfreePayment({
             order_id: orderData.order_id,
             order_number: orderData.order_id,
             customer_id: 'temp-customer-id',
             amount: parseFloat(totalAmount), // Convert to number
             payment_method: 'upi',
             cashfree_order_id: orderData.cashfree_order_id || orderData.order_id,
             reference_id: processedResult.data.reference_id,
             payment_status: 'success',
             payment_method_details: {
               payment_method: 'upi',
               upi_id: processedResult.data.payment_method_details?.upi_id,
             },
             // Only include signature if it's available from the SDK
             ...(processedResult.data.signature && { signature: processedResult.data.signature }),
             tx_time: processedResult.data.tx_time || new Date().toISOString()
           });

          if (processResult.success) {
            toast.success('UPI Payment successful!');
            router.push('/payment-success');
          } else {
            setError(processResult.error || 'Payment processing failed');
            toast.error('Payment processing failed');
          }
        } else {
          setError(processedResult.error || 'UPI Payment failed');
          toast.error('UPI Payment failed');
        }
      }
    } catch (error) {
      console.error('UPI Payment error:', error);
      setError(error.message || 'UPI Payment failed');
      toast.error('UPI Payment failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4">Cashfree Payment</h3>
        
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Total Amount:</span>
            <span className="text-lg font-semibold">₹{totalAmount}</span>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          <div className="space-y-3">
            <Button
              onClick={handlePayment}
              disabled={isLoading || !cashfree}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            >
              {isLoading ? 'Processing...' : !cashfree ? 'Loading Payment Gateway...' : 'Pay with Cashfree'}
            </Button>

            <Button
              onClick={handleUPIPayment}
              disabled={isLoading || !cashfree}
              variant="outline"
              className="w-full"
            >
              {isLoading ? 'Processing...' : !cashfree ? 'Loading Payment Gateway...' : 'Pay with UPI'}
            </Button>
          </div>

          <div className="text-sm text-gray-500 text-center">
            Secure payment powered by Cashfree
          </div>
        </div>
      </div>
    </div>
  );
};

export default CashfreePayment; 