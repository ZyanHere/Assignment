// lib/utils/razorpay.js

// Load Razorpay script dynamically
export const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(window.Razorpay);
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(window.Razorpay);
    script.onerror = () => {
      throw new Error('Failed to load Razorpay script');
    };
    document.body.appendChild(script);
  });
};

// Simple initialize function for basic Razorpay usage
export const initializeRazorpay = async () => {
  try {
    const Razorpay = await loadRazorpayScript();
    return Razorpay;
  } catch (error) {
    console.error('Failed to initialize Razorpay:', error);
    return null;
  }
};

// Initialize Razorpay payment using callbacks (our preferred approach)
export const initializeRazorpayPayment = async (paymentData, callbacks = {}) => {
  try {
    const Razorpay = await loadRazorpayScript();
    
    // Following official Razorpay documentation structure
    const options = {
      key: paymentData.key_id, // Enter the Key ID generated from the Dashboard
      amount: paymentData.amount, // Amount is in currency subunits (paise for INR)
      currency: paymentData.currency || 'INR',
      name: paymentData.name || 'Last Minute Deal', // your business name
      description: paymentData.description || 'Payment for your order',
      image: paymentData.image || 'https://example.com/your_logo',
      order_id: paymentData.razorpay_order_id, // Pass the `id` obtained in the response of Step 1
      prefill: {
        name: paymentData.customer_details?.name || '',
        email: paymentData.customer_details?.email || '',
        contact: paymentData.customer_details?.phone || ''
      },
      notes: {
        order_id: paymentData.order_id,
        customer_id: paymentData.customer_id,
        ...paymentData.notes
      },
      theme: {
        color: paymentData.theme?.color || '#F59E0B' // Yellow color matching your theme
      },
      modal: {
        ondismiss: function () {
          if (callbacks.onDismiss) {
            callbacks.onDismiss('Payment cancelled by user');
          }
        },
      }
    };

    const rzp = new Razorpay(options);
    
    // Handle payment events using callbacks (following official docs structure)
    rzp.on('payment.failed', function (response) {
      // Following official docs: alert(response.error.code);
      console.log('Payment failed:', response.error);
      
      if (callbacks.onFailure) {
        callbacks.onFailure(response);
      } else {
        // Default redirect to failure page with error details
        const errorParams = new URLSearchParams({
          error_code: response.error.code || '',
          error_description: response.error.description || '',
          error_source: response.error.source || '',
          error_step: response.error.step || '',
          error_reason: response.error.reason || '',
          razorpay_order_id: paymentData.razorpay_order_id || ''
        });
        window.location.href = `/payment-failed?${errorParams.toString()}`;
      }
    });

    rzp.on('payment.cancelled', function () {
      if (callbacks.onCancel) {
        callbacks.onCancel();
      } else {
        // Default redirect
        window.location.href = '/payment-failed?error_description=Payment cancelled by user';
      }
    });

    // Handle success through the handler function (following official docs)
    rzp.on('payment.success', function (response) {
      // Following official docs: alert(response.razorpay_payment_id);
      console.log('Payment successful:', response);
      
      if (callbacks.onSuccess) {
        callbacks.onSuccess(response);
      } else {
        // Default redirect to success page with payment parameters
        const successParams = new URLSearchParams({
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_order_id: response.razorpay_order_id,
          razorpay_signature: response.razorpay_signature
        });
        
        window.location.href = `/payment-success?${successParams.toString()}`;
      }
    });

    rzp.open();
  } catch (error) {
    if (callbacks.onError) {
      callbacks.onError(error);
    } else {
      throw new Error(`Failed to initialize Razorpay: ${error.message}`);
    }
  }
};

// Alternative initialization using handler function (like official docs)
export const initializeRazorpayWithHandler = async (paymentData, handlerFunction) => {
  try {
    const Razorpay = await loadRazorpayScript();
    
    const options = {
      key: paymentData.key_id,
      amount: paymentData.amount,
      currency: paymentData.currency || 'INR',
      name: paymentData.name || 'Last Minute Deal',
      description: paymentData.description || 'Payment for your order',
      image: paymentData.image || 'https://example.com/your_logo',
      order_id: paymentData.razorpay_order_id,
      handler: function (response) {
        // Following official docs exactly
        console.log('Payment ID:', response.razorpay_payment_id);
        console.log('Order ID:', response.razorpay_order_id);
        console.log('Signature:', response.razorpay_signature);
        
        if (handlerFunction) {
          handlerFunction(response);
        }
      },
      prefill: {
        name: paymentData.customer_details?.name || '',
        email: paymentData.customer_details?.email || '',
        contact: paymentData.customer_details?.phone || ''
      },
      notes: {
        order_id: paymentData.order_id,
        customer_id: paymentData.customer_id,
        ...paymentData.notes
      },
      theme: {
        color: paymentData.theme?.color || '#F59E0B'
      },
      modal: {
        ondismiss: function () {
          console.log('Modal dismissed by user');
          // Redirect to failure page if modal is dismissed
          window.location.href = '/payment-failed?error_description=Payment cancelled by user';
        },
      }
    };

    const rzp = new Razorpay(options);
    
    // Add failure handler like official docs
    rzp.on('payment.failed', function (response) {
      console.log('Error Code:', response.error.code);
      console.log('Error Description:', response.error.description);
      console.log('Error Source:', response.error.source);
      console.log('Error Step:', response.error.step);
      console.log('Error Reason:', response.error.reason);
      console.log('Order ID:', response.error.metadata?.order_id);
      console.log('Payment ID:', response.error.metadata?.payment_id);
      
      // Redirect to failure page with error details
      const errorParams = new URLSearchParams({
        error_code: response.error.code || '',
        error_description: response.error.description || '',
        error_source: response.error.source || '',
        error_step: response.error.step || '',
        error_reason: response.error.reason || '',
        razorpay_order_id: paymentData.razorpay_order_id || ''
      });
      
      window.location.href = `/payment-failed?${errorParams.toString()}`;
    });

    // Add cancel handler
    rzp.on('payment.cancelled', function () {
      console.log('Payment cancelled by user');
      window.location.href = '/payment-failed?error_description=Payment cancelled by user';
    });

    rzp.open();
  } catch (error) {
    console.error('Failed to initialize Razorpay:', error);
    throw new Error(`Failed to initialize Razorpay: ${error.message}`);
  }
};

// Format amount for Razorpay (convert to paise) - Following official docs
export const formatAmountForRazorpay = (amount) => {
  // Amount should be in smallest currency subunit (paise for INR)
  // For INR: ₹299.00 = 29900 paise
  return Math.round(amount * 100);
};

// Format amount for display (convert from paise)
export const formatAmountForDisplay = (amount) => {
  return (amount / 100).toFixed(2);
};

// Validate payment response as per official docs
export const validatePaymentResponse = (response) => {
  if (!response.razorpay_payment_id || !response.razorpay_order_id || !response.razorpay_signature) {
    throw new Error('Invalid payment response from Razorpay');
  }
  return true;
};

// Generate signature for verification (server-side)
export const generateSignature = (orderId, paymentId, secret) => {
  const crypto = require('crypto');
  const text = `${orderId}|${paymentId}`;
  return crypto
    .createHmac('sha256', secret)
    .update(text)
    .digest('hex');
};

// Verify payment signature as per official docs
export const verifyPaymentSignature = (orderId, paymentId, signature, secret) => {
  const generatedSignature = generateSignature(orderId, paymentId, secret);
  return generatedSignature === signature;
};

// Test card numbers for development (from official docs)
export const TEST_CARDS = {
  VISA: '4111 1111 1111 1111',
  MASTERCARD: '5555 5555 5555 4444',
  RUPAY: '6073 8400 0000 0000',
  AMEX: '3782 822463 10005'
};

// Test UPI IDs for development (from official docs)
export const TEST_UPI_IDS = {
  SUCCESS: 'success@razorpay',
  FAILURE: 'failure@razorpay'
}; 