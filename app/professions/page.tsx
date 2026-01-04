'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { SearchBar } from '@/components/SearchBar';

interface Profession {
  title: string;
  slug: string;
}

export default function ProfessionsPage() {
  const [professions, setProfessions] = useState<Profession[]>([]);
  const [filteredProfessions, setFilteredProfessions] = useState<Profession[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Fetch professions on mount
  useEffect(() => {
    async function fetchProfessions() {
      try {
        const response = await fetch('/api/professions');
        const data = await response.json();
        setProfessions(data);
        setFilteredProfessions(data);
      } catch (error) {
        console.error('Error fetching professions:', error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchProfessions();
  }, []);

  // Filter professions based on search
  useEffect(() => {
    if (searchQuery) {
      const filtered = professions.filter(profession =>
        profession.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProfessions(filtered);
    } else {
      setFilteredProfessions(professions);
    }
  }, [searchQuery, professions]);

  // Group professions by first letter
  const grouped = filteredProfessions.reduce((acc, profession) => {
    const letter = profession.title[0].toUpperCase();
    if (!acc[letter]) acc[letter] = [];
    acc[letter].push(profession);
    return acc;
  }, {} as Record<string, Profession[]>);

  const sortedLetters = Object.keys(grouped).sort();
  const professionSuggestions = professions.map(p => p.title);

  // Scroll to letter section
  const scrollToLetter = (letter: string) => {
    const element = document.getElementById(`letter-${letter}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  if (isLoading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-white text-lg">Loading professions...</div>
      </main>
    );
  }

  return (
    <main className="min-h-screen">
      {/* Header */}
      <section className="relative overflow-hidden pt-12 pb-16">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/20 rounded-full blur-[100px] animate-pulse-slow" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl mb-4">
            Browse All Professions
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-neutral-400 mb-8">
            Find the best AI tools for {professions.length}+ professions
          </p>

          {/* Search Bar */}
          <div className="mx-auto max-w-2xl">
            <SearchBar
              placeholder="Search professions..."
              onSearch={setSearchQuery}
              suggestions={professionSuggestions}
            />
          </div>
        </div>
      </section>

      {/* Alphabet Quick Jump */}
      {!searchQuery && (
        <div className="sticky top-0 z-40 bg-neutral-950/80 backdrop-blur-lg border-b border-white/10 py-4">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="flex flex-wrap justify-center gap-2">
              {sortedLetters.map((letter) => (
                <button
                  key={letter}
                  onClick={() => scrollToLetter(letter)}
                  className="w-8 h-8 rounded-lg bg-white/5 text-sm font-medium text-neutral-400 hover:bg-indigo-600 hover:text-white transition-all"
                >
                  {letter}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Professions by Letter */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16">
        {filteredProfessions.length === 0 ? (
          <div className="text-center py-20">
            <div className="mx-auto max-w-md">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-white mb-2">No professions found</h3>
              <p className="text-neutral-400 mb-6">
                Try a different search term
              </p>
              <button
                onClick={() => setSearchQuery('')}
                className="rounded-lg bg-indigo-600 px-6 py-3 text-sm font-semibold text-white hover:bg-indigo-500 transition-colors"
              >
                Clear search
              </button>
            </div>
          </div>
        ) : (
          sortedLetters.map((letter) => (
            <div key={letter} id={`letter-${letter}`} className="mb-12 scroll-mt-32">
              <h2 className="text-2xl font-bold text-white mb-6 pb-4 border-b border-white/10">
                {letter}
              </h2>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {grouped[letter].map((profession) => (
                  <Link
                    key={profession.slug}
                    href={`/ai-tools-for/${profession.slug}`}
                    className="group relative overflow-hidden rounded-xl bg-white/5 p-6 shadow-sm ring-1 ring-white/10 transition-all hover:shadow-lg hover:bg-white/10 hover:ring-indigo-500/50"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/0 via-indigo-500/0 to-indigo-500/0 group-hover:from-indigo-500/5 group-hover:via-indigo-500/10 group-hover:to-indigo-500/5 transition-all" />
                    <div className="relative">
                      <h3 className="text-lg font-semibold text-white group-hover:text-indigo-300 transition-colors">
                        {profession.title}
                      </h3>
                      <p className="text-sm text-neutral-500 mt-2 group-hover:text-neutral-300">View tools →</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Results Count */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 pb-8">
        <p className="text-center text-sm text-neutral-500">
          Showing {filteredProfessions.length} of {professions.length} professions
        </p>
      </div>

      {/* CTA */}
      <section className="relative overflow-hidden bg-indigo-600/20 border border-indigo-500/30 rounded-3xl mx-auto max-w-7xl px-6 lg:px-8 mb-16 py-16 shadow-2xl backdrop-blur-md">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10" />
        <div className="relative mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl mb-4">
            Didn't find your profession?
          </h2>
          <p className="text-indigo-200 mb-6">
            We're constantly adding new professions. Let us know what you'd like to see.
          </p>
          <a
            href="mailto:hello@usethisai.com"
            className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-neutral-100 transition-colors"
          >
            Send Suggestion
          </a>
        </div>
      </section>
    </main>
  );
}
