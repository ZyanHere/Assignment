'use client';

import { useState } from 'react';
import { Edit } from 'lucide-react';
import AddressModal from './AddressModal';
import { useAddress } from '@/lib/contexts/address-context';

export default function AddressSection({ isLoading }) {
  const { primaryAddress, secondaryAddress } = useAddress();
  const [editingAddressType, setEditingAddressType] = useState(null);

  const closeModal = () => setEditingAddressType(null);

  return (
    <>
      {/* Address Selection */}
      <h2 className="text-lg font-semibold mt-6 mb-3">Address</h2>
      <div className="flex justify-around items-center gap-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-6xl">
          {/* Primary Address */}
          <div
            className={`p-4 border rounded-lg w-full relative ${
              isLoading ? 'opacity-50' : ''
            }`}
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-medium">Primary Address</h3>
              <button
                onClick={() =>
                  !isLoading && setEditingAddressType('primary')
                }
                className="text-gray-500 hover:text-blue-600"
              >
                <Edit size={18} />
              </button>
            </div>
            <p className="text-sm">
              {primaryAddress || 'Put your primary address'}
            </p>
          </div>

          {/* Secondary Address */}
          <div
            className={`p-4 border rounded-lg w-full relative ${
              isLoading ? 'opacity-50' : ''
            }`}
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-medium">Secondary Address</h3>
              <button
                onClick={() =>
                  !isLoading && setEditingAddressType('secondary')
                }
                className="text-gray-500 hover:text-blue-600"
              >
                <Edit size={18} />
              </button>
            </div>
            <p className="text-sm">
              {secondaryAddress || 'Put your secondary address'}
            </p>
          </div>
        </div>
      </div>

      <AddressModal
        isOpen={!!editingAddressType}
        onClose={closeModal}
        editingType={editingAddressType}
      />
    </>
  );
}
