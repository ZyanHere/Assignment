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
<div className="flex flex-wrap gap-6 justify-center ">
  {items.map((item, index) => (
    <Link key={index} href={item.link} passHref legacyBehavior>
      <div className="w-[340px] h-[220px] bg-gradient-to-br from-blue-200 to-yellow-50 flex flex-col items-center justify-center rounded-2xl shadow-lg cursor-pointer transition-all hover:shadow-xl hover:-translate-y-1.5">
        <div className="relative w-60 h-32 mb-4">
          <Image
            src={item.img}
            alt={item.label}
            fill
            className="object-contain drop-shadow-md"
          />
        </div>
        <span className="font-bold text-lg text-gray-800">{item.label}</span>
      </div>
    </Link>
  ))}
</div>
  );
};

export default FourSec;
