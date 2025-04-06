'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useAddress } from '@/lib/contexts/address-context';

export default function AddressModal({ isOpen, onClose, editingType = 'primary' }) {
  const { setPrimaryAddress, setSecondaryAddress } = useAddress();

  const [formData, setFormData] = useState({
    fullName: '',
    province: '',
    phone: '',
    city: '',
    building: '',
    area: '',
    landmark: '',
    address: '',
  });

  const [error, setError] = useState('');

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSave = () => {
    const isPrimary = editingType === 'primary';

    if (
      isPrimary &&
      Object.values(formData).some((val) => val.trim() === '')
    ) {
      setError('All fields are required for Primary Address.');
      return;
    }

    const fullAddress = `${formData.fullName}, ${formData.building}, ${formData.area}, ${formData.city}, ${formData.province}, ${formData.landmark} - ${formData.phone}`;

    if (editingType === 'primary') {
      setPrimaryAddress(fullAddress);
    } else {
      setSecondaryAddress(fullAddress);
    }

    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl p-6 rounded-2xl shadow-lg bg-white">
        <div className="flex items-center mb-4 ">
          <button
            onClick={onClose}
            className="text-sm  hover:text-black transition-colors duration-200 mr-2 rounded-xl shadow-lg"
          >
            ← 
          </button>
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">
              {editingType === 'primary' ? 'Primary Address' : 'Secondary Address'}
            </DialogTitle>
          </DialogHeader>
        </div>

        <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            // { label: 'Full Name', name: 'fullName' },
            { label: 'Province', name: 'province' },
            // { label: 'Contact Number', name: 'phone' },
            { label: 'City', name: 'city' },
            { label: 'Building / House No', name: 'building' },
            { label: 'Area', name: 'area' },
            { label: 'Colony / Landmark', name: 'landmark' },
            { label: 'Pin', name: 'Pin' },
          ].map((field) => (
            <div key={field.name}>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                {field.label}
              </label>
              <input
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>
          ))}
        </form>

        {error && <p className="text-red-600 mt-4 text-sm">{error}</p>}

        <div className="mt-6 flex justify-end gap-4">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-lg border border-gray-400 text-gray-700 hover:bg-gray-100 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 px-6 rounded-lg transition"
          >
            Save
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
