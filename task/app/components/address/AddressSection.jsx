'use client';

import { useState } from 'react';
import { Edit, Plus, MapPin, Star, Trash2 } from 'lucide-react';
import AddressModal from './AddressModal';
import { useDispatch } from 'react-redux';
import { 
  deleteUserAddress, 
  setPrimaryAddress 
} from '@/lib/redux/user/userSlice';
import { useAuth } from '@/lib/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import toast from 'react-hot-toast';

export default function AddressSection({ onAddressSelect, selectedAddressId }) {
  const dispatch = useDispatch();
  const { 
    addresses, 
    primaryAddress, 
    addressLoading, 
    isAuthenticated,
    session 
  } = useAuth();
  
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
    if (!isAuthenticated || !session?.user?.token) {
      toast.error("Authentication required");
      return;
    }

    try {
      await dispatch(setPrimaryAddress({ 
        token: session.user.token, 
        addressId 
      })).unwrap();
      toast.success('Primary address updated successfully!');
    } catch (error) {
      console.error('Error setting primary address:', error);
      toast.error(error || 'Failed to set primary address');
    }
  };

  const handleDeleteAddress = async (addressId) => {
    if (!isAuthenticated || !session?.user?.token) {
      toast.error("Authentication required");
      return;
    }

    if (window.confirm('Are you sure you want to delete this address?')) {
      try {
        await dispatch(deleteUserAddress({ 
          token: session.user.token, 
          addressId 
        })).unwrap();
        toast.success('Address deleted successfully!');
      } catch (error) {
        console.error('Error deleting address:', error);
        toast.error(error || 'Failed to delete address');
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

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Select Address</h3>
        <Button
          onClick={() => setShowAddModal(true)}
          size="sm"
          variant="outline"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add New
        </Button>
      </div>

      {addressLoading ? (
        <div className="space-y-3">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="h-20 bg-gray-200 rounded animate-pulse" />
          ))}
        </div>
      ) : addresses.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <MapPin className="w-12 h-12 mx-auto mb-4 text-gray-300" />
          <p>No addresses found.</p>
          <p className="text-sm">Add your first address to continue.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {addresses.map((address) => (
            <div 
              key={address._id}
              className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                selectedAddressId === address._id
                  ? 'border-blue-500 bg-blue-50'
                  : 'hover:bg-gray-50'
              }`}
              onClick={() => handleAddressSelect(address._id)}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant={address.isDefault ? "default" : "secondary"}>
                      {address.addressType || "home"}
                    </Badge>
                    {address.isDefault && (
                      <Badge variant="outline" className="text-green-600">
                        <Star className="w-3 h-3 mr-1" />
                        Primary
                      </Badge>
                    )}
                  </div>
                  <p className="font-medium">{address.label || address.fullName}</p>
                  <p className="text-sm text-gray-600">
                    {formatAddress(address)}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {!address.isDefault && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSetPrimary(address._id);
                      }}
                    >
                      Set Primary
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEditAddress(address);
                    }}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteAddress(address._id);
                    }}
                    className="text-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Address Modal */}
      <AddressModal
        isOpen={showAddModal || editingAddress !== null}
        onClose={closeModal}
        address={editingAddress}
        mode={editingAddress ? 'edit' : 'add'}
      />
    </div>
  );
}
