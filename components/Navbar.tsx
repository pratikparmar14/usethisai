'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-neutral-900/80 backdrop-blur-md">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <Link href="/" className="flex items-center gap-2 group">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white font-bold ring-1 ring-white/20 group-hover:bg-indigo-500 transition-colors">
                                AI
                            </div>
                            <span className="text-xl font-bold text-white tracking-tight">UseThisAI</span>
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:block">
                        <div className="flex items-baseline space-x-8">
                            <Link
                                href="/professions"
                                className="text-sm font-medium text-neutral-300 hover:text-white transition-colors"
                            >
                                Professions
                            </Link>
                            <Link
                                href="/tools"
                                className="text-sm font-medium text-neutral-300 hover:text-white transition-colors"
                            >
                                Tools
                            </Link>
                            <a
                                href="mailto:hello@usethisai.com"
                                className="text-sm font-medium text-neutral-300 hover:text-white transition-colors"
                            >
                                Contact
                            </a>
                        </div>
                    </div>

                    {/* Desktop CTA */}
                    <div className="hidden md:block">
                        <Link
                            href="/tools"
                            className="rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white ring-1 ring-white/20 hover:bg-white/20 transition-all"
                        >
                            Explore Tools
                        </Link>
                    </div>

                    {/* Mobile menu button */}
                    <div className="-mr-2 flex md:hidden">
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            type="button"
                            className="inline-flex items-center justify-center rounded-md p-2 text-neutral-400 hover:bg-white/10 hover:text-white focus:outline-none"
                            aria-controls="mobile-menu"
                            aria-expanded="false"
                        >
                            <span className="sr-only">Open main menu</span>
                            {!isMobileMenuOpen ? (
                                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                                </svg>
                            ) : (
                                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden border-t border-white/5 bg-neutral-900" id="mobile-menu">
                    <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                        <Link
                            href="/professions"
                            className="block rounded-md px-3 py-2 text-base font-medium text-neutral-300 hover:bg-white/5 hover:text-white"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            Professions
                        </Link>
                        <Link
                            href="/tools"
                            className="block rounded-md px-3 py-2 text-base font-medium text-neutral-300 hover:bg-white/5 hover:text-white"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            Tools
                        </Link>
                        <a
                            href="mailto:hello@usethisai.com"
                            className="block rounded-md px-3 py-2 text-base font-medium text-neutral-300 hover:bg-white/5 hover:text-white"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            Contact
                        </a>
                    </div>
                </div>
            )}
        </nav>
    );
}
