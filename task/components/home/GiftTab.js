import Image from 'next/image';
import GiftCarousel from './GiftCarousel';
const GiftTabContent = () => {

    return (
        <div className="p-3 lg:px-16">
            

            <div className=" w-full ">
                <h3 className="text-3xl font-bold mb-3">Flowers & Bouquets</h3>
                <section className=" w-full ">
                    <div className="w-full max-w-[1500px] mx-auto">
                        <GiftCarousel category="Flowers" />
                    </div>
                </section>
            </div>

            <div className=" w-full mt-16">
                <h3 className="text-3xl font-bold mb-3">Personalized Gifts</h3>
                <section className=" w-full ">
                    <div className="w-full max-w-[1500px] mx-auto">
                        <GiftCarousel category="PersonalizedGifts" />
                    </div>
                </section>
            </div>


            <div className=" mt-16 flex justify-center gap-8 ">
                <Image src="/home/banners/gift1.png" alt="gift1" width={450} height={200} />
                <Image src="/home/banners/gift2.png" alt="gift2" width={450} height={200} />
                <Image src="/home/banners/gift3.png" alt="gift3" width={450} height={200} />
            </div>


            <div className=" w-full mt-16">
                <h3 className="text-3xl font-bold mb-3">Personalized Gifts</h3>
                <section className=" w-full ">
                    <div className="w-full max-w-[1500px] mx-auto">
                        <GiftCarousel category="Gifts" />
                    </div>
                </section>
            </div>
        </div>
    );
};

export default GiftTabContent;
