// Test file for Cashfree initialization
import { initializeCashfree, processCashfreeCheckout } from './cashfree';

// Test function to verify Cashfree initialization
export const testCashfreeInitialization = async () => {
  try {
    console.log('Testing Cashfree initialization...');
    
    // Test initialization with new SDK
    const cashfree = await initializeCashfree('sandbox');
    console.log('✓ Cashfree initialized successfully:', cashfree);
    
    return { success: true, cashfree };
  } catch (error) {
    console.error('✗ Cashfree initialization failed:', error);
    return { success: false, error: error.message };
  }
};

// Test function to verify Cashfree checkout functionality
export const testCashfreeCheckout = async (orderToken) => {
  try {
    console.log('Testing Cashfree checkout...');
    
    const cashfree = await initializeCashfree('sandbox');
    
    const checkoutOptions = {
      paymentSessionId: orderToken,
      redirectTarget: "_modal"
    };
    
    console.log('✓ Cashfree checkout options created:', checkoutOptions);
    
    return { success: true, cashfree, checkoutOptions };
  } catch (error) {
    console.error('✗ Cashfree checkout test failed:', error);
    return { success: false, error: error.message };
  }
};

// Test function to verify Cashfree environment
export const testCashfreeEnvironment = () => {
  // Always use sandbox for testing, even in production
const env = 'sandbox';
  console.log(`✓ Cashfree environment: ${env}`);
  return env;
};

// Test function to verify payment processing data structure
export const testPaymentProcessingData = () => {
  const testData = {
    order_id: "test_order_123",
    order_number: "order_test_123",
    customer_id: "customer_123",
    amount: 1000.00, // Number, not string
    payment_method: "cashfree",
    cashfree_order_id: "cf_order_123",
    reference_id: "ref_123456789", // Required field
    payment_status: "success",
    payment_method_details: {
      payment_method: "card",
      card_network: "visa",
      bank_code: "HDFC",
      upi_id: null
    },
    signature: "sig_123456789_abc123def" // Required field
  };
  
  console.log('✓ Payment processing test data structure:', testData);
  return testData;
};

 