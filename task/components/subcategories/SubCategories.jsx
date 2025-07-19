"use client";

import useSWR from "swr";
import Image from "next/image";
import SubProduct from "../subcategoryProduct/SubProduct";
import { fetcher } from "@/lib/api";

export default function SubCategories({ categoryId }) {

    const { data, error } = useSWR(`/lmd/api/v1/retail/categories/${categoryId}/subcategories`, fetcher);

    return (
        <div className="flex overflow-x-auto gap-3 scrollbar-hide snap-x snap-mandatory md:grid md:grid-cols-4 lg:grid-cols-6 md:overflow-x-visible md:gap-4">
            {data?.data?.map((subcategory) => {
                return (
                    <div key={subcategory._id} className="flex-shrink-0 w-40 snap-start md:w-auto">
                        <SubProduct subCategoryId={subcategory._id} />
                    </div>
                );
            })}
        </div>
    )
}