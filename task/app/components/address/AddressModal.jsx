'use client';

import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

import { useAddress } from '@/lib/contexts/address-context';

export default function AddressModal({ isOpen, onClose, address = null, isEdit = false }) {
  const { createAddress, updateAddress, validateAddress } = useAddress();
  const [location, setLocation] = useState(null);
  const [locationError, setLocationError] = useState(null);

  const [formData, setFormData] = useState({
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    country: 'India',
    postalCode: '',
    addressType: 'home',
    isDefault: false,
    label: '',
    notes: '',
    nearestLandmark: '',
    longitude: '',
    latitude: '',
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Initialize form data when editing
  useEffect(() => {
    if (address && isEdit) {
      setFormData({
        addressLine1: address.addressLine1 || '',
        addressLine2: address.addressLine2 || '',
        city: address.city || '',
        state: address.state || '',
        country: address.country || 'India',
        postalCode: address.postalCode || '',
        addressType: address.addressType || 'home',
        isDefault: address.isDefault || false,
        label: address.label || '',
        notes: address.notes || '',
        nearestLandmark: address.nearestLandmark || '',
        longitude: address.coordinates?.coordinates?.[0] || '',
        latitude: address.coordinates?.coordinates?.[1] || '',
      });
    } else {
      // Reset form for new address
      setFormData({
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: '',
        country: 'India',
        postalCode: '',
        addressType: 'home',
        isDefault: false,
        label: '',
        notes: '',
        nearestLandmark: '',
        longitude: '',
        latitude: '',
      });
    }
    setErrors({});
  }, [address, isEdit, isOpen]);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error for this field
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.addressLine1.trim()) {
      newErrors.addressLine1 = 'Address line 1 is required';
    } else if (formData.addressLine1.length < 3) {
      newErrors.addressLine1 = 'Address line 1 must be at least 3 characters';
    }

    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
    } else if (formData.city.length < 2) {
      newErrors.city = 'City must be at least 2 characters';
    }

    if (!formData.state.trim()) {
      newErrors.state = 'State is required';
    } else if (formData.state.length < 2) {
      newErrors.state = 'State must be at least 2 characters';
    }

    if (!formData.postalCode.trim()) {
      newErrors.postalCode = 'Postal code is required';
    } else if (!/^[A-Z0-9\s-]{3,10}$/i.test(formData.postalCode)) {
      newErrors.postalCode = 'Invalid postal code format';
    }

    if (formData.addressLine2 && formData.addressLine2.length > 100) {
      newErrors.addressLine2 = 'Address line 2 cannot exceed 100 characters';
    }

    if (formData.nearestLandmark && formData.nearestLandmark.length > 200) {
      newErrors.nearestLandmark = 'Nearest landmark cannot exceed 200 characters';
    }

    if (formData.label && formData.label.length > 50) {
      newErrors.label = 'Label cannot exceed 50 characters';
    }

    if (formData.notes && formData.notes.length > 500) {
      newErrors.notes = 'Notes cannot exceed 500 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      // Prepare payload
      const payload = { ...formData };
      // Only add coordinates if both are present
      if (formData.longitude && formData.latitude) {
        payload.coordinates = {
          type: 'Point',
          coordinates: [
            parseFloat(formData.longitude),
            parseFloat(formData.latitude),
          ],
        };
      }
      // Remove longitude/latitude from payload
      delete payload.longitude;
      delete payload.latitude;
      // Validate address with backend
      await validateAddress(payload);

      if (isEdit && address) {
        await updateAddress(address._id, payload);
      } else {
        await createAddress(payload);
      }

      onClose();
    } catch (error) {
      console.error('Error saving address:', error);
      // Handle validation errors from backend
      if (error.message.includes('validation failed')) {
        setErrors({ general: error.message });
      } else {
        setErrors({ general: 'Failed to save address. Please try again.' });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (!loading) {
      onClose();
    }
  };

  
  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by your browser');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });
        setLocationError(null);
      },
      (err) => {
        setLocationError(`Error: ${err.message}`);
        setLocation(null);
      }
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center mb-4">
          <button
            onClick={handleClose}
            disabled={loading}
            className="text-sm hover:text-black transition-colors duration-200 mr-2 rounded-xl shadow-lg p-2"
          >
            ← 
          </button>
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">
              {isEdit ? 'Edit Address' : 'Add New Address'}
            </DialogTitle>
          </DialogHeader>
        </div>

        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          {/* Address Type and Label */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="addressType">Address Type</Label>
              <select
                id="addressType"
                value={formData.addressType}
                onChange={(e) => handleChange('addressType', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
              >
                <option value="home">Home</option>
                <option value="work">Work</option>
                <option value="billing">Billing</option>
                <option value="shipping">Shipping</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <Label htmlFor="label">Label (Optional)</Label>
              <Input
                id="label"
                value={formData.label}
                onChange={(e) => handleChange('label', e.target.value)}
                placeholder="e.g., My Home, Office"
                maxLength={50}
              />
              {errors.label && <p className="text-red-500 text-xs mt-1">{errors.label}</p>}
            </div>
          </div>

          {/* Address Lines */}
          <div>
            <Label htmlFor="addressLine1">Address Line 1 *</Label>
            <Input
              id="addressLine1"
              value={formData.addressLine1}
              onChange={(e) => handleChange('addressLine1', e.target.value)}
              placeholder="House/Flat number, Street name"
              maxLength={100}
            />
            {errors.addressLine1 && <p className="text-red-500 text-xs mt-1">{errors.addressLine1}</p>}
          </div>

          <div>
            <Label htmlFor="addressLine2">Address Line 2 (Optional)</Label>
            <Input
              id="addressLine2"
              value={formData.addressLine2}
              onChange={(e) => handleChange('addressLine2', e.target.value)}
              placeholder="Apartment, suite, etc."
              maxLength={100}
            />
            {errors.addressLine2 && <p className="text-red-500 text-xs mt-1">{errors.addressLine2}</p>}
          </div>

          {/* City and State */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="city">City *</Label>
              <Input
                id="city"
                value={formData.city}
                onChange={(e) => handleChange('city', e.target.value)}
                placeholder="City name"
                maxLength={100}
              />
              {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
            </div>

            <div>
              <Label htmlFor="state">State *</Label>
              <Input
                id="state"
                value={formData.state}
                onChange={(e) => handleChange('state', e.target.value)}
                placeholder="State name"
                maxLength={100}
              />
              {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state}</p>}
            </div>
          </div>

          {/* Country and Postal Code */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="country">Country</Label>
              <Input
                id="country"
                value={formData.country}
                onChange={(e) => handleChange('country', e.target.value)}
                placeholder="Country"
                maxLength={100}
              />
            </div>

            <div>
              <Label htmlFor="postalCode">Postal Code *</Label>
              <Input
                id="postalCode"
                value={formData.postalCode}
                onChange={(e) => handleChange('postalCode', e.target.value)}
                placeholder="Postal code"
                maxLength={10}
              />
              {errors.postalCode && <p className="text-red-500 text-xs mt-1">{errors.postalCode}</p>}
            </div>
          </div>

          {/* Nearest Landmark */}
          <div>
            <Label htmlFor="nearestLandmark">Nearest Landmark (Optional)</Label>
            <Input
              id="nearestLandmark"
              value={formData.nearestLandmark}
              onChange={(e) => handleChange('nearestLandmark', e.target.value)}
              placeholder="e.g., Near Central Park, Behind Mall"
              maxLength={200}
            />
            {errors.nearestLandmark && <p className="text-red-500 text-xs mt-1">{errors.nearestLandmark}</p>}
          </div>

          {/* Notes */}
          <div>
            <Label htmlFor="notes">Delivery Instructions (Optional)</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => handleChange('notes', e.target.value)}
              placeholder="Any special delivery instructions..."
              maxLength={500}
              rows={3}
            />
            {errors.notes && <p className="text-red-500 text-xs mt-1">{errors.notes}</p>}
          </div>

          {/* Set as Primary */}
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="isDefault"
              checked={formData.isDefault}
              onChange={(e) => handleChange('isDefault', e.target.checked)}
              className="rounded"
            />
            <Label htmlFor="isDefault">Set as primary address</Label>
          </div>

          {/* Get Current Location Button */}
          <div className="w-full flex items-center">
            <Button
              type="button"
              onClick={handleGetLocation}
              disabled={loading}
              variant="outline"
              className='w-full cursor-pointer'
            >
              Get Current Location
            </Button>
            </div>


          {/* Longitude and Latitude */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="longitude">Longitude</Label>
              <Input
                id="longitude"
                type="number"
                step="any"
                disabled
                value={location?.longitude}
                onChange={e => handleChange('longitude', e.target.value)}
                placeholder="Longitude (e.g. 77.5946)"
              />
            </div>
            <div>
              <Label htmlFor="latitude">Latitude</Label>
              <Input
                id="latitude"
                type="number"
                step="any"
                disabled
                value={location?.latitude}
                onChange={e => handleChange('latitude', e.target.value)}
                placeholder="Latitude (e.g. 12.9716)"
              />
            </div>
          </div>

          {/* General Error */}
          {errors.general && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm">{errors.general}</p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-end gap-4 pt-4">
            <Button
              type="button"
              onClick={handleClose}
              disabled={loading}
              variant="outline"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              disabled={loading}
              className="bg-yellow-500 hover:bg-yellow-600 text-white"
            >
              {loading ? 'Saving...' : (isEdit ? 'Update Address' : 'Save Address')}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
