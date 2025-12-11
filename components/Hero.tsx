import React from 'react';

interface HeroProps {
    title: string;
    description: string;
}

export function Hero({ title, description }: HeroProps) {
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
            </div>

            <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 text-center">
                {/* Badge */}
                <div className="mb-8 flex justify-center animate-fade-in-up">
                    <div className="rounded-full bg-white/5 px-3 py-1 text-sm font-medium text-indigo-300 ring-1 ring-inset ring-white/10 backdrop-blur-sm">
                        ✨ Discover the future of work
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
            </div>
        </section>
    );
}
