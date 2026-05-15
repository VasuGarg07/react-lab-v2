import { Outlet, useLocation, useNavigate, Navigate } from 'react-router';
import { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/useRedux';
import { useModal } from '../../../components/ModalContext';
import ContinueBattleDialog from './ContinueBattleDialog';
import { isInitialBattleState, loadBattleState } from '../../../store/battleSlice';

const BATTLE_STORAGE_KEY = 'battleState';

export default function BattleSimLayout() {
    const dispatch = useAppDispatch();
    const battleState = useAppSelector(state => state.battle);
    const modal = useModal();
    const navigate = useNavigate();
    const location = useLocation();

    const hadSavedOnMount = useRef(false);
    const hasShownDialog = useRef(false);

    useEffect(() => {
        hadSavedOnMount.current = !!localStorage.getItem(BATTLE_STORAGE_KEY);

        if (hadSavedOnMount.current && isInitialBattleState(battleState)) {
            dispatch(loadBattleState());
        }
    }, [dispatch]);

    useEffect(() => {
        if (!hadSavedOnMount.current) return;
        if (hasShownDialog.current) return;
        if (isInitialBattleState(battleState)) return;
        if (battleState.phase === 'SETUP') return;

        hasShownDialog.current = true; // set before open to block any re-entry
        modal.open(
            <ContinueBattleDialog
                onContinue={(path) => navigate(path)}
            />
        );
    }, [battleState.phase, modal, navigate]);

    const path = location.pathname;
    const isBattleRoute = path.startsWith('/pokeverse/battle-sim/battle');

    const inBattlePhase = battleState.phase === 'BATTLE' || battleState.phase === 'ENDED';
    const teamsLoaded = battleState.players.every(
        p => p.team && p.team.length > 0
    );

    if (isBattleRoute && (!inBattlePhase || !teamsLoaded)) {
        let redirect = '/pokeverse/battle-sim'; // default fallback

        try {
            const savedRaw = localStorage.getItem(BATTLE_STORAGE_KEY);
            if (savedRaw) {
                const saved = JSON.parse(savedRaw);
                switch (saved.phase) {
                    case 'TEAM_SELECTION':
                        redirect = '/pokeverse/battle-sim/team-selection';
                        break;
                    case 'LOADING':
                        redirect = '/pokeverse/battle-sim/loading';
                        break;
                    case 'BATTLE':
                        redirect = '/pokeverse/battle-sim/loading';
                        break;
                    default:
                        redirect = '/pokeverse/battle-sim';
                }
            }
        } catch (err) {
            console.error("Something bad happened: ", err)
        }

        return <Navigate to={redirect} replace />;
    }

    return <Outlet />;
}
