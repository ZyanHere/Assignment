"use client";

import useSWR from "swr";
import Image from "next/image";
import SubProduct from "../subcategoryProduct/SubProduct";
import { fetcher } from "@/lib/categoryFetcher/fetcher";

export default function SubCategories({ categoryId }) {

    const { data, error } = useSWR(`https://lmd-user-2ky8.onrender.com/lmd/api/v1/retail/categories/${categoryId}/subcategories`, fetcher);

    return (
        <div className="p-4 flex flex-col gap-4">
            {data?.map((subcategory) => {
                return (
                    <div key={subcategory._id} className="p-4 border-b-2 border-gray-300">
                        <div className="flex items-center gap-4 mb-4">
                            <Image
                                src={subcategory.imageUrl}
                                alt={subcategory.name}
                                width={100}
                                height={100}
                                className="object-contain"
                            />
                            <h2 className="text-lg font-semibold">{subcategory.name}</h2>
                        </div>

                        <div className="flex gap-4">
                            <SubProduct subCategoryId={subcategory._id} />
                        </div>
                    </div>
                );
            })}
        </div>
    )
}