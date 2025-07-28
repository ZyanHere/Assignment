'use client';

import { useSearchParams } from 'next/navigation';
import Header from '@/components/home/Header';
import SearchFilters from '@/components/search/SearchFilters';
import SortOptions from '@/components/search/SortOptions';
import SearchResultCard from '@/components/search/SearchResultCard';
import { sampleResults } from '@/data/sampleresults';
import { useStableSearch } from '@/lib/hooks/search/useStableSearch';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('q') || '';
  const currentSort = searchParams.get('sort') || 'relevance';

  const { data, isLoading } = useStableSearch({
    query: searchQuery,
    sort: currentSort,
  });

  const results = data?.results || sampleResults;

  return (
    <main className="min-h-screen bg-white">
      <Header />
      <div className="flex px-4 sm:px-8 lg:px-12 py-6 gap-6">
        {/* Left: Filter Sidebar */}
        <aside className="hidden md:block w-[250px]">
          <SearchFilters />
        </aside>

        {/* Right: Search Results */}
        <section className="flex-1">
          {/* Top: Results Header */}
          <div className="  mb-6">
            <h2 className="text-xl font-semibold text-gray-800">
              Results for: <span className="text-yellow-600">"{searchQuery}"</span>
            </h2>
            <h2 className="text-sm font-semibold text-gray-800">
                Showing 1 – {results.length} of {results.length} results
              </h2>
          </div>
          <SortOptions />

          {/* Results Grid */}
          {isLoading ? (
            <p className="text-gray-500">Loading results...</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-10">
              {results?.map((item) => (
                <SearchResultCard key={item._id} item={item} />
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
