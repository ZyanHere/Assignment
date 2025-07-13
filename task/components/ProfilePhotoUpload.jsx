"use client";
import { useState, useRef } from 'react';
import { 
  uploadProfilePhoto, 
  validateProfilePhotoFile, 
  fileToBase64,
  deleteProfilePhoto 
} from '../lib/utils/profilePhotoUpload';

const ProfilePhotoUpload = ({ 
  currentProfileImage, 
  onPhotoUpdate, 
  token, 
  className = "" 
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [error, setError] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileSelect = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Clear previous errors
    setError(null);

    // Validate file
    const validation = validateProfilePhotoFile(file);
    if (!validation.valid) {
      setError(validation.error);
      return;
    }

    // Create preview
    try {
      const base64 = await fileToBase64(file);
      setPreviewUrl(base64);
    } catch (err) {
      setError('Failed to create preview');
      return;
    }
  };

  const handleUpload = async () => {
    if (!fileInputRef.current?.files[0]) {
      setError('Please select a file first');
      return;
    }

    setIsUploading(true);
    setError(null);

    try {
      const file = fileInputRef.current.files[0];
      const result = await uploadProfilePhoto(file, token);
      
      // Call the callback with the new profile image URL
      if (onPhotoUpdate) {
        onPhotoUpdate(result.profileImage);
      }
      
      // Clear preview and file input
      setPreviewUrl(null);
      fileInputRef.current.value = '';
      
      console.log('Profile photo uploaded successfully:', result);
    } catch (err) {
      setError(err.message || 'Upload failed');
      console.error('Upload error:', err);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async () => {
    if (!currentProfileImage) {
      setError('No profile image to delete');
      return;
    }

    setIsDeleting(true);
    setError(null);

    try {
      await deleteProfilePhoto(token);
      
      // Call the callback to remove the profile image
      if (onPhotoUpdate) {
        onPhotoUpdate(null);
      }
      
      console.log('Profile photo deleted successfully');
    } catch (err) {
      setError(err.message || 'Delete failed');
      console.error('Delete error:', err);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleCancel = () => {
    setPreviewUrl(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className={`profile-photo-upload ${className}`}>
      {/* Current Profile Image */}
      {currentProfileImage && !previewUrl && (
        <div className="mb-4">
          <div className="relative inline-block">
            <img
              src={currentProfileImage}
              alt="Current profile"
              className="w-32 h-32 rounded-full object-cover border-4 border-gray-200"
            />
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-600 transition-colors disabled:opacity-50"
              title="Delete profile photo"
            >
              {isDeleting ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Preview */}
      {previewUrl && (
        <div className="mb-4">
          <img
            src={previewUrl}
            alt="Preview"
            className="w-32 h-32 rounded-full object-cover border-4 border-blue-200"
          />
        </div>
      )}

      {/* File Input */}
      <div className="mb-4">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={handleFileSelect}
          className="hidden"
          id="profile-photo-input"
        />
        <label
          htmlFor="profile-photo-input"
          className="cursor-pointer inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          Choose Photo
        </label>
      </div>

      {/* Action Buttons */}
      {previewUrl && (
        <div className="flex space-x-2 mb-4">
          <button
            onClick={handleUpload}
            disabled={isUploading}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 flex items-center"
          >
            {isUploading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Uploading...
              </>
            ) : (
              <>
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Upload
              </>
            )}
          </button>
          <button
            onClick={handleCancel}
            disabled={isUploading}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      {/* Help Text */}
      <div className="text-sm text-gray-600">
        <p>• Supported formats: JPEG, PNG, WebP</p>
        <p>• Maximum file size: 5MB</p>
        <p>• Recommended size: 400x400 pixels or larger</p>
      </div>
    </div>
  );
};

export default ProfilePhotoUpload; 