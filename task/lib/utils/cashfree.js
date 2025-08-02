// Cashfree utility functions
// Using Cashfree SDK v1.0.5 (@cashfreepayments/cashfree-js)
// 
// This implementation uses the v1.0.5 SDK which is imported as a module
// and provides better TypeScript support and modern ES6+ features.

/**
 * Initialize Cashfree SDK v1.0.5
 * @param {string} mode - 'sandbox' or 'production'
 * @returns {Promise<Object>} Cashfree instance
 */
export const initializeCashfree = async (mode = 'sandbox') => {
  try {
    // Dynamic import to avoid SSR issues
    const cashfreeModule = await import('@cashfreepayments/cashfree-js');
    const cashfreeInstance = await cashfreeModule.load({
      mode: mode
    });
    
    return cashfreeInstance;
  } catch (error) {
    console.error('Error initializing Cashfree SDK:', error);
    throw new Error('Failed to initialize Cashfree SDK: ' + error.message);
  }
};

/**
 * Create Cashfree payment configuration for v1.0.5
 * @param {Object} orderData - Order data from backend
 * @param {Object} customerData - Customer information
 * @param {Object} options - Additional options
 * @returns {Object} Payment configuration
 */
export const createCashfreePaymentConfig = (orderData, customerData, options = {}) => {
  const {
    redirectTarget = "_modal",
    ...otherOptions
  } = options;

  return {
    paymentSessionId: orderData.orderToken || orderData.payment_session_id,
    redirectTarget: redirectTarget,
    ...otherOptions
  };
};

/**
 * Handle Cashfree payment response for v1.0.5
 * @param {Object} paymentResult - Payment result from Cashfree
 * @param {Object} orderData - Original order data
 * @returns {Object} Processed payment result
 */
export const handleCashfreePaymentResponse = (paymentResult, orderData) => {
  // Log the raw payment result for debugging
  console.log('Raw Cashfree payment result:', paymentResult);
  
  // Handle different response types from v1.0.5 SDK
  if (paymentResult.error) {
    console.log('Cashfree payment error:', paymentResult.error);
    return {
      success: false,
      error: paymentResult.error.message || 'Payment failed',
      data: {
        order_id: orderData.orderId || orderData.order_id,
        payment_status: 'failed',
        error_message: paymentResult.error.message,
        error_code: paymentResult.error.code
      }
    };
  }

  if (paymentResult.redirect) {
    console.log('Cashfree payment redirect:', paymentResult.redirect);
    return {
      success: false,
      error: 'Payment redirection required',
      data: {
        order_id: orderData.orderId || orderData.order_id,
        payment_status: 'redirect',
        redirect_url: paymentResult.redirect
      }
    };
  }

  if (paymentResult.paymentDetails) {
    const paymentDetails = paymentResult.paymentDetails;
    console.log('Cashfree payment details:', paymentDetails);
    
    // Extract reference_id with multiple fallback options
    let referenceId = paymentDetails.referenceId || 
                     paymentDetails.paymentId || 
                     paymentDetails.orderId || 
                     paymentDetails.transactionId ||
                     paymentDetails.id ||
                     paymentDetails.reference_id;
    
    console.log('Extracted reference_id:', referenceId);
    
    // If still no reference_id, use order_id as fallback
    if (!referenceId) {
      console.warn('No reference_id found in payment details, using order_id as fallback');
      referenceId = orderData.orderId || orderData.order_id;
    }
    
    // Validate that we have a reference_id
    if (!referenceId) {
      console.error('Unable to extract reference_id from payment response');
      return {
        success: false,
        error: 'Unable to extract reference_id from payment response',
        data: {
          order_id: orderData.orderId || orderData.order_id,
          payment_status: 'failed',
          error_message: 'Missing reference_id in payment response'
        }
      };
    }
    
    console.log('Final reference_id being used:', referenceId);
    
    return {
      success: true,
      data: {
        order_id: orderData.orderId || orderData.order_id,
        payment_id: paymentDetails.paymentId || paymentDetails.orderId,
        reference_id: referenceId,
        payment_status: 'success',
        payment_method: paymentDetails.paymentMethod,
        payment_method_details: {
          payment_method: paymentDetails.paymentMethod,
          card_network: paymentDetails.cardNetwork,
          bank_code: paymentDetails.bankCode,
          upi_id: paymentDetails.upiId,
          card_number: paymentDetails.cardNumber,
          card_type: paymentDetails.cardType,
        },
        signature: paymentDetails.signature || null, // Handle missing signature gracefully
        amount: orderData.amount || orderData.order_amount,
        currency: orderData.currency || orderData.order_currency
      }
    };
  }

  console.log('Unknown Cashfree payment response type');
  return {
    success: false,
    error: 'Unknown payment response',
    data: {
      order_id: orderData.orderId || orderData.order_id,
      payment_status: 'unknown'
    }
  };
};

/**
 * Verify Cashfree payment signature
 * @param {string} orderId - Order ID
 * @param {string} orderAmount - Order amount
 * @param {string} referenceId - Reference ID
 * @param {string} txStatus - Transaction status
 * @param {string} txTime - Transaction time
 * @param {string} signature - Signature to verify
 * @param {string} secretKey - Secret key for verification
 * @returns {boolean} Whether signature is valid
 */
export const verifyCashfreeSignature = (orderId, orderAmount, referenceId, txStatus, txTime, signature, secretKey) => {
  try {
    const crypto = require('crypto');
    const message = orderId + orderAmount + referenceId + txStatus + txTime;
    const expectedSignature = crypto
      .createHmac('sha256', secretKey)
      .update(message)
      .digest('hex');
    
    return signature === expectedSignature;
  } catch (error) {
    console.error('Error verifying Cashfree signature:', error);
    return false;
  }
};



/**
 * Format amount for Cashfree (convert to paise)
 * @param {number} amount - Amount in rupees
 * @returns {number} Amount in paise
 */
export const formatAmountForCashfree = (amount) => {
  return Math.round(Number(amount) * 100);
};

/**
 * Format amount from Cashfree (convert from paise)
 * @param {number} amount - Amount in paise
 * @returns {number} Amount in rupees
 */
export const formatAmountFromCashfree = (amount) => {
  return Number(amount) / 100;
};

/**
 * Get Cashfree environment mode
 * @returns {string} Environment mode
 */
export const getCashfreeEnvironment = () => {
  // Always use sandbox for testing, even in production
  return 'sandbox';
};

/**
 * Process Cashfree checkout with v1.0.5 SDK
 * @param {Object} cashfreeInstance - Cashfree SDK instance
 * @param {Object} checkoutOptions - Checkout options
 * @returns {Promise<Object>} Payment result
 */
export const processCashfreeCheckout = async (cashfreeInstance, checkoutOptions) => {
  try {
    const result = await cashfreeInstance.checkout(checkoutOptions);
    return result;
  } catch (error) {
    console.error('Cashfree checkout error:', error);
    throw error;
  }
};

/**
 * Create customer details object for Cashfree
 * @param {Object} user - User object
 * @returns {Object} Customer details
 */
export const createCustomerDetails = (user) => {
  return {
    customerId: user._id || user.id,
    customerName: `${user.firstName || user.name} ${user.lastName || ''}`.trim(),
    customerEmail: user.email,
    customerPhone: user.phone || user.mobile
  };
}; 