import { Link } from "react-router-dom";
import { SearchBar } from "../../components/searchBar/searchBar";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-blue-50 to-blue-100 flex flex-col">
      <header className="max-w-6xl w-full mx-auto px-4 pt-8">
        <SearchBar />
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-4 text-center">
        <p className="text-blue-500 text-sm font-semibold uppercase tracking-widest mb-3">
          Error 404
        </p>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-snug">
          We couldn’t find the page <br /> you were looking for.
        </h1>
        <p className="text-gray-600 mt-4 max-w-xl">
          The link may be broken or the page may have been removed. Let’s get
          you back to exploring the best stays and travel deals.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <Link
            to="/"
            className="inline-flex justify-center items-center px-6 py-3 rounded-full bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 transition"
          >
            Go back home
          </Link>
          <Link
            to="/search"
            className="inline-flex justify-center items-center px-6 py-3 rounded-full border border-blue-200 text-blue-600 font-semibold bg-white hover:border-blue-400 transition"
          >
            Search for stays
          </Link>
        </div>
      </main>
    </div>
  );
}
