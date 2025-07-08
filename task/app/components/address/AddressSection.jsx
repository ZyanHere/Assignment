'use client';

import { useState } from 'react';
import { Edit, Plus, MapPin, Star, Trash2 } from 'lucide-react';
import AddressModal from './AddressModal';
import { useAddress } from '@/lib/contexts/address-context';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function AddressSection({ onAddressSelect, selectedAddressId }) {
  const { 
    addresses, 
    primaryAddress, 
    loading, 
    error, 
    setAddressAsPrimary, 
    deleteAddress 
  } = useAddress();
  const [editingAddress, setEditingAddress] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const closeModal = () => {
    setEditingAddress(null);
    setShowAddModal(false);
  };

  const handleEditAddress = (address) => {
    setEditingAddress(address);
  };

  const handleSetPrimary = async (addressId) => {
    try {
      await setAddressAsPrimary(addressId);
    } catch (error) {
      console.error('Error setting primary address:', error);
    }
  };

  const handleDeleteAddress = async (addressId) => {
    if (window.confirm('Are you sure you want to delete this address?')) {
      try {
        await deleteAddress(addressId);
      } catch (error) {
        console.error('Error deleting address:', error);
      }
    }
  };

  const handleAddressSelect = (addressId) => {
    if (onAddressSelect) {
      onAddressSelect(addressId);
    }
  };

  const formatAddress = (address) => {
    if (!address) return '';
    
    const parts = [
      address.addressLine1,
      address.addressLine2,
      address.city,
      address.state,
      address.postalCode,
      address.country
    ].filter(Boolean);
    
    return parts.join(', ');
  };

  const getAddressTypeLabel = (type) => {
    const labels = {
      home: 'Home',
      work: 'Work',
      billing: 'Billing',
      shipping: 'Shipping',
      other: 'Other'
    };
    return labels[type] || type;
  };

  if (loading) {
    return (
      <div className="p-4 border rounded-lg">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
          <div className="h-3 bg-gray-200 rounded w-3/4 mb-1"></div>
          <div className="h-3 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Address Section Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Delivery Address</h2>
        <Button
          onClick={() => setShowAddModal(true)}
          variant="outline"
          size="sm"
          className="flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Address
        </Button>
      </div>

      {/* Error Display */}
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}

      {/* Addresses List */}
      <div className="space-y-3">
        {addresses.length === 0 ? (
          <div className="p-6 text-center border-2 border-dashed border-gray-300 rounded-lg">
            <MapPin className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-500 mb-3">No addresses found</p>
            <Button
              onClick={() => setShowAddModal(true)}
              variant="outline"
              size="sm"
            >
              Add Your First Address
            </Button>
          </div>
        ) : (
          addresses.map((address) => (
            <div
              key={address._id}
              className={`p-4 border rounded-lg cursor-pointer transition-all ${
                selectedAddressId === address._id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => handleAddressSelect(address._id)}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    {address.isDefault && (
                      <Badge variant="secondary" className="text-xs">
                        <Star className="w-3 h-3 mr-1" />
                        Primary
                      </Badge>
                    )}
                    <Badge variant="outline" className="text-xs">
                      {getAddressTypeLabel(address.addressType)}
                    </Badge>
                    {address.label && (
                      <Badge variant="outline" className="text-xs">
                        {address.label}
                      </Badge>
                    )}
                  </div>
                  
                  <p className="text-sm font-medium mb-1">
                    {formatAddress(address)}
                  </p>
                  
                  {address.nearestLandmark && (
                    <p className="text-xs text-gray-500 mb-1">
                      Near: {address.nearestLandmark}
                    </p>
                  )}
                  
                  {address.notes && (
                    <p className="text-xs text-gray-500">
                      Note: {address.notes}
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-1 ml-4">
                  {!address.isDefault && (
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSetPrimary(address._id);
                      }}
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0"
                      title="Set as primary"
                    >
                      <Star className="w-4 h-4" />
                    </Button>
                  )}
                  
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEditAddress(address);
                    }}
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0"
                    title="Edit address"
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  
                  {addresses.length > 1 && (
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteAddress(address._id);
                      }}
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
                      title="Delete address"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Primary Address Info */}
      {primaryAddress && (
        <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center gap-2">
            <Star className="w-4 h-4 text-green-600" />
            <p className="text-sm text-green-800">
              <strong>Primary Address:</strong> {formatAddress(primaryAddress)}
            </p>
          </div>
        </div>
      )}

      {/* Address Modal */}
      <AddressModal
        isOpen={!!editingAddress || showAddModal}
        onClose={closeModal}
        address={editingAddress}
        isEdit={!!editingAddress}
      />
    </>
  );
}
