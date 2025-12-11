
import React from 'react';

interface Tool {
    id: string;
    name: string;
    pricing: string;
    slug: string;
    affiliateLink: string | null;
    website: string;
}

interface ComparisonTableProps {
    data: {
        tool: Tool;
        rating: number;
        useCase: string;
    }[];
}

export function ComparisonTable({ data }: ComparisonTableProps) {
    return (
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-xl backdrop-blur-sm">
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-white/10">
                    <thead className="bg-white/5">
                        <tr>
                            <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-neutral-300 uppercase tracking-wider">Tool</th>
                            <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-neutral-300 uppercase tracking-wider">Use Case</th>
                            <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-neutral-300 uppercase tracking-wider">Pricing</th>
                            <th scope="col" className="px-6 py-4 text-center text-xs font-bold text-neutral-300 uppercase tracking-wider">Rating</th>
                            <th scope="col" className="relative px-6 py-4">
                                <span className="sr-only">Link</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/10 bg-transparent">
                        {data.map(({ tool, rating, useCase }) => (
                            <tr key={tool.id} className="hover:bg-white/5 transition-colors group">
                                <td className="whitespace-nowrap px-6 py-4">
                                    <div className="flex items-center">
                                        <div className="h-10 w-10 flex-shrink-0 flex items-center justify-center rounded-lg bg-indigo-500/20 text-indigo-300 font-bold text-sm ring-1 ring-inset ring-indigo-500/30">
                                            {tool.name.charAt(0)}
                                        </div>
                                        <div className="ml-4">
                                            <div className="font-semibold text-white group-hover:text-indigo-300 transition-colors">{tool.name}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-sm text-neutral-400 max-w-xs truncate">
                                    {useCase}
                                </td>
                                <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-300">
                                    <span className="inline-flex items-center rounded-md bg-white/10 px-2 py-1 text-xs font-medium text-neutral-300 ring-1 ring-inset ring-white/10">
                                        {tool.pricing}
                                    </span>
                                </td>
                                <td className="whitespace-nowrap px-6 py-4 text-center text-sm font-bold text-white">
                                    <div className="inline-flex items-center gap-1">
                                        <span className="text-yellow-400">★</span>
                                        {rating}
                                    </div>
                                </td>
                                <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                                    <a
                                        href={tool.affiliateLink || tool.website}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="text-indigo-400 hover:text-indigo-300 transition-colors"
                                    >
                                        View<span className="hidden sm:inline"> details</span>
                                    </a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
