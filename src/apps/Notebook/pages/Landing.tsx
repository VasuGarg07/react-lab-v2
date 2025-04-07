import { Link } from "react-router";
import { ArrowRight } from "lucide-react";

const features = [
    "Create multiple notebooks",
    "Organize chapters with structure",
    "Private, public, or password-protected",
    "Export your notes as JSON or Markdown",
];

const Landing: React.FC = () => {
    return (
        <div className="max-w-4xl mx-auto w-full text-center py-12 px-4 space-y-10 relative">
            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-600 to-fuchsia-500 text-transparent bg-clip-text">
                Welcome to Archivra
            </h1>

            {/* Subtext */}
            <p className="text-lg text-zinc-600 dark:text-zinc-300 max-w-2xl mx-auto">
                Your personal space to write freely and organize your thoughts — one notebook, one chapter at a time.
            </p>

            {/* Feature List */}
            <ul className="text-zinc-700 dark:text-zinc-300 grid sm:grid-cols-2 gap-4 text-left max-w-2xl mx-auto">
                {features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm">
                        <span className="text-fuchsia-500 mt-[2px]">✔</span>
                        {feature}
                    </li>
                ))}
            </ul>

            {/* CTA */}
            <div>
                <Link
                    to="my"
                    className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 dark:bg-fuchsia-600 dark:hover:bg-fuchsia-700 text-white px-6 py-3 rounded-lg font-medium transition"
                >
                    Go to My Notebooks <ArrowRight size={18} />
                </Link>
            </div>
        </div>
    );
};

export default Landing;
