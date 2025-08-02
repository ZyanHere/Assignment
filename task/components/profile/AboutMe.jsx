"use client"
import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { motion, AnimatePresence } from "framer-motion"
import {
  CheckCircle2,
  Edit2,
  User,
  Mail,
  Phone,
  Loader2,
  MapPin,
  Plus,
  Trash2,
  Star,
  Sparkles,
  Home,
  Building,
  Settings,
} from "lucide-react"
import { useDispatch } from "react-redux"
import {
  updateUserProfile,
  createUserAddress,
  updateUserAddress,
  deleteUserAddress,
  setPrimaryAddress,
} from "@/lib/redux/user/userSlice"
import { useAuth } from "@/lib/hooks/useAuth"
import toast from "react-hot-toast"

const AboutMe = () => {
  const dispatch = useDispatch()
  const { user, isAuthenticated, profileData, profileLoading, addresses, addressLoading, session } = useAuth()

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
  })
  const [originalData, setOriginalData] = useState({})
  const [editMode, setEditMode] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  // Address management
  const [showAddressForm, setShowAddressForm] = useState(false)
  const [editingAddress, setEditingAddress] = useState(null)
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
    addressType: "home",
  })

  useEffect(() => {
    if (profileData || user) {
      const userData = {
        firstName: profileData?.firstName || profileData?.name?.split(" ")[0] || user?.name?.split(" ")[0] || "",
        lastName:
          profileData?.lastName ||
          profileData?.name?.split(" ").slice(1).join(" ") ||
          user?.name?.split(" ").slice(1).join(" ") ||
          "",
        phone: profileData?.phone || user?.phone || "",
        email: profileData?.email || user?.email || "",
      }
      setFormData(userData)
      setOriginalData(userData)
    }
  }, [profileData, user])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!isAuthenticated || !session?.user?.token) {
      toast.error("Authentication required")
      return
    }

    setIsSaving(true)

    try {
      const updateData = {
        name: `${formData.firstName} ${formData.lastName}`.trim(),
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone,
        email: formData.email,
      }

      await dispatch(
        updateUserProfile({
          token: session.user.token,
          profileData: updateData,
        }),
      ).unwrap()

      setOriginalData(formData)
      setEditMode(false)
      setShowSuccess(true)
      toast.success("Profile updated successfully!")
      setTimeout(() => setShowSuccess(false), 3000)
    } catch (error) {
      console.error("Failed to update profile:", error)
      toast.error(error || "Failed to update profile. Please try again.")
      setFormData(originalData)
    } finally {
      setIsSaving(false)
    }
  }

  const handleCancel = () => {
    setFormData(originalData)
    setEditMode(false)
  }

  // Address management functions
  const handleAddressChange = (e) => {
    setAddressForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleAddAddress = () => {
    setEditingAddress(null)
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
      addressType: "home",
    })
    setShowAddressForm(true)
  }

  const handleEditAddress = (address) => {
    setEditingAddress(address)
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
      addressType: address.addressType || "home",
    })
    setShowAddressForm(true)
  }

  const handleSaveAddress = async (e) => {
    e.preventDefault()

    if (!isAuthenticated || !session?.user?.token) {
      toast.error("Authentication required")
      return
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
        notes: addressForm.phone ? `Phone: ${addressForm.phone}` : "",
      }

      if (editingAddress) {
        await dispatch(
          updateUserAddress({
            token: session.user.token,
            addressId: editingAddress._id,
            addressData,
          }),
        ).unwrap()
        toast.success("Address updated successfully!")
      } else {
        await dispatch(
          createUserAddress({
            token: session.user.token,
            addressData,
          }),
        ).unwrap()
        toast.success("Address added successfully!")
      }

      setShowAddressForm(false)
      setEditingAddress(null)
    } catch (error) {
      console.error("Failed to save address:", error)
      toast.error(error || "Failed to save address. Please try again.")
    }
  }

  const handleDeleteAddress = async (addressId) => {
    if (!isAuthenticated || !session?.user?.token) {
      toast.error("Authentication required")
      return
    }

    if (window.confirm("Are you sure you want to delete this address?")) {
      try {
        await dispatch(
          deleteUserAddress({
            token: session.user.token,
            addressId,
          }),
        ).unwrap()
        toast.success("Address deleted successfully!")
      } catch (error) {
        console.error("Failed to delete address:", error)
        toast.error(error || "Failed to delete address. Please try again.")
      }
    }
  }

  const handleSetPrimary = async (addressId) => {
    if (!isAuthenticated || !session?.user?.token) {
      toast.error("Authentication required")
      return
    }

    try {
      await dispatch(
        setPrimaryAddress({
          token: session.user.token,
          addressId,
        }),
      ).unwrap()
      toast.success("Primary address updated successfully!")
    } catch (error) {
      console.error("Failed to set primary address:", error)
      toast.error(error || "Failed to set primary address. Please try again.")
    }
  }

  const handleCancelAddress = () => {
    setShowAddressForm(false)
    setEditingAddress(null)
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
      addressType: "home",
    })
  }

  const getAddressTypeIcon = (type) => {
    switch (type) {
      case "home":
        return <Home className="w-4 h-4" />
      case "work":
        return <Building className="w-4 h-4" />
      default:
        return <MapPin className="w-4 h-4" />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Profile Information */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <Card className="bg-white/90 backdrop-blur-sm shadow-2xl border-0 overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 border-b border-gray-100">
              <CardTitle className="flex items-center gap-3 text-xl sm:text-2xl">
                <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div>
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-bold">
                    Profile Information
                  </span>
                  <p className="text-sm text-gray-600 font-normal mt-1">Manage your personal details</p>
                </div>
                <Sparkles className="w-5 h-5 text-purple-400 ml-auto" />
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 lg:p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                    <label className="block text-sm font-semibold mb-2 text-gray-700">First Name</label>
                    <Input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      disabled={!editMode}
                      className="h-12 border-gray-200 focus:border-purple-400 focus:ring-purple-400 disabled:bg-gray-50 transition-all"
                    />
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                    <label className="block text-sm font-semibold mb-2 text-gray-700">Last Name</label>
                    <Input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      disabled={!editMode}
                      className="h-12 border-gray-200 focus:border-purple-400 focus:ring-purple-400 disabled:bg-gray-50 transition-all"
                    />
                  </motion.div>
                </div>

                <motion.div whileHover={{ scale: 1.01 }} transition={{ duration: 0.2 }}>
                  <label className="block text-sm font-semibold mb-2 text-gray-700 flex items-center gap-2">
                    <Mail className="w-4 h-4 text-blue-500" />
                    Email Address
                  </label>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={!editMode}
                    className="h-12 border-gray-200 focus:border-purple-400 focus:ring-purple-400 disabled:bg-gray-50 transition-all"
                  />
                </motion.div>

                <motion.div whileHover={{ scale: 1.01 }} transition={{ duration: 0.2 }}>
                  <label className="block text-sm font-semibold mb-2 text-gray-700 flex items-center gap-2">
                    <Phone className="w-4 h-4 text-green-500" />
                    Phone Number
                  </label>
                  <Input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    disabled={!editMode}
                    className="h-12 border-gray-200 focus:border-purple-400 focus:ring-purple-400 disabled:bg-gray-50 transition-all"
                  />
                </motion.div>

                <div className="flex flex-col sm:flex-row sm:items-center gap-4 pt-4">
                  {!editMode ? (
                    <Button
                      type="button"
                      onClick={() => setEditMode(true)}
                      className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all flex items-center gap-2 h-12 px-6"
                    >
                      <Edit2 className="w-4 h-4" />
                      Edit Profile
                    </Button>
                  ) : (
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Button
                        type="submit"
                        disabled={isSaving || profileLoading}
                        className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl transition-all flex items-center gap-2 h-12 px-6"
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
                        className="h-12 px-6 hover:bg-gray-50 border-gray-300 bg-transparent"
                      >
                        Cancel
                      </Button>
                    </div>
                  )}

                  <AnimatePresence>
                    {showSuccess && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8, x: 20 }}
                        animate={{ opacity: 1, scale: 1, x: 0 }}
                        exit={{ opacity: 0, scale: 0.8, x: 20 }}
                        className="flex items-center gap-2 text-green-600 bg-green-50 px-4 py-2 rounded-lg border border-green-200"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        <span className="text-sm font-medium">Profile updated successfully!</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </form>
            </CardContent>
          </Card>
        </motion.div>

        {/* Address Management */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="bg-white/90 backdrop-blur-sm shadow-2xl border-0 overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 border-b border-gray-100">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                <CardTitle className="flex items-center gap-3 text-xl sm:text-2xl">
                  <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl shadow-lg">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent font-bold">
                      Saved Addresses
                    </span>
                    <p className="text-sm text-gray-600 font-normal mt-1">Manage your delivery locations</p>
                  </div>
                </CardTitle>
                <Button
                  onClick={handleAddAddress}
                  className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white shadow-lg hover:shadow-xl transition-all flex items-center gap-2 h-12 px-6"
                >
                  <Plus className="w-4 h-4" />
                  Add Address
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-6 lg:p-8">
              {addressLoading ? (
                <div className="space-y-4">
                  {[...Array(2)].map((_, i) => (
                    <div key={i} className="h-32 bg-gradient-to-r from-gray-100 to-gray-200 rounded-xl animate-pulse" />
                  ))}
                </div>
              ) : addresses.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="p-8 bg-gradient-to-br from-gray-100 to-slate-100 rounded-full w-32 h-32 mx-auto mb-6 flex items-center justify-center">
                    <MapPin className="w-16 h-16 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">No addresses saved yet</h3>
                  <p className="text-gray-600 mb-6">Add your first address to get started with deliveries.</p>
                  <Button
                    onClick={handleAddAddress}
                    className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white shadow-lg hover:shadow-xl transition-all flex items-center gap-2 h-12 px-6"
                  >
                    <Plus className="w-4 h-4" />
                    Add Your First Address
                  </Button>
                </motion.div>
              ) : (
                <div className="grid gap-6">
                  <AnimatePresence>
                    {addresses.map((address, index) => (
                      <motion.div
                        key={address._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ y: -2 }}
                        className="bg-gradient-to-r from-white to-gray-50 border border-gray-200 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all"
                      >
                        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4">
                          <div className="flex-1 space-y-3">
                            <div className="flex items-center gap-3 flex-wrap">
                              <Badge
                                className={`px-3 py-1 font-semibold shadow-md flex items-center gap-2 ${
                                  address.addressType === "home"
                                    ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white"
                                    : address.addressType === "work"
                                      ? "bg-gradient-to-r from-purple-500 to-violet-500 text-white"
                                      : "bg-gradient-to-r from-gray-500 to-slate-500 text-white"
                                }`}
                              >
                                {getAddressTypeIcon(address.addressType)}
                                {(address.addressType || "home").charAt(0).toUpperCase() +
                                  (address.addressType || "home").slice(1)}
                              </Badge>
                              {address.isDefault && (
                                <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1 font-semibold shadow-md flex items-center gap-2">
                                  <Star className="w-3 h-3 fill-white" />
                                  Primary
                                </Badge>
                              )}
                            </div>
                            <div>
                              <p className="font-bold text-lg text-gray-900">{address.label || address.fullName}</p>
                              <p className="text-gray-600 mt-1 leading-relaxed">
                                {[
                                  address.addressLine1,
                                  address.addressLine2,
                                  address.city,
                                  address.state,
                                  address.postalCode,
                                  address.country,
                                ]
                                  .filter(Boolean)
                                  .join(", ")}
                              </p>
                              {address.notes && (
                                <p className="text-sm text-blue-600 mt-2 bg-blue-50 px-3 py-1 rounded-lg inline-block">
                                  {address.notes}
                                </p>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center gap-2 flex-wrap">
                            {!address.isDefault && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleSetPrimary(address._id)}
                                className="hover:bg-green-50 hover:border-green-300 hover:text-green-700 transition-colors"
                              >
                                <Star className="w-4 h-4 mr-1" />
                                Set Primary
                              </Button>
                            )}
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleEditAddress(address)}
                              className="hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 transition-colors"
                            >
                              <Edit2 className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDeleteAddress(address._id)}
                              className="text-red-600 hover:bg-red-50 hover:border-red-300 hover:text-red-700 transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}

              {/* Address Form */}
              <AnimatePresence>
                {showAddressForm && (
                  <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="mt-8"
                  >
                    <Card className="bg-gradient-to-br from-white to-gray-50 shadow-xl border-0">
                      <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 border-b border-gray-100">
                        <CardTitle className="text-xl font-bold flex items-center gap-3">
                          <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg">
                            <Settings className="w-5 h-5 text-white" />
                          </div>
                          {editingAddress ? "Edit Address" : "Add New Address"}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-6">
                        <form onSubmit={handleSaveAddress} className="space-y-6">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div>
                              <label className="block text-sm font-semibold mb-2 text-gray-700">Full Name</label>
                              <Input
                                type="text"
                                name="fullName"
                                value={addressForm.fullName}
                                onChange={handleAddressChange}
                                required
                                className="h-12 border-gray-200 focus:border-purple-400 focus:ring-purple-400"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-semibold mb-2 text-gray-700">Phone</label>
                              <Input
                                type="tel"
                                name="phone"
                                value={addressForm.phone}
                                onChange={handleAddressChange}
                                className="h-12 border-gray-200 focus:border-purple-400 focus:ring-purple-400"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-sm font-semibold mb-2 text-gray-700">Address Line 1</label>
                            <Input
                              type="text"
                              name="addressLine1"
                              value={addressForm.addressLine1}
                              onChange={handleAddressChange}
                              required
                              className="h-12 border-gray-200 focus:border-purple-400 focus:ring-purple-400"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-semibold mb-2 text-gray-700">Address Line 2</label>
                            <Input
                              type="text"
                              name="addressLine2"
                              value={addressForm.addressLine2}
                              onChange={handleAddressChange}
                              className="h-12 border-gray-200 focus:border-purple-400 focus:ring-purple-400"
                            />
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                            <div>
                              <label className="block text-sm font-semibold mb-2 text-gray-700">City</label>
                              <Input
                                type="text"
                                name="city"
                                value={addressForm.city}
                                onChange={handleAddressChange}
                                required
                                className="h-12 border-gray-200 focus:border-purple-400 focus:ring-purple-400"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-semibold mb-2 text-gray-700">State</label>
                              <Input
                                type="text"
                                name="state"
                                value={addressForm.state}
                                onChange={handleAddressChange}
                                required
                                className="h-12 border-gray-200 focus:border-purple-400 focus:ring-purple-400"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-semibold mb-2 text-gray-700">Postal Code</label>
                              <Input
                                type="text"
                                name="postalCode"
                                value={addressForm.postalCode}
                                onChange={handleAddressChange}
                                required
                                className="h-12 border-gray-200 focus:border-purple-400 focus:ring-purple-400"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div>
                              <label className="block text-sm font-semibold mb-2 text-gray-700">Country</label>
                              <Input
                                type="text"
                                name="country"
                                value={addressForm.country}
                                onChange={handleAddressChange}
                                required
                                className="h-12 border-gray-200 focus:border-purple-400 focus:ring-purple-400"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-semibold mb-2 text-gray-700">Address Type</label>
                              <select
                                name="addressType"
                                value={addressForm.addressType}
                                onChange={handleAddressChange}
                                className="w-full h-12 p-3 border border-gray-200 rounded-lg focus:border-purple-400 focus:ring-purple-400 bg-white"
                              >
                                <option value="home">🏠 Home</option>
                                <option value="work">🏢 Work</option>
                                <option value="other">📍 Other</option>
                              </select>
                            </div>
                          </div>

                          <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
                            <input
                              type="checkbox"
                              id="isPrimary"
                              name="isPrimary"
                              checked={addressForm.isPrimary}
                              onChange={(e) => setAddressForm((prev) => ({ ...prev, isPrimary: e.target.checked }))}
                              className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                            />
                            <label htmlFor="isPrimary" className="text-sm font-medium text-gray-700">
                              Set as primary address
                            </label>
                          </div>

                          <div className="flex flex-col sm:flex-row gap-3 pt-4">
                            <Button
                              type="submit"
                              disabled={addressLoading}
                              className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl transition-all flex items-center gap-2 h-12 px-6 flex-1"
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
                              className="h-12 px-6 hover:bg-gray-50 border-gray-300 bg-transparent"
                            >
                              Cancel
                            </Button>
                          </div>
                        </form>
                      </CardContent>
                    </Card>
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

export default AboutMe
