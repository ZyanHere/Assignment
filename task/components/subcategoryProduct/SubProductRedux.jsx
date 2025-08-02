import React from "react";
import ProductCard from "./ProductCard";

export default function SubProductRedux({ product }) {
    if (!product) {
        return (
            <div className="animate-pulse">
                <div className="bg-gray-200 h-48 rounded-xl mb-4"></div>
                <div className="bg-gray-200 h-4 rounded mb-2"></div>
                <div className="bg-gray-200 h-4 rounded w-3/4"></div>
            </div>
        );
    }

    // Process images to handle S3 URLs with spaces
    const processedProduct = {
        ...product,
        images: Array.isArray(product.images) 
            ? product.images.map(img => ({
                ...img,
                url: encodeURI(img.url)
            }))
            : product.images
    };

    return (
        <div className="flex justify-center gap-4">
            <ProductCard product={processedProduct} />
        </div>
    );
} 