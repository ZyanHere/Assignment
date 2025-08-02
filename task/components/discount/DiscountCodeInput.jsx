// components/discount/DiscountCodeInput.jsx
'use client';

import React, { useState } from 'react';
import { Tag, X, CheckCircle, AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useDiscount } from '@/lib/contexts/discount-context';

export default function DiscountCodeInput({ cartDetails, className = '' }) {
  const [discountCode, setDiscountCode] = useState('');
  const {
    appliedDiscount,
    discountLoading,
    discountError,
    validateAndApplyDiscount,
    removeDiscount,
    clearDiscountError,
  } = useDiscount();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await validateAndApplyDiscount(discountCode, cartDetails);
    if (success) {
      setDiscountCode('');
    }
  };

  const handleRemoveDiscount = () => {
    removeDiscount();
  };

  const handleInputChange = (e) => {
    setDiscountCode(e.target.value.toUpperCase());
    if (discountError) {
      clearDiscountError();
    }
  };

  return (
    <div className={`space-y-3 ${className}`}>
      <h3 className="text-base sm:text-lg font-medium">Discount Code</h3>
      
      {appliedDiscount ? (
        <div className="bg-green-50 border border-green-200 rounded-lg p-3 sm:p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span className="text-sm sm:text-base font-medium text-green-800">
                {appliedDiscount.code}
              </span>
            </div>
            <Button
              onClick={handleRemoveDiscount}
              variant="ghost"
              size="sm"
              className="text-green-600 hover:text-green-800 hover:bg-green-100"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
          <p className="text-xs sm:text-sm text-green-700">
            {appliedDiscount.type === 'percentage' 
              ? `${appliedDiscount.value}% off`
              : `₹${appliedDiscount.value} off`
            }
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-2">
          <div className="flex space-x-2">
            <Input
              type="text"
              placeholder="Enter discount code"
              value={discountCode}
              onChange={handleInputChange}
              disabled={discountLoading}
              className="flex-1 text-sm sm:text-base"
            />
            <Button
              type="submit"
              disabled={discountLoading || !discountCode.trim()}
              size="sm"
              className="bg-orange-500 hover:bg-orange-600 text-white"
            >
              {discountLoading ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <Tag className="w-4 h-4" />
              )}
            </Button>
          </div>
          {discountError && (
            <p className="text-xs sm:text-sm text-red-600 flex items-center space-x-1">
              <AlertCircle className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>{discountError}</span>
            </p>
          )}
        </form>
      )}
    </div>
  );
} 