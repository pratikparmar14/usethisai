'use client';

import React from 'react';
import Link from 'next/link';
import { ParticleBackground } from './ParticleBackground';
import { AnimatedCounter } from './AnimatedCounter';
import { SparklesIcon, FireIcon } from '@heroicons/react/24/solid';

interface HeroProps {
    title: string;
    description: string;
    stats?: {
        tools: number;
        professions: number;
        matches: number;
    };
    trendingProfessions?: Array<{ title: string; slug: string }>;
    showSearch?: boolean;
}

export function Hero({
    title,
    description,
    stats,
    trendingProfessions = [],
    showSearch = false
}: HeroProps) {
    return (
        <section className="relative overflow-hidden pt-16 pb-20 sm:pt-24 sm:pb-24">
            {/* Background Effects */}
            <div className="absolute inset-0 z-0">
                {/* Grid Pattern */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

                {/* Animated Gradient Blobs */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-indigo-500/20 rounded-full blur-[100px] animate-pulse-slow"></div>
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-[100px] animate-float opacity-70"></div>
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-pink-500/20 rounded-full blur-[100px] animate-float opacity-70" style={{ animationDelay: '2s' }}></div>

                {/* Particle Background */}
                <ParticleBackground enabled={true} />
            </div>

            <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 text-center">
                {/* Badge */}
                <div className="mb-8 flex justify-center animate-fade-in-up">
                    <div className="group relative rounded-full bg-white/5 px-4 py-1.5 text-sm font-medium text-indigo-300 ring-1 ring-inset ring-white/10 backdrop-blur-sm hover:bg-white/10 transition-all">
                        <span className="flex items-center gap-2">
                            <SparklesIcon className="h-4 w-4 animate-pulse" />
                            Discover the future of work
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                            </span>
                        </span>
                    </div>
                </div>

                <h1 className="text-5xl font-bold tracking-tight text-white sm:text-7xl mb-6 leading-tight animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                    <span className="block">{title.split(' AI ')[0]}</span>
                    <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                        AI Tools
                    </span>
                    <span className="block">{title.split(' AI ')[1] || 'For Work'}</span>
                </h1>

                <p className="mx-auto max-w-2xl text-lg leading-8 text-neutral-400 mb-10 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                    {description}
                </p>

                {/* Animated Stats */}
                {stats && (
                    <div className="flex justify-center gap-8 mb-10 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                        <div className="text-center">
                            <AnimatedCounter
                                end={stats.tools}
                                className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent"
                            />
                            <p className="text-sm text-neutral-500 mt-1">AI Tools</p>
                        </div>
                        <div className="h-12 w-px bg-white/10"></div>
                        <div className="text-center">
                            <AnimatedCounter
                                end={stats.professions}
                                className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
                            />
                            <p className="text-sm text-neutral-500 mt-1">Professions</p>
                        </div>
                        <div className="h-12 w-px bg-white/10"></div>
                        <div className="text-center">
                            <AnimatedCounter
                                end={stats.matches}
                                className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-pink-400 to-indigo-400 bg-clip-text text-transparent"
                            />
                            <p className="text-sm text-neutral-500 mt-1">Matches</p>
                        </div>
                    </div>
                )}

                {/* Trending Professions */}
                {trendingProfessions.length > 0 && (
                    <div className="mb-8 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                        <div className="flex items-center justify-center gap-2 mb-4">
                            <FireIcon className="h-5 w-5 text-orange-500" />
                            <span className="text-sm font-medium text-neutral-400">Trending Now</span>
                        </div>
                        <div className="flex flex-wrap justify-center gap-2">
                            {trendingProfessions.slice(0, 5).map((profession) => (
                                <Link
                                    key={profession.slug}
                                    href={`/ai-tools-for/${profession.slug}`}
                                    className="group relative rounded-full bg-white/5 px-4 py-2 text-sm font-medium text-white ring-1 ring-white/10 backdrop-blur-sm hover:bg-indigo-600 hover:ring-indigo-500 transition-all hover:scale-105"
                                >
                                    {profession.title}
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}
