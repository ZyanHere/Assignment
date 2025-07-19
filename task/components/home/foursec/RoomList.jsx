import Link from "next/link";
import Image from "next/image";

const RoomList = ({ hotelSlug, rooms }) => {

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pl-14 pr-14 pb-14">
      {rooms.map((room) => (
        <Link
          key={room.id}
          href={`/home/hotel/rooms/${hotelSlug}/${room.id}`}
          className="block"
        >
          <div className="bg-white rounded-lg shadow-lg p-4 hover:shadow-xl transition h-full flex flex-col justify-between">
            <div className="relative w-full h-48 rounded-lg overflow-hidden">
              <Image
                src={room.image || "/hotels/placeholder.png"}
                alt={room.name}
                fill
                style={{ objectFit: "cover" }}
                className="rounded-lg"
              />
            </div>
            <div className="mt-4 flex flex-col flex-grow">
              <h3 className="text-xl font-semibold">{room.name}</h3>
              <p className="text-gray-600 flex-grow text-sm line-clamp-2">
                {room.description}
              </p>
              <div className="mt-2 flex items-center justify-between">
                <p className="text-orange-500 font-semibold">
                  ₹{room.price} / night
                </p>
                <p className="text-sm mt-1">
                  ⭐ {room.ratingAverage ?? 0} / 5
                </p>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )

};

export default RoomList;
