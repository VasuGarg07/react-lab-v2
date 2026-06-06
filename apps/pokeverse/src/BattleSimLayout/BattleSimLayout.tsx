import { Outlet, useLocation, useNavigate, Navigate } from 'react-router';
import { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../store/useRedux';
import { useModal } from '@react-lab/ui';
import ContinueBattleDialog from './ContinueBattleDialog';
import { isInitialBattleState, loadBattleState } from '../store/battleSlice';

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

        hasShownDialog.current = true;
        modal.open(
            <ContinueBattleDialog onContinue={(path) => navigate(path)} />
        );
    }, [battleState.phase, modal, navigate]);

    const path = location.pathname;
    const isBattleRoute = path.startsWith('/battle-sim/battle');
    const inBattlePhase = battleState.phase === 'BATTLE' || battleState.phase === 'ENDED';
    const teamsLoaded = battleState.players.every(p => p.team && p.team.length > 0);

    if (isBattleRoute && (!inBattlePhase || !teamsLoaded)) {
        let redirect = '/battle-sim';
        try {
            const savedRaw = localStorage.getItem(BATTLE_STORAGE_KEY);
            if (savedRaw) {
                const saved = JSON.parse(savedRaw);
                switch (saved.phase) {
                    case 'TEAM_SELECTION': redirect = '/battle-sim/team-selection'; break;
                    case 'LOADING': redirect = '/battle-sim/loading'; break;
                    case 'BATTLE': redirect = '/battle-sim/loading'; break;
                    default: redirect = '/battle-sim';
                }
            }
        } catch (err) {
            console.error('Something bad happened: ', err);
        }
        return <Navigate to={redirect} replace />;
    }

    return <Outlet />;
}
