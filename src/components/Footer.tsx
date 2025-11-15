import { Github, Linkedin, Twitter } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="w-full border-t border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 shadow-sm">
            <div className="container mx-auto px-4 py-3">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
                    <p className="text-xs text-neutral-600 dark:text-neutral-400">
                        © {new Date().getFullYear()} React Lab • Vasu Garg
                    </p>

                    <div className="flex items-center gap-2">
                        <a
                            href="https://github.com/VasuGarg07"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="GitHub"
                            className="group relative p-2 rounded-lg bg-neutral-100 dark:bg-neutral-900 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-all duration-200"
                        >
                            <Github className="w-4 h-4 text-neutral-700 dark:text-neutral-300 group-hover:text-neutral-900 dark:group-hover:text-neutral-100 transition-colors" />
                        </a>

                        <a
                            href="https://linkedin.com/in/vasu-garg-07"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="LinkedIn"
                            className="group relative p-2 rounded-lg bg-neutral-100 dark:bg-neutral-900 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-all duration-200"
                        >
                            <Linkedin className="w-4 h-4 text-neutral-700 dark:text-neutral-300 group-hover:text-neutral-900 dark:group-hover:text-neutral-100 transition-colors" />
                        </a>

                        <a
                            href="https://x.com/_vasugarg_"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="X (Twitter)"
                            className="group relative p-2 rounded-lg bg-neutral-100 dark:bg-neutral-900 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-all duration-200"
                        >
                            <Twitter className="w-4 h-4 text-neutral-700 dark:text-neutral-300 group-hover:text-neutral-900 dark:group-hover:text-neutral-100 transition-colors" />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;