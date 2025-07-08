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

export default function DescriptionPage({ params }) {

    const { selectedProduct } = useProduct();
    const router = useRouter();
    const [activeTab, setActiveTab] = useState("keyinfo");


    useEffect(() => {
        if (!selectedProduct) {
            router.push('/');
        } else {
            window.scrollTo(0, 0);
        }
    }, [selectedProduct]);


    if (!selectedProduct) return null;


    return (
        <>
            <Header />
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
                        <BreadcrumbItem>
                            <BreadcrumbLink href={`/categories/${selectedProduct.category.slug}/${selectedProduct.subcategory.slug}`}>{selectedProduct.subcategory.name}</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage className='text-yellow-500'>{selectedProduct.name}</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
            <div className="p-14 grid grid-cols-2 gap-4 w-full">

                <div className="flex gap-12">
                    <div className="flex flex-row gap-4">
                        <div className="flex flex-col gap-2 max-h-[500px] overflow-y-auto">
                            {selectedProduct.images.map((img, idx) => (
                                <Image
                                    key={idx}
                                    src={img.url}
                                    alt={`${selectedProduct.name} - ${idx}`}
                                    width={150}
                                    height={150}
                                    className="rounded-md border hover:border-cyan-500 cursor-pointer object-contain"
                                />
                            ))}
                        </div>

                        <div className="flex items-center justify-center  border rounded-xl">
                            <Image
                                src={selectedProduct.images[0].url}
                                alt={selectedProduct.name}
                                width={800}
                                height={500}
                                className="object-contain"
                            />
                        </div>
                    </div>


                    <div className="flex flex-col gap-2">
                        <h1 className="text-2xl font-bold">{selectedProduct.variants[0].variant_name}</h1>

                        <div className="text-sm text-gray-500 line-through">MRP ₹{selectedProduct.variants[0].price.base_price}</div>
                        <div className="text-lg font-bold text-black">₹ {selectedProduct.variants[0].price.sale_price}</div>
                        <div className="text-cyan-700 font-medium">{selectedProduct.variants[0].price.discount_percentage}% Off</div>


                        <div className="flex items-center gap-1 text-yellow-500 text-xs mt-1">
                            {"⭐".repeat(Math.round(selectedProduct.rating.average))}
                            <span className="text-gray-700 ml-2">{selectedProduct.average}</span>
                            <span className="text-gray-500 ml-2">{selectedProduct.count} Reviews</span>
                        </div>

                        <p className="text-gray-600 mt-1 text-sm">{selectedProduct.description}</p>

                        <div className="mt-4 flex items-center gap-6">
                            <div className="font-bold text-base">
                                <p>Total:</p>
                                <p>₹ {selectedProduct.variants[0].price.sale_price}</p>
                            </div>

                            <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-1.5 rounded text-sm font-semibold">
                                ADD TO CART
                            </button>
                            <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-1.5 rounded text-sm font-semibold">GRAB IT NOW</button>
                        </div>
                    </div>

                </div>


                <div className="col-span-2 mt-6 border-t pt-4 text-sm sm:text-base leading-relaxed">
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
                                <div className="mb-2">
                                    <span className="font-semibold text-base">Warranty: </span>
                                    {selectedProduct.warranty}
                                </div>
                            </div>
                        )}

                        {activeTab === "attributes" && (
                            <div>
                                {selectedProduct.attributes?.map((attr, idx) => (
                                    <div key={idx} className="mb-2">
                                        <span className="font-semibold">{attr.name}:</span> {attr.value}
                                    </div>
                                ))}
                            </div>
                        )}

                        {activeTab === "specifications" && (
                            <div>
                                {selectedProduct.specifications?.map((spec, idx) => (
                                    <div key={idx} className="mb-2">
                                        <span className="font-semibold">{spec.name}:</span> {spec.value}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                </div>

            </div>
        </>

    );
}
