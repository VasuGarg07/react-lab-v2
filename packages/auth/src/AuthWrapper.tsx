import { Outlet, useOutletContext } from 'react-router';

interface AuthWrapperProps {
    appName?: string;
}

export interface AuthContext {
    appName: string;
}

export function AuthWrapper({ appName = 'React Lab' }: AuthWrapperProps) {
    return (
        <div className="auth-root flex-1">
            <div className="auth-stage">
                <div className="auth-brand">
                    <div className="auth-brand-mark" aria-hidden="true">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fdfdfb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 3l9 5-9 5-9-5 9-5z" />
                            <path d="M3 13l9 5 9-5" />
                            <path d="M3 17l9 5 9-5" />
                        </svg>
                    </div>
                    <span className="auth-brand-name">{appName}</span>
                </div>

                <main className="auth-card">
                    <Outlet context={{ appName } satisfies AuthContext} />
                </main>

                <p className="auth-foot">© {new Date().getFullYear()} Vasu Garg</p>
            </div>
        </div>
    );
}

export function useAuthContext() {
    return useOutletContext<AuthContext>();
}
