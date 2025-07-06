"use client";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Edit2, User, Mail, Phone, Loader2, MapPin, Plus, Trash2, Star } from "lucide-react";
import { 
  fetchUserProfile, 
  updateUserProfile, 
  fetchUserAddresses, 
  createAddress, 
  updateAddress, 
  deleteAddress, 
  setPrimaryAddress 
} from "@/lib/api/profile";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";

const AboutMe = () => {
  const { data: session } = useSession();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
  });
  const [originalData, setOriginalData] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  
  // Address management
  const [addresses, setAddresses] = useState([]);
  const [addressLoading, setAddressLoading] = useState(true);
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
    addressType: "home" // home, work, other
  });

  // Fetch user profile data
  useEffect(() => {
    const loadUserProfile = async () => {
      if (session?.user?.token) {
        try {
          const profileData = await fetchUserProfile();
          const userData = {
            firstName: profileData.firstName || profileData.name?.split(' ')[0] || session.user.name?.split(' ')[0] || "",
            lastName: profileData.lastName || profileData.name?.split(' ').slice(1).join(' ') || session.user.name?.split(' ').slice(1).join(' ') || "",
            phone: profileData.phone || "",
            email: profileData.email || session.user.email || "",
          };
          setFormData(userData);
          setOriginalData(userData);
        } catch (error) {
          console.error('Failed to fetch profile:', error);
          // Fallback to session data
          const userData = {
            firstName: session.user.name?.split(' ')[0] || "",
            lastName: session.user.name?.split(' ').slice(1).join(' ') || "",
            phone: "",
            email: session.user.email || "",
          };
          setFormData(userData);
          setOriginalData(userData);
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    };

    loadUserProfile();
  }, [session]);

  // Fetch user addresses
  useEffect(() => {
    const loadAddresses = async () => {
      if (session?.user?.token) {
        try {
          const addressesData = await fetchUserAddresses();
          setAddresses(addressesData || []);
        } catch (error) {
          console.error('Failed to fetch addresses:', error);
          setAddresses([]);
        } finally {
          setAddressLoading(false);
        }
      } else {
        setAddressLoading(false);
      }
    };

    loadAddresses();
  }, [session]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    
    try {
      const updateData = {
        name: `${formData.firstName} ${formData.lastName}`.trim(),
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone,
        email: formData.email,
      };
      
      await updateUserProfile(updateData);
      setOriginalData(formData);
      setEditMode(false);
      setShowSuccess(true);
      toast.success('Profile updated successfully!');
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      console.error('Failed to update profile:', error);
      toast.error('Failed to update profile. Please try again.');
      // Revert to original data
      setFormData(originalData);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setFormData(originalData);
    setEditMode(false);
  };

  // Address management functions
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
    try {
      // Transform form data to match backend expectations
      const addressData = {
        addressLine1: addressForm.addressLine1,
        addressLine2: addressForm.addressLine2,
        city: addressForm.city,
        state: addressForm.state,
        postalCode: addressForm.postalCode,
        country: addressForm.country,
        addressType: addressForm.addressType,
        isDefault: addressForm.isPrimary,
        label: addressForm.fullName, // Use fullName as label
        notes: addressForm.phone ? `Phone: ${addressForm.phone}` : ""
      };

      if (editingAddress) {
        await updateAddress(editingAddress._id, addressData);
        toast.success('Address updated successfully!');
      } else {
        await createAddress(addressData);
        toast.success('Address added successfully!');
      }
      
      // Reload addresses
      const addressesData = await fetchUserAddresses();
      setAddresses(addressesData || []);
      
      setShowAddressForm(false);
      setEditingAddress(null);
    } catch (error) {
      console.error('Failed to save address:', error);
      toast.error('Failed to save address. Please try again.');
    }
  };

  const handleDeleteAddress = async (addressId) => {
    if (window.confirm('Are you sure you want to delete this address?')) {
      try {
        await deleteAddress(addressId);
        setAddresses(prev => prev.filter(addr => addr._id !== addressId));
        toast.success('Address deleted successfully!');
      } catch (error) {
        console.error('Failed to delete address:', error);
        toast.error('Failed to delete address. Please try again.');
      }
    }
  };

  const handleSetPrimaryAddress = async (addressId) => {
    try {
      await setPrimaryAddress(addressId);
      setAddresses(prev => 
        prev.map(addr => ({
          ...addr,
          isDefault: addr._id === addressId
        }))
      );
      toast.success('Primary address updated!');
    } catch (error) {
      console.error('Failed to set primary address:', error);
      toast.error('Failed to update primary address. Please try again.');
    }
  };

  const inputFields = [
    {
      name: "firstName",
      label: "First Name",
      icon: <User className="w-4 h-4 text-muted-foreground" />,
    },
    {
      name: "lastName",
      label: "Last Name",
      icon: <User className="w-4 h-4 text-muted-foreground" />,
    },
    {
      name: "phone",
      label: "Phone Number",
      icon: <Phone className="w-4 h-4 text-muted-foreground" />,
    },
    {
      name: "email",
      label: "Email",
      icon: <Mail className="w-4 h-4 text-muted-foreground" />,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto" // Maintained original width
    >
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="bg-gray-50 p-6 border-b">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
              <User className="w-6 h-6" />
              Personal Information
            </h2>
            {!editMode && (
              <Button
                variant="outline"
                className="gap-2"
                onClick={() => setEditMode(true)}
              >
                <Edit2 className="w-4 h-4" />
                Edit Profile
              </Button>
            )}
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-8">
          {isLoading ? (
            <div className="space-y-6">
              {inputFields.map((field) => (
                <div key={field.name} className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-24"></div>
                  <div className="h-12 bg-gray-200 rounded animate-pulse"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {inputFields.map((field) => (
                <div key={field.name} className="space-y-2">
                  <label 
                    htmlFor={field.name}
                    className="block text-sm font-medium text-gray-700"
                  >
                    {field.label}
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      {field.icon}
                    </div>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleChange}
                      readOnly={!editMode}
                      className={`pl-10 h-12 ${!editMode ? "bg-gray-50" : ""}`}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {editMode && !isLoading && (
            <motion.div
              className="flex justify-end gap-4 mt-8"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Button
                variant="outline"
                type="button"
                onClick={handleCancel}
                className="border-gray-300"
                disabled={isSaving}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-gradient-to-r from-yellow-400 to-orange-400 hover:from-yellow-500 hover:to-orange-500 text-white shadow-md"
                disabled={isSaving}
              >
                {isSaving ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  'Save Changes'
                )}
              </Button>
            </motion.div>
          )}
        </form>
      </div>

      {/* Success Notification */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 right-6 bg-green-50 border border-green-200 text-green-800 px-6 py-3 rounded-lg shadow-lg flex items-center gap-3"
          >
            <CheckCircle2 className="w-5 h-5 text-green-600" />
            <span className="font-medium">Profile updated successfully!</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Address Management Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-8"
      >
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
          {/* Header */}
          <div className="bg-gray-50 p-6 border-b">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                <MapPin className="w-6 h-6" />
                Addresses
              </h2>
              <Button
                variant="outline"
                className="gap-2"
                onClick={handleAddAddress}
              >
                <Plus className="w-4 h-4" />
                Add Address
              </Button>
            </div>
          </div>

          {/* Address List */}
          <div className="p-6">
            {addressLoading ? (
              <div className="space-y-4">
                {[...Array(2)].map((_, i) => (
                  <div key={i} className="h-32 bg-gray-200 rounded-lg animate-pulse" />
                ))}
              </div>
            ) : addresses.length === 0 ? (
              <div className="text-center py-8">
                <MapPin className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium mb-2">No addresses saved</h3>
                <p className="text-gray-500 mb-4">Add your first address for faster checkout</p>
                <Button onClick={handleAddAddress} className="gap-2">
                  <Plus className="w-4 h-4" />
                  Add Address
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {addresses.map((address) => (
                  <Card key={address._id} className={`relative ${address.isDefault ? 'ring-2 ring-blue-500' : ''}`}>
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg flex items-center gap-2">
                            {address.fullName || address.label || "Address"}
                            {address.isDefault && (
                              <Badge variant="secondary" className="text-xs">
                                <Star className="w-3 h-3 mr-1" />
                                Primary
                              </Badge>
                            )}
                          </CardTitle>
                          <p className="text-sm text-gray-600 capitalize">{address.addressType}</p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 text-sm">
                        {address.notes && address.notes.includes('Phone:') && (
                          <p>{address.notes.split('Phone: ')[1]}</p>
                        )}
                        <p>{address.addressLine1}</p>
                        {address.addressLine2 && <p>{address.addressLine2}</p>}
                        <p>{address.city}, {address.state} {address.postalCode}</p>
                        <p>{address.country}</p>
                      </div>
                      
                      <div className="flex gap-2 mt-4">
                        {!address.isDefault && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleSetPrimaryAddress(address._id)}
                            className="flex-1"
                          >
                            Set as Primary
                          </Button>
                        )}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditAddress(address)}
                          className="flex-1"
                        >
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteAddress(address._id)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Address Form Modal */}
      <AnimatePresence>
        {showAddressForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setShowAddressForm(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-lg font-semibold mb-4">
                {editingAddress ? 'Edit Address' : 'Add New Address'}
              </h3>
              
              <form onSubmit={handleSaveAddress} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <Input
                      id="fullName"
                      name="fullName"
                      value={addressForm.fullName}
                      onChange={handleAddressChange}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <Input
                      id="phone"
                      name="phone"
                      value={addressForm.phone}
                      onChange={handleAddressChange}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="addressLine1" className="block text-sm font-medium text-gray-700 mb-1">Address Line 1</label>
                  <Input
                    id="addressLine1"
                    name="addressLine1"
                    value={addressForm.addressLine1}
                    onChange={handleAddressChange}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="addressLine2" className="block text-sm font-medium text-gray-700 mb-1">Address Line 2 (Optional)</label>
                  <Input
                    id="addressLine2"
                    name="addressLine2"
                    value={addressForm.addressLine2}
                    onChange={handleAddressChange}
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">City</label>
                    <Input
                      id="city"
                      name="city"
                      value={addressForm.city}
                      onChange={handleAddressChange}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">State</label>
                    <Input
                      id="state"
                      name="state"
                      value={addressForm.state}
                      onChange={handleAddressChange}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700 mb-1">Postal Code</label>
                    <Input
                      id="postalCode"
                      name="postalCode"
                      value={addressForm.postalCode}
                      onChange={handleAddressChange}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                    <Input
                      id="country"
                      name="country"
                      value={addressForm.country}
                      onChange={handleAddressChange}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="addressType" className="block text-sm font-medium text-gray-700 mb-1">Address Type</label>
                    <select
                      id="addressType"
                      name="addressType"
                      value={addressForm.addressType}
                      onChange={handleAddressChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="home">Home</option>
                      <option value="work">Work</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="flex gap-2 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowAddressForm(false)}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button type="submit" className="flex-1">
                    {editingAddress ? 'Update Address' : 'Add Address'}
                  </Button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default AboutMe;