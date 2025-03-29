import { movieData } from "@/data/movieData";
import Sidebar from "@/components/home/sidebar";
import Header from "@/components/home/Header";
import FewMinutesLeft from "@/components/home/foursec/movie/FewMinutesLeft";
import PopularNow from "@/components/home/foursec/movie/PopularNow";
import Recommended from "@/components/home/foursec/movie/RecommandedMovies";

const MoviePage = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <div className="p-6">
          <nav className="text-2xl text-gray-600 mb-6">
            Home &gt; <span className="text-yellow-500 font-semibold">Movies</span>
          </nav>
          <div className="p-6">
            <FewMinutesLeft />
            <PopularNow />
            <Recommended />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoviePage;
