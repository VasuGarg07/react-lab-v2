import { createBrowserRouter, RouterProvider, Navigate } from 'react-router';
import { Provider } from 'react-redux';
import { QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider, Layout, ModalProvider } from '@react-lab/ui';
import { queryClient } from '@react-lab/shared';
import { store } from './store/store';
import Pokeverse from './Pokeverse';
import Pokedex from './Pokedex/Pokedex';
import PokemonDetails from './PokemonDetails/PokemonDetails';
import BattleSimLayout from './BattleSimLayout/BattleSimLayout';
import BattleSetup from './BattleSetup/BattleSetup';
import TeamSelection from './TeamSelection/TeamSelection';
import PrepareBattle from './PrepareBattle/PrepareBattle';
import BattleScreen from './BattleScreen/BattleScreen';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Navigate to="/pokeverse" replace />,
    },
    {
        path: '/pokeverse',
        children: [
            { index: true, element: <Pokeverse /> },
            { path: 'pokedex', element: <Pokedex /> },
            { path: 'pokedex/:id', element: <PokemonDetails /> },
            {
                path: 'battle-sim',
                element: <BattleSimLayout />,
                children: [
                    { index: true, element: <BattleSetup /> },
                    { path: 'team-selection', element: <TeamSelection /> },
                    { path: 'loading', element: <PrepareBattle /> },
                    { path: 'battle', element: <BattleScreen /> },
                ]
            }
        ]
    },
    {
        path: '*',
        element: <Navigate to="/pokeverse" replace />,
    },
]);

export default function App() {
    return (
        <Provider store={store}>
            <QueryClientProvider client={queryClient}>
                <ThemeProvider>
                    <ModalProvider>
                        <Layout>
                            <RouterProvider router={router} />
                        </Layout>
                    </ModalProvider>
                </ThemeProvider>
            </QueryClientProvider>
        </Provider>
    );
}
