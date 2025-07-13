// lib/api/profile.js
import { api } from './axios';

function unwrapError(e) {
  if (e.response?.data?.message) throw new Error(e.response.data.message);
  throw e;
}

/** GET /lmd/api/v1/auth/customer/:id → returns user profile data */
export async function fetchUserProfile() {
  try {
    const { data } = await api.get('/lmd/api/v1/auth/customer/profile');
    return data.data || data;
  } catch (e) {
    unwrapError(e);
  }
}

/** PUT /lmd/api/v1/auth/customer/:id → updates user profile */
export async function updateUserProfile(profileData) {
  try {
    const { data } = await api.put('/lmd/api/v1/auth/customer/profile',  profileData);
    return data.data || data;
  } catch (e) {
    unwrapError(e);
  }
}

/** GET /lmd/api/v1/addresses → returns user addresses */
export async function fetchUserAddresses() {
  try {
    const { data } = await api.get('/lmd/api/v1/addresses');
    return data.data || data;
  } catch (e) {
    unwrapError(e);
  }
}

/** GET /lmd/api/v1/addresses/primary → returns primary address */
export async function fetchPrimaryAddress() {
  try {
    const { data } = await api.get('/lmd/api/v1/addresses/primary');
    return data.data || data;
  } catch (e) {
    unwrapError(e);
  }
}

/** POST /lmd/api/v1/addresses → creates new address */
export async function createAddress(addressData) {
  try {
    const { data } = await api.post('/lmd/api/v1/addresses', addressData);
    return data.data || data;
  } catch (e) {
    unwrapError(e);
  }
}

/** PUT /lmd/api/v1/addresses/:addressId → updates address */
export async function updateAddress(addressId, addressData) {
  try {
    const { data } = await api.put(`/lmd/api/v1/addresses/${addressId}`, addressData);
    return data.data || data;
  } catch (e) {
    unwrapError(e);
  }
}

/** DELETE /lmd/api/v1/addresses/:addressId → deletes address */
export async function deleteAddress(addressId) {
  try {
    const { data } = await api.delete(`/lmd/api/v1/addresses/${addressId}`);
    return data.data || data;
  } catch (e) {
    unwrapError(e);
  }
}

/** PATCH /lmd/api/v1/addresses/:addressId/primary → sets address as primary */
export async function setPrimaryAddress(addressId) {
  try {
        const { data } = await api.patch(`/lmd/api/v1/addresses/${addressId}/primary`);
    return data.data || data;
  } catch (e) {
    unwrapError(e);
  }
}

/** GET /lmd/api/v1/retail/wishlist → returns user saved items */
export async function fetchUserWishlist() {
  try {
    const { data } = await api.get('/lmd/api/v1/retail/wishlist');
    return data.data;
  } catch (e) {
    unwrapError(e);
  }
}

/** GET /customer/notifications → returns user notifications */
export async function fetchUserNotifications() {
  try {
    const { data } = await api.get('/lmd/api/v1/customer/notifications');
    return data.data;
  } catch (e) {
    unwrapError(e);
  }
}

/** GET /customer/messages → returns user messages */
export async function fetchUserMessages() {
  try {
    const { data } = await api.get('/lmd/api/v1/customer/messages');
    return data.data;
  } catch (e) {
    unwrapError(e);
  }
}

/** PUT /lmd/api/v1/auth/customer/:id → updates profile picture */
export async function updateProfilePicture(imageFile) {
  try {
    const formData = new FormData();
    formData.append('profileImage', imageFile);
    
    const { data } = await api.put('/lmd/api/v1/auth/customer/profile', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return data.data || data;
  } catch (e) {
    unwrapError(e);
  }
} 