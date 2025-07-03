// import Image from 'next/image';
// import GiftCarousel from './GiftCarousel';
// const GiftTabContent = () => {

//     return (
//         <div className="p-3 lg:px-16">
            

//             <div className=" w-full ">
//                 <h3 className="text-3xl font-bold mb-3">Flowers & Bouquets</h3>
//                 <section className=" w-full ">
//                     <div className="w-full max-w-[1500px] mx-auto">
//                         <GiftCarousel category="Flowers" />
//                     </div>
//                 </section>
//             </div>

//             <div className=" w-full mt-16">
//                 <h3 className="text-3xl font-bold mb-3">Personalized Gifts</h3>
//                 <section className=" w-full ">
//                     <div className="w-full max-w-[1500px] mx-auto">
//                         <GiftCarousel category="PersonalizedGifts" />
//                     </div>
//                 </section>
//             </div>


//             <div className=" mt-16 flex justify-center gap-8 ">
//                 <Image src="/home/banners/gift1.png" alt="gift1" width={450} height={200} />
//                 <Image src="/home/banners/gift2.png" alt="gift2" width={450} height={200} />
//                 <Image src="/home/banners/gift3.png" alt="gift3" width={450} height={200} />
//             </div>


//             <div className=" w-full mt-16">
//                 <h3 className="text-3xl font-bold mb-3">Personalized Gifts</h3>
//                 <section className=" w-full ">
//                     <div className="w-full max-w-[1500px] mx-auto">
//                         <GiftCarousel category="Gifts" />
//                     </div>
//                 </section>
//             </div>
//         </div>
//     );
// };

// export default GiftTabContent;


import Image from 'next/image';
import GiftCarousel from './GiftCarousel';

const GiftTabContent = () => {
    return (
        <div className="p-3 sm:p-4 md:p-6 lg:px-16 lg:py-6">
            {/* Flowers & Bouquets Section */}
            <div className="w-full">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 md:mb-4 text-center sm:text-left">
                    Flowers & Bouquets
                </h3>
                <section className="w-full">
                    <div className="w-full max-w-[1500px] mx-auto">
                        <GiftCarousel category="Flowers" />
                    </div>
                </section>
            </div>

            {/* Personalized Gifts Section */}
            <div className="w-full mt-8 sm:mt-12 md:mt-16">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 md:mb-4 text-center sm:text-left">
                    Personalized Gifts
                </h3>
                <section className="w-full">
                    <div className="w-full max-w-[1500px] mx-auto">
                        <GiftCarousel category="PersonalizedGifts" />
                    </div>
                </section>
            </div>

            {/* Banner Images Section */}
            <div className="mt-8 sm:mt-12 md:mt-16">
                {/* Mobile: Single column stack */}
                <div className="flex flex-col gap-4 sm:hidden">
                    <div className="w-full flex justify-center">
                        <Image 
                            src="/home/banners/gift1.png" 
                            alt="gift1" 
                            width={450} 
                            height={200}
                            className="w-full max-w-[350px] h-auto object-cover rounded-lg"
                        />
                    </div>
                    <div className="w-full flex justify-center">
                        <Image 
                            src="/home/banners/gift2.png" 
                            alt="gift2" 
                            width={450} 
                            height={200}
                            className="w-full max-w-[350px] h-auto object-cover rounded-lg"
                        />
                    </div>
                    <div className="w-full flex justify-center">
                        <Image 
                            src="/home/banners/gift3.png" 
                            alt="gift3" 
                            width={450} 
                            height={200}
                            className="w-full max-w-[350px] h-auto object-cover rounded-lg"
                        />
                    </div>
                </div>

                {/* Tablet: 2 columns, then 1 */}
                <div className="hidden sm:flex md:hidden flex-wrap justify-center gap-4">
                    <div className="flex-1 min-w-[280px] max-w-[400px]">
                        <Image 
                            src="/home/banners/gift1.png" 
                            alt="gift1" 
                            width={450} 
                            height={200}
                            className="w-full h-auto object-cover rounded-lg"
                        />
                    </div>
                    <div className="flex-1 min-w-[280px] max-w-[400px]">
                        <Image 
                            src="/home/banners/gift2.png" 
                            alt="gift2" 
                            width={450} 
                            height={200}
                            className="w-full h-auto object-cover rounded-lg"
                        />
                    </div>
                    <div className="flex-1 min-w-[280px] max-w-[400px] sm:mx-auto">
                        <Image 
                            src="/home/banners/gift3.png" 
                            alt="gift3" 
                            width={450} 
                            height={200}
                            className="w-full h-auto object-cover rounded-lg"
                        />
                    </div>
                </div>

                {/* Desktop: 3 columns */}
                <div className="hidden md:flex justify-center gap-4 lg:gap-6 xl:gap-8">
                    <div className="flex-1 max-w-[400px] lg:max-w-[450px]">
                        <Image 
                            src="/home/banners/gift1.png" 
                            alt="gift1" 
                            width={450} 
                            height={200}
                            className="w-full h-auto object-cover rounded-lg hover:scale-105 transition-transform duration-300"
                        />
                    </div>
                    <div className="flex-1 max-w-[400px] lg:max-w-[450px]">
                        <Image 
                            src="/home/banners/gift2.png" 
                            alt="gift2" 
                            width={450} 
                            height={200}
                            className="w-full h-auto object-cover rounded-lg hover:scale-105 transition-transform duration-300"
                        />
                    </div>
                    <div className="flex-1 max-w-[400px] lg:max-w-[450px]">
                        <Image 
                            src="/home/banners/gift3.png" 
                            alt="gift3" 
                            width={450} 
                            height={200}
                            className="w-full h-auto object-cover rounded-lg hover:scale-105 transition-transform duration-300"
                        />
                    </div>
                </div>
            </div>

            {/* Gifts Section */}
            <div className="w-full mt-8 sm:mt-12 md:mt-16">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 md:mb-4 text-center sm:text-left">
                    Gifts
                </h3>
                <section className="w-full">
                    <div className="w-full max-w-[1500px] mx-auto">
                        <GiftCarousel category="Gifts" />
                    </div>
                </section>
            </div>
        </div>
    );
};

export default GiftTabContent;