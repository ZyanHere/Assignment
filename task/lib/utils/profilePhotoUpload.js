/**
 * Profile Photo Upload Utility
 * Handles profile photo uploads using S3 presigned URLs
 */

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

/**
 * Generate presigned URL for profile photo upload
 * @param {string} fileName - Original file name
 * @param {string} contentType - File MIME type
 * @param {string} token - Authentication token
 * @returns {Promise<Object>} Upload data with URL and key
 */
export const generateProfilePhotoUploadUrl = async (fileName, contentType, token) => {
  try {
    const response = await fetch(`${BACKEND_URL}/lmd/api/v1/auth/customer/profile/photo/upload-url`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        fileName,
        contentType,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to generate upload URL');
    }

    return data.data;
  } catch (error) {
    console.error('Error generating upload URL:', error);
    throw error;
  }
};

/**
 * Upload file to S3 using presigned URL
 * @param {string} uploadUrl - Presigned URL from backend
 * @param {File} file - File to upload
 * @returns {Promise<Object>} Upload result
 */
export const uploadFileToS3 = async (uploadUrl, file) => {
  try {
    const response = await fetch(uploadUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': file.type,
      },
      body: file,
    });

    if (!response.ok) {
      throw new Error(`Upload failed: ${response.status} ${response.statusText}`);
    }

    return { success: true };
  } catch (error) {
    console.error('Error uploading to S3:', error);
    throw error;
  }
};

/**
 * Update profile photo in database after successful upload
 * @param {string} key - S3 object key
 * @param {string} fileName - File name
 * @param {string} token - Authentication token
 * @returns {Promise<Object>} Updated profile data
 */
export const updateProfilePhotoInDB = async (key, fileName, token) => {
  try {
    const response = await fetch(`${BACKEND_URL}/lmd/api/v1/auth/customer/profile/photo/update`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        key,
        fileName,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to update profile photo');
    }

    return data.data;
  } catch (error) {
    console.error('Error updating profile photo:', error);
    throw error;
  }
};

/**
 * Delete profile photo
 * @param {string} token - Authentication token
 * @returns {Promise<Object>} Deletion result
 */
export const deleteProfilePhoto = async (token) => {
  try {
    const response = await fetch(`${BACKEND_URL}/lmd/api/v1/auth/customer/profile/photo`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to delete profile photo');
    }

    return data;
  } catch (error) {
    console.error('Error deleting profile photo:', error);
    throw error;
  }
};

/**
 * Refresh user data from backend to get updated profile information
 * @param {string} token - Authentication token
 * @returns {Promise<Object>} Updated user data
 */
export const refreshUserData = async (token) => {
  try {
    const response = await fetch(`${BACKEND_URL}/lmd/api/v1/auth/customer/profile`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to refresh user data');
    }

    return data.data;
  } catch (error) {
    console.error('Error refreshing user data:', error);
    throw error;
  }
};

/**
 * Complete profile photo upload process
 * @param {File} file - File to upload
 * @param {string} token - Authentication token
 * @returns {Promise<Object>} Complete upload result
 */
export const uploadProfilePhoto = async (file, token) => {
  try {
    console.log('Starting profile photo upload:', {
      fileName: file.name,
      fileSize: file.size,
      fileType: file.type,
    });

    // Step 1: Generate presigned URL
    const uploadData = await generateProfilePhotoUploadUrl(file.name, file.type, token);
    console.log('Generated upload URL:', uploadData);

    // Step 2: Upload file to S3
    await uploadFileToS3(uploadData.uploadUrl, file);
    console.log('File uploaded to S3 successfully');

    // Step 3: Update profile photo in database
    const profileData = await updateProfilePhotoInDB(uploadData.key, uploadData.fileName, token);
    console.log('Profile photo updated in database:', profileData);

    // Step 4: Refresh user data to get the latest information
    const userData = await refreshUserData(token);
    console.log('User data refreshed:', userData);

    return {
      success: true,
      profileImage: profileData.profileImage,
      key: uploadData.key,
      fileName: uploadData.fileName,
      userData: userData, // Include refreshed user data
    };
  } catch (error) {
    console.error('Profile photo upload failed:', error);
    throw error;
  }
};

/**
 * Validate file for profile photo upload
 * @param {File} file - File to validate
 * @returns {Object} Validation result
 */
export const validateProfilePhotoFile = (file) => {
  const maxSize = 5 * 1024 * 1024; // 5MB
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];

  if (!file) {
    return { valid: false, error: 'No file selected' };
  }

  if (!allowedTypes.includes(file.type)) {
    return { 
      valid: false, 
      error: 'Invalid file type. Please select a JPEG, PNG, or WebP image' 
    };
  }

  if (file.size > maxSize) {
    return { 
      valid: false, 
      error: `File size too large. Maximum size is ${maxSize / (1024 * 1024)}MB` 
    };
  }

  return { valid: true };
};

/**
 * Convert file to base64 for preview
 * @param {File} file - File to convert
 * @returns {Promise<string>} Base64 string
 */
export const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}; 