// components/discount/DiscountSummary.jsx
'use client';

import React from 'react';
import { useDiscount } from '@/lib/contexts/discount-context';

export default function DiscountSummary({ subtotal, className = '' }) {
  const { appliedDiscount, calculateDiscountAmount } = useDiscount();

  if (!appliedDiscount) return null;

  const discountAmount = calculateDiscountAmount(subtotal);

  return (
    <div className={`space-y-2 ${className}`}>
      <div className="flex justify-between text-sm sm:text-base text-green-600">
        <span>Discount ({appliedDiscount.code})</span>
        <span>-₹{discountAmount.toFixed(2)}</span>
      </div>
      
      <div className="text-xs text-green-600 text-center">
        You saved ₹{discountAmount.toFixed(2)}!
      </div>
    </div>
  );
} 