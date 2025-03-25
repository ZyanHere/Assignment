import Link from "next/link";

const FourSec = () => {
  const items = [
    { img: "/home/hero1/stay.png", label: "Stay", link: "/home/stay" },
    { img: "/home/hero1/movie.png", label: "Movie", link: "/home/movie" },
    { img: "/home/hero1/buffet.png", label: "Buffet", link: "/home/buffet" },
    { img: "/home/hero1/event.png", label: "Event", link: "/home/event" },
  ];

  return (
    <div className="flex gap-[85px] justify-center">
      {items.map((item, index) => (
        <Link key={index} href={item.link} passHref>
          <div className="w-[291px] h-[244px] bg-[#FFF8E1] flex flex-col items-center justify-center rounded-xl shadow-md cursor-pointer transition-transform hover:scale-105">
            <img
              src={item.img}
              alt={item.label}
              className="w-[165px] h-[145px] mt-2 object-cover rounded-lg"
            />
            <span className="font-semibold text-black pt-[22px]">{item.label}</span>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default FourSec;
