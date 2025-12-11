import Link from 'next/link';
import prisma from '@/lib/prisma';
import { Metadata } from 'next';
import { Hero } from '@/components/Hero';

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
    <main className="min-h-screen">
      <Hero
        title="Find the Best AI Tools for Your Profession"
        description={`Compare ${toolCount}+ AI tools across ${professionCount} professions. Get curated recommendations tailored to your specific workflow.`}
      />

      {/* Main Buttons (previously in Hero) */}
      <div className="relative z-20 -mt-10 mb-20 flex flex-col sm:flex-row items-center justify-center gap-4 px-6">
        <Link
          href="/professions"
          className="rounded-full bg-indigo-600 px-8 py-4 text-lg font-bold text-white shadow-lg shadow-indigo-500/25 hover:bg-indigo-500 hover:scale-105 transition-all duration-300"
        >
          Browse Recommended Tools
        </Link>
        <Link
          href="/tools"
          className="rounded-full bg-white/5 border border-white/10 px-8 py-4 text-lg font-semibold text-white backdrop-blur-sm hover:bg-white/10 hover:scale-105 transition-all duration-300"
        >
          View All Tools
        </Link>
      </div>

      {/* Stats Section */}
      <section className="mx-auto max-w-7xl px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 text-center">
          {[
            { count: toolCount, label: 'AI Tools Reviewed' },
            { count: professionCount, label: 'Professions Covered' },
            { count: relationshipCount, label: 'Curated Matches' },
          ].map((stat, idx) => (
            <div key={idx} className="group relative overflow-hidden rounded-2xl bg-white/5 p-8 ring-1 ring-white/10 backdrop-blur-md transition-all hover:bg-white/10">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <div className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-white/50 mb-2">
                  {stat.count}+
                </div>
                <p className="text-indigo-200 font-medium">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Professions */}
      <section className="mx-auto max-w-7xl px-6 lg:px-8 py-24">
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl mb-4">
            Popular Professions
          </h2>
          <div className="h-1 w-20 bg-indigo-500 mx-auto rounded-full mb-4" />
          <p className="text-lg text-neutral-400">
            Explore AI use cases tailored to your industry
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {professions.map((profession) => (
            <Link
              key={profession.slug}
              href={`/ai-tools-for/${profession.slug}`}
              className="group relative overflow-hidden rounded-xl bg-white/5 p-6 ring-1 ring-white/10 transition-all hover:-translate-y-1 hover:shadow-2xl hover:shadow-indigo-500/10 hover:ring-indigo-500/50"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10">
                <h3 className="text-lg font-semibold text-white group-hover:text-indigo-300 transition-colors">
                  {profession.title}
                </h3>
                <p className="text-sm text-neutral-500 mt-2 group-hover:text-neutral-300 transition-colors">
                  View Tools →
                </p>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link
            href="/professions"
            className="inline-flex items-center justify-center rounded-lg border border-white/10 bg-white/5 px-8 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/10 hover:border-indigo-500/50"
          >
            View All {professionCount} Professions
          </Link>
        </div>
      </section>

      {/* How It Works - Redesigned */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-indigo-900/10" />
        <div className="mx-auto max-w-7xl px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-white mb-4">
              How UseThisAI Works
            </h2>
            <p className="text-neutral-400">Three simple steps to AI adoption</p>
          </div>

          <div className="grid grid-cols-1 gap-12 md:grid-cols-3 relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-[24px] left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent" />

            {[
              { title: 'Choose Profession', desc: 'Select your role from our industry list.', icon: '1' },
              { title: 'Compare Tools', desc: 'View rated AI tools specific to your needs.', icon: '2' },
              { title: 'Start Automating', desc: 'Click to try tools and boost productivity.', icon: '3' },
            ].map((step, idx) => (
              <div key={idx} className="relative flex flex-col items-center text-center group">
                <div className="w-14 h-14 rounded-full bg-neutral-900 ring-4 ring-indigo-500/20 flex items-center justify-center text-xl font-bold text-indigo-400 mb-6 relative z-10 group-hover:ring-indigo-500 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
                  {step.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-indigo-300 transition-colors">
                  {step.title}
                </h3>
                <p className="text-neutral-400 leading-relaxed max-w-xs">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="mx-auto max-w-5xl px-6 lg:px-8 pb-20 pt-10">
        <div className="relative overflow-hidden rounded-3xl bg-indigo-600 px-6 py-20 shadow-2xl sm:px-12 sm:py-24 text-center">
          <div className="absolute inset-0 bg-neutral-900 mix-blend-multiply opacity-20" />
          <div className="absolute -top-24 -left-24 w-64 h-64 bg-purple-500 rounded-full blur-3xl opacity-30" />
          <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-pink-500 rounded-full blur-3xl opacity-30" />

          <div className="relative z-10">
            <h2 className="mx-auto max-w-2xl text-4xl font-bold tracking-tight text-white mb-6">
              Ready to modernize your workflow?
            </h2>
            <p className="mx-auto max-w-xl text-lg text-indigo-100 mb-10">
              Join thousands of professionals finding the right AI tools for their specific needs.
            </p>
            <Link
              href="/professions"
              className="inline-flex items-center justify-center rounded-full bg-white px-8 py-4 text-base font-bold text-indigo-600 shadow-xl hover:bg-neutral-100 hover:scale-105 transition-all duration-300"
            >
              Get Started for Free
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
