import Image from "next/image";
import Link from "next/link";

const FourSec = () => {
  const items = [
    { img: "/home/hero1/stay.png", label: "Stay", link: "/home/hotel" },
    { img: "/home/hero1/movie.png", label: "Movie", link: "/home/movie" },
    { img: "/home/hero1/buffet.png", label: "Buffet", link: "/home/buffet" },
    { img: "/home/hero1/event.png", label: "Event", link: "/home/event" },
  ];

  return (
    <div className="flex gap-4 px-0 md:px-4 w-full overflow-x-auto flex-nowrap snap-x snap-mandatory">
      {items.map((item, index) => (
        <Link
          key={index}
          href={item.link}
          className="min-w-[70vw] max-w-xs md:min-w-0 md:max-w-full flex-1 rounded-2xl overflow-hidden shadow-md bg-white cursor-pointer transition-all hover:shadow-xl hover:-translate-y-1.5 border-b border-yellow-500 snap-center"
        >
          {/* Image section */}
          <div className="relative w-full h-32 sm:h-40 md:h-48">
            <Image
              src={item.img}
              alt={item.label}
              fill
              className="object-cover"
            />
          </div>

          {/* Label */}
          <div className="p-4">
            <span className="font-semibold text-md text-gray-800 block text-center">
              {item.label}
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default FourSec;
