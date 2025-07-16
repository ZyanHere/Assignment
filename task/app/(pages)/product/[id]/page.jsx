"use client";

import Header from "@/components/home/Header";
import { useProduct } from "@/lib/contexts/productContext";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/contexts/cart-context";
import { Star, Heart, Loader2 } from 'lucide-react';
import { useSelectedItems } from "@/lib/contexts/selected-items-context";
import toast from "react-hot-toast";
import { Toaster } from 'react-hot-toast';
import { useWishlist } from "@/lib/hooks/useWishlist";
import { useSession } from "next-auth/react";
import { use } from "react";

export default function DescriptionPage({ params }) {
    // Unwrap params using React.use()
    const unwrappedParams = use(params);
    const productId = unwrappedParams.id;

    const { selectedProduct, selectedVariant, setSelectedProduct, setSelectedVariant } = useProduct();
    const router = useRouter();
    const { addToCart, clearCart } = useCart();
    const [activeTab, setActiveTab] = useState("keyinfo");
    const [selectedImage, setSelectedImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [grabLoading, setGrabLoading] = useState(false);
    const { setSingleItem, setSelectedItems } = useSelectedItems();
    const { data: session } = useSession();

    const {
        addItem,
        removeItem,
        isInWishlist,
        isProductLoading
    } = useWishlist();

    // Fetch product data if not available in context
    const fetchProduct = useCallback(async (productId) => {
        try {
            setLoading(true);
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/lmd/api/v1/retail/products/${productId}`);

            if (!response.ok) {
                throw new Error('Product not found');
            }

            const data = await response.json();
            const product = data.data || data;

            // Set the product in context
            setSelectedProduct(product);

            // Set the first variant as selected if available
            if (product.variants && product.variants.length > 0) {
                setSelectedVariant(product.variants[0]);
            }

        } catch (error) {
            console.error('Error fetching product:', error);
            toast.error('Product not found');
            router.push('/');
        } finally {
            setLoading(false);
        }
    }, [setSelectedProduct, setSelectedVariant, router]); // Added dependencies

    useEffect(() => {
        // Only fetch if we don't have a product or if the product ID doesn't match
        if (!selectedProduct || (selectedProduct._id !== productId && selectedProduct.id !== productId)) {
            fetchProduct(productId);
        } else {
            // Product matches, just scroll to top
            window.scrollTo(0, 0);
        }
    }, [productId, selectedProduct?._id, selectedProduct?.id, fetchProduct]);

    useEffect(() => {
        if (selectedVariant) {
            setSelectedImage(selectedVariant.images[0].url);
        }
    }, [selectedVariant]);

    // Show loading state while fetching product
    if (loading || !selectedProduct || !selectedVariant || !selectedImage) {
        return (
            <>
                <Header />
                <div className="flex items-center justify-center min-h-screen">
                    <div className="flex flex-col items-center gap-4">
                        <Loader2 className="w-8 h-8 animate-spin text-yellow-500" />
                        <p className="text-gray-600">Loading product...</p>
                    </div>
                </div>
            </>
        );
    }

    const handleAddToCart = () => {

        if (selectedVariant) {
            addToCart({
                id: selectedVariant._id,
                variant: selectedVariant,
                selectedVariant,
                price: selectedVariant.base_price,
                sale_price: selectedVariant.price.sale_price,
                stock: selectedVariant.stock.quantity,
                sku: selectedVariant.sku,
            });
            toast.success('Added to Cart successfully')
        } else {
            console.warn("No variant available for this product");
        }
    };

    const handleGrab = async () => {
        if (!session?.user?.token) {
            toast.error('Please login to grab this item');
            return;
        }

        if (selectedVariant) {
            try {
                setGrabLoading(true);

                // Clear existing cart first
                await clearCart();

                // Add only this product to cart
                await addToCart({
                    id: selectedVariant._id,
                    variant: selectedVariant,
                    selectedVariant,
                    price: selectedVariant.base_price,
                    sale_price: selectedVariant.price.sale_price,
                    stock: selectedVariant.stock.quantity,
                    sku: selectedVariant.sku,
                });

                // Also populate selectedItems context for buy-now page
                const cartItemData = [{
                    id: selectedVariant._id,
                    variantId: selectedVariant._id,
                    name: selectedVariant.variant_name,
                    brand: selectedProduct?.brand || 'Last Minute Deal',
                    seller: selectedProduct.vendor_store_id?.store_name || 'Last Minute Deal',
                    vendorId: selectedProduct.vendor_store_id?._id || 'default',
                    vendorName: selectedProduct.vendor_store_id?.store_name || 'Last Minute Deal',
                    price: selectedVariant.price.sale_price,
                    mrp: selectedVariant.price.base_price,
                    image:
                        selectedVariant.images.find((img) => img.is_primary)?.url ||
                        selectedProduct.images[0]?.url,
                    weight: selectedVariant.variant_name,
                    quantity: 1,
                }];

                setSelectedItems(cartItemData);
                setSingleItem(false); // This is from cart, not single item

                // Add a small delay to ensure cart is updated
                await new Promise(resolve => setTimeout(resolve, 500));

                toast.success('Item grabbed successfully!');

                // Navigate to buy-now page
                router.push('/buy-now');
            } catch (error) {
                console.error('Error grabbing item:', error);
                toast.error('Failed to grab item. Please try again.');
            } finally {
                setGrabLoading(false);
            }
        } else {
            toast.error('No variant selected');
        }
    }

    const handleWishlistToggle = async () => {
        if (!session?.user?.token) {
            toast.error('Please login to save items to wishlist');
            return;
        }

        const productId = selectedProduct._id || selectedProduct.id;

        try {
            if (isInWishlist(productId)) {
                await removeItem(productId);
                toast.success('Removed from wishlist');
            } else {
                await addItem(productId);
                toast.success('Added to wishlist');
            }
        } catch (error) {
            toast.error(error.message || 'Failed to update wishlist');
        }
    };

    const productIdForWishlist = selectedProduct._id || selectedProduct.id;
    const wishlistLoading = isProductLoading(productIdForWishlist);

    return (
        <>
            <Header />
            <Toaster />

            {/* Breadcrumb Navigation */}
            <div className="px-3 sm:px-4 md:px-6 lg:px-8 mt-4 sm:mt-6 md:mt-8">
                <Breadcrumb>
                    <BreadcrumbList className='text-sm sm:text-base md:text-lg text-black'>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/" className='text-sm sm:text-base md:text-lg hover:text-yellow-600 transition-colors'>
                                Home
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink
                                href={`/categories/${selectedProduct.category.slug}`}
                                className='text-sm sm:text-base md:text-lg hover:text-yellow-600 transition-colors'
                            >
                                {selectedProduct.category.name}
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        {/* {
                            selectedProduct.subcategory && <>
                                <BreadcrumbItem>
                                    <BreadcrumbLink 
                                        href={`/categories/${selectedProduct.category.slug}/${selectedProduct.subcategory.slug}`}
                                        className='text-sm sm:text-base md:text-lg hover:text-yellow-600 transition-colors'
                                    >
                                        {selectedProduct.subcategory.name}
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator />
                            </>
                        } */}

                        <BreadcrumbItem>
                            <BreadcrumbPage className='text-yellow-500 text-sm sm:text-base md:text-lg truncate'>
                                {selectedProduct.name}
                            </BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>

            {/* Main Product Section */}
            <div className="px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8">
                <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 md:gap-8">

                    {/* Product Images Section */}
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 lg:w-1/2">
                        {/* Thumbnail Images */}
                        <div className="flex sm:flex-col gap-2 order-2 sm:order-1">
                            {selectedVariant.images.map((img, idx) => (
                                <div
                                    key={idx}
                                    className={`h-16 w-16 sm:h-20 sm:w-20 relative border-2 cursor-pointer transition-all duration-200 ${selectedImage === img.url
                                            ? "border-cyan-500 shadow-md"
                                            : "border-gray-300 hover:border-cyan-400"
                                        }`}
                                    onClick={() => setSelectedImage(img.url)}
                                >
                                    <Image
                                        src={img.url}
                                        alt={`${selectedVariant.variant_name} - ${idx}`}
                                        fill
                                        className="object-cover rounded-sm"
                                    />
                                </div>
                            ))}
                        </div>

                        {/* Main Product Image */}
                        <div className="h-64 sm:h-80 md:h-96 lg:h-[500px] w-full sm:w-80 md:w-96 lg:w-[500px] flex items-center justify-center border border-gray-200 rounded-lg relative order-1 sm:order-2">
                            {selectedImage && (
                                <Image
                                    src={selectedImage}
                                    alt={selectedVariant.variant_name}
                                    fill
                                    className="object-contain p-2"
                                />
                            )}
                        </div>
                    </div>

                    {/* Product Details Section */}
                    <div className="flex flex-col gap-3 sm:gap-4 lg:w-1/2">
                        <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-900">
                            {selectedVariant.variant_name}
                        </h1>

                        {/* Price Section */}
                        <div className="space-y-1">
                            <div className="text-sm sm:text-base text-gray-500 line-through">
                                MRP ₹{selectedVariant.price.base_price}
                            </div>
                            <div className="text-lg sm:text-xl md:text-2xl font-bold text-green-600">
                                ₹{selectedVariant.price.sale_price}
                            </div>
                            <div className="text-sm sm:text-base text-green-600 font-medium">
                                {Math.round(((selectedVariant.price.base_price - selectedVariant.price.sale_price) / selectedVariant.price.base_price) * 100)}% OFF
                            </div>
                        </div>

                        {/* Rating Section */}
                        <div className="flex items-center gap-2">
                            <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className={`w-4 h-4 sm:w-5 sm:h-5 ${i < Math.floor(selectedProduct.rating?.average || 0)
                                                ? "fill-yellow-400 text-yellow-400"
                                                : "text-gray-300"
                                            }`}
                                    />
                                ))}
                            </div>
                            <span className="text-gray-700 ml-2 text-xs sm:text-sm">
                                {selectedProduct.rating?.average}
                            </span>
                            <span className="text-gray-500 ml-2 text-xs sm:text-sm">
                                ({selectedProduct.rating?.count} Reviews)
                            </span>
                        </div>

                        {/* Description */}
                        <p className="text-gray-600 mt-2 text-sm sm:text-base leading-relaxed">
                            {selectedProduct.description ||
                                `Experience the quality of ${selectedProduct.name} by ${selectedProduct.brand || 'Last Minute Deal'}. This premium product offers excellent value and is available in the ${selectedProduct.category?.name || 'selected'} category.`}
                        </p>

                        {/* Action Buttons */}
                        <div className="mt-4 sm:mt-6 space-y-3 sm:space-y-4">
                            {/* Price Summary */}
                            <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                                <div className="font-bold text-sm sm:text-base">
                                    <p className="text-gray-600">Total:</p>
                                    <p className="text-lg sm:text-xl">₹ {selectedVariant.price.sale_price}</p>
                                </div>
                                <Button
                                    onClick={handleWishlistToggle}
                                    disabled={wishlistLoading}
                                    className="rounded-full bg-white hover:bg-gray-100 shadow-md p-2 sm:p-3"
                                    aria-label={isInWishlist(productIdForWishlist) ? "Remove from wishlist" : "Add to wishlist"}
                                >
                                    {wishlistLoading ? (
                                        <Loader2 className="w-5 h-5 sm:w-6 sm:h-6 animate-spin text-gray-500" />
                                    ) : (
                                        <Heart
                                            className={`w-5 h-5 sm:w-6 sm:h-6 ${isInWishlist(productIdForWishlist)
                                                    ? "fill-red-500 text-red-500"
                                                    : "text-gray-500 hover:text-red-500"
                                                }`}
                                        />
                                    )}
                                </Button>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-col sm:flex-row gap-3 sm:gap-6">
                                <Button
                                    className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white rounded-xl text-base sm:text-lg font-semibold py-3 sm:py-4 shadow-lg transition-all duration-200"
                                    style={{ minWidth: '160px' }}
                                    onClick={handleAddToCart}
                                >
                                    ADD TO CART
                                </Button>
                                <Button
                                    className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white rounded-xl text-base sm:text-lg font-semibold py-3 sm:py-4 shadow-lg transition-all duration-200"
                                    style={{ minWidth: '160px' }}
                                    onClick={handleGrab}
                                    disabled={grabLoading}
                                >
                                    {grabLoading ? (
                                        <div className="flex items-center gap-2">
                                            <Loader2 className="w-5 h-5 sm:w-6 sm:h-6 animate-spin text-white" />
                                            <span>Grabbing...</span>
                                        </div>
                                    ) : (
                                        "GRAB IT NOW"
                                    )}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Product Variants Section */}
                <div className="mt-8 sm:mt-12">
                    <div className="space-y-4 sm:space-y-6">
                        <h2 className="font-medium text-lg sm:text-xl md:text-2xl text-gray-900">
                            Product Variants
                        </h2>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4 md:gap-6">
                            {selectedProduct.variants.map((variant, index) => (
                                <div key={index} className="flex flex-col items-center gap-2">
                                    <div
                                        className={`h-24 w-24 sm:h-32 sm:w-32 md:h-40 md:w-40 border-2 relative overflow-hidden cursor-pointer rounded-lg transition-all duration-200 ${selectedVariant === variant
                                                ? "border-cyan-500 shadow-lg"
                                                : "border-gray-300 hover:border-cyan-400"
                                            }`}
                                        onClick={() => {
                                            setSelectedVariant(variant)
                                            setSelectedImage(variant.images[0].url)
                                        }}
                                    >
                                        <Image
                                            src={variant.images[0].url}
                                            alt={variant.variant_name}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <span className="text-xs sm:text-sm text-center break-words w-full font-medium">
                                        {variant.variant_name}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Product Information Tabs */}
                <div className="mt-8 sm:mt-12">
                    <div className="space-y-4 sm:space-y-6">
                        {/* Tab Buttons */}
                        <div className="flex flex-wrap gap-2 sm:gap-3 pb-2 text-sm sm:text-base">
                            <button
                                onClick={() => setActiveTab("keyinfo")}
                                className={`px-3 py-2 rounded-lg font-medium transition-all duration-200 ${activeTab === "keyinfo"
                                        ? "bg-green-200 text-green-800 shadow-sm"
                                        : "text-gray-700 hover:bg-gray-100"
                                    }`}
                            >
                                Key Info
                            </button>

                            <button
                                onClick={() => setActiveTab("attributes")}
                                className={`px-3 py-2 rounded-lg font-medium transition-all duration-200 ${activeTab === "attributes"
                                        ? "bg-green-200 text-green-800 shadow-sm"
                                        : "text-gray-700 hover:bg-gray-100"
                                    }`}
                            >
                                Attributes
                            </button>

                            <button
                                onClick={() => setActiveTab("specifications")}
                                className={`px-3 py-2 rounded-lg font-medium transition-all duration-200 ${activeTab === "specifications"
                                        ? "bg-green-200 text-green-800 shadow-sm"
                                        : "text-gray-700 hover:bg-gray-100"
                                    }`}
                            >
                                Specifications
                            </button>

                            <button className="text-orange-500 border-2 border-orange-300 px-3 py-2 rounded-lg hover:bg-orange-50 transition-colors">
                                Visit store
                            </button>
                        </div>

                        {/* Tab Content */}
                        <div className="border border-gray-200 rounded-lg p-4 sm:p-6 text-gray-700 text-sm sm:text-base leading-relaxed">
                            {activeTab === "keyinfo" && (
                                <div className="space-y-3 sm:space-y-4">
                                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                                        <span className="font-semibold text-sm sm:text-base min-w-[100px]">Type:</span>
                                        <span>{selectedProduct.category.name}</span>
                                    </div>
                                    <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-2">
                                        <span className="font-semibold text-sm sm:text-base min-w-[100px]">Description:</span>
                                        <span>{selectedProduct.description ||
                                            `Experience the quality of ${selectedProduct.name} by ${selectedProduct.brand || 'Last Minute Deal'}. This premium product offers excellent value and is available in the ${selectedProduct.category?.name || 'selected'} category.`}</span>
                                    </div>
                                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                                        <span className="font-semibold text-sm sm:text-base min-w-[100px]">Brand:</span>
                                        <span>{selectedProduct.brand}</span>
                                    </div>
                                    {selectedProduct.warranty && (
                                        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                                            <span className="font-semibold text-sm sm:text-base min-w-[100px]">Warranty:</span>
                                            <span>{selectedProduct.warranty}</span>
                                        </div>
                                    )}
                                </div>
                            )}

                            {activeTab === "attributes" && (
                                <div className="space-y-3 sm:space-y-4">
                                    {selectedVariant.attributes?.length > 0 ? (
                                        selectedVariant.attributes?.map((attr, idx) => (
                                            <div key={idx} className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                                                <span className="font-semibold text-sm sm:text-base min-w-[100px]">{attr.name}:</span>
                                                <span>{attr.value}</span>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="text-gray-500">No attributes available</div>
                                    )}
                                </div>
                            )}

                            {activeTab === "specifications" && (
                                <div className="space-y-3 sm:space-y-4">
                                    {selectedProduct.specifications?.length > 0 ? (
                                        selectedProduct.specifications?.map((spec, idx) => (
                                            <div key={idx} className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                                                <span className="font-semibold text-sm sm:text-base min-w-[100px]">{spec.name}:</span>
                                                <span>{spec.value}</span>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="text-gray-500">No specifications available</div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
