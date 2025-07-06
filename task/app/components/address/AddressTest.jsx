'use client';

import { useState } from 'react';
import { useAddress } from '@/lib/contexts/address-context';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function AddressTest() {
  const { 
    addresses, 
    primaryAddress, 
    loading, 
    error, 
    createAddress, 
    updateAddress, 
    deleteAddress, 
    setAddressAsPrimary,
    fetchAddresses 
  } = useAddress();

  const [testResult, setTestResult] = useState('');

  const runTest = async () => {
    setTestResult('Running tests...');
    
    try {
      // Test 1: Create address
      const testAddress = {
        addressLine1: '123 Test Street',
        addressLine2: 'Apt 4B',
        city: 'Mumbai',
        state: 'Maharashtra',
        country: 'India',
        postalCode: '400001',
        addressType: 'home',
        isDefault: true,
        label: 'Test Home',
        notes: 'Test address for testing'
      };

      await createAddress(testAddress);
      setTestResult(prev => prev + '\n✅ Address created successfully');

      // Test 2: Fetch addresses
      await fetchAddresses();
      setTestResult(prev => prev + '\n✅ Addresses fetched successfully');

      // Test 3: Set as primary (if not already primary)
      if (addresses.length > 0) {
        const firstAddress = addresses[0];
        if (!firstAddress.isDefault) {
          await setAddressAsPrimary(firstAddress._id);
          setTestResult(prev => prev + '\n✅ Address set as primary');
        }
      }

      setTestResult(prev => prev + '\n🎉 All tests completed successfully!');

    } catch (error) {
      setTestResult(prev => prev + `\n❌ Test failed: ${error.message}`);
    }
  };

  const clearTestResult = () => {
    setTestResult('');
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Address Management Test</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Button onClick={runTest} disabled={loading}>
            {loading ? 'Running...' : 'Run Tests'}
          </Button>
          <Button onClick={clearTestResult} variant="outline">
            Clear Results
          </Button>
        </div>

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 text-sm">Error: {error}</p>
          </div>
        )}

        {testResult && (
          <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
            <pre className="text-sm whitespace-pre-wrap">{testResult}</pre>
          </div>
        )}

        <div className="space-y-2">
          <h3 className="font-medium">Current Addresses ({addresses.length})</h3>
          {addresses.map((address) => (
            <div key={address._id} className="p-2 border rounded text-sm">
              <div className="flex justify-between items-start">
                <div>
                  <p><strong>{address.addressLine1}</strong></p>
                  <p>{address.city}, {address.state} {address.postalCode}</p>
                  <p className="text-gray-500">
                    Type: {address.addressType} 
                    {address.isDefault && ' (Primary)'}
                  </p>
                </div>
                <div className="flex gap-1">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setAddressAsPrimary(address._id)}
                    disabled={address.isDefault}
                  >
                    Set Primary
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => deleteAddress(address._id)}
                    className="text-red-500"
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {primaryAddress && (
          <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
            <h3 className="font-medium text-green-800">Primary Address</h3>
            <p className="text-sm text-green-700">
              {primaryAddress.addressLine1}, {primaryAddress.city}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
} 