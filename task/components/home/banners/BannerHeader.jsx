"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { setLocation } from "@/lib/redux/modalLocation/modalLocationSlice";
import { 
  fetchUserAddresses, 
  createUserAddress, 
  setPrimaryAddress 
} from "@/lib/redux/user/userSlice";
import { useAuth } from "@/lib/hooks/useAuth";
import { MapPin, Loader2, CheckCircle, AlertCircle, ChevronDown, Search } from "lucide-react";
import toast from "react-hot-toast";

export const BannerHeader = () => {
  const dispatch = useDispatch();
  const location = useSelector((state) => state.modalLocation.location);
  const { addresses, primaryAddress, addressLoading, isAuthenticated, session } = useAuth();

  const [inputValue, setInputValue] = useState("");
  const [open, setOpen] = useState(false);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [isAutoDetecting, setIsAutoDetecting] = useState(false);
  const [detectedAddress, setDetectedAddress] = useState(null);
  const [existingAddress, setExistingAddress] = useState(null);
  const [showAddressOptions, setShowAddressOptions] = useState(false);
  const [currentLocation, setCurrentLocation] = useState(location || "Select delivery location");
  
  // Places API states
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);
  
  const inputRef = useRef(null);
  const suggestionsRef = useRef(null);

  // Check if Google Maps API is available
  const isGoogleMapsAvailable = typeof window !== 'undefined' && window.google && window.google.maps;

  // Get current location using browser geolocation
  const getCurrentLocation = () => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation is not supported by this browser'));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          reject(error);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000 // 5 minutes
        }
      );
    });
  };

  // Get place suggestions using Google Places API
  const getPlaceSuggestions = async (query) => {
    if (!query || query.length < 3) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    setIsLoadingSuggestions(true);

    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(query)}&types=(cities)&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch suggestions');
      }

      const data = await response.json();

      if (data.status === 'OK') {
        setSuggestions(data.predictions || []);
        setShowSuggestions(true);
        setSelectedSuggestionIndex(-1);
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    } catch (error) {
      console.error('Places API error:', error);
      setSuggestions([]);
      setShowSuggestions(false);
    } finally {
      setIsLoadingSuggestions(false);
    }
  };

  // Get place details using Google Places API
  const getPlaceDetails = async (placeId) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=formatted_address,address_components,geometry&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch place details');
      }

      const data = await response.json();

      if (data.status === 'OK' && data.result) {
        return parsePlaceDetails(data.result);
      } else {
        throw new Error('No place details found');
      }
    } catch (error) {
      console.error('Place details error:', error);
      throw error;
    }
  };

  // Parse place details into address format
  const parsePlaceDetails = (place) => {
    const addressComponents = place.address_components || [];
    
    const addressData = {
      fullAddress: place.formatted_address,
      addressLine1: '',
      city: '',
      state: '',
      postalCode: '',
      country: 'India',
      coordinates: {
        type: 'Point',
        coordinates: [
          place.geometry?.location?.lng || 0,
          place.geometry?.location?.lat || 0
        ]
      }
    };

    // Parse address components
    let streetNumber = '';
    let route = '';
    let sublocality = '';
    let locality = '';

    addressComponents.forEach(component => {
      const types = component.types;
      
      if (types.includes('street_number')) {
        streetNumber = component.long_name;
      }
      if (types.includes('route')) {
        route = component.long_name;
      }
      if (types.includes('sublocality')) {
        sublocality = component.long_name;
      }
      if (types.includes('locality')) {
        locality = component.long_name;
      }
      if (types.includes('administrative_area_level_1')) {
        addressData.state = component.long_name;
      }
      if (types.includes('postal_code')) {
        addressData.postalCode = component.long_name;
      }
      if (types.includes('country')) {
        addressData.country = component.long_name;
      }
    });

    // Build addressLine1 with fallbacks
    if (streetNumber && route) {
      addressData.addressLine1 = `${streetNumber} ${route}`;
    } else if (route) {
      addressData.addressLine1 = route;
    } else if (sublocality) {
      addressData.addressLine1 = sublocality;
    } else if (locality) {
      addressData.addressLine1 = `${locality} Area`;
    } else {
      const addressParts = place.formatted_address.split(',');
      addressData.addressLine1 = addressParts[0] || 'Selected Location';
    }

    // Set city with fallback
    addressData.city = locality || sublocality || 'Unknown City';

    // Ensure we have minimum required data
    if (!addressData.addressLine1 || addressData.addressLine1.length < 3) {
      addressData.addressLine1 = 'Selected Location';
    }
    if (!addressData.city || addressData.city.length < 2) {
      addressData.city = 'Unknown City';
    }
    if (!addressData.state || addressData.state.length < 2) {
      addressData.state = 'Unknown State';
    }
    if (!addressData.postalCode) {
      addressData.postalCode = '000000';
    }

    return addressData;
  };

  // Reverse geocode coordinates to get address
  const reverseGeocode = async (lat, lng) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch address');
      }

      const data = await response.json();
      
      if (data.status === 'OK' && data.results.length > 0) {
        const result = data.results[0];
        const addressComponents = result.address_components;
        
        // Extract address components
        const addressData = {
          fullAddress: result.formatted_address,
          addressLine1: '',
          city: '',
          state: '',
          postalCode: '',
          country: 'India',
          coordinates: {
            type: 'Point',
            coordinates: [lng, lat] // MongoDB expects [longitude, latitude]
          }
        };

        // Parse address components
        let streetNumber = '';
        let route = '';
        let sublocality = '';
        let locality = '';

        addressComponents.forEach(component => {
          const types = component.types;
          
          if (types.includes('street_number')) {
            streetNumber = component.long_name;
          }
          if (types.includes('route')) {
            route = component.long_name;
          }
          if (types.includes('sublocality')) {
            sublocality = component.long_name;
          }
          if (types.includes('locality')) {
            locality = component.long_name;
          }
          if (types.includes('administrative_area_level_1')) {
            addressData.state = component.long_name;
          }
          if (types.includes('postal_code')) {
            addressData.postalCode = component.long_name;
          }
          if (types.includes('country')) {
            addressData.country = component.long_name;
          }
        });

        // Build addressLine1 with fallbacks
        if (streetNumber && route) {
          addressData.addressLine1 = `${streetNumber} ${route}`;
        } else if (route) {
          addressData.addressLine1 = route;
        } else if (sublocality) {
          addressData.addressLine1 = sublocality;
        } else if (locality) {
          addressData.addressLine1 = `${locality} Area`;
        } else {
          // Final fallback - use the first part of formatted address
          const addressParts = result.formatted_address.split(',');
          addressData.addressLine1 = addressParts[0] || 'Current Location';
        }

        // Set city with fallback
        addressData.city = locality || sublocality || 'Unknown City';

        // Ensure we have minimum required data
        if (!addressData.addressLine1 || addressData.addressLine1.length < 3) {
          addressData.addressLine1 = 'Current Location';
        }
        if (!addressData.city || addressData.city.length < 2) {
          addressData.city = 'Unknown City';
        }
        if (!addressData.state || addressData.state.length < 2) {
          addressData.state = 'Unknown State';
        }
        if (!addressData.postalCode) {
          addressData.postalCode = '000000';
        }
        
        return addressData;
      } else {
        throw new Error('No address found for this location');
      }
    } catch (error) {
      console.error('Reverse geocoding error:', error);
      throw error;
    }
  };

  // Check if address already exists
  const checkExistingAddress = (newAddress) => {
    if (!addresses || addresses.length === 0) return null;

    return addresses.find(addr => {
      // Check if coordinates are close (within 100 meters)
      if (addr.coordinates && newAddress.coordinates) {
        const distance = calculateDistance(
          addr.coordinates.coordinates[1], // lat
          addr.coordinates.coordinates[0], // lng
          newAddress.coordinates.coordinates[1], // lat
          newAddress.coordinates.coordinates[0] // lng
        );
        return distance < 0.1; // 100 meters
      }

      // Check if address components match
      return (
        addr.city?.toLowerCase() === newAddress.city?.toLowerCase() &&
        addr.state?.toLowerCase() === newAddress.state?.toLowerCase() &&
        addr.postalCode === newAddress.postalCode
      );
    });
  };

  // Calculate distance between two points in kilometers
  const calculateDistance = (lat1, lng1, lat2, lng2) => {
    const R = 6371; // Earth's radius in kilometers
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLng/2) * Math.sin(dLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  // Validate address data before saving
  const validateAddressData = (addressData) => {
    const errors = [];
    
    if (!addressData.addressLine1 || addressData.addressLine1.trim().length < 3) {
      errors.push('Address line 1 must be at least 3 characters');
    }
    if (!addressData.city || addressData.city.trim().length < 2) {
      errors.push('City is required');
    }
    if (!addressData.state || addressData.state.trim().length < 2) {
      errors.push('State is required');
    }
    if (!addressData.postalCode || addressData.postalCode.trim().length < 3) {
      errors.push('Postal code is required');
    }
    
    return errors;
  };

  // Handle input change with debounced suggestions
  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    setSelectedSuggestionIndex(-1);

    // Debounce the API call
    clearTimeout(inputRef.current);
    inputRef.current = setTimeout(() => {
      getPlaceSuggestions(value);
    }, 300);
  };

  // Handle suggestion selection
  const handleSuggestionSelect = async (suggestion) => {
    try {
      setIsLoadingSuggestions(true);
      
      // Get place details
      const addressData = await getPlaceDetails(suggestion.place_id);
      
      // Set input value to the formatted address
      setInputValue(suggestion.description);
      setShowSuggestions(false);
      setSuggestions([]);
      
      // Check if this matches any saved address
      if (isAuthenticated && session?.user?.token) {
        const existing = checkExistingAddress(addressData);
        if (existing) {
          setDetectedAddress(addressData);
          setExistingAddress(existing);
          setShowAddressOptions(true);
          toast.success("Address found in your saved addresses!");
        } else {
          setDetectedAddress(addressData);
          setExistingAddress(null);
          setShowAddressOptions(true);
          toast.success("New address detected! You can save it to your addresses.");
        }
      } else {
        // For non-authenticated users, just set the location
        const displayLocation = addressData.city || addressData.fullAddress.split(',')[0];
        dispatch(setLocation(displayLocation));
        setCurrentLocation(displayLocation);
        toast.success(`Location set to ${displayLocation}`);
      }
    } catch (error) {
      console.error('Error selecting suggestion:', error);
      toast.error('Failed to get address details. Please try again.');
    } finally {
      setIsLoadingSuggestions(false);
    }
  };

  // Handle keyboard navigation
  const handleKeyDown = (e) => {
    if (!showSuggestions) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedSuggestionIndex(prev => 
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedSuggestionIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedSuggestionIndex >= 0 && suggestions[selectedSuggestionIndex]) {
          handleSuggestionSelect(suggestions[selectedSuggestionIndex]);
        } else if (inputValue.trim()) {
          handleSave();
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        setSuggestions([]);
        setSelectedSuggestionIndex(-1);
        break;
    }
  };

  // Auto-detect location on component mount
  const autoDetectLocation = async () => {
    // Only auto-detect if no location is set and user hasn't manually set one
    if (location || currentLocation !== "Select delivery location") {
      return;
    }

    setIsAutoDetecting(true);

    try {
      // Get current location
      const coords = await getCurrentLocation();
      
      // Reverse geocode to get address
      const addressData = await reverseGeocode(coords.lat, coords.lng);
      
      // Set the location in Redux and local state
      const displayLocation = addressData.city || addressData.fullAddress.split(',')[0];
      dispatch(setLocation(displayLocation));
      setCurrentLocation(displayLocation);
      
      // Check if this matches any saved address
      if (isAuthenticated && session?.user?.token) {
        const existing = checkExistingAddress(addressData);
        if (existing) {
          setCurrentLocation(`${existing.city}, ${existing.state}`);
          dispatch(setLocation(`${existing.city}, ${existing.state}`));
        }
      }

      toast.success(`Location set to ${displayLocation}`);
    } catch (error) {
      // console.error('Auto location detection error:', error);
      // Don't show error toast for auto-detection, just log it
    } finally {
      setIsAutoDetecting(false);
    }
  };

  // Handle manual location detection
  const handleDetectLocation = async () => {
    if (!isAuthenticated || !session?.user?.token) {
      toast.error("Please login to save your address");
      return;
    }

    setIsLoadingLocation(true);
    setDetectedAddress(null);
    setExistingAddress(null);
    setShowAddressOptions(false);

    try {
      // Get current location
      const coords = await getCurrentLocation();
      
      // Reverse geocode to get address
      const addressData = await reverseGeocode(coords.lat, coords.lng);
      
      // Validate the address data
      const validationErrors = validateAddressData(addressData);
      if (validationErrors.length > 0) {
        throw new Error(`Address validation failed: ${validationErrors.join(', ')}`);
      }
      
      // Check if address already exists
      const existing = checkExistingAddress(addressData);
      
      setDetectedAddress(addressData);
      setExistingAddress(existing);
      setShowAddressOptions(true);
      
      if (existing) {
        toast.success("Address found in your saved addresses!");
      } else {
        toast.success("New address detected! You can save it to your addresses.");
      }
    } catch (error) {
      console.error('Location detection error:', error);
      toast.error(error.message || "Failed to detect location. Please try again or enter manually.");
    } finally {
      setIsLoadingLocation(false);
    }
  };

  // Save new address
  const handleSaveNewAddress = async () => {
    if (!detectedAddress || !isAuthenticated || !session?.user?.token) {
      toast.error("Authentication required");
      return;
    }

    // Final validation before saving
    const validationErrors = validateAddressData(detectedAddress);
    if (validationErrors.length > 0) {
      toast.error(`Please fix the following issues: ${validationErrors.join(', ')}`);
      return;
    }

    try {
      const addressData = {
        addressLine1: detectedAddress.addressLine1.trim(),
        city: detectedAddress.city.trim(),
        state: detectedAddress.state.trim(),
        postalCode: detectedAddress.postalCode.trim(),
        country: detectedAddress.country,
        addressType: 'home',
        isDefault: addresses.length === 0, // Set as default if first address
        label: 'Current Location',
        coordinates: detectedAddress.coordinates
      };

      await dispatch(createUserAddress({ 
        token: session.user.token, 
        addressData 
      })).unwrap();

      toast.success("Address saved successfully!");
      setOpen(false);
      setDetectedAddress(null);
      setExistingAddress(null);
      setShowAddressOptions(false);
    } catch (error) {
      console.error('Failed to save address:', error);
      toast.error(error || 'Failed to save address');
    }
  };

  // Set existing address as primary
  const handleSetAsPrimary = async () => {
    if (!existingAddress || !isAuthenticated || !session?.user?.token) {
      toast.error("Authentication required");
      return;
    }

    try {
      await dispatch(setPrimaryAddress({ 
        token: session.user.token, 
        addressId: existingAddress._id 
      })).unwrap();

      toast.success("Primary address updated successfully!");
      setOpen(false);
      setDetectedAddress(null);
      setExistingAddress(null);
      setShowAddressOptions(false);
    } catch (error) {
      console.error('Failed to set primary address:', error);
      toast.error(error || 'Failed to set primary address');
    }
  };

  // Manual location save
  const handleSave = () => {
    if (inputValue.trim()) {
      const newLocation = inputValue.trim();
      dispatch(setLocation(newLocation));
      setCurrentLocation(newLocation);
      setOpen(false); 
      setInputValue(""); 
      setShowSuggestions(false);
      setSuggestions([]);
      toast.success(`Location updated to ${newLocation}`);
    }
  };

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target)) {
        setShowSuggestions(false);
        setSuggestions([]);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Load addresses and auto-detect location on component mount
  useEffect(() => {
    if (isAuthenticated && session?.user?.token) {
      dispatch(fetchUserAddresses(session.user.token));
    }
    
    // Auto-detect location after a short delay
    const timer = setTimeout(() => {
      autoDetectLocation();
    }, 1000);

    return () => clearTimeout(timer);
  }, [isAuthenticated, session?.user?.token, dispatch]);

  // Update current location when Redux location changes
  useEffect(() => {
    if (location) {
      setCurrentLocation(location);
    }
  }, [location]);

  return (
    <div className="flex items-center gap-2 text-base font-semibold mb-4">
      <span className="text-black flex items-center gap-1">
        <MapPin className="w-4 h-4" />
        {isAutoDetecting ? (
          <span className="flex items-center gap-1">
            <Loader2 className="w-3 h-3 animate-spin" />
            Detecting location...
          </span>
        ) : (
          currentLocation
        )}
      </span>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <div className="flex items-center gap-1 cursor-pointer hover:bg-gray-100 p-1 rounded transition-colors">
            <Image
              src="/home/assets/Down.svg"
              alt="Change Location"
              width={16}
              height={16}
              className="object-contain"
            />
            <span className="text-xs text-gray-600">Change</span>
          </div>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              Delivery Address
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            {/* Current Location Display */}
            {currentLocation && currentLocation !== "Select delivery location" && (
              <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center gap-2 text-green-700">
                  <CheckCircle className="w-4 h-4" />
                  <span className="text-sm font-medium">Current Location</span>
                </div>
                <p className="text-sm text-green-600 mt-1">{currentLocation}</p>
              </div>
            )}

            {/* Manual Input with Autocomplete */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Enter address manually</label>
              <div className="relative">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      ref={inputRef}
                      placeholder="Type your city or town"
                      value={inputValue}
                      onChange={handleInputChange}
                      onKeyDown={handleKeyDown}
                      onFocus={() => {
                        if (suggestions.length > 0) {
                          setShowSuggestions(true);
                        }
                      }}
                      className="pl-10"
                    />
                    
                    {/* Suggestions Dropdown */}
                    {showSuggestions && (
                      <div 
                        ref={suggestionsRef}
                        className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto"
                      >
                        {isLoadingSuggestions ? (
                          <div className="p-3 text-center text-gray-500">
                            <Loader2 className="w-4 h-4 animate-spin mx-auto mb-2" />
                            Loading suggestions...
                          </div>
                        ) : suggestions.length > 0 ? (
                          suggestions.map((suggestion, index) => (
                            <button
                              key={suggestion.place_id}
                              onClick={() => handleSuggestionSelect(suggestion)}
                              className={`w-full text-left p-3 hover:bg-gray-50 transition-colors ${
                                index === selectedSuggestionIndex ? 'bg-gray-100' : ''
                              } ${index === 0 ? 'rounded-t-lg' : ''} ${
                                index === suggestions.length - 1 ? 'rounded-b-lg' : ''
                              }`}
                            >
                              <div className="flex items-center gap-2">
                                <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0" />
                                <span className="text-sm">{suggestion.description}</span>
                              </div>
                            </button>
                          ))
                        ) : inputValue.length >= 3 ? (
                          <div className="p-3 text-center text-gray-500">
                            No suggestions found
                          </div>
                        ) : null}
                      </div>
                    )}
                  </div>
                  <Button onClick={handleSave} disabled={!inputValue.trim()}>
                    Save
                  </Button>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or
                </span>
              </div>
            </div>

            {/* Auto-detect Location */}
            <div className="space-y-3">
              <label className="text-sm font-medium">Detect current location</label>
              <Button 
                onClick={handleDetectLocation}
                disabled={isLoadingLocation || !isAuthenticated}
                className="w-full"
                variant="outline"
              >
                {isLoadingLocation ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Detecting location...
                  </>
                ) : (
                  <>
                    <MapPin className="w-4 h-4 mr-2" />
                    Use Current Location
                  </>
                )}
              </Button>
            </div>

            {/* Address Options */}
            {showAddressOptions && (
              <div className="space-y-3 p-4 bg-gray-50 rounded-lg">
                {existingAddress ? (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-green-600">
                      <CheckCircle className="w-4 h-4" />
                      <span className="text-sm font-medium">Address found in your saved addresses</span>
                    </div>
                    <div className="text-sm text-gray-600">
                      {existingAddress.addressLine1}, {existingAddress.city}, {existingAddress.state}
                    </div>
                    <Button 
                      onClick={handleSetAsPrimary}
                      disabled={existingAddress.isDefault}
                      className="w-full"
                      size="sm"
                    >
                      {existingAddress.isDefault ? 'Already Primary' : 'Set as Primary Address'}
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-blue-600">
                      <AlertCircle className="w-4 h-4" />
                      <span className="text-sm font-medium">New address detected</span>
                    </div>
                    <div className="text-sm text-gray-600">
                      {detectedAddress?.fullAddress}
                    </div>
                    <div className="text-xs text-gray-500">
                      <strong>Address Line 1:</strong> {detectedAddress?.addressLine1}<br/>
                      <strong>City:</strong> {detectedAddress?.city}<br/>
                      <strong>State:</strong> {detectedAddress?.state}<br/>
                      <strong>Postal Code:</strong> {detectedAddress?.postalCode}
                    </div>
                    <Button 
                      onClick={handleSaveNewAddress}
                      className="w-full"
                      size="sm"
                    >
                      Save to My Addresses
                    </Button>
                  </div>
                )}
              </div>
            )}

            {/* Authentication Notice */}
            {!isAuthenticated && (
              <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-sm text-yellow-800">
                  Please login to save and manage your addresses
                </p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
