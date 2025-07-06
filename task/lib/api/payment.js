import { api } from './axios';

function unwrapError(e) {
  if (e.response?.data?.message) throw new Error(e.response.data.message);
  throw e;
}

/** Create Razorpay order (Step 1 from official docs) */
export async function createRazorpayOrder(orderData) {
  try {
    const { data } = await api.post('/payments/create-order', {
      amount: orderData.amount, // Send raw amount, backend will convert to paise
      currency: orderData.currency || 'INR',
      receipt: orderData.receipt || `receipt_${Date.now()}`,
      notes: orderData.notes || {},
      partial_payment: false // Always disable partial payment
    });
    return data.data;
  } catch (e) {
    unwrapError(e);
  }
}

/** Create payment for an order */
export async function createPayment(orderId, paymentMethod, notes = '') {
  try {
    const { data } = await api.post('/payments/create', {
      order_id: orderId,
      payment_method: paymentMethod,
      notes
    });
    return data.data;
  } catch (e) {
    unwrapError(e);
  }
}

/** Process payment after successful Razorpay payment (Step 1.4 from official docs) */
export async function processPayment(paymentData) {
  try {
    const { data } = await api.post('/payments/process-test', {
      razorpay_payment_id: paymentData.razorpay_payment_id,
      razorpay_order_id: paymentData.razorpay_order_id,
      razorpay_signature: paymentData.razorpay_signature,
      payment_method: paymentData.payment_method,
      payment_method_details: paymentData.payment_method_details
    });
    
    // Return success response that matches what the frontend expects
    return {
      success: true,
      data: data.data
    };
  } catch (e) {
    // Return error response that matches what the frontend expects
    return {
      success: false,
      error: e.message || 'Payment processing failed'
    };
  }
}

/** Verify payment signature (Step 1.5 from official docs) */
export async function verifyPaymentSignature(orderId, paymentId, signature) {
  try {
    const { data } = await api.post('/payments/verify-signature', {
      order_id: orderId,
      razorpay_payment_id: paymentId,
      razorpay_signature: signature
    });
    return data.data;
  } catch (e) {
    unwrapError(e);
  }
}

/** Get payment details */
export async function getPaymentDetails(paymentId) {
  try {
    const { data } = await api.get(`/payments/${paymentId}`);
    return data.data;
  } catch (e) {
    unwrapError(e);
  }
}

/** Verify payment status (Step 1.6 from official docs) */
export async function verifyPaymentStatus(paymentId) {
  try {
    const { data } = await api.get(`/payments/${paymentId}/verify`);
    return data.data;
  } catch (e) {
    unwrapError(e);
  }
}

/** Cancel payment */
export async function cancelPayment(paymentId) {
  try {
    const { data } = await api.post(`/payments/${paymentId}/cancel`);
    return data.data;
  } catch (e) {
    unwrapError(e);
  }
}

/** Create refund */
export async function createRefund(paymentId, refundData) {
  try {
    const { data } = await api.post(`/payments/${paymentId}/refund`, refundData);
    return data.data;
  } catch (e) {
    unwrapError(e);
  }
}

/** Get customer payments */
export async function getCustomerPayments(page = 1, limit = 10) {
  try {
    const { data } = await api.get(`/payments/customer/payments?page=${page}&limit=${limit}`);
    return data.data;
  } catch (e) {
    unwrapError(e);
  }
}

/** Get order payments */
export async function getOrderPayments(orderId) {
  try {
    const { data } = await api.get(`/payments/order/${orderId}`);
    return data.data;
  } catch (e) {
    unwrapError(e);
  }
}

/** Complete checkout flow following official Razorpay docs */
export async function completeCheckout(checkoutData) {
  try {
    // Step 1: Create order
    const orderData = await createRazorpayOrder({
      amount: checkoutData.amount,
      currency: checkoutData.currency || 'INR',
      receipt: checkoutData.receipt,
      notes: checkoutData.notes
    });

    // Step 2: Return order data for frontend checkout
    return {
      success: true,
      order: orderData,
      key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID // Frontend key
    };
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
} 