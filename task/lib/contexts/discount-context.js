// lib/contexts/discount-context.js
'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import { validateDiscountCode, applyDiscountToCart, removeDiscountFromCart } from '@/lib/api/discount';
import toast from 'react-hot-toast';

const DiscountContext = createContext();

export function DiscountProvider({ children }) {
  const [appliedDiscount, setAppliedDiscount] = useState(null);
  const [discountLoading, setDiscountLoading] = useState(false);
  const [discountError, setDiscountError] = useState('');

  const validateAndApplyDiscount = useCallback(async (code, cartDetails) => {
    if (!code.trim()) {
      setDiscountError('Please enter a discount code');
      return false;
    }

    setDiscountLoading(true);
    setDiscountError('');

    try {
      const result = await validateDiscountCode(code, cartDetails);
      
      if (result.is_valid) {
        setAppliedDiscount(result.discount);
        toast.success('Discount code applied successfully!');
        return true;
      } else {
        setDiscountError(result.message || 'Invalid discount code');
        return false;
      }
    } catch (error) {
      console.error('Discount validation error:', error);
      const errorMessage = error.message || 'Failed to validate discount code';
      setDiscountError(errorMessage);
      toast.error(errorMessage);
      return false;
    } finally {
      setDiscountLoading(false);
    }
  }, []);

  const removeDiscount = useCallback(() => {
    setAppliedDiscount(null);
    setDiscountError('');
    toast.success('Discount removed');
  }, []);

  const clearDiscountError = useCallback(() => {
    setDiscountError('');
  }, []);

  const calculateDiscountAmount = useCallback((subtotal) => {
    if (!appliedDiscount) return 0;
    
    if (appliedDiscount.type === 'percentage') {
      return (subtotal * appliedDiscount.value) / 100;
    } else if (appliedDiscount.type === 'fixed_value') {
      return Math.min(appliedDiscount.value, subtotal);
    }
    return 0;
  }, [appliedDiscount]);

  const contextValue = {
    appliedDiscount,
    discountLoading,
    discountError,
    validateAndApplyDiscount,
    removeDiscount,
    clearDiscountError,
    calculateDiscountAmount,
  };

  return (
    <DiscountContext.Provider value={contextValue}>
      {children}
    </DiscountContext.Provider>
  );
}

export function useDiscount() {
  const ctx = useContext(DiscountContext);
  if (!ctx) throw new Error('useDiscount must be inside <DiscountProvider>');
  return ctx;
} 