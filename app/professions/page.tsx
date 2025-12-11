import Link from 'next/link';
import prisma from '@/lib/prisma';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'All AI Tools by Profession | UseThisAI',
  description: 'Browse all professions and find AI tools tailored for your job. Dentists, lawyers, marketers, developers, and 40+ more professions.',
};

export default async function ProfessionsPage() {
  const professions = await prisma.profession.findMany({
    select: { title: true, slug: true },
    orderBy: { title: 'asc' },
  });

  // Group professions by first letter
  const grouped = professions.reduce((acc, profession) => {
    const letter = profession.title[0].toUpperCase();
    if (!acc[letter]) acc[letter] = [];
    acc[letter].push(profession);
    return acc;
  }, {} as Record<string, typeof professions>);

  const sortedLetters = Object.keys(grouped).sort();

  return (
    <main className="min-h-screen bg-neutral-50 font-sans text-neutral-900">
      {/* Header */}
      <section className="relative overflow-hidden bg-neutral-900 py-16 sm:py-20">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-neutral-900 to-neutral-950 opacity-90" />
          <div className="absolute top-0 right-0 -mr-24 -mt-24 w-96 h-96 rounded-full bg-indigo-500 blur-3xl opacity-20" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl mb-4">
            Browse All Professions
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-neutral-300">
            Find the best AI tools for {professions.length}+ professions
          </p>
        </div>
      </section>

      {/* Professions by Letter */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16">
        {sortedLetters.map((letter) => (
          <div key={letter} className="mb-12">
            <h2 className="text-2xl font-bold text-neutral-900 mb-6 pb-4 border-b border-neutral-200">
              {letter}
            </h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {grouped[letter].map((profession) => (
                <Link
                  key={profession.slug}
                  href={`/ai-tools-for/${profession.slug}`}
                  className="group relative overflow-hidden rounded-xl bg-white p-6 shadow-sm ring-1 ring-neutral-200 transition-all hover:shadow-lg hover:ring-indigo-500/50"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/0 via-indigo-500/0 to-indigo-500/0 group-hover:from-indigo-500/5 group-hover:via-indigo-500/10 group-hover:to-indigo-500/5 transition-all" />
                  <div className="relative">
                    <h3 className="text-lg font-semibold text-neutral-900 group-hover:text-indigo-600 transition-colors">
                      {profession.title}
                    </h3>
                    <p className="text-sm text-neutral-500 mt-2">View tools →</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <section className="relative overflow-hidden bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl mx-auto max-w-7xl px-6 lg:px-8 mb-16 py-16 shadow-2xl">
        <div className="absolute inset-0 bg-neutral-900 mix-blend-multiply opacity-10" />
        <div className="relative mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl mb-4">
            Didn't find your profession?
          </h2>
          <p className="text-indigo-100 mb-6">
            We're constantly adding new professions. Let us know what you'd like to see.
          </p>
          <a
            href="mailto:hello@usethisai.com"
            className="inline-flex items-center justify-center rounded-md bg-white px-6 py-3 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-50 transition-colors"
          >
            Send Suggestion
          </a>
        </div>
      </section>
    </main>
  );
}
