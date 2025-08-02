import { api } from './axios';

function unwrapError(e) {
  if (e.response?.data?.message) throw new Error(e.response.data.message);
  throw e;
}

/** Create Cashfree order (Step 1 from official docs) */
export async function createCashfreeOrder(orderData) {
  try {
    const { data } = await api.post('/lmd/api/v1/payments/cashfree/create-order', {
      amount: orderData.amount,
      currency: orderData.currency || 'INR',
      orderId: orderData.orderId || `order_${Date.now()}`,
      customerDetails: orderData.customerDetails,
      orderNote: orderData.orderNote || 'Payment for order',
      orderTags: orderData.orderTags || {}
    });
    return data.data;
  } catch (e) {
    unwrapError(e);
  }
}

/** Process Cashfree payment after successful payment on frontend (Step 1.4 from official docs) */
export async function processCashfreePayment(paymentData) {
  try {
    const { data } = await api.post('/lmd/api/v1/payments/cashfree/process', {
      order_id: paymentData.order_id,
      order_number: paymentData.order_number,
      customer_id: paymentData.customer_id,
      amount: paymentData.amount,
      payment_method: paymentData.payment_method || 'cashfree',
      cashfree_order_id: paymentData.cashfree_order_id,
      reference_id: paymentData.reference_id,
      payment_status: paymentData.payment_status,
      payment_method_details: paymentData.payment_method_details,
      signature: paymentData.signature
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

/** Verify Cashfree payment signature (Step 1.5 from official docs) */
export async function verifyCashfreePaymentSignature(orderId, paymentId, signature) {
  try {
    const { data } = await api.post('/lmd/api/v1/payments/cashfree/verify-signature', {
      order_id: orderId,
      cashfree_payment_id: paymentId,
      cashfree_signature: signature
    });
    return data.data;
  } catch (e) {
    unwrapError(e);
  }
}

/** Get Cashfree payment details */
export async function getCashfreePaymentDetails(paymentId) {
  try {
    const { data } = await api.get(`/lmd/api/v1/payments/cashfree/${paymentId}`);
    return data.data;
  } catch (e) {
    unwrapError(e);
  }
}

/** Verify Cashfree payment status (Step 1.6 from official docs) */
export async function verifyCashfreePaymentStatus(paymentId) {
  try {
    const { data } = await api.get(`/lmd/api/v1/payments/cashfree/${paymentId}/verify`);
    return data.data;
  } catch (e) {
    unwrapError(e);
  }
}

/** Create Cashfree refund */
export async function createCashfreeRefund(paymentId, refundData) {
  try {
    const { data } = await api.post(`/lmd/api/v1/payments/cashfree/${paymentId}/refund`, refundData);
    return data.data;
  } catch (e) {
    unwrapError(e);
  }
}

/** Get customer's Cashfree payments */
export async function getCashfreeCustomerPayments(page = 1, limit = 10) {
  try {
    const { data } = await api.get(`/lmd/api/v1/payments/cashfree/customer/payments?page=${page}&limit=${limit}`);
    return data.data;
  } catch (e) {
    unwrapError(e);
  }
}

/** Get Cashfree payments for a specific order */
export async function getCashfreeOrderPayments(orderId) {
  try {
    const { data } = await api.get(`/lmd/api/v1/payments/cashfree/order/${orderId}`);
    return data.data;
  } catch (e) {
    unwrapError(e);
  }
}

/** Complete Cashfree checkout flow following official docs */
export async function completeCashfreeCheckout(checkoutData) {
  try {
    // Step 1: Create order
    const orderData = await createCashfreeOrder({
      amount: checkoutData.amount,
      currency: checkoutData.currency || 'INR',
      orderId: checkoutData.orderId,
      customerDetails: checkoutData.customerDetails,
      orderNote: checkoutData.orderNote,
      orderTags: checkoutData.orderTags
    });

    // Step 2: Return order data for frontend checkout
    return {
      success: true,
      order: orderData,
      client_id: process.env.NEXT_PUBLIC_CASHFREE_CLIENT_ID // Frontend key
    };
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
} 