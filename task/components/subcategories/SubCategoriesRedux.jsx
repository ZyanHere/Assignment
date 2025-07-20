"use client";

import React from "react";
import Image from "next/image";
import SubProductRedux from "../subcategoryProduct/SubProductRedux";
import { useHome } from "@/lib/hooks/useHome";

export default function SubCategoriesRedux({ categoryId, products = [], loading = false }) {
    const { categories } = useHome();

    // Find the category to get its subcategories
    const category = categories.find(cat => cat._id === categoryId);

    // Group products by subcategory
    const productsBySubcategory = React.useMemo(() => {
        if (!products || products.length === 0) return {};

        return products.reduce((acc, product) => {
            const subcategoryId = product.subcategory?._id || product.subcategoryId;
            if (subcategoryId) {
                if (!acc[subcategoryId]) {
                    acc[subcategoryId] = [];
                }
                acc[subcategoryId].push(product);
            }
            return acc;
        }, {});
    }, [products]);

    // If loading, show skeleton
    if (loading) {
        return (
            <div className="p-4 flex flex-col gap-4">
                {[...Array(3)].map((_, index) => (
                    <div key={index} className="p-4 border-b-2 border-gray-300 animate-pulse">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-24 h-24 bg-gray-200 rounded-lg"></div>
                            <div className="h-6 bg-gray-200 rounded w-32"></div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                            {[...Array(6)].map((_, productIndex) => (
                                <div key={productIndex} className="animate-pulse">
                                    <div className="bg-gray-200 h-48 rounded-xl mb-4"></div>
                                    <div className="bg-gray-200 h-4 rounded mb-2"></div>
                                    <div className="bg-gray-200 h-4 rounded w-3/4"></div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    // If no products, show empty state
    if (!products || products.length === 0) {
        return (
            <div className="p-4 text-center py-12">
                <div className="text-gray-500 text-lg mb-4">
                    No products found in this category.
                </div>
                <div className="text-gray-400 text-sm">
                    Try selecting a different category or check back later.
                </div>
            </div>
        );
    }

    // If we have subcategory information, group by subcategory
    if (Object.keys(productsBySubcategory).length > 0) {
        return (
            <div className="p-4 flex flex-col gap-4">
                {Object.entries(productsBySubcategory).map(([subcategoryId, subcategoryProducts]) => {
                    const firstProduct = subcategoryProducts[0];
                    const subcategory = firstProduct.subcategory;

                    return (
                        <div key={subcategoryId} className="p-4 border-b-2 border-gray-300">
                            <div className="flex items-center gap-4 mb-4">
                                {subcategory?.imageUrl && (
                                    <Image
                                        src={subcategory.imageUrl}
                                        alt={subcategory.name}
                                        width={100}
                                        height={100}
                                        className="object-contain"
                                    />
                                )}
                                <h2 className="text-lg font-semibold">{subcategory?.name || 'Products'}</h2>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                                {subcategoryProducts.map((product) => (
                                    <div key={product._id}>
                                        <SubProductRedux product={product} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    }

    // Fallback: display all products in a grid
    return (
        <div className="p-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                {products.map((product) => (
                    <div key={product._id}>
                        <SubProductRedux product={product} />
                    </div>
                ))}
            </div>
        </div>
    );
} 