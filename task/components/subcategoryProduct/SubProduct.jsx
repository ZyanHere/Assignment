import useSWR from "swr";
import ProductCard from "./ProductCard";
import { fetcher } from "@/lib/categoryFetcher/fetcher";


export default function SubProduct({ subCategoryId }) {

    const { data, error } = useSWR(`https://lmd-user-2ky8.onrender.com/lmd/api/v1/retail/products/subcategory/${subCategoryId}`, fetcher);

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {data?.map((product) => {
                return (
                    <div key={product._id} className="flex gap-4">
                        <ProductCard product={product} />
                    </div>

                );
            })}
        </div>
    );

}