import { Download, Upload, Link, Wand2, X, Loader2 } from 'lucide-react';
import { useRef, useState } from 'react';
import Breadcrumb from './Breadcrumb';
import { formatJson, downloadFile } from './json.utilities';
import type { JsonValue } from './json.utilities';
import { useFetchJson } from './useFetchJson';
import { useJson } from './JsonContext';
import JsonNode from './JsonNode';
import GithubIcon from '../../../packages/ui/icons/github.svg';
import LinkedinIcon from '../../../packages/ui/icons/linkedin.svg';
import XIcon from '../../../packages/ui/icons/x.svg';

const SOCIALS = [
    { href: 'https://github.com/VasuGarg07', icon: GithubIcon, label: 'GitHub' },
    { href: 'https://linkedin.com/in/vasu-garg-07', icon: LinkedinIcon, label: 'LinkedIn' },
    { href: 'https://x.com/_vasugarg_', icon: XIcon, label: 'X (Twitter)' },
];

const iconFilter = 'invert(20%) sepia(0%) brightness(40%)';

// ── Inline URL panel ──────────────────────────────────────────────────────────
function UrlPanel({ onJsonLoaded, onClose }: { onJsonLoaded: (json: string) => void; onClose: () => void }) {
    const [url, setUrl] = useState('');
    const { isLoading, error, fetchJson, clearError } = useFetchJson();

    const handleSubmit = async () => {
        const data = await fetchJson(url);
        if (data) { onJsonLoaded(data); onClose(); }
    };

    return (
        <div className="shrink-0 border-b px-4 py-3 flex flex-col gap-2" style={{ backgroundColor: '#f6f8fa', borderColor: '#d0d7de' }}>
            <div className="flex items-center justify-between">
                <span className="text-xs font-semibold" style={{ color: '#57606a' }}>Load from URL</span>
                <button onClick={onClose} className="p-1 rounded transition-colors" style={{ color: '#57606a' }}
                    onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#eaeef2')}
                    onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
                >
                    <X size={14} />
                </button>
            </div>
            <div className="flex gap-2">
                <input
                    type="url"
                    value={url}
                    onChange={(e) => { setUrl(e.target.value); clearError(); }}
                    onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                    placeholder="https://api.example.com/data"
                    className="flex-1 px-3 py-1.5 text-sm rounded-md border focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500"
                    style={{ borderColor: '#d0d7de', backgroundColor: '#ffffff', color: '#24292f' }}
                    disabled={isLoading}
                    autoFocus
                />
                <button
                    onClick={() => { setUrl('https://jsonplaceholder.typicode.com/posts/1'); clearError(); }}
                    className="text-xs px-2 py-1.5 rounded-md border transition-colors"
                    style={{ borderColor: '#d0d7de', color: '#57606a', backgroundColor: '#ffffff' }}
                    onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#f6f8fa')}
                    onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#ffffff')}
                    disabled={isLoading}
                >
                    Sample
                </button>
                <button
                    onClick={handleSubmit}
                    disabled={!url.trim() || isLoading}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md text-white transition-colors disabled:opacity-50"
                    style={{ backgroundColor: '#0969da' }}
                    onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#0860c4')}
                    onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#0969da')}
                >
                    {isLoading ? <Loader2 size={13} className="animate-spin" /> : null}
                    Fetch
                </button>
            </div>
            {error && <p className="text-xs" style={{ color: '#cf222e' }}>{error}</p>}
        </div>
    );
}

// ── Main ──────────────────────────────────────────────────────────────────────
export default function JsonLive() {
    const { state, dispatch } = useJson();
    const { parsedJson, currentPath } = state;

    const [jsonString, setJsonString] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [showUrlPanel, setShowUrlPanel] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const parseJson = (input: string) => {
        if (!input.trim()) { dispatch({ type: 'SET_JSON', payload: null }); setError(null); return; }
        try { dispatch({ type: 'SET_JSON', payload: JSON.parse(input) }); setError(null); }
        catch { dispatch({ type: 'SET_JSON', payload: null }); setError('Invalid JSON'); }
    };

    const handleChange = (value: string) => { setJsonString(value); parseJson(value); };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        e.target.value = '';
        if (file.size > 2 * 1024 * 1024) { setError('File too large (max 2 MB)'); return; }
        if (!file.name.endsWith('.json')) { setError('Please select a .json file'); return; }
        setIsLoading(true);
        const reader = new FileReader();
        reader.onload = (ev) => { const c = ev.target?.result as string; if (c) { setJsonString(c); parseJson(c); } setIsLoading(false); };
        reader.onerror = () => { setError('Failed to read file'); setIsLoading(false); };
        reader.readAsText(file);
    };

    const getCurrentJson = (): JsonValue | null => {
        if (!parsedJson) return null;
        let current: JsonValue = parsedJson;
        for (const segment of currentPath) {
            if (current !== null && typeof current === 'object') {
                if (Array.isArray(current) && !isNaN(Number(segment))) current = current[Number(segment)];
                else if (!Array.isArray(current) && segment in current) current = (current as Record<string, JsonValue>)[segment];
                else return null;
            } else return null;
        }
        return current;
    };

    const currentJson = getCurrentJson();
    const isValidJson = parsedJson !== null;

    const toolbarBtn = (label: string, icon: React.ReactNode, onClick: () => void, opts?: { color?: string; bg?: string; active?: boolean }) => (
        <button
            onClick={onClick}
            className="flex items-center gap-1 px-2.5 py-1 rounded text-xs font-medium border transition-colors"
            style={{
                borderColor: opts?.active ? '#0969da' : '#d0d7de',
                color: opts?.color ?? '#24292f',
                backgroundColor: opts?.bg ?? '#ffffff',
            }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#f6f8fa')}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = opts?.bg ?? '#ffffff')}
        >
            {icon} {label}
        </button>
    );

    return (
        <div className="h-dvh flex flex-col" style={{ backgroundColor: '#f6f8fa' }}>

            {/* Header — branding left, actions right */}
            <header className="shrink-0 border-b" style={{ backgroundColor: '#ffffff', borderColor: '#d0d7de' }}>
                <div className="px-4 sm:px-6 h-13 flex items-center justify-between gap-3">
                    <div className="flex items-baseline gap-2 shrink-0">
                        <span className="text-[10px] font-semibold tracking-[0.2em] uppercase" style={{ color: '#8c959f' }}>React Lab</span>
                        <span style={{ color: '#d0d7de' }}>·</span>
                        <h1 className="text-sm font-bold" style={{ color: '#24292f' }}>JSON Live</h1>
                    </div>
                    <div className="flex items-center gap-1.5 flex-wrap">
                        {toolbarBtn('Upload', <Upload size={12} />, () => fileInputRef.current?.click())}
                        {toolbarBtn('URL', <Link size={12} />, () => setShowUrlPanel(v => !v), { active: showUrlPanel, color: showUrlPanel ? '#0969da' : '#24292f' })}
                        {jsonString && toolbarBtn('Beautify', <Wand2 size={12} />, () => { const f = formatJson(jsonString); setJsonString(f); parseJson(f); })}
                        {isValidJson && (
                            <button
                                onClick={() => downloadFile(JSON.stringify(parsedJson, null, 2), 'data.json', 'application/json')}
                                className="flex items-center gap-1 px-2.5 py-1 rounded text-xs font-semibold text-white transition-colors"
                                style={{ backgroundColor: '#1a7f37' }}
                                onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#116329')}
                                onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#1a7f37')}
                            >
                                <Download size={12} /> Download
                            </button>
                        )}
                        <input ref={fileInputRef} type="file" accept=".json" onChange={handleFileUpload} className="hidden" />
                    </div>
                </div>
            </header>

            {/* Error banner */}
            {error && (
                <div className="shrink-0 px-4 py-2 text-xs font-medium flex items-center justify-between" style={{ backgroundColor: '#ffebe9', color: '#cf222e', borderBottom: '1px solid #ffcecb' }}>
                    {error}
                    <button onClick={() => setError(null)}><X size={13} /></button>
                </div>
            )}

            {/* Split panes */}
            <div className="flex flex-col md:flex-row flex-1 min-h-0">

                {/* Left — editor */}
                <div className="flex flex-col w-full md:w-1/2 h-1/2 md:h-full border-b md:border-b-0 md:border-r" style={{ borderColor: '#d0d7de', backgroundColor: '#ffffff' }}>
                    <div className="shrink-0 flex items-center px-3 py-1.5 border-b" style={{ borderColor: '#eaeef2', backgroundColor: '#f6f8fa' }}>
                        <span className="text-[10px] font-bold tracking-widest uppercase" style={{ color: '#8c959f' }}>JSON Input</span>
                    </div>

                    {showUrlPanel && (
                        <UrlPanel
                            onJsonLoaded={(json) => { setJsonString(json); parseJson(json); setShowUrlPanel(false); }}
                            onClose={() => setShowUrlPanel(false)}
                        />
                    )}

                    <textarea
                        className="flex-1 w-full p-4 bg-transparent resize-none focus:outline-none text-sm leading-relaxed"
                        style={{ fontFamily: "'JetBrains Mono', 'Fira Code', monospace", color: '#24292f', border: 'none', caretColor: '#0969da' }}
                        value={jsonString}
                        onChange={(e) => handleChange(e.target.value)}
                        placeholder={`{\n  "name": "John Doe",\n  "age": 30\n}`}
                        spellCheck={false}
                    />
                </div>

                {/* Right — tree */}
                <div className="flex flex-col w-full md:w-1/2 h-1/2 md:h-full" style={{ backgroundColor: '#ffffff' }}>
                    {isValidJson && currentJson !== null ? (
                        <>
                            <Breadcrumb />
                            <div className="flex-1 overflow-y-auto">
                                {isLoading ? (
                                    <div className="flex flex-col items-center justify-center h-full gap-2">
                                        <Loader2 size={24} className="animate-spin" style={{ color: '#0969da' }} />
                                        <p className="text-sm" style={{ color: '#57606a' }}>Processing…</p>
                                    </div>
                                ) : (
                                    <div className="p-4" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                                        {typeof currentJson === 'object' && currentJson !== null ? (
                                            Object.entries(currentJson).map(([key, value], index) => (
                                                <JsonNode
                                                    key={Array.isArray(currentJson) ? `${index}` : key}
                                                    label={Array.isArray(currentJson) ? `${index}` : key}
                                                    value={value}
                                                    depth={0}
                                                    path={currentPath}
                                                />
                                            ))
                                        ) : (
                                            <div className="text-center py-8 text-sm" style={{ color: '#57606a' }}>
                                                <p>Value: <span style={{ fontFamily: 'monospace' }}>{JSON.stringify(currentJson)}</span></p>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </>
                    ) : (
                        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
                            <h3 className="text-base font-semibold mb-1.5" style={{ color: '#24292f' }}>
                                {error ? 'Invalid JSON' : 'No JSON yet'}
                            </h3>
                            <p className="text-sm leading-relaxed" style={{ color: '#57606a' }}>
                                {error ? 'Fix the syntax errors on the left.' : 'Paste JSON, upload a file, or load from a URL.'}
                            </p>
                        </div>
                    )}
                </div>

            </div>

            {/* Footer — copyright left, socials right */}
            <footer className="shrink-0 border-t px-4 sm:px-6 py-2.5 flex items-center justify-between" style={{ backgroundColor: '#f6f8fa', borderColor: '#d0d7de' }}>
                <p className="text-xs" style={{ color: '#8c959f' }}>© {new Date().getFullYear()} Vasu Garg · React Lab</p>
                <div className="flex items-center gap-0.5">
                    {SOCIALS.map(({ href, icon, label }) => (
                        <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                            className="w-7 h-7 rounded-md flex items-center justify-center transition-all duration-150"
                            style={{ opacity: 0.4 }}
                            onMouseEnter={e => { e.currentTarget.style.opacity = '0.9'; e.currentTarget.style.backgroundColor = '#eaeef2'; }}
                            onMouseLeave={e => { e.currentTarget.style.opacity = '0.4'; e.currentTarget.style.backgroundColor = 'transparent'; }}
                        >
                            <img src={icon} alt={label} className="w-3.5 h-3.5" style={{ filter: iconFilter }} />
                        </a>
                    ))}
                </div>
            </footer>

        </div>
    );
}
