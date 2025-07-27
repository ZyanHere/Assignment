'use client';

import { useState } from 'react';
import Header from '@/components/home/Header';
import SearchResultCard from '@/components/search/SearchResultCard';
import SearchFilters from '@/components/search/SearchFilters';
import { sampleResults } from '@/data/sampleresults';

const SearchPage = () => {
  const [searchQuery] = useState('jeans'); // hardcoded for now
  const results = sampleResults; // using mock

  return (
    <>
      <Header />

      <main className="min-h-screen bg-white py-6 px-4 md:px-8">
        <div className="max-w-7xl mx-auto flex gap-6">
          {/* --- Left: Filter Sidebar --- */}
          <aside className="w-1/4 hidden md:block">
            <div className="bg-white border border-gray-200 shadow rounded-xl p-4 sticky top-24">
              <h2 className="text-lg font-semibold text-yellow-600 mb-4">Filters</h2>
              <SearchFilters />
            </div>
          </aside>

          {/* --- Right: Results Section --- */}
          <section className="flex-1 w-full">
            {/* Search Summary */}
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-gray-800">
                Showing 1 – {results.length} of {results.length} results
              </h2>
            </div>

            {/* Sorting */}
            <div className="flex items-center gap-4 mb-6 text-sm">
              <span className="text-gray-600">Sort By</span>
              {['Relevance', 'Popularity', 'Price: Low to High', 'Price: High to Low', 'Newest First'].map((label, index) => (
                <button
                  key={index}
                  className={`px-3 py-1 rounded-full font-medium border transition ${
                    index === 0
                      ? 'bg-yellow-100 text-yellow-700 border-yellow-400'
                      : 'text-gray-600 border-gray-300 hover:bg-yellow-50'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* Search Result Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
              {results.map((item) => (
                <SearchResultCard key={item._id} item={item} />
              ))}
            </div>
          </section>
        </div>
      </main>
    </>
  );
};

export default SearchPage;
