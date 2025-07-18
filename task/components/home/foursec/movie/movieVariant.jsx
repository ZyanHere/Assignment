"use client";

const MovieVariant = ({ seatVariants = [] }) => {
  return (
    <section className="mb-8">
      <h2 className="text-xl sm:text-2xl font-bold mb-4">
        Seat Types & Pricing
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {seatVariants.map((seat) => (
          <div
            key={seat.type}
            className="border rounded-lg p-4 flex flex-col bg-white shadow-sm"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold text-lg">{seat.type}</span>
              <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-bold">
                ₹{seat.price}
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span>💺</span>
              <span>
                Seats Left:{" "}
                <span className="font-semibold text-black">{seat.seatsLeft}</span>
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MovieVariant;
