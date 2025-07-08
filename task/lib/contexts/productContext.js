"use client";

import { createContext, useContext, useState } from "react";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {

    const [selectedProduct, setSelectedProduct] = useState(null);

    return (
        <ProductContext.Provider value={{ selectedProduct, setSelectedProduct }}>
            {children}
        </ProductContext.Provider>
    );
};

export const useProduct = () => useContext(ProductContext);