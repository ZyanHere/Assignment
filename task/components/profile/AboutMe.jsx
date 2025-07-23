"use client";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Edit2, User, Mail, Phone, Loader2, MapPin, Plus, Trash2, Star } from "lucide-react";
import { useDispatch } from "react-redux";
import { 
  updateUserProfile, 
  createUserAddress, 
  updateUserAddress, 
  deleteUserAddress, 
  setPrimaryAddress 
} from "@/lib/redux/user/userSlice";
import { useAuth } from "@/lib/hooks/useAuth";
import toast from "react-hot-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const AboutMe = () => {
  const dispatch = useDispatch();
  const { 
    user, 
    isAuthenticated, 
    profileData, 
    profileLoading, 
    addresses, 
    addressLoading, 
    session 
  } = useAuth();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
  });
  const [originalData, setOriginalData] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  // Address management
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [addressForm, setAddressForm] = useState({
    fullName: "",
    phone: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    postalCode: "",
    country: "India",
    isPrimary: false,
    addressType: "home"
  });

  // Initialize form data from Redux profile data
  useEffect(() => {
    if (profileData || user) {
      const userData = {
        firstName: profileData?.firstName || profileData?.name?.split(' ')[0] || user?.name?.split(' ')[0] || "",
        lastName: profileData?.lastName || profileData?.name?.split(' ').slice(1).join(' ') || user?.name?.split(' ').slice(1).join(' ') || "",
        phone: profileData?.phone || user?.phone || "",
        email: profileData?.email || user?.email || "",
      };
      setFormData(userData);
      setOriginalData(userData);
    }
  }, [profileData, user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!isAuthenticated || !session?.user?.token) {
      toast.error("Authentication required");
      return;
    }

    setIsSaving(true);
    
    try {
      const updateData = {
        name: `${formData.firstName} ${formData.lastName}`.trim(),
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone,
        email: formData.email,
      };
      
      await dispatch(updateUserProfile({ 
        token: session.user.token, 
        profileData: updateData 
      })).unwrap();
      
      setOriginalData(formData);
      setEditMode(false);
      setShowSuccess(true);
      toast.success('Profile updated successfully!');
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      console.error('Failed to update profile:', error);
      toast.error(error || 'Failed to update profile. Please try again.');
      setFormData(originalData);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setFormData(originalData);
    setEditMode(false);
  };

  const handleAddressChange = (e) => {
    setAddressForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleAddAddress = () => {
    setEditingAddress(null);
    setAddressForm({
      fullName: "",
      phone: "",
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      postalCode: "",
      country: "India",
      isPrimary: false,
      addressType: "home"
    });
    setShowAddressForm(true);
  };

  const handleEditAddress = (address) => {
    setEditingAddress(address);
    setAddressForm({
      fullName: address.fullName || address.label || "",
      phone: address.phone || "",
      addressLine1: address.addressLine1 || "",
      addressLine2: address.addressLine2 || "",
      city: address.city || "",
      state: address.state || "",
      postalCode: address.postalCode || "",
      country: address.country || "India",
      isPrimary: address.isDefault || false,
      addressType: address.addressType || "home"
    });
    setShowAddressForm(true);
  };

  const handleSaveAddress = async (e) => {
    e.preventDefault();
    
    if (!isAuthenticated || !session?.user?.token) {
      toast.error("Authentication required");
      return;
    }

    try {
      const addressData = {
        addressLine1: addressForm.addressLine1,
        addressLine2: addressForm.addressLine2,
        city: addressForm.city,
        state: addressForm.state,
        postalCode: addressForm.postalCode,
        country: addressForm.country,
        addressType: addressForm.addressType,
        isDefault: addressForm.isPrimary,
        label: addressForm.fullName,
        notes: addressForm.phone ? `Phone: ${addressForm.phone}` : ""
      };

      if (editingAddress) {
        await dispatch(updateUserAddress({ 
          token: session.user.token, 
          addressId: editingAddress._id, 
          addressData 
        })).unwrap();
        toast.success('Address updated successfully!');
      } else {
        await dispatch(createUserAddress({ 
          token: session.user.token, 
          addressData 
        })).unwrap();
        toast.success('Address added successfully!');
      }
      
      setShowAddressForm(false);
      setEditingAddress(null);
    } catch (error) {
      console.error('Failed to save address:', error);
      toast.error(error || 'Failed to save address. Please try again.');
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
        console.error('Failed to delete address:', error);
        toast.error(error || 'Failed to delete address. Please try again.');
      }
    }
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
      console.error('Failed to set primary address:', error);
      toast.error(error || 'Failed to set primary address. Please try again.');
    }
  };

  const handleCancelAddress = () => {
    setShowAddressForm(false);
    setEditingAddress(null);
    setAddressForm({
      fullName: "",
      phone: "",
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      postalCode: "",
      country: "India",
      isPrimary: false,
      addressType: "home"
    });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      {/* Profile Information */}
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
            <User className="w-5 h-5" />
            Profile Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">First Name</label>
                <Input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  disabled={!editMode}
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Last Name</label>
                <Input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  disabled={!editMode}
                  className="w-full"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                <Mail className="w-4 h-4 inline mr-1" />
                Email
              </label>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                disabled={!editMode}
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                <Phone className="w-4 h-4 inline mr-1" />
                Phone
              </label>
              <Input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                disabled={!editMode}
                className="w-full"
              />
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              {!editMode ? (
                <Button
                  type="button"
                  onClick={() => setEditMode(true)}
                  variant="outline"
                  className="flex items-center gap-2 w-full sm:w-auto"
                >
                  <Edit2 className="w-4 h-4" />
                  Edit Profile
                </Button>
              ) : (
                <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                  <Button
                    type="submit"
                    disabled={isSaving || profileLoading}
                    className="flex items-center gap-2 w-full sm:w-auto"
                  >
                    {isSaving ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="w-4 h-4" />
                        Save Changes
                      </>
                    )}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleCancel}
                    disabled={isSaving}
                    className="w-full sm:w-auto"
                  >
                    Cancel
                  </Button>
                </div>
              )}

              <AnimatePresence>
                {showSuccess && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="flex items-center gap-2 text-green-600 mt-2 sm:mt-0"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span className="text-sm">Profile updated successfully!</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Address Management */}
      <Card className="w-full">
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
              <MapPin className="w-5 h-5" />
              Saved Addresses
            </CardTitle>
            <Button
              onClick={handleAddAddress}
              size="sm"
              className="flex items-center gap-2 w-full sm:w-auto"
            >
              <Plus className="w-4 h-4" />
              Add Address
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {addressLoading ? (
            <div className="space-y-4">
              {[...Array(2)].map((_, i) => (
                <div key={i} className="h-20 bg-gray-200 rounded animate-pulse" />
              ))}
            </div>
          ) : addresses.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <MapPin className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p>No addresses saved yet.</p>
              <p className="text-sm">Add your first address to get started.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {addresses.map((address) => (
                <div key={address._id} className="border rounded-lg p-4">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
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
                        {[
                          address.addressLine1,
                          address.addressLine2,
                          address.city,
                          address.state,
                          address.postalCode,
                          address.country
                        ].filter(Boolean).join(", ")}
                      </p>
                      {address.notes && (
                        <p className="text-xs text-gray-500 mt-1">{address.notes}</p>
                      )}
                    </div>
                    <div className="flex items-center gap-2 flex-wrap">
                      {!address.isDefault && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleSetPrimary(address._id)}
                          className="w-full sm:w-auto"
                        >
                          Set Primary
                        </Button>
                      )}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEditAddress(address)}
                        className="w-full sm:w-auto"
                      >
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteAddress(address._id)}
                        className="text-red-600 hover:bg-red-50 w-full sm:w-auto"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Address Form */}
          {showAddressForm && (
            <Card className="mt-4">
              <CardHeader>
                <CardTitle className="text-lg sm:text-xl">
                  {editingAddress ? "Edit Address" : "Add New Address"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSaveAddress} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Full Name</label>
                      <Input
                        type="text"
                        name="fullName"
                        value={addressForm.fullName}
                        onChange={handleAddressChange}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Phone</label>
                      <Input
                        type="tel"
                        name="phone"
                        value={addressForm.phone}
                        onChange={handleAddressChange}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Address Line 1</label>
                    <Input
                      type="text"
                      name="addressLine1"
                      value={addressForm.addressLine1}
                      onChange={handleAddressChange}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Address Line 2</label>
                    <Input
                      type="text"
                      name="addressLine2"
                      value={addressForm.addressLine2}
                      onChange={handleAddressChange}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">City</label>
                      <Input
                        type="text"
                        name="city"
                        value={addressForm.city}
                        onChange={handleAddressChange}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">State</label>
                      <Input
                        type="text"
                        name="state"
                        value={addressForm.state}
                        onChange={handleAddressChange}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Postal Code</label>
                      <Input
                        type="text"
                        name="postalCode"
                        value={addressForm.postalCode}
                        onChange={handleAddressChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Country</label>
                      <Input
                        type="text"
                        name="country"
                        value={addressForm.country}
                        onChange={handleAddressChange}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Address Type</label>
                      <select
                        name="addressType"
                        value={addressForm.addressType}
                        onChange={handleAddressChange}
                        className="w-full p-2 border rounded-md"
                      >
                        <option value="home">Home</option>
                        <option value="work">Work</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="isPrimary"
                      name="isPrimary"
                      checked={addressForm.isPrimary}
                      onChange={(e) => setAddressForm(prev => ({ ...prev, isPrimary: e.target.checked }))}
                    />
                    <label htmlFor="isPrimary" className="text-sm">
                      Set as primary address
                    </label>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2">
                    <Button
                      type="submit"
                      disabled={addressLoading}
                      className="flex items-center gap-2 w-full sm:w-auto"
                    >
                      {addressLoading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        <>
                          <CheckCircle2 className="w-4 h-4" />
                          Save Address
                        </>
                      )}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleCancelAddress}
                      disabled={addressLoading}
                      className="w-full sm:w-auto"
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AboutMe;