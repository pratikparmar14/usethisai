import Link from 'next/link';

interface RelatedProfession {
    title: string;
    slug: string;
}

interface InternalLinksProps {
    currentProfession: string;
    relatedProfessions: RelatedProfession[];
}

export function InternalLinks({ currentProfession, relatedProfessions }: InternalLinksProps) {
    return (
        <section className="py-16 bg-white/5 border-y border-white/5 rounded-3xl">
            <div className="max-w-4xl mx-auto px-6">
                <h3 className="text-2xl font-bold text-white mb-8 text-center">
                    Explore AI Tools for Other Professions
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {relatedProfessions.map((profession) => (
                        <Link
                            key={profession.slug}
                            href={`/ai-tools-for/${profession.slug}`}
                            className="group relative overflow-hidden rounded-lg bg-neutral-900/50 p-4 shadow-sm ring-1 ring-white/10 transition-all hover:shadow-md hover:ring-indigo-500/50 hover:bg-white/5"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/0 via-indigo-500/0 to-indigo-500/0 group-hover:from-indigo-500/5 group-hover:via-indigo-500/10 group-hover:to-indigo-500/5 transition-all" />
                            <div className="relative">
                                <p className="text-sm font-semibold text-neutral-200 group-hover:text-indigo-400 transition-colors">
                                    {profession.title}
                                </p>
                                <p className="text-xs text-neutral-500 mt-1 group-hover:text-neutral-400">AI Tools for {profession.title.toLowerCase()}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
