"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { getSession } from 'next-auth/react';

const AddressContext = createContext();

export const useAddress = () => useContext(AddressContext);

export const AddressProvider = ({ children }) => {
  const [addresses, setAddresses] = useState([]);
  const [primaryAddress, setPrimaryAddress] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch addresses from backend
  const fetchAddresses = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const session = await getSession();
      const token = session?.user?.token || session?.user?.accessToken;
      
      if (!token) {
        console.log('No authentication token found');
        return;
      }

      const response = await fetch('/api/addresses', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch addresses');
      }

      const result = await response.json();
      
      if (result.statusCode === 200) {
        setAddresses(result.data || []);
        
        // Set primary address
        const primary = result.data?.find(addr => addr.isDefault) || result.data?.[0];
        setPrimaryAddress(primary);
      }
    } catch (err) {
      console.error('Error fetching addresses:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Create new address
  const createAddress = async (addressData) => {
    try {
      setLoading(true);
      setError(null);
      
      const session = await getSession();
      const token = session?.user?.token || session?.user?.accessToken;
      
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await fetch('/api/addresses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(addressData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create address');
      }

      const result = await response.json();
      
      if (result.statusCode === 201) {
        // Refresh addresses
        await fetchAddresses();
        return result.data;
      }
    } catch (err) {
      console.error('Error creating address:', err);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Update address
  const updateAddress = async (addressId, addressData) => {
    try {
      setLoading(true);
      setError(null);
      
      const session = await getSession();
      const token = session?.user?.token || session?.user?.accessToken;
      
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await fetch(`/api/addresses/${addressId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(addressData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update address');
      }

      const result = await response.json();
      
      if (result.statusCode === 200) {
        // Refresh addresses
        await fetchAddresses();
        return result.data;
      }
    } catch (err) {
      console.error('Error updating address:', err);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Delete address
  const deleteAddress = async (addressId) => {
    try {
      setLoading(true);
      setError(null);
      
      const session = await getSession();
      const token = session?.user?.token || session?.user?.accessToken;
      
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await fetch(`/api/addresses/${addressId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to delete address');
      }

      // Refresh addresses
      await fetchAddresses();
    } catch (err) {
      console.error('Error deleting address:', err);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Set address as primary
  const setAddressAsPrimary = async (addressId) => {
    try {
      setLoading(true);
      setError(null);
      
      const session = await getSession();
      const token = session?.user?.token || session?.user?.accessToken;
      
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await fetch(`/api/addresses/${addressId}/primary`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to set primary address');
      }

      // Refresh addresses
      await fetchAddresses();
    } catch (err) {
      console.error('Error setting primary address:', err);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Get checkout address (primary or first available)
  const getCheckoutAddress = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const session = await getSession();
      const token = session?.user?.token || session?.user?.accessToken;
      
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await fetch('/api/addresses/checkout', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to get checkout address');
      }

      const result = await response.json();
      
      if (result.statusCode === 200) {
        return result.data;
      }
    } catch (err) {
      console.error('Error getting checkout address:', err);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Validate address
  const validateAddress = async (addressData) => {
    try {
      const session = await getSession();
      const token = session?.user?.token || session?.user?.accessToken;
      
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await fetch('/api/addresses/validate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(addressData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Address validation failed');
      }

      const result = await response.json();
      return result.data;
    } catch (err) {
      console.error('Error validating address:', err);
      throw err;
    }
  };

  // Load addresses on mount
  useEffect(() => {
    fetchAddresses();
  }, []);

  return (
    <AddressContext.Provider
      value={{
        addresses,
        primaryAddress,
        loading,
        error,
        fetchAddresses,
        createAddress,
        updateAddress,
        deleteAddress,
        setAddressAsPrimary,
        getCheckoutAddress,
        validateAddress,
        setError,
      }}
    >
      {children}
    </AddressContext.Provider>
  );
};
