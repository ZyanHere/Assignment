"use client";
import { useParams } from "next/navigation";
import { movieData } from "@/data/movieData";
import Image from "next/image";
import Header from "@/components/home/Header";

const MovieDetailPage = () => {
  const { movieSlug } = useParams();
  const generateSlug = (title) => title.toLowerCase().replace(/\s+/g, "-");

  const allMovies = [
    ...movieData.FewMinutesLeft,
    ...movieData.PopularNow,
    ...movieData.Recommanded,
  ];

  const movie = allMovies.find((m) => generateSlug(m.title) === movieSlug);

  if (!movie) {
    return <div className="p-4 sm:p-6 text-red-500 text-lg">Movie not found</div>;
  }

  const movieDetails = movie.desc[0];

  return (
    <div className="flex-1 bg-white">
      <Header />
      <div className="p-4 sm:p-6 max-w-[95%] lg:max-w-6xl mx-auto">
        {/* Breadcrumb */}
        <nav className="text-sm sm:text-lg lg:text-2xl mb-1 sm:mb-2 mt-2 sm:mt-4">
          Home &gt; Movies &gt;{" "}
          <span className="text-yellow-500 font-semibold">{movie.title}</span>
        </nav>

        {/* Banner Image */}
        <div className="relative w-full h-[180px] sm:h-[260px] md:h-[340px] lg:h-[420px] xl:h-[480px] rounded-lg sm:rounded-2xl overflow-hidden mb-2 sm:mb-3 mt-0">
          <Image
            src={movieDetails.image}
            alt={movie.title}
            fill
            className="object-contain bg-white"
            priority
          />
        </div>

        {/* Movie Details */}
        <div>
          {/* Title */}
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold uppercase mb-3 sm:mb-4 mt-1 sm:mt-2">
            {movie.title}
          </h1>

          {/* Info Grid */}
          <div className="bg-gray-100 p-4 sm:p-6 rounded-lg sm:rounded-xl mb-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm sm:text-base lg:text-lg">
              <div className="flex items-center gap-2">
                <span>🗓</span>
                <span className="font-semibold">{movie.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <span>⏰</span>
                <span className="font-semibold">Duration - {movieDetails.duration}</span>
              </div>
              <div className="flex items-center gap-2">
                <span>📍</span>
                <span className="font-semibold">{movieDetails.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <span>⏰</span>
                <span className="font-semibold">Show Time - {movie.time}</span>
              </div>
              <div className="flex items-center gap-2">
                <span>💺</span>
                <span className="font-semibold">
                  {movieDetails.seatsLeft} seats left
                </span>
              </div>
              <div className="flex items-center gap-2 ">
                <span>🔞</span>
                <span className="font-semibold">
                  Age Limit - {movieDetails.ageLimit} years
                </span>
              </div>
            </div>
          </div>

          {/* About Section */}
          <section className="mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">
              ABOUT THE MOVIE
            </h2>
            <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
              {movieDetails.description}
            </p>
          </section>
          <section className="mb-8">
            <h2 className="text-xl sm:text-2xl font-bold mb-4">Seat Types & Pricing</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Standard Seat */}
              <div className="border rounded-lg p-4 flex flex-col bg-white shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-lg">Standard</span>
                  <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-bold">
                    ₹200
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span>💺</span>
                  <span>Seats Left: <span className="font-semibold text-black">30</span></span>
                </div>
              </div>
              {/* Premium Seat */}
              <div className="border rounded-lg p-4 flex flex-col bg-white shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-lg">Premium</span>
                  <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-bold">
                    ₹350
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span>💺</span>
                  <span>Seats Left: <span className="font-semibold text-black">15</span></span>
                </div>
              </div>
              {/* Recliner Seat */}
              <div className="border rounded-lg p-4 flex flex-col bg-white shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-lg">Recliner</span>
                  <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-bold">
                    ₹500
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span>💺</span>
                  <span>Seats Left: <span className="font-semibold text-black">8</span></span>
                </div>
              </div>
              {/* Supreme Seat */}
              <div className="border rounded-lg p-4 flex flex-col bg-white shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-lg">Supreme</span>
                  <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-bold">
                    ₹700
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span>💺</span>
                  <span>Seats Left: <span className="font-semibold text-black">4</span></span>
                </div>
              </div>
            </div>
          </section>
          {/* Terms */}
          <div className="p-4 sm:p-6 shadow-lg sm:shadow-2xl rounded-lg sm:rounded-xl mb-6">
            <section>
              <h2 className="text-xl sm:text-2xl font-bold mb-5 sm:mb-8">
                TERMS & CONDITIONS
              </h2>
              <ul className="list-disc pl-4 sm:pl-6 space-y-2 text-sm sm:text-base">
                <li>Registration is required to attend the Movie</li>
                <li>
                  All fees (if applicable) must be paid in full before the event date
                </li>
                <li>
                  Tickets are non-refundable, except as stated in our refund policy
                </li>
                <li>
                  Participants must follow all Event rules, schedules, and
                  instructions from the organizers
                </li>
              </ul>
            </section>
          </div>

          {/* Button */}
          <button className="w-full py-3 sm:py-4 bg-yellow-400 text-black font-bold rounded-lg sm:rounded-xl hover:bg-yellow-500 transition-colors text-sm sm:text-base lg:text-lg">
            GRAB DEAL - {movie.price} 
          </button>
        </div>
      </div>
    </div>
  );
};
export default MovieDetailPage;
