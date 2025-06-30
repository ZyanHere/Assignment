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
    return <div className="p-6 text-red-500 text-lg">Movie not found</div>;
  }

  const movieDetails = movie.desc[0];

  return (
    <div className="flex-1">
      <Header />
      <div className="p-6">
        <nav className="text-2xl mb-6">
          Home &gt; Movies &gt;{" "}
          <span className="text-yellow-500 font-semibold">{movie.title}</span>
        </nav>
        <div className="relative h-[450px] rounded-2xl overflow-hidden">
          <Image
            src={movieDetails.image}
            alt={movie.title}
            fill
            className="object-cover"
          />
        </div>
        <div className="mt-8 max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold uppercase mb-4">{movie.title}</h1>
          <div className="bg-gray-100 p-6 rounded-xl mb-8">
            <div className="grid grid-cols-2 gap-4 text-lg">
              <div className="flex items-center gap-2">
                <span>🗓</span>
                <span className="font-semibold">{movie.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <span>⏰</span>
                <span className="font-semibold">{movieDetails.time}</span>
              </div>
              <div className="flex items-center gap-2">
                <span>📍</span>
                <span className="font-semibold">{movieDetails.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <span>💺</span>
                <span className="font-semibold">{movieDetails.seatsLeft} seats left</span>
              </div>
              <div className="flex items-center gap-2">
                <span>🔞</span>
                <span className="font-semibold">Age Limit - {movieDetails.ageLimit} years</span>
              </div>
            </div>
          </div>
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">ABOUT THE MOVIE</h2>
            <p className="text-gray-600 leading-relaxed">{movieDetails.description}</p>
          </section>
          <div className="p-6 shadow-2xl rounded-xl">
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-10">TERMS & CONDITIONS</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Registration is required to attend the Movie</li>
                <li>All fees (if applicable) must be paid in full before the event date</li>
                <li>Tickets are non-refundable, except as stated in our refund policy</li>
                <li>Participants must follow all Event rules, schedules, and instructions from the organizers</li>
              </ul>
            </section>
          </div>
          <button className="w-full py-4 mt-5 bg-yellow-400 text-black font-bold rounded-xl hover:bg-yellow-500 transition-colors">
            GRAB DEAL - {movie.price} Rs
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailPage;
