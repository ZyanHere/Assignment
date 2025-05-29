"use client";
import Image from "next/image";
import { useState } from "react";

// const events = [
//   {
//     id: "pvr-tonight",
//     img: "/home/shops/events1.jpg",
//     name: "Tonight's show by PVR",
//     distance: "1 Km",
//     location: "Pimple Saudagar",
//     rating: "4.9",
//   },
//   {
//     id: "rock-it",
//     img: "/home/shops/events3.jpg",
//     name: "Rock It",
//     distance: "1 Km",
//     location: "Pimple Saudagar",
//     rating: "4.9",
//   },
//   {
//     id: "the-local-train",
//     img: "/home/shops/events4.jpg",
//     name: "The Local Train",
//     distance: "2 Km",
//     location: "Pimple Saudagar",
//     rating: "4.9",
//   },
// ];

const NearbyEvents = ({events = []}) => {
  // const [favorites, setFavorites] = useState(() =>
  //   events.reduce((acc, event) => ({ ...acc, [event.id]: false }), {})
  // );

  const [favorites, setFavorites] = useState({});
  
    useEffect(() => {
      const initialFavorites = events.reduce((acc, event) => {
        acc[event._id] = false;
        return acc;
      }, {});
      setFavorites(initialFavorites);
    }, [events]);

  const toggleFavorite = (id) => {
    setFavorites((prevFavorites) => ({
      ...prevFavorites,
      [id]: !prevFavorites[id],
    }));
  };

  if(!events.length) return null;

  return (
    <section className="p-4 md:p-6 mt-4">
      <h2 className="text-xl md:text-2xl font-semibold mb-4 md:mb-6 text-black">
        Events near you
      </h2>
      <div className="flex flex-col md:flex-row gap-6 justify-center">
        {events.map((event) => (
          <div
            key={event.id}
            className="w-full rounded-lg shadow-md overflow-hidden"
          >
            <div className="relative">
              <Image
                src={event.img}
                alt={event.name}
                width={400}
                height={200}
                className="w-full h-[200px] object-cover rounded-t-lg"
              />
              <div className="absolute top-3 left-3 flex items-center gap-1 bg-black/50 text-white px-2 py-1 rounded-full">
                <Image
                  src="/home/shops/star.svg"
                  alt="Star"
                  width={16}
                  height={16}
                  className="w-4 h-4"
                />
                <span className="text-sm font-semibold">{event.rating}</span>
              </div>
              <button
                onClick={() => toggleFavorite(event.id)}
                className="absolute top-3 right-3"
              >
                <Image
                  src={
                    favorites[event.id]
                      ? "/home/shops/Heart-red.svg"
                      : "/home/shops/Heart.svg"
                  }
                  alt="Favorite"
                  width={32}
                  height={32}
                  className="w-8 h-8"
                />
              </button>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold text-black">{event.name}</h3>
              <p className="text-gray-600 text-sm">
                {event.distance} • {event.location}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default NearbyEvents;
