
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
        <div className="group relative flex flex-col justify-between overflow-hidden rounded-2xl bg-white p-6 shadow-sm ring-1 ring-neutral-200 transition-all hover:shadow-lg hover:ring-indigo-500/50">

            <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 font-bold text-indigo-600 text-xl ring-1 ring-indigo-100">
                        {/* Placeholder for logo if image fails or is missing, using first letter */}
                        {tool.name.charAt(0)}
                    </div>
                    <div>
                        <h3 className="font-semibold text-lg leading-6 text-neutral-900 group-hover:text-indigo-600 transition-colors">
                            {tool.name}
                        </h3>
                        <span className="inline-flex items-center rounded-md bg-neutral-50 px-2 py-1 text-xs font-medium text-neutral-600 ring-1 ring-inset ring-neutral-500/10 mt-1">
                            {tool.pricing}
                        </span>
                    </div>
                </div>
                <div className="flex items-center gap-1 rounded-full bg-green-50 px-2.5 py-1 text-sm font-semibold text-green-700 ring-1 ring-inset ring-green-600/20">
                    <span>{rating}</span>
                    <span className="text-green-600/70">/5</span>
                </div>
            </div>

            <div className="mt-6 space-y-4">
                <p className="text-sm leading-6 text-neutral-600 line-clamp-3">
                    <span className="font-semibold text-neutral-900 block mb-1">Best for:</span>
                    {useCase}
                </p>

                <a
                    href={tool.affiliateLink || tool.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 flex w-full items-center justify-center rounded-xl bg-neutral-900 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-neutral-800 hover:shadow-md transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900"
                >
                    Visit Website
                </a>
            </div>
        </div>
    );
}
