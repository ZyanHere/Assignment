const FourSec = () => {
    const items = [
      { img: "/hero1/stay.png", label: "Stay" },
      { img: "/hero1/movie.png", label: "Movie" },
      { img: "/hero1/buffet.png", label: "Buffet" },
      { img: "/hero1/event.png", label: "Event" },
    ];
  
    return (
      <div className="flex gap-[85px] justify-center">
        {items.map((item, index) => (
          <div
            key={index}
            className="w-[291px] h-[244px] bg-[#FFF8E1] flex flex-col items-center justify-center rounded-xl shadow-md"
          >
            <img
              src={item.img}
              alt={item.label}
              className="w-[165px] h-[145px] mt-2 object-cover rounded-lg"
            />
            <span className="font-semibold text-black pt-[22px]">{item.label}</span>
          </div>
        ))}
      </div>
    );
  };
  
  export default FourSec;
  