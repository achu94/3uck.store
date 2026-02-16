"use client";

import Link from "next/link";
import { Box, Mail } from "lucide-react";

export function FooterSection() {
    return (
        <footer className="container mx-auto px-6 py-12 border-t bg-muted/30">
            <div className="mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <Box className="w-6 h-6" />
                            <span className="font-bold text-lg">
                                3uck.store
                            </span>
                        </div>
                        <p className="text-muted-foreground max-w-sm">
                            Deine Plattform für 3D-Designer und 3D-Drucker. Noch
                            in Entwicklung.
                        </p>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-4">Roadmap</h4>
                        <ul className="space-y-2 text-muted-foreground">
                            <li>
                                <Link
                                    href="#roadmap"
                                    className="hover:text-foreground transition-colors"
                                >
                                    Roadmap 2025
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="https://dev.3uck.store"
                                    className="hover:text-foreground transition-colors"
                                >
                                    Development Stage
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#"
                                    className="hover:text-foreground transition-colors"
                                >
                                    FAQ
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-4">Rechtliches</h4>
                        <ul className="space-y-2 text-muted-foreground">
                            <li>
                                <Link
                                    href="#"
                                    className="hover:text-foreground transition-colors"
                                >
                                    Datenschutz
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#"
                                    className="hover:text-foreground transition-colors"
                                >
                                    AGB
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#"
                                    className="hover:text-foreground transition-colors"
                                >
                                    Impressum
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="pt-8 border-t flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
                    <p>
                        © {new Date().getFullYear()} 3uck.store – In Entwicklung
                    </p>
                    <div className="flex items-center gap-4">
                        <Link
                            href="mailto:hello@3uck.store"
                            className="hover:text-foreground transition-colors flex items-center gap-2"
                        >
                            <Mail className="w-4 h-4" />
                            <span>Kontakt</span>
                        </Link>
                        <Link
                            href="https://github.com/achu94/3uck.store"
                            className="hover:text-foreground transition-colors flex items-center gap-2"
                        >
                            <GitHubIcon className="w-4 h-4" />
                            <span>GitHub</span>
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}

// GitHub Icon Component
function GitHubIcon({ className }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207-12.998 1.448-4.425 1.354-2.191-1.517-1.735a1.462 1.462 0 0 0-1.032-.425c-.024-.394-.032-.786-.032-1.18 0-2.648 1.374-4.86 4.008-8.432.608-3.405 1.735-4.582 4.425-8.432-1.033-3.384-4.425-2.777-8.432-2.514-5.864-4.425-8.432-6.926-6.828-2.777-8.432-3.362-5.864-4.425-8.432-6.236-3.051-4.425-2.948-8.432-3.362-5.864-4.425-8.432-6.926-6.828-2.777-8.432-3.362-5.864-4.425-8.432zm-9.914 0c-.627 0-1.135-.508-1.135-1.135v-6.327c0-.627.508-1.135 1.135-1.135h1.728c-.347 0-.654.183-.894.446l-2.318 2.318c-.263.263-.446.613-.446 1.005v1.728c0 .627-.508 1.135-1.135 1.135h-1.728c-.347 0-.654.183-.894.446l-2.318-2.318c-.263-.263-.446-.613-.446-1.005v-1.728c0-.627.508-1.135-1.135-1.135h-1.728c-.347 0-.654.183-.894.446l-2.318-2.318c-.263-.263-.446-.613-.446-1.005v-1.728c0-.627.508-1.135-1.135-1.135h1.728c.347 0 .654.183.894-.446l2.318 2.318c.263.263.446.613.446 1.005v1.728c0 .627.508 1.135 1.135 1.135h1.728c.347 0 .654.183.894-.446l2.318-2.318c.263-.263.446-.613.446-1.005v-1.728c0-.627.508-1.135-1.135-1.135z" />
        </svg>
    );
}
