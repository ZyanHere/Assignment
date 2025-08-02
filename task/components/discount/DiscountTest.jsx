// components/discount/DiscountTest.jsx
'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useDiscount } from '@/lib/contexts/discount-context';
import toast from 'react-hot-toast';

export default function DiscountTest() {
  const [testCode, setTestCode] = useState('');
  const { appliedDiscount, validateAndApplyDiscount, removeDiscount } = useDiscount();

  const handleTestDiscount = async () => {
    if (!testCode.trim()) {
      toast.error('Please enter a test discount code');
      return;
    }

    // Mock cart details for testing
    const mockCartDetails = {
      total_amount: 1000,
      items: [
        {
          category: 'Apparel',
          subcategory: 'Tops & T-Shirts',
          quantity: 2,
          price: 500
        }
      ]
    };

    const success = await validateAndApplyDiscount(testCode, mockCartDetails);
    if (success) {
      setTestCode('');
    }
  };

  return (
    <div className="p-4 border rounded-lg bg-gray-50">
      <h3 className="text-lg font-semibold mb-4">Discount System Test</h3>
      
      <div className="space-y-4">
        <div>
          <p className="text-sm text-gray-600 mb-2">
            Test discount codes: <code>SAVE10</code> (10% off), <code>SAVE50</code> (₹50 off)
          </p>
          <div className="flex space-x-2">
            <Input
              type="text"
              placeholder="Enter test discount code"
              value={testCode}
              onChange={(e) => setTestCode(e.target.value.toUpperCase())}
              className="flex-1"
            />
            <Button onClick={handleTestDiscount} className="bg-blue-500 hover:bg-blue-600">
              Test
            </Button>
          </div>
        </div>

        {appliedDiscount && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-3">
            <h4 className="font-medium text-green-800 mb-2">Applied Discount:</h4>
            <p className="text-sm text-green-700">
              Code: <strong>{appliedDiscount.code}</strong>
            </p>
            <p className="text-sm text-green-700">
              Type: <strong>{appliedDiscount.type}</strong>
            </p>
            <p className="text-sm text-green-700">
              Value: <strong>{appliedDiscount.value}</strong>
            </p>
            <Button 
              onClick={removeDiscount}
              variant="outline"
              size="sm"
              className="mt-2"
            >
              Remove Discount
            </Button>
          </div>
        )}

        <div className="text-xs text-gray-500">
          <p>This is a test component to verify the discount system functionality.</p>
          <p>In a real application, this would be integrated into the cart and checkout flows.</p>
        </div>
      </div>
    </div>
  );
} 