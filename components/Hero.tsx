
import React from 'react';

interface HeroProps {
    title: string;
    description: string;
}

export function Hero({ title, description }: HeroProps) {
    return (
        <section className="relative overflow-hidden bg-neutral-900 py-24 sm:py-32">
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-neutral-900 to-neutral-950 opacity-90" />
                <div className="absolute top-0 right-0 -mr-24 -mt-24 w-96 h-96 rounded-full bg-indigo-500 blur-3xl opacity-20" />
                <div className="absolute bottom-0 left-0 -ml-24 -mb-24 w-96 h-96 rounded-full bg-purple-500 blur-3xl opacity-20" />
            </div>

            <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 text-center">
                <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl mb-6">
                    {title}
                </h1>
                <p className="mx-auto max-w-2xl text-lg leading-8 text-neutral-300">
                    {description}
                </p>
            </div>
        </section>
    );
}
