'use client';

import { useState, useEffect, useRef } from 'react';
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';

interface SearchBarProps {
    placeholder?: string;
    onSearch: (query: string) => void;
    suggestions?: string[];
    className?: string;
}

export function SearchBar({
    placeholder = 'Search...',
    onSearch,
    suggestions = [],
    className = ''
}: SearchBarProps) {
    const [query, setQuery] = useState('');
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const inputRef = useRef<HTMLInputElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);

    // Filter suggestions based on query
    const filteredSuggestions = suggestions.filter(item =>
        item.toLowerCase().includes(query.toLowerCase())
    ).slice(0, 5);

    // Debounced search
    useEffect(() => {
        const timer = setTimeout(() => {
            onSearch(query);
        }, 300);

        return () => clearTimeout(timer);
    }, [query, onSearch]);

    // Handle click outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setShowSuggestions(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Keyboard navigation
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (!showSuggestions) return;

        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                setSelectedIndex(prev =>
                    prev < filteredSuggestions.length - 1 ? prev + 1 : prev
                );
                break;
            case 'ArrowUp':
                e.preventDefault();
                setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
                break;
            case 'Enter':
                e.preventDefault();
                if (selectedIndex >= 0) {
                    setQuery(filteredSuggestions[selectedIndex]);
                    setShowSuggestions(false);
                }
                break;
            case 'Escape':
                setShowSuggestions(false);
                setSelectedIndex(-1);
                break;
        }
    };

    const handleClear = () => {
        setQuery('');
        setShowSuggestions(false);
        setSelectedIndex(-1);
        inputRef.current?.focus();
    };

    const handleSuggestionClick = (suggestion: string) => {
        setQuery(suggestion);
        setShowSuggestions(false);
        setSelectedIndex(-1);
    };

    return (
        <div ref={wrapperRef} className={`relative ${className}`}>
            <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                    <MagnifyingGlassIcon className="h-5 w-5 text-neutral-400" />
                </div>
                <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={(e) => {
                        setQuery(e.target.value);
                        setShowSuggestions(true);
                        setSelectedIndex(-1);
                    }}
                    onFocus={() => setShowSuggestions(true)}
                    onKeyDown={handleKeyDown}
                    placeholder={placeholder}
                    className="block w-full rounded-xl border-0 bg-white/5 py-3.5 pl-11 pr-12 text-white placeholder:text-neutral-500 ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 backdrop-blur-sm transition-all sm:text-sm sm:leading-6"
                />
                {query && (
                    <button
                        onClick={handleClear}
                        className="absolute inset-y-0 right-0 flex items-center pr-4 text-neutral-400 hover:text-white transition-colors"
                    >
                        <XMarkIcon className="h-5 w-5" />
                    </button>
                )}
            </div>

            {/* Suggestions Dropdown */}
            {showSuggestions && filteredSuggestions.length > 0 && query && (
                <div className="absolute z-50 mt-2 w-full rounded-xl bg-neutral-900 shadow-2xl ring-1 ring-white/10 backdrop-blur-xl overflow-hidden">
                    <ul className="max-h-60 overflow-auto py-1">
                        {filteredSuggestions.map((suggestion, index) => (
                            <li key={index}>
                                <button
                                    onClick={() => handleSuggestionClick(suggestion)}
                                    className={`w-full text-left px-4 py-3 text-sm transition-colors ${index === selectedIndex
                                            ? 'bg-indigo-600 text-white'
                                            : 'text-neutral-300 hover:bg-white/5'
                                        }`}
                                >
                                    <div className="flex items-center gap-2">
                                        <MagnifyingGlassIcon className="h-4 w-4 flex-shrink-0 text-neutral-500" />
                                        <span className="truncate">{suggestion}</span>
                                    </div>
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
