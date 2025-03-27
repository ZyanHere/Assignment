import Link from "next/link";
import Image from "next/image";

// Function to generate slug from room name
const generateSlug = (name) => name.toLowerCase().replace(/\s+/g, "-");

const RoomList = ({ hotelSlug, rooms }) => {
  return (
    <div className="grid grid-cols-4 gap-6">
      {rooms.map((room) => (
        <Link
          key={room.id}
          href={`/home/hotel/rooms/${hotelSlug}/${generateSlug(room.name)}`}
          className="block"
        >
          <div className="bg-white rounded-lg shadow-lg p-4 hover:shadow-xl transition h-full flex flex-col justify-between">
            <div className="relative w-full h-48 rounded-lg overflow-hidden">
              <Image
                src={room.image}
                alt={room.name}
                layout="fill"
                objectFit="cover"
              />
            </div>

            <div className="mt-4 flex flex-col flex-grow">
              <h3 className="text-xl font-semibold">{room.name}</h3>
              <p className="text-gray-600 flex-grow">{room.description}</p>
              <div className="mt-2 flex items-center justify-between">
                <p className="text-orange-500 font-semibold">
                  {room.price} Rs/night
                </p>
                <p className="text-sm mt-1">
                  ⭐ {room.rating} / 5
                </p>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default RoomList;
