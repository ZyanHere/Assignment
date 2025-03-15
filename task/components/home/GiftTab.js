import Image from 'next/image';
import SecondCarousel from "./secondCarousel";
const GiftTabContent = () => {

    return (
        <div className="p-3">
            <div>
                <Image src="/home/banners/GiftBanner.png" alt="Gift Banner" width={1088} height={100} className="w-full rounded-sm" />
            </div>

            <div className=" w-full mt-15">
                <h3 className="text-3xl font-bold text-gray-800 mb-3">Flowers & Bouquets</h3>
                <section className="bg-white shadow-sm w-full ">
                    <div className="w-full max-w-[1500px] mx-auto">
                        <SecondCarousel />
                    </div>
                </section>
            </div>

            <div className=" w-full mt-15">
                <h3 className="text-3xl font-bold text-gray-800 mb-3">Personalized Gifts</h3>
                <section className="bg-white shadow-sm w-full ">
                    <div className="w-full max-w-[1500px] mx-auto">
                        <SecondCarousel />
                    </div>
                </section>
            </div>


            <div className=" mt-15 flex justify-center gap-8 ">
                <Image src="/home/banners/gift1.png" alt="gift1" width={450} height={200} />
                <Image src="/home/banners/gift2.png" alt="gift2" width={450} height={200} />
                <Image src="/home/banners/gift3.png" alt="gift3" width={450} height={200} />
            </div>


            <div className=" w-full mt-15">
                <h3 className="text-3xl font-bold text-gray-800 mb-3">Personalized Gifts</h3>
                <section className="bg-white shadow-sm w-full ">
                    <div className="w-full max-w-[1500px] mx-auto">
                        <SecondCarousel />
                    </div>
                </section>
            </div>
        </div>
    );
};

export default GiftTabContent;
