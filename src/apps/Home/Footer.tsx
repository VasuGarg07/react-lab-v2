import React from 'react';
import { Github, Linkedin } from 'lucide-react';
import ThemeToggle from '@/styles/ThemeToggle';

const Footer: React.FC = () => {
    return (
        <footer className="w-full border-t border-neutral-200 dark:border-neutral-800 backdrop-blur-lg bg-white/80 dark:bg-neutral-900/80">
            <div className="container mx-auto px-4 py-4">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                    {/* Copyright */}
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                        © {new Date().getFullYear()} React Lab • Made by Vasu Garg
                    </p>

                    {/* Social Links */}
                    <div className="flex items-center space-x-3">
                        {/* Theme Toggle */}
                        <ThemeToggle size={18} />

                        {/* GitHub Link */}
                        <SocialButton
                            href="https://github.com/VasuGarg07"
                            aria-label="GitHub Profile"
                        >
                            <Github size={18} />
                        </SocialButton>

                        {/* LinkedIn Link */}
                        <SocialButton
                            href="https://linkedin.com/in/vasu-garg-07"
                            aria-label="LinkedIn Profile"
                        >
                            <Linkedin size={18} />
                        </SocialButton>
                    </div>
                </div>
            </div>
        </footer>
    );
};

// Reusable Social Button Component
const SocialButton: React.FC<{
    href: string;
    'aria-label': string;
    children: React.ReactNode;
}> = ({ href, 'aria-label': ariaLabel, children }) => {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={ariaLabel}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-neutral-100 dark:bg-neutral-800 transition-all duration-300 hover:bg-neutral-200 dark:hover:bg-neutral-700 hover:scale-105 focus:outline-none"
        >
            <span className="text-neutral-900 dark:text-neutral-50">{children}</span>
        </a>
    );
};

export default Footer;