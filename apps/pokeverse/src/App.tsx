import { createBrowserRouter, RouterProvider, Navigate, Outlet, useNavigate, useLocation } from 'react-router';
import { Provider } from 'react-redux';
import { QueryClientProvider } from '@tanstack/react-query';
import { ModalProvider } from '@react-lab/ui';
import { queryClient } from '@react-lab/shared';
import { ArrowLeft } from 'lucide-react';
import { GithubIcon, LinkedinIcon, XIcon } from '@react-lab/ui';
import { store } from './store/store';
import Pokeverse from './Pokeverse';
import Pokedex from './Pokedex/Pokedex';
import PokemonDetails from './PokemonDetails/PokemonDetails';
import BattleSimLayout from './BattleSimLayout/BattleSimLayout';
import BattleSetup from './BattleSetup/BattleSetup';
import TeamSelection from './TeamSelection/TeamSelection';
import PrepareBattle from './PrepareBattle/PrepareBattle';
import BattleScreen from './BattleScreen/BattleScreen';

const SOCIALS = [
    { href: 'https://github.com/VasuGarg07', icon: GithubIcon, label: 'GitHub' },
    { href: 'https://linkedin.com/in/vasu-garg-07', icon: LinkedinIcon, label: 'LinkedIn' },
    { href: 'https://x.com/_vasugarg_', icon: XIcon, label: 'X' },
];

const TITLES: Record<string, string> = {
    '/': 'Pokéverse',
    '/pokedex': 'Pokédex',
    '/battle-sim': 'Battle Sim',
    '/battle-sim/team-selection': 'Team Selection',
    '/battle-sim/loading': 'Preparing Battle',
    '/battle-sim/battle': 'Battle',
};

function AppLayout() {
    const navigate = useNavigate();
    const { pathname } = useLocation();

    const isHome = pathname === '/';
    const title = TITLES[pathname] ?? 'Pokéverse';

    return (
        <div className="min-h-screen bg-chalk flex flex-col">

            <header className="sticky top-0 z-20 bg-crimson px-6 py-3.5 flex items-center gap-3 shadow-sm shrink-0">
                {!isHome && (
                    <button
                        onClick={() => navigate(-1)}
                        className="w-8 h-8 flex items-center justify-center rounded-lg text-white/70 hover:text-white hover:bg-white/20 transition-all shrink-0"
                        aria-label="Go back"
                    >
                        <ArrowLeft size={18} />
                    </button>
                )}
                <span className="text-white font-black text-xl tracking-tight flex-1">{title}</span>
                {isHome && (
                    <nav className="flex items-center gap-1">
                        {SOCIALS.map(({ href, icon, label }) => (
                            <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                                className="w-8 h-8 flex items-center justify-center rounded-lg opacity-70 hover:opacity-100 hover:bg-white/20 transition-all">
                                <img src={icon} alt={label} className="w-4 h-4 icon-white" />
                            </a>
                        ))}
                    </nav>
                )}
            </header>

            <main className="flex-1 flex flex-col">
                <Outlet />
            </main>

            <footer className="bg-shadow px-6 py-3.5 flex items-center justify-between text-xs shrink-0">
                <span className="text-silver/60">© {new Date().getFullYear()} Vasu Garg</span>
                <span className="text-silver/60">Data from{' '}
                    <a href="https://pokeapi.co" target="_blank" rel="noopener noreferrer"
                        className="hover:text-azure transition-colors font-semibold">
                        PokéAPI
                    </a>
                </span>
            </footer>
        </div>
    );
}

const router = createBrowserRouter([
    {
        element: <AppLayout />,
        children: [
            { path: '/', element: <Pokeverse /> },
            { path: '/pokedex', element: <Pokedex /> },
            { path: '/pokedex/:id', element: <PokemonDetails /> },
            {
                path: '/battle-sim',
                element: <BattleSimLayout />,
                children: [
                    { index: true, element: <BattleSetup /> },
                    { path: 'team-selection', element: <TeamSelection /> },
                    { path: 'loading', element: <PrepareBattle /> },
                    { path: 'battle', element: <BattleScreen /> },
                ],
            },
            { path: '*', element: <Navigate to="/" replace /> },
        ],
    },
]);

export default function App() {
    return (
        <Provider store={store}>
            <QueryClientProvider client={queryClient}>
                <ModalProvider>
                    <RouterProvider router={router} />
                </ModalProvider>
            </QueryClientProvider>
        </Provider>
    );
}
