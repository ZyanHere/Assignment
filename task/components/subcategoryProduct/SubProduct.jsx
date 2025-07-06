import useSWR from "swr";
import ProductCard from "./ProductCard";
import { fetcher } from "@/lib/categoryFetcher/fetcher";

export default function SubProduct({ subCategoryId }) {
    const { data, error, isLoading } = useSWR(
        `https://lmd-user-2ky8.onrender.com/lmd/api/v1/retail/products/subcategory/${subCategoryId}`, 
        fetcher
    );

    // Handle loading state
    if (isLoading) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {[...Array(8)].map((_, index) => (
                    <div key={index} className="animate-pulse">
                        <div className="bg-gray-200 h-48 rounded-xl mb-4"></div>
                        <div className="bg-gray-200 h-4 rounded mb-2"></div>
                        <div className="bg-gray-200 h-4 rounded w-3/4"></div>
                    </div>
                ))}
            </div>
        );
    }

    // Handle error state
    if (error) {
        return (
            <div className="text-center py-8">
                <p className="text-red-500">Failed to load products. Please try again.</p>
            </div>
        );
    }

    // Handle empty data
    if (!data || data.length === 0) {
        return (
            <div className="text-center py-8">
                <p className="text-gray-500">No products found in this subcategory.</p>
            </div>
        );
    }

    return (

//         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-6">
//             {data?.map((product) => {
//                 return (
//                     <div key={product._id} className="flex">
//                         <ProductCard product={product} compact />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {data.map((product) => {
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
                    <div key={product._id} className="flex gap-4">
                        <ProductCard product={processedProduct} />

                    </div>
                );
            })}
        </div>
    );
}