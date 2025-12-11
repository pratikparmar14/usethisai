
import { notFound } from 'next/navigation';
import prisma from '@/lib/prisma';
import { Metadata } from 'next';
import { Hero } from '@/components/Hero';
import { ToolCard } from '@/components/ToolCard';
import { ComparisonTable } from '@/components/ComparisonTable';
import { FAQSection } from '@/components/FAQSection';
import { InternalLinks } from '@/components/InternalLinks';

// ISR: Revalidate every 24 hours
export const revalidate = 86400;

interface PageProps {
    params: { slug: string };
}

// Generate static params for the top 50 professions to pre-build
export async function generateStaticParams() {
    try {
        const topProfessions = await prisma.profession.findMany({
            take: 50,
            select: { slug: true },
        });
        return topProfessions.map((p) => ({ slug: p.slug }));
    } catch (error) {
        console.error("Database connection failed during build:", error);
        return []; // Fallback to on-demand generation if DB fails
    }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const profession = await prisma.profession.findUnique({
        where: { slug },
        select: { seoTitle: true, seoDescription: true, title: true },
    });

    if (!profession) {
        return {
            title: 'Profession Not Found',
        };
    }

    return {
        title: profession.seoTitle,
        description: profession.seoDescription,
        openGraph: {
            title: profession.seoTitle,
            description: profession.seoDescription,
            type: 'website',
        },
        robots: 'index, follow',
    };
}

export default async function ProfessionPage({ params }: PageProps) {
    const { slug } = await params;
    const profession = await prisma.profession.findUnique({
        where: { slug },
        include: {
            tools: {
                include: {
                    tool: true,
                },
                orderBy: {
                    rating: 'desc'
                }
            },
            seoContent: true,
        },
    });

    if (!profession) {
        return notFound();
    }

    // Get related professions for internal linking (random 8)
    const relatedProfessions = await prisma.profession.findMany({
        where: {
            NOT: {
                id: profession.id,
            },
        },
        select: { title: true, slug: true },
        take: 8,
    });

    // Parse FAQ JSON
    let faqs: { q: string; a: string }[] = [];
    if (profession.seoContent?.faqJson) {
        try {
            faqs = JSON.parse(profession.seoContent.faqJson);
        } catch (error) {
            console.error('Error parsing FAQs:', error);
        }
    }

    // Build FAQ Schema
    const faqSchema = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map((faq) => ({
            '@type': 'Question',
            name: faq.q,
            acceptedAnswer: {
                '@type': 'Answer',
                text: faq.a,
            },
        })),
    };

    // Build Product Comparison Schema
    const productSchema = {
        '@context': 'https://schema.org',
        '@type': 'ComparisonChart',
        headline: `Best AI Tools for ${profession.title}s`,
        description: profession.seoDescription,
    };

    return (
        <main className="min-h-screen">
            {/* JSON-LD Schema for SEO */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
            />

            {/* 1. Above the Fold: Hero Section */}
            <Hero
                title={`Best AI Tools for ${profession.title}s`}
                description={profession.description}
            />

            <div className="max-w-7xl mx-auto px-6 lg:px-8 -mt-24 relative z-20 space-y-24 pb-24">

                {/* 2. Intro Content Card */}
                {profession.seoContent?.intro && (
                    <div className="bg-white/5 rounded-2xl p-8 shadow-xl border border-white/10 backdrop-blur-md">
                        <div className="prose prose-lg max-w-none prose-invert prose-headings:text-white prose-p:text-neutral-300 prose-a:text-indigo-400">
                            <p className="leading-8">{profession.seoContent.intro}</p>
                        </div>
                    </div>
                )}

                {/* 3. Comparison Table (Money Element) */}
                <section className="space-y-8">
                    <div className="text-center max-w-2xl mx-auto">
                        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                            Compare Top Tools
                        </h2>
                        <p className="mt-4 text-lg text-neutral-400">
                            Quick comparison of the best AI tools for {profession.title.toLowerCase()}s based on features, pricing, and user ratings.
                        </p>
                    </div>
                    <ComparisonTable data={profession.tools} />
                </section>

                {/* 4. Detailed Tool Cards */}
                {profession.tools.length > 0 && (
                    <section className="space-y-8">
                        <div className="text-center max-w-2xl mx-auto">
                            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                                Recommended Tools for {profession.title}s
                            </h2>
                            <p className="mt-4 text-lg text-neutral-400">
                                Explore our curated selection of AI tools designed to automate tasks and boost productivity.
                            </p>
                        </div>
                        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                            {profession.tools.slice(0, 9).map((item) => (
                                <ToolCard
                                    key={item.tool.id}
                                    tool={item.tool}
                                    rating={item.rating}
                                    useCase={item.useCase}
                                />
                            ))}
                        </div>
                    </section>
                )}

                {/* 5. FAQ Section */}
                {faqs.length > 0 && (
                    <section className="space-y-8 max-w-4xl mx-auto w-full">
                        <div className="text-center">
                            <h2 className="text-3xl font-bold tracking-tight text-white">
                                Frequently Asked Questions
                            </h2>
                            <p className="mt-4 text-lg text-neutral-400">
                                Everything you need to know about using AI tools as a {profession.title.toLowerCase()}.
                            </p>
                        </div>
                        <FAQSection faqs={faqs} />
                    </section>
                )}

                {/* 6. Internal Links */}
                {relatedProfessions.length > 0 && (
                    <InternalLinks
                        currentProfession={profession.title}
                        relatedProfessions={relatedProfessions}
                    />
                )}

                {/* 7. Bottom CTA */}
                <section className="relative overflow-hidden bg-indigo-600 rounded-3xl px-6 py-24 shadow-2xl sm:px-24 xl:py-32 text-center">
                    <div className="absolute inset-0 bg-neutral-900 mix-blend-multiply opacity-20" />
                    <div className="absolute -top-24 -left-24 w-64 h-64 bg-purple-500 rounded-full blur-3xl opacity-30" />
                    <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-pink-500 rounded-full blur-3xl opacity-30" />

                    <div className="relative mx-auto max-w-2xl z-10">
                        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                            Ready to transform your work with AI?
                        </h2>
                        <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-indigo-100">
                            Start using these AI tools today to automate tasks, save time, and stay competitive in 2025.
                        </p>
                        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-x-6 gap-y-3">
                            <a
                                href="#"
                                className="rounded-full bg-white px-8 py-3.5 text-sm font-bold text-indigo-600 shadow-xl hover:bg-neutral-100 hover:scale-105 transition-all duration-300"
                            >
                                Explore All Tools
                            </a>
                            <a
                                href="#"
                                className="rounded-full border border-white/20 bg-white/5 px-8 py-3.5 text-sm font-semibold text-white backdrop-blur-sm hover:bg-white/10 hover:border-white/40 transition-all duration-300"
                            >
                                Learn More
                            </a>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
}
