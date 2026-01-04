'use client';

import { FunnelIcon, XMarkIcon } from '@heroicons/react/24/outline';

interface FilterBarProps {
    categories: string[];
    selectedCategory: string;
    onCategoryChange: (category: string) => void;
    sortOptions?: { label: string; value: string }[];
    selectedSort?: string;
    onSortChange?: (sort: string) => void;
    onClear?: () => void;
    className?: string;
}

export function FilterBar({
    categories,
    selectedCategory,
    onCategoryChange,
    sortOptions = [],
    selectedSort = '',
    onSortChange,
    onClear,
    className = '',
}: FilterBarProps) {
    const hasActiveFilters = selectedCategory !== 'All' || selectedSort !== '';

    return (
        <div className={`flex flex-col gap-4 ${className}`}>
            {/* Category Filters */}
            <div className="flex items-center gap-3 flex-wrap">
                <div className="flex items-center gap-2 text-sm text-neutral-400">
                    <FunnelIcon className="h-4 w-4" />
                    <span className="font-medium">Filter:</span>
                </div>
                <div className="flex flex-wrap gap-2">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => onCategoryChange(category)}
                            className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${selectedCategory === category
                                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/25'
                                    : 'bg-white/5 text-neutral-300 hover:bg-white/10 ring-1 ring-white/10'
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </div>

            {/* Sort Options */}
            {sortOptions.length > 0 && onSortChange && (
                <div className="flex items-center gap-3 flex-wrap">
                    <span className="text-sm font-medium text-neutral-400">Sort by:</span>
                    <div className="flex flex-wrap gap-2">
                        {sortOptions.map((option) => (
                            <button
                                key={option.value}
                                onClick={() => onSortChange(option.value)}
                                className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${selectedSort === option.value
                                        ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/25'
                                        : 'bg-white/5 text-neutral-300 hover:bg-white/10 ring-1 ring-white/10'
                                    }`}
                            >
                                {option.label}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Clear Filters */}
            {hasActiveFilters && onClear && (
                <button
                    onClick={onClear}
                    className="flex items-center gap-2 text-sm text-neutral-400 hover:text-white transition-colors w-fit"
                >
                    <XMarkIcon className="h-4 w-4" />
                    Clear all filters
                </button>
            )}
        </div>
    );
}
