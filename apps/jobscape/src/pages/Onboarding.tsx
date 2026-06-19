import { Link } from 'react-router';
import { ArrowRight, Briefcase, Building2, UserRound } from 'lucide-react';
import { ROUTES } from '../helpers/job.constants';

const PATHS = [
    {
        to: ROUTES.onboardApplicant,
        icon: UserRound,
        eyebrow: 'For candidates',
        title: 'I want to find work',
        copy: 'Build a profile once, then browse roles, apply with a note, and track every application in one place.',
    },
    {
        to: ROUTES.onboardEmployer,
        icon: Building2,
        eyebrow: 'For teams',
        title: 'I want to hire',
        copy: 'Set up your company, post roles in minutes, and review applicants with their resumes side by side.',
    },
];

export default function Onboarding() {
    return (
        <div className="min-h-screen bg-canvas">
            <div className="mx-auto flex max-w-4xl flex-col px-4 py-12 sm:px-6 sm:py-16 fade-up">
                <div className="mb-12 flex items-center gap-2.5">
                    <span className="grid h-9 w-9 place-items-center rounded-xl bg-spruce text-canvas">
                        <Briefcase className="h-4 w-4" strokeWidth={2.25} />
                    </span>
                    <span className="font-display text-lg font-bold tracking-tight text-ink">Jobscape</span>
                </div>

                <h1 className="font-display max-w-2xl text-4xl font-bold leading-[1.05] tracking-tight text-ink sm:text-5xl">
                    Let's set you up.
                </h1>
                <p className="mt-4 max-w-md text-lg text-neutral-500">
                    Two ways in. Pick the one that fits — you can always create the other later from a different account.
                </p>

                <div className="mt-12 grid gap-4 sm:grid-cols-2">
                    {PATHS.map(({ to, icon: Icon, eyebrow, title, copy }) => (
                        <Link
                            key={to}
                            to={to}
                            className="group relative flex flex-col overflow-hidden rounded-3xl border border-neutral-200 bg-white p-7 transition-all duration-200 hover:-translate-y-1 hover:border-spruce-200 hover:shadow-lift"
                        >
                            <span className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-linear-to-r from-spruce to-spruce-300 transition-transform duration-300 group-hover:scale-x-100" />
                            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-spruce-50 text-spruce">
                                <Icon className="h-5 w-5" />
                            </span>
                            <p className="mt-5 text-xs font-bold uppercase tracking-[0.18em] text-spruce">{eyebrow}</p>
                            <h2 className="font-display mt-1 text-xl font-bold text-ink group-hover:text-spruce">{title}</h2>
                            <p className="mt-2 flex-1 text-sm leading-relaxed text-neutral-500">{copy}</p>
                            <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-spruce">
                                Get started
                                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </span>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
