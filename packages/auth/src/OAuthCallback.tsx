import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { useAuthDispatch } from './useRedux';
import { oauthCallbackThunk } from './authSlice';
import { Loader2 } from 'lucide-react';

export function OAuthCallback() {
    const [searchParams] = useSearchParams();
    const dispatch = useAuthDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const accessToken = searchParams.get('accessToken');
        const refreshToken = searchParams.get('refreshToken');
        const error = searchParams.get('error');

        if (error) {
            navigate('/auth/login?error=oauth_failed', { replace: true });
            return;
        }

        if (!accessToken || !refreshToken) {
            navigate('/auth/login', { replace: true });
            return;
        }

        (dispatch(oauthCallbackThunk({ accessToken, refreshToken }) as any))
            .unwrap()
            .then(() => navigate('/', { replace: true }))
            .catch(() => navigate('/auth/login', { replace: true }));
    }, []);

    return (
        <div className="auth-root flex-1 gap-3">
            <Loader2 className="w-7 h-7 animate-spin" style={{ color: '#1C5D99' }} />
            <p style={{ fontFamily: "'Schibsted Grotesk', sans-serif", color: '#5c6660', fontSize: '14px' }}>
                Signing you in…
            </p>
        </div>
    );
}
