"use client";
import { useParams } from "next/navigation";
import Header from "@/components/home/Header";
import Sidebar from "@/components/home/sidebar";
import StoreSlugBanner from "@/components/stores/SlugBanner";
import storesData from "@/data/storeData";
import StoreCarousel from "@/components/stores/StoreCarousel";
import Image from "next/image";
import Link from "next/link";

const StoreSlugPage = () => {
    const { slug } = useParams();
    const store = storesData[slug];

    if (!store) {
        return <p className="text-center text-red-500 text-2xl">Store not found</p>;
    }

    return (
        <div className="flex">
            <Sidebar />
            <div className="flex-1">
                <Header />

                <div className="p-6">
                    {/* Breadcrumb */}
                    <nav className="mb-4 text-black text-2xl">
                        <Link href="/stores" className="hover:underline font-medium ">
                            Stores
                        </Link>{" "}
                        &gt; {store.name}
                    </nav>

                    {/* Store Banner */}
                    <StoreSlugBanner name={store.name} location={store.location} banner={store.banner} />

                    {/* Promo Image */}
                    <div className="w-full mt-10">
                        <Image
                            src={`/store/${slug}-promo.png`}
                            alt={`${store.name} Promo`}
                            width={1200}
                            height={400}
                            className="w-full h-[370px] p-20 rounded-lg object-contain"
                        />
                    </div>

                    {/* Dynamic Sections */}
                    <div className="mt-10">
                        {store.sections.map((section) => {
                            const sectionProducts = store.products.filter((product) => product.category === section);

                            return (
                                <div key={section} className="mb-20">
                                    <h2 className="text-2xl font-bold mb-4">{section}</h2>
                                    {sectionProducts.length > 0 ? (
                                        <StoreCarousel
                                            slug={slug}
                                            name={store.name}
                                            location={store.location}
                                            logo={store.logo}
                                            distance={store.distance}
                                            products={sectionProducts} // ✅ Passing filtered products
                                        />
                                    ) : (
                                        <p className="text-gray-500">No products available.</p>
                                    )}
                                </div>
                            );
                        })}
                    </div>


                </div>
            </div>
        </div>
    );
};

export default StoreSlugPage;
