import Link from 'next/link';
import prisma from '@/lib/prisma';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'UseThisAI - Best AI Tools for Every Profession',
  description: 'Discover the best AI tools for your profession. Compare ChatGPT, Claude, Midjourney, and 25+ more tools tailored to dentists, lawyers, marketers, developers, and 40+ other professions.',
  openGraph: {
    title: 'UseThisAI - Best AI Tools for Every Profession',
    description: 'Discover the best AI tools for your profession',
    type: 'website',
  },
};

export default async function Home() {
  // Get featured professions
  const professions = await prisma.profession.findMany({
    take: 12,
    select: { title: true, slug: true },
    orderBy: { createdAt: 'asc' },
  });

  // Get tool stats
  const toolCount = await prisma.tool.count();
  const professionCount = await prisma.profession.count();
  const relationshipCount = await prisma.toolProfession.count();

  return (
    <main className="min-h-screen bg-neutral-50 font-sans text-neutral-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-neutral-900 py-24 sm:py-32">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-neutral-900 to-neutral-950 opacity-90" />
          <div className="absolute top-0 right-0 -mr-32 -mt-32 w-96 h-96 rounded-full bg-indigo-500 blur-3xl opacity-20" />
          <div className="absolute bottom-0 left-0 -ml-32 -mb-32 w-96 h-96 rounded-full bg-purple-500 blur-3xl opacity-20" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold tracking-tight text-white sm:text-6xl mb-6">
            Find the Best AI Tools for Your Profession
          </h1>
          <p className="mx-auto max-w-2xl text-xl leading-8 text-neutral-300 mb-8">
            Compare {toolCount}+ AI tools across {professionCount} professions. Get curated recommendations for dentists, lawyers, marketers, developers, and more.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/professions"
              className="rounded-md bg-indigo-600 px-8 py-3 text-lg font-semibold text-white shadow-sm hover:bg-indigo-500 transition-colors"
            >
              Browse All Professions
            </Link>
            <Link
              href="/tools"
              className="rounded-md border border-neutral-400 px-8 py-3 text-lg font-semibold text-white hover:bg-white/10 transition-colors"
            >
              View All Tools
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="mx-auto max-w-7xl px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 text-center">
          <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-neutral-200">
            <div className="text-4xl font-bold text-indigo-600 mb-2">{toolCount}+</div>
            <p className="text-neutral-600">AI Tools Reviewed</p>
          </div>
          <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-neutral-200">
            <div className="text-4xl font-bold text-indigo-600 mb-2">{professionCount}+</div>
            <p className="text-neutral-600">Professions Covered</p>
          </div>
          <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-neutral-200">
            <div className="text-4xl font-bold text-indigo-600 mb-2">{relationshipCount}+</div>
            <p className="text-neutral-600">Tool Recommendations</p>
          </div>
        </div>
      </section>

      {/* Featured Professions */}
      <section className="mx-auto max-w-7xl px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold tracking-tight text-neutral-900 mb-4">
            Popular Professions
          </h2>
          <p className="text-xl text-neutral-600">
            Explore AI tools tailored for your industry
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {professions.map((profession) => (
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
                <p className="text-sm text-neutral-500 mt-2">Best AI tools →</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/professions"
            className="inline-flex items-center justify-center rounded-md bg-neutral-900 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-neutral-800 transition-colors"
          >
            View All {professionCount} Professions
          </Link>
        </div>
      </section>

      {/* How It Works */}
      <section className="mx-auto max-w-7xl px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold tracking-tight text-neutral-900 mb-4">
            How UseThisAI Works
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="relative">
            <div className="absolute -left-4 -top-4 text-5xl font-bold text-indigo-100">1</div>
            <h3 className="text-xl font-semibold text-neutral-900 mb-2">Choose Your Profession</h3>
            <p className="text-neutral-600">
              Select your job title or industry from our comprehensive list of professions.
            </p>
          </div>
          <div className="relative">
            <div className="absolute -left-4 -top-4 text-5xl font-bold text-indigo-100">2</div>
            <h3 className="text-xl font-semibold text-neutral-900 mb-2">Compare Tools</h3>
            <p className="text-neutral-600">
              See AI tools specifically recommended for your profession with ratings and pricing.
            </p>
          </div>
          <div className="relative">
            <div className="absolute -left-4 -top-4 text-5xl font-bold text-indigo-100">3</div>
            <h3 className="text-xl font-semibold text-neutral-900 mb-2">Start Using</h3>
            <p className="text-neutral-600">
              Click to try the tools and start automating your workflow today.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl mx-auto max-w-7xl px-6 lg:px-8 mb-16 py-24 shadow-2xl">
        <div className="absolute inset-0 bg-neutral-900 mix-blend-multiply opacity-10" />
        <div className="relative mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl mb-4">
            Ready to transform your work with AI?
          </h2>
          <p className="text-lg text-indigo-100 mb-8">
            Discover tools that will save you hours every week and boost your productivity.
          </p>
          <Link
            href="/professions"
            className="inline-flex items-center justify-center rounded-md bg-white px-8 py-3 text-base font-semibold text-indigo-600 shadow-sm hover:bg-indigo-50 transition-colors"
          >
            Get Started Now
          </Link>
        </div>
      </section>
    </main>
  );
}
