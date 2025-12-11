'use client';

import React, { useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

interface FAQ {
    q: string;
    a: string;
}

interface FAQSectionProps {
    faqs: FAQ[];
}

export function FAQSection({ faqs }: FAQSectionProps) {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <div className="divide-y divide-white/10 rounded-2xl border border-white/10 bg-white/5 overflow-hidden backdrop-blur-sm">
            {faqs.map((faq, index) => (
                <div
                    key={index}
                    className="cursor-pointer transition-colors hover:bg-white/5"
                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                >
                    <button className="w-full px-6 py-6 text-left flex items-start justify-between gap-4">
                        <h3 className="text-lg font-semibold text-white text-left group-hover:text-indigo-300 transition-colors">
                            {faq.q}
                        </h3>
                        <ChevronDownIcon
                            className={`h-6 w-6 text-neutral-400 flex-shrink-0 transition-transform duration-300 ${openIndex === index ? 'rotate-180 text-indigo-400' : ''
                                }`}
                        />
                    </button>
                    {openIndex === index && (
                        <div className="px-6 pb-6 animate-fade-in">
                            <p className="text-neutral-300 leading-7">
                                {faq.a}
                            </p>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}
