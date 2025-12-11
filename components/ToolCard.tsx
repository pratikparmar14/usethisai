import React from 'react';

interface Tool {
    id: string;
    name: string;
    pricing: string;
    logo: string;
    affiliateLink: string | null;
    website: string;
}

interface ToolCardProps {
    tool: Tool;
    rating: number;
    useCase: string;
}

export function ToolCard({ tool, rating, useCase }: ToolCardProps) {
    return (
        <div className="group relative flex flex-col justify-between overflow-hidden rounded-2xl bg-white/5 p-6 shadow-xl ring-1 ring-white/10 backdrop-blur-sm transition-all hover:-translate-y-1 hover:bg-white/10 hover:shadow-2xl hover:shadow-indigo-500/10 hover:ring-indigo-500/50">

            <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 font-bold text-white text-xl shadow-lg">
                        {/* Placeholder for logo if image fails or is missing, using first letter */}
                        {tool.name.charAt(0)}
                    </div>
                    <div>
                        <h3 className="font-semibold text-lg leading-6 text-white group-hover:text-indigo-300 transition-colors">
                            {tool.name}
                        </h3>
                        <span className="inline-flex items-center rounded-md bg-white/10 px-2 py-1 text-xs font-medium text-neutral-300 ring-1 ring-inset ring-white/10 mt-1">
                            {tool.pricing}
                        </span>
                    </div>
                </div>
                <div className="flex items-center gap-1 rounded-full bg-green-500/10 px-2.5 py-1 text-sm font-semibold text-green-400 ring-1 ring-inset ring-green-500/20">
                    <span>{rating}</span>
                    <span className="text-green-400/60">/5</span>
                </div>
            </div>

            <div className="mt-6 space-y-4">
                <p className="text-sm leading-6 text-neutral-400 line-clamp-3">
                    <span className="font-semibold text-neutral-200 block mb-1">Best for:</span>
                    {useCase}
                </p>

                <a
                    href={tool.affiliateLink || tool.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 hover:scale-[1.02] transition-all duration-200"
                >
                    Visit Website
                </a>
            </div>
        </div>
    );
}
