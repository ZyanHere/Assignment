"use client";

import { createContext, useContext, useEffect, useState } from "react";


const AddressContext = createContext();

export const useAddress = () => useContext(AddressContext);

export const AddressProvider = ({ children }) => {
  const [primaryAddress, setPrimaryAddress] = useState(null);
  const [secondaryAddress, setSecondaryAddress] = useState(null);

  // Load from backend or cookies if needed
  useEffect(() => {
    // example API call or SSR fetch here if needed
    const savedPrimary = sessionStorage.getItem("primaryAddress");
    const savedSecondary = sessionStorage.getItem("secondaryAddress");

    if (savedPrimary) setPrimaryAddress(JSON.parse(savedPrimary));
    if (savedSecondary) setSecondaryAddress(JSON.parse(savedSecondary));
  }, []);

  // Save to session storage or perform API save
  useEffect(() => {
    if (primaryAddress) {
      sessionStorage.setItem("primaryAddress", JSON.stringify(primaryAddress));
    }
  }, [primaryAddress]);

  useEffect(() => {
    if (secondaryAddress) {
      sessionStorage.setItem("secondaryAddress", JSON.stringify(secondaryAddress));
    }
  }, [secondaryAddress]);

  return (
    <AddressContext.Provider
      value={{
        primaryAddress,
        setPrimaryAddress,
        secondaryAddress,
        setSecondaryAddress,
      }}
    >
      {children}
    </AddressContext.Provider>
  );
};
