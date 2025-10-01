"use client";

import { useParams } from "next/navigation";
import { useState, useMemo } from "react";
import Header from "@/components/home/Header";
import Image from "next/image";

const SEAT_STATUS = {
  AVAILABLE: "available",
  BOOKED: "booked",
  SELECTED: "selected",
};

// ---- MOCK DATA ----
const mockMovies = [
  {
    id: "1234",
    title: "ABC Movie",
    poster: "/placeholder.jpg",
    vendors: [
      {
        id: "pvr1",
        name: "PVR Cinemas - City Center",
        shows: [
          { id: "show101", time: "10:30 AM", date: "Mon Aug 12 2025" },
          { id: "show102", time: "1:15 PM", date: "Mon Aug 12 2025" },
        ],
      },
      {
        id: "inox1",
        name: "INOX - Mall Road",
        shows: [
          { id: "show201", time: "9:00 AM", date: "Mon Aug 12 2025" },
          { id: "show202", time: "12:00 PM", date: "Mon Aug 12 2025" },
        ],
      },
    ],
  },
];

export default function SeatSelectionPage() {
  const { movieId, vendorId, showId } = useParams();
  const movie = mockMovies.find((m) => m.id === movieId);
  const vendor = movie?.vendors?.find((v) => v.id === vendorId);
  const show = vendor?.shows?.find((s) => s.id === showId);

  // Generate seats
  const generateSeats = (rows, cols, price) => {
    const seats = [];
    for (let r = 0; r < rows; r++) {
      const rowLetter = String.fromCharCode(65 + r);
      const rowSeats = [];
      for (let c = 1; c <= cols; c++) {
        const seatId = `${rowLetter}${c}`;
        const isBooked = Math.random() < 0.3; // 30% booked
        rowSeats.push({
          id: seatId,
          status: isBooked ? SEAT_STATUS.BOOKED : SEAT_STATUS.AVAILABLE,
          price,
        });
      }
      seats.push(rowSeats);
    }
    return seats;
  };

  const seatLayout = useMemo(
    () => ({
      Normal: generateSeats(5, 10, 200),
      Premium: generateSeats(4, 8, 350),
      Recliner: generateSeats(2, 6, 500),
    }),
    []
  );

  const [selectedSeats, setSelectedSeats] = useState([]);

  const toggleSeat = (seat) => {
    if (seat.status === SEAT_STATUS.BOOKED) return;

    const seatKey = `${seat.section}-${seat.id}`;
    if (selectedSeats.find((s) => s.key === seatKey)) {
      setSelectedSeats(selectedSeats.filter((s) => s.key !== seatKey));
    } else {
      setSelectedSeats([...selectedSeats, { ...seat, key: seatKey }]);
    }
  };

  const totalPrice = selectedSeats.reduce((sum, seat) => sum + seat.price, 0);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />

      {/* Movie Info */}
      <div className="bg-white shadow-sm p-4 flex items-center gap-4">
        <Image
          src={movie?.poster || "/placeholder.jpg"}
          alt={movie?.title || ""}
          width={80}
          height={100}
          className="rounded-md object-cover"
        />
        <div>
          <h1 className="text-xl font-bold">{movie?.title}</h1>
          <p className="text-gray-600">{vendor?.name}</p>
          <p className="text-sm text-gray-500">
            {show?.time} | {show?.date}
          </p>
        </div>
      </div>

      {/* Seat Layout */}
      <div className="flex flex-col lg:flex-row gap-6 p-6">
        <div className="flex-1">
          {Object.entries(seatLayout).map(([section, rows]) => (
            <div key={section} className="mb-8">
              <h2 className="font-semibold mb-2">
                {section} - ₹{rows[0][0].price}
              </h2>
              <div className="space-y-2">
                {rows.map((row, rIdx) => (
                  <div key={rIdx} className="flex justify-center gap-2">
                    {row.map((seat) => {
                      const isSelected = selectedSeats.find(
                        (s) => s.section === section && s.id === seat.id
                      );
                      let bg = "bg-green-500";
                      if (seat.status === SEAT_STATUS.BOOKED)
                        bg = "bg-gray-400 cursor-not-allowed";
                      if (isSelected) bg = "bg-blue-500";
                      return (
                        <button
                          key={seat.id}
                          onClick={() => toggleSeat({ ...seat, section })}
                          className={`w-8 h-8 rounded-sm text-white text-xs flex items-center justify-center ${bg} hover:scale-105 transition`}
                          disabled={seat.status === SEAT_STATUS.BOOKED}
                        >
                          {seat.id}
                        </button>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Booking Summary */}
        <div className="lg:w-80 bg-white shadow-md p-4 rounded-lg h-fit sticky top-20">
          <h3 className="font-semibold mb-2">Booking Summary</h3>
          {selectedSeats.length > 0 ? (
            <>
              <ul className="mb-2">
                {selectedSeats.map((seat) => (
                  <li key={seat.key}>
                    {seat.section} - {seat.id}{" "}
                    <span className="text-gray-500">₹{seat.price}</span>
                  </li>
                ))}
              </ul>
              <p className="font-bold">Total: ₹{totalPrice}</p>
              <button
                className="mt-4 w-full bg-yellow-500 hover:bg-yellow-600 text-black py-2 rounded"
                onClick={() => console.log("Proceed with", selectedSeats)}
              >
                Proceed to Payment
              </button>
            </>
          ) : (
            <p className="text-gray-500">No seats selected</p>
          )}
        </div>
      </div>

      {/* Legend */}
      <div className="p-4 bg-white border-t mt-auto flex justify-center gap-6 text-sm">
        <div className="flex items-center gap-2">
          <span className="w-4 h-4 bg-green-500 block rounded-sm"></span>{" "}
          Available
        </div>
        <div className="flex items-center gap-2">
          <span className="w-4 h-4 bg-blue-500 block rounded-sm"></span>{" "}
          Selected
        </div>
        <div className="flex items-center gap-2">
          <span className="w-4 h-4 bg-gray-400 block rounded-sm"></span> Booked
        </div>
      </div>
    </div>
  );
}
