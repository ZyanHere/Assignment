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
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/contexts/cart-context";
import { Star } from 'lucide-react';
import { useSelectedItems } from "@/lib/contexts/selected-items-context";
import toast from "react-hot-toast";
import { Toaster } from 'react-hot-toast';

export default function DescriptionPage({ params }) {

    const { selectedProduct, selectedVariant, setSelectedVariant } = useProduct();
    const router = useRouter();
    const { addToCart } = useCart();
    const [activeTab, setActiveTab] = useState("keyinfo");
    const [selectedImage, setSelectedImage] = useState(null);
    const { setSingleItem, setSelectedItems } = useSelectedItems();

    useEffect(() => {
        if (!selectedProduct) {
            router.push('/');
        } else {
            window.scrollTo(0, 0);
        }

        if (selectedVariant) {
            setSelectedImage(selectedVariant.images[0].url);
        }
    }, [selectedProduct, selectedVariant]);


    if (!selectedProduct || !selectedVariant || !selectedImage) return null;

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

    const handleGrab = () => {
        if (selectedVariant) {
            const singleData = [{
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
            }]
            setSelectedItems(singleData);
            setSingleItem(true);
            //console.log(selectedItems);
            // console.log(singleItem);
            router.push('/buy-now');
        }

    }

    return (
        <>
            <Header />
            <Toaster />
            <div className="pl-14 mt-12 font-medium">
                <Breadcrumb>
                    <BreadcrumbList className='text-lg text-black'>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/" className='text-lg'>Home</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink href={`/categories/${selectedProduct.category.slug}`}>{selectedProduct.category.name}</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        {
                            selectedProduct.subcategory && <>
                                <BreadcrumbItem>
                                    <BreadcrumbLink href={`/categories/${selectedProduct.category.slug}/${selectedProduct.subcategory.slug}`}>{selectedProduct.subcategory.name}</BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator />
                            </>
                        }

                        <BreadcrumbItem>
                            <BreadcrumbPage className='text-yellow-500'>{selectedProduct.name}</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
            <div className="p-14 flex flex-col gap-8">
                <div className="flex gap-8">
                    <div className="flex flex-row gap-4">
                        <div className="flex flex-col gap-2">
                            {selectedVariant.images.map((img, idx) => (
                                <div key={idx} className={`h-20 w-20 relative border ${selectedImage === img.url ? "border-cyan-500" : "border-gray-300"}`} onClick={() => setSelectedImage(img.url)}>
                                    <Image
                                        src={img.url}
                                        alt={`${selectedVariant.variant_name} - ${idx}`}
                                        fill
                                        className="border hover:border-cyan-500 cursor-pointer object-cover"
                                    />
                                </div>

                            ))}
                        </div>

                        <div className="h-100 w-100 flex items-center justify-center border border-gray-200 relative">
                            {selectedImage && <Image
                                src={selectedImage}
                                alt={selectedVariant.variant_name}
                                fill
                                className="object-cover"
                            />}
                        </div>
                    </div>


                    <div className="flex flex-col gap-2">
                        <h1 className="text-2xl font-bold">{selectedVariant.variant_name}</h1>

                        <div className="text-sm text-gray-500 line-through">MRP ₹{selectedVariant.price.base_price}</div>
                        <div className="text-lg font-bold text-black">₹ {selectedVariant.price.sale_price}</div>
                        <div className="text-cyan-700 font-medium">{selectedVariant.price.discount_percentage}% Off</div>


                        <div className="flex items-center gap-1 text-yellow-500 text-xs mt-1">
                            {[...Array(5)].map((_, i) => (
                                <Star
                                    key={i}
                                    className={`w-4 h-4 ${i < Math.round(selectedProduct.rating?.average)
                                        ? "fill-yellow-500 text-yellow-500"
                                        : "text-gray-300"
                                        }`}
                                />
                            ))}
                            <span className="text-gray-700 ml-2">{selectedProduct.rating?.average}</span>
                            <span className="text-gray-500 ml-2">({selectedProduct.rating?.count} Reviews)</span>
                        </div>

                        <p className="text-gray-600 mt-1 text-sm">{selectedProduct.description}</p>

                        <div className="mt-4 flex items-center gap-6">
                            <div className="font-bold text-base">
                                <p>Total:</p>
                                <p>₹ {selectedVariant.price.sale_price}</p>
                            </div>

                            <Button className="bg-yellow-500 hover:bg-yellow-600 text-white rounded text-sm font-semibold" onClick={handleAddToCart}>
                                ADD TO CART
                            </Button>
                            <Button className="bg-yellow-500 hover:bg-yellow-600 text-white rounded text-sm font-semibold"
                                onClick={handleGrab}
                            >
                                GRAB IT NOW
                            </Button>
                        </div>
                    </div>

                </div>
                <div className="text-sm sm:text-base leading-relaxed">
                    <div className="flex flex-col gap-4 mb-8">
                        <h2 className="font-medium text-xl">Product Variants</h2>
                        <div className="flex flex-wrap gap-6">
                            {
                                selectedProduct.variants.map((variant, index) => (
                                    <div key={index} className="flex flex-col items-center gap-2 w-40">
                                        <div className={`h-40 w-40 border-3 relative overflow-hidden cursor-pointer 
        ${selectedVariant === variant ? "border-cyan-500" : "border-gray-300"}`} onClick={() => {
                                                setSelectedVariant(variant)
                                                setSelectedImage(variant.images[0].url)
                                            }

                                            }>
                                            <Image
                                                src={variant.images[0].url}
                                                alt={variant.variant_name}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <span className="text-sm text-center break-words w-full">
                                            {variant.variant_name}
                                        </span>
                                    </div>
                                ))
                            }
                        </div>

                    </div>
                    <div className="flex gap-5 pb-2 text-sm sm:text-base">
                        <button
                            onClick={() => setActiveTab("keyinfo")}
                            className={`px-2 py-0.5 rounded font-medium ${activeTab === "keyinfo" ? "bg-green-200 text-green-800" : "text-black"
                                }`}
                        >
                            Key Info
                        </button>

                        <button
                            onClick={() => setActiveTab("attributes")}
                            className={`px-2 py-0.5 rounded font-medium ${activeTab === "attributes" ? "bg-green-200 text-green-800" : "text-black"
                                }`}
                        >
                            Attributes
                        </button>

                        <button
                            onClick={() => setActiveTab("specifications")}
                            className={`px-2 py-0.5 rounded font-medium ${activeTab === "specifications" ? "bg-green-200 text-green-800" : "text-black"
                                }`}
                        >
                            Specifications
                        </button>
                        <button className="text-orange-500 border-2 border-orange-300 px-2 py-0.5 rounded">Visit store</button>
                    </div>



                    <div className="mt-3 border border-gray-200 rounded-lg p-4 text-gray-700 text-sm sm:text-base leading-relaxed">
                        {activeTab === "keyinfo" && (
                            <div>
                                <div className="mb-2">
                                    <span className="font-semibold text-base">Type: </span>
                                    {selectedProduct.category.name}
                                </div>
                                <div className="mb-2">
                                    <span className="font-semibold text-base">Description: </span>
                                    {selectedProduct.description}
                                </div>
                                <div className="mb-2">
                                    <span className="font-semibold text-base">Brand: </span>
                                    {selectedProduct.brand}
                                </div>
                                {
                                    selectedProduct.warranty &&
                                    <div className="mb-2">
                                        <span className="font-semibold text-base">Warranty: </span>
                                        {selectedProduct.warranty}
                                    </div>

                                }

                            </div>
                        )}

                        {activeTab === "attributes" && (
                            <div>
                                {selectedVariant.attributes?.length > 0 ? (selectedVariant.attributes?.map((attr, idx) => (
                                    <div key={idx} className="mb-2">
                                        <span className="font-semibold">{attr.name}:</span> {attr.value}
                                    </div>
                                ))) : (<div>No attributes</div>)
                                }
                            </div>
                        )}

                        {activeTab === "specifications" && (
                            <div>
                                {selectedProduct.specifications?.length > 0 ? (selectedProduct.specifications?.map((spec, idx) => (
                                    <div key={idx} className="mb-2">
                                        <span className="font-semibold">{spec.name}:</span> {spec.value}
                                    </div>
                                ))) : (<div>No specifications</div>)
                                }
                            </div>
                        )}
                    </div>

                </div>
            </div>



        </>

    );
}
