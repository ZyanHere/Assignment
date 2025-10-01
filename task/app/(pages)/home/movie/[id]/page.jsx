"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/home/Header";
import { useMoviesSWR } from "@/lib/hooks/useMoviesSWR";
import { useProduct } from "@/lib/contexts/productContext";
import { useEffect, useMemo, useState } from "react";
import { useSelectedItems } from "@/lib/contexts/selected-items-context";
import { useSession } from "next-auth/react";
import { useCart } from "@/lib/contexts/cart-context";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const fallbackSeatVariants = [
  { type: "Standard", price: 200, seatsLeft: 30 },
  { type: "Premium", price: 350, seatsLeft: 15 },
  { type: "Recliner", price: 500, seatsLeft: 8 },
  { type: "Supreme", price: 700, seatsLeft: 4 },
];

export default function MovieDetailPage() {
  const { id } = useParams();
  const { data, isLoading, isError, error } = useMoviesSWR({
    moviesOnly: true,
    productsLimit: 100,
  });
  const [movieDoc, setMovieDoc] = useState(null);
  const [movieLoading, setMovieLoading] = useState(true);
  const [theaters, setTheaters] = useState([]);
  const [showtimes, setShowtimes] = useState([]);
  const [selectedShow, setSelectedShow] = useState(null);
  const [selectedDate, setSelectedDate] = useState(() => {
    const d = new Date();
    return d.toISOString().slice(0, 10);
  });

  const next7Days = useMemo(() => {
    const days = [];
    const base = new Date();
    for (let i = 0; i < 7; i += 1) {
      const d = new Date(base);
      d.setDate(base.getDate() + i);
      days.push({
        key: d.toISOString().slice(0, 10),
        label: d.toLocaleDateString(undefined, { weekday: "short" }),
        dateNum: d.getDate(),
        month: d.toLocaleDateString(undefined, { month: "short" }),
      });
    }
    return days;
  }, []);

  const API_BASE =
    process.env.NEXT_PUBLIC_API_BASE_URL ||
    (typeof window !== "undefined"
      ? window.location.origin.includes("localhost")
        ? "http://localhost:4000"
        : window.location.origin
      : "http://localhost:4000");
  const API = (p) => `${API_BASE}/lmd/api/v1${p}`;

  // Fetch Movie
  useEffect(() => {
    const fetchMovie = async () => {
      if (!id) return;
      try {
        setMovieLoading(true);
        const r = await fetch(API(`/movies/movies/${id}`));
        const d = await r.json();
        if (r.ok && (d?.success || d?.status === "success")) {
          setMovieDoc(d.data);
        }
      } finally {
        setMovieLoading(false);
      }
    };
    fetchMovie();
  }, [id]);

  // Fetch Showtimes
  useEffect(() => {
    const fetchTheatersAndShowtimes = async () => {
      try {
        const r = await fetch(
          API(`/movies/showtimes/movie/${id}?date=${selectedDate}`)
        );
        const d = await r.json();
        if (r.ok && (d?.success || d?.status === "success")) {
          setTheaters(d.data.map((g) => g.theater));
          setShowtimes(d.data);
        }
      } catch {}
    };
    if (id) fetchTheatersAndShowtimes();
  }, [id, selectedDate]);

  const { selectedVariant } = useProduct();
  const { addToCart, clearCart } = useCart();
  const { setSingleItem, setSelectedItems } = useSelectedItems();
  const { data: session } = useSession();
  const router = useRouter();
  const [grabLoading, setGrabLoading] = useState(false);

  const swrMovie = data?.all?.find((m) => String(m.id) === String(id));
  const movie =
    swrMovie ||
    (movieDoc
      ? {
          id: movieDoc._id,
          title: movieDoc.title,
          poster: movieDoc.posterImage,
          description: movieDoc.description,
          genre: movieDoc.genre,
          language: movieDoc.language,
          releaseDate: movieDoc.releaseDate,
          duration: movieDoc.duration,
          raw: {},
        }
      : showtimes?.length
      ? { id, title: "Movie", poster: "", description: "", raw: {} }
      : null);

  if (!movie) {
    if (isLoading || movieLoading) {
      return (
        <div className="p-6 text-center text-white">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-500 mx-auto"></div>
          <p>Loading movie details...</p>
        </div>
      );
    }
    if (isError) {
      return (
        <div className="p-6 text-red-500">
          {error?.message || "Failed to load movie details."}
        </div>
      );
    }
    return <div className="p-6 text-gray-500">Movie not found.</div>;
  }

  const details = {
    image: movie.poster || movieDoc?.posterImage,
    duration:
      movie.duration ||
      movie.raw?.duration ||
      "N/A",
    seatsLeft:
      fallbackSeatVariants.reduce((sum, s) => sum + s.seatsLeft, 0),
    ageLimit: movie.raw?.ageLimit || "N/A",
    description: movie.description,
  };

  return (
    <div className="flex-1 bg-black text-white min-h-screen">
      <Header />

      {/* Hero Section */}
      <div className="relative w-full h-[400px] md:h-[550px]">
        <Image
          src={details.image}
          alt={movie.title}
          fill
          className="object-cover brightness-50"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>

        <div className="absolute bottom-6 left-6 flex items-center gap-6">
          <Image
            src={details.image}
            alt={movie.title}
            width={140}
            height={200}
            className="rounded-xl shadow-lg border border-gray-800"
          />
          <div>
            <h1 className="text-3xl md:text-5xl font-bold">{movie.title}</h1>
            <p className="text-gray-300">
              {movie.genre?.join(", ")} • {movie.language || "N/A"}
            </p>
            <p className="text-gray-400 text-sm">
              {details.duration} • {details.ageLimit} •{" "}
              {movie.releaseDate
                ? new Date(movie.releaseDate).toLocaleDateString()
                : "TBA"}
            </p>
          </div>
        </div>
      </div>

      {/* Date Selector */}
      <div className="sticky top-0 bg-black z-10 px-4 py-3 overflow-x-auto flex gap-3 border-b border-gray-800">
        {next7Days.map((d) => (
          <button
            key={d.key}
            onClick={() => setSelectedDate(d.key)}
            className={`flex flex-col items-center px-4 py-2 rounded-full border transition-all ${
              selectedDate === d.key
                ? "bg-yellow-400 text-black border-yellow-500 font-bold"
                : "bg-black text-gray-300 border-gray-600 hover:bg-gray-800"
            }`}
          >
            <span className="text-xs">{d.label}</span>
            <span className="text-lg">{d.dateNum}</span>
          </button>
        ))}
      </div>

      {/* Showtimes */}
      <div className="p-6 space-y-6">
        {showtimes.length === 0 ? (
          <p className="text-gray-500">
            No showtimes for the selected date.
          </p>
        ) : (
          showtimes.map((group) => (
            <div
              key={group.theater?._id}
              className="bg-gray-900 border border-gray-800 rounded-xl shadow-lg p-5"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                <div>
                  <h2 className="text-lg font-semibold">
                    {group.theater?.name}
                  </h2>
                  <p className="text-gray-500 text-sm">
                    {group.theater?.address?.city}
                  </p>
                </div>
                <Button
                  variant="link"
                  className="text-yellow-400 hover:text-yellow-500 text-sm mt-2 sm:mt-0"
                >
                  View on Map
                </Button>
              </div>

              <div className="flex flex-wrap gap-3">
                {group.shows.map((s) => (
                  <button
                    key={s._id}
                    onClick={() =>
                      (window.location.href = `/home/movie/show/${s._id}`)
                    }
                    className="px-4 py-2 rounded-full border border-gray-700 bg-black hover:bg-gray-800 text-sm font-medium"
                  >
                    {new Date(s.startTime).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </button>
                ))}
              </div>
            </div>
          ))
        )}
      </div>

      {/* About */}
      <div className="px-6 py-8 border-t border-gray-800">
        <h2 className="text-2xl font-bold mb-4">About the Movie</h2>
        <p className="text-gray-400 leading-relaxed">
          {details.description}
        </p>
      </div>
    </div>
  );
}
