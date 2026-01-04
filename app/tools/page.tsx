'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { SearchBar } from '@/components/SearchBar';
import { FilterBar } from '@/components/FilterBar';

interface Tool {
  name: string;
  slug: string;
  pricing: string;
  website: string;
  professions: Array<{
    profession: {
      title: string;
      slug: string;
    };
  }>;
}

export default function ToolsPage() {
  const [tools, setTools] = useState<Tool[]>([]);
  const [filteredTools, setFilteredTools] = useState<Tool[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedSort, setSelectedSort] = useState('name');
  const [isLoading, setIsLoading] = useState(true);

  // Fetch tools on mount
  useEffect(() => {
    async function fetchTools() {
      try {
        const response = await fetch('/api/tools');
        const data = await response.json();
        setTools(data);
        setFilteredTools(data);
      } catch (error) {
        console.error('Error fetching tools:', error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchTools();
  }, []);

  // Filter and search logic
  useEffect(() => {
    let result = [...tools];

    // Search filter
    if (searchQuery) {
      result = result.filter(tool =>
        tool.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategory !== 'All') {
      result = result.filter(tool => {
        const pricing = tool.pricing.toLowerCase();
        if (selectedCategory === 'Free') return pricing.includes('free') && !pricing.includes('freemium');
        if (selectedCategory === 'Paid') return !pricing.includes('free');
        if (selectedCategory === 'Freemium') return pricing.includes('freemium');
        return true;
      });
    }

    // Sort
    result.sort((a, b) => {
      if (selectedSort === 'name') {
        return a.name.localeCompare(b.name);
      }
      return 0;
    });

    setFilteredTools(result);
  }, [searchQuery, selectedCategory, selectedSort, tools]);

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedSort('name');
  };

  const toolSuggestions = tools.map(tool => tool.name);

  if (isLoading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-white text-lg">Loading tools...</div>
      </main>
    );
  }

  return (
    <main className="min-h-screen">
      {/* Header */}
      <section className="relative overflow-hidden pt-12 pb-16">
        <div className="absolute inset-0 z-0">
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-[100px] animate-pulse-slow" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl mb-4">
            All AI Tools
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-neutral-400 mb-8">
            Browse {tools.length}+ AI tools reviewed and recommended for various professions
          </p>

          {/* Search Bar */}
          <div className="mx-auto max-w-2xl">
            <SearchBar
              placeholder="Search tools by name..."
              onSearch={setSearchQuery}
              suggestions={toolSuggestions}
            />
          </div>
        </div>
      </section>

      {/* Filters */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 pb-8">
        <FilterBar
          categories={['All', 'Free', 'Paid', 'Freemium']}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          sortOptions={[
            { label: 'Name (A-Z)', value: 'name' },
          ]}
          selectedSort={selectedSort}
          onSortChange={setSelectedSort}
          onClear={handleClearFilters}
        />
      </div>

      {/* Tools Grid */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-8">
        {filteredTools.length === 0 ? (
          <div className="text-center py-20">
            <div className="mx-auto max-w-md">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-white mb-2">No tools found</h3>
              <p className="text-neutral-400 mb-6">
                Try adjusting your search or filters
              </p>
              <button
                onClick={handleClearFilters}
                className="rounded-lg bg-indigo-600 px-6 py-3 text-sm font-semibold text-white hover:bg-indigo-500 transition-colors"
              >
                Clear all filters
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredTools.map((tool) => (
              <div
                key={tool.slug}
                className="group relative overflow-hidden rounded-xl bg-white/5 p-6 shadow-xl ring-1 ring-white/10 backdrop-blur-sm transition-all hover:shadow-2xl hover:bg-white/10 hover:ring-indigo-500/50"
              >
                <div className="relative space-y-4">
                  {/* Tool Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-white group-hover:text-indigo-300 transition-colors">
                        {tool.name}
                      </h3>
                      <p className="text-sm text-neutral-400 mt-1">{tool.pricing}</p>
                    </div>
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-indigo-500/20 text-indigo-300 font-bold text-sm ring-1 ring-inset ring-indigo-500/30">
                      {tool.name.charAt(0)}
                    </div>
                  </div>

                  {/* Professions using this tool */}
                  {tool.professions.length > 0 && (
                    <div className="pt-2 border-t border-white/10">
                      <p className="text-xs font-medium text-neutral-500 mb-2">Used by:</p>
                      <div className="flex flex-wrap gap-2">
                        {tool.professions.map((item) => (
                          <Link
                            key={item.profession.slug}
                            href={`/ai-tools-for/${item.profession.slug}`}
                            className="inline-flex items-center rounded-full bg-white/5 px-2.5 py-1 text-xs font-medium text-indigo-300 ring-1 ring-inset ring-white/10 hover:bg-white/10 transition-colors"
                          >
                            {item.profession.title}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Visit Link */}
                  <a
                    href={tool.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 flex items-center justify-center rounded-lg bg-gradient-to-r from-indigo-800 to-purple-400 px-4 py-2.5 text-sm font-bold text-white shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 hover:scale-[1.02] transition-all duration-200"
                  >
                    Visit Website →
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Results Count */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 pb-8">
        <p className="text-center text-sm text-neutral-500">
          Showing {filteredTools.length} of {tools.length} tools
        </p>
      </div>

      {/* CTA */}
      <section className="relative overflow-hidden bg-indigo-600/20 border border-indigo-500/30 rounded-3xl mx-auto max-w-7xl px-6 lg:px-8 mb-16 py-16 shadow-2xl backdrop-blur-md">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10" />
        <div className="relative mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl mb-4">
            Looking for tools for a specific profession?
          </h2>
          <Link
            href="/professions"
            className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-neutral-100 transition-colors"
          >
            Browse by Profession
          </Link>
        </div>
      </section>
    </main>
  );
}
