
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
        <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm">
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-neutral-200">
                    <thead className="bg-neutral-50">
                        <tr>
                            <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Tool</th>
                            <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Use Case</th>
                            <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Pricing</th>
                            <th scope="col" className="px-6 py-4 text-center text-xs font-medium text-neutral-500 uppercase tracking-wider">Rating</th>
                            <th scope="col" className="relative px-6 py-4">
                                <span className="sr-only">Link</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-200 bg-white">
                        {data.map(({ tool, rating, useCase }) => (
                            <tr key={tool.id} className="hover:bg-neutral-50 transition-colors">
                                <td className="whitespace-nowrap px-6 py-4">
                                    <div className="flex items-center">
                                        <div className="h-8 w-8 flex-shrink-0 flex items-center justify-center rounded-lg bg-indigo-100 text-indigo-600 font-bold text-sm">
                                            {tool.name.charAt(0)}
                                        </div>
                                        <div className="ml-4">
                                            <div className="font-medium text-neutral-900">{tool.name}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-sm text-neutral-600 max-w-xs truncate">
                                    {useCase}
                                </td>
                                <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-600">
                                    <span className="inline-flex items-center rounded-md bg-neutral-100 px-2 py-1 text-xs font-medium text-neutral-600">
                                        {tool.pricing}
                                    </span>
                                </td>
                                <td className="whitespace-nowrap px-6 py-4 text-center text-sm font-semibold text-neutral-900">
                                    {rating}/5
                                </td>
                                <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                                    <a
                                        href={tool.affiliateLink || tool.website}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="text-indigo-600 hover:text-indigo-900"
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
