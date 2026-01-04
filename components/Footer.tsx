import Link from 'next/link';
import Image from 'next/image';

export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="border-t border-white/5 bg-black/20 backdrop-blur-sm mt-auto">
            <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="col-span-1 md:col-span-2">
                        <Link href="/" className="flex items-center gap-2 mb-4">
                            <div className="relative h-8 w-8">
                                <Image
                                    src="/logo.png"
                                    alt="UseThisAI Logo"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                            <span className="text-xl font-bold text-white tracking-tight">UseThisAI</span>
                        </Link>
                        <p className="text-sm leading-6 text-neutral-400 max-w-sm">
                            Helping professionals find the best AI tools to automate their workflows and boost productivity.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold leading-6 text-white">Navigation</h3>
                        <ul className="mt-6 space-y-4">
                            <li>
                                <Link href="/professions" className="text-sm leading-6 text-neutral-400 hover:text-white transition-colors">
                                    Professions
                                </Link>
                            </li>
                            <li>
                                <Link href="/tools" className="text-sm leading-6 text-neutral-400 hover:text-white transition-colors">
                                    All Tools
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold leading-6 text-white">Legal</h3>
                        <ul className="mt-6 space-y-4">
                            <li>
                                <Link href="/privacy" className="text-sm leading-6 text-neutral-400 hover:text-white transition-colors">
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link href="/terms" className="text-sm leading-6 text-neutral-400 hover:text-white transition-colors">
                                    Terms of Service
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mt-16 border-t border-white/5 pt-8 sm:mt-20 lg:mt-24">
                    <p className="text-xs leading-5 text-neutral-500">
                        &copy; {currentYear} UseThisAI. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
