import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import RestaurantCard from "./RestaurentCard";
import Link from "next/link";

const BuffetCarousel = ({ title, seeAllLink, items }) => {
  return (
    <div className="mt-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">{title}</h2>
        <Link href={seeAllLink} className="text-orange-500 text-sm font-semibold">
          See All
        </Link>
      </div>
      <div className="py-4 relative">
        <Carousel className="w-full mx-auto">
          <CarouselContent className="-ml-4">
            {items.map((restaurant, index) => (
              <CarouselItem
                key={index}
                className="pl-4 md:basis-1/2 lg:basis-1/3 xl:basis-[22.35%] flex-shrink-0"
              >
                <div className="p-1">
                  <RestaurantCard {...restaurant} index={index} />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="!absolute top-1/2 -translate-y-1/2 left-2 z-10 bg-white/80 hover:bg-white shadow-lg rounded-full w-10 h-10 flex items-center justify-center border border-gray-300 transition-all" />
          <CarouselNext className="!absolute top-1/2 -translate-y-1/2 right-2 z-10 bg-white/80 hover:bg-white shadow-lg rounded-full w-10 h-10 flex items-center justify-center border border-gray-300 transition-all" />
        </Carousel>
      </div>
    </div>
  );
};

export default BuffetCarousel;
