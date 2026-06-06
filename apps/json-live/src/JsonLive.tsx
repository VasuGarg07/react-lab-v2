import { Download, Upload, Link, Wand2, X, Loader2 } from 'lucide-react';
import { useRef, useState } from 'react';
import Breadcrumb from './Breadcrumb';
import { formatJson, downloadFile } from './json.utilities';
import type { JsonValue } from './json.utilities';
import { useFetchJson } from './useFetchJson';
import { useJson } from './JsonContext';
import JsonNode from './JsonNode';
import { GithubIcon, LinkedinIcon, XIcon } from '@react-lab/ui';

const SOCIALS = [
    { href: 'https://github.com/VasuGarg07', icon: GithubIcon, label: 'GitHub' },
    { href: 'https://linkedin.com/in/vasu-garg-07', icon: LinkedinIcon, label: 'LinkedIn' },
    { href: 'https://x.com/_vasugarg_', icon: XIcon, label: 'X (Twitter)' },
];

const iconFilter = 'brightness(0) saturate(100%) invert(98%) sepia(2%) saturate(200%) hue-rotate(200deg) brightness(120%)';

function UrlPanel({ onJsonLoaded, onClose }: { onJsonLoaded: (json: string) => void; onClose: () => void }) {
    const [url, setUrl] = useState('');
    const { isLoading, error, fetchJson, clearError } = useFetchJson();

    const handleSubmit = async () => {
        const data = await fetchJson(url);
        if (data) { onJsonLoaded(data); onClose(); }
    };

    return (
        <div className="shrink-0 border-b border-cyan bg-cyan/20 px-4 py-3 flex flex-col gap-2">
            <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-charcoal/60">Load from URL</span>
                <button onClick={onClose} className="p-1 rounded transition-colors text-charcoal/60 hover:bg-cyan hover:text-charcoal">
                    <X size={14} />
                </button>
            </div>
            <div className="flex flex-col xs:flex-row gap-2">
                <input
                    type="url"
                    value={url}
                    onChange={(e) => { setUrl(e.target.value); clearError(); }}
                    onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                    placeholder="https://api.example.com/data"
                    className="flex-1 min-w-0 px-3 py-1.5 text-sm rounded-md border border-ash/50 bg-white text-charcoal focus:outline-none focus:ring-2 focus:ring-aqua/40 focus:border-aqua placeholder:text-ash"
                    disabled={isLoading}
                    autoFocus
                />
                <div className="flex gap-2 shrink-0">
                    <button
                        onClick={() => { setUrl('https://jsonplaceholder.typicode.com/posts/1'); clearError(); }}
                        className="flex-1 xs:flex-none text-xs px-2 py-1.5 rounded-md border border-ash/50 text-charcoal/70 bg-white hover:bg-cyan transition-colors"
                        disabled={isLoading}
                    >
                        Sample
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={!url.trim() || isLoading}
                        className="flex-1 xs:flex-none flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md bg-aqua text-charcoal hover:opacity-90 transition-opacity disabled:opacity-40"
                    >
                        {isLoading ? <Loader2 size={13} className="animate-spin" /> : null}
                        Fetch
                    </button>
                </div>
            </div>
            {error && <p className="text-xs text-red-600">{error}</p>}
        </div>
    );
}

function ToolBtn({ label, icon, onClick, active }: { label: string; icon: React.ReactNode; onClick: () => void; active?: boolean }) {
    return (
        <button
            onClick={onClick}
            title={label}
            className={`flex items-center gap-1 px-2 sm:px-2.5 py-1 rounded text-xs font-medium border transition-colors ${
                active
                    ? 'border-charcoal bg-charcoal text-white'
                    : 'border-charcoal/30 bg-aqua/0 text-charcoal hover:bg-charcoal/10'
            }`}
        >
            {icon}
            <span className="hidden sm:inline">{label}</span>
        </button>
    );
}

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

    return (
        <div className="h-dvh flex flex-col bg-white">

            {/* Header */}
            <header className="shrink-0 bg-aqua border-b border-aqua">
                <div className="px-4 sm:px-6 h-13 flex items-center justify-between gap-3">
                    <h1 className="text-sm font-bold tracking-tight text-charcoal shrink-0">JSON Live</h1>
                    <div className="flex items-center gap-1.5 flex-wrap">
                        <ToolBtn label="Upload" icon={<Upload size={12} />} onClick={() => fileInputRef.current?.click()} />
                        <ToolBtn label="URL" icon={<Link size={12} />} onClick={() => setShowUrlPanel(v => !v)} active={showUrlPanel} />
                        {jsonString && (
                            <ToolBtn
                                label="Beautify"
                                icon={<Wand2 size={12} />}
                                onClick={() => { const f = formatJson(jsonString); setJsonString(f); parseJson(f); }}
                            />
                        )}
                        {isValidJson && (
                            <button
                                onClick={() => downloadFile(JSON.stringify(parsedJson, null, 2), 'data.json', 'application/json')}
                                title="Download"
                                className="flex items-center gap-1 px-2 sm:px-2.5 py-1 rounded text-xs font-semibold bg-charcoal text-white hover:opacity-90 transition-opacity"
                            >
                                <Download size={12} />
                                <span className="hidden sm:inline">Download</span>
                            </button>
                        )}
                        <input ref={fileInputRef} type="file" accept=".json" onChange={handleFileUpload} className="hidden" />
                    </div>
                </div>
            </header>

            {/* Error banner */}
            {error && (
                <div className="shrink-0 px-4 py-2 text-xs font-medium flex items-center justify-between bg-red-50 text-red-700 border-b border-red-200">
                    {error}
                    <button onClick={() => setError(null)}><X size={13} /></button>
                </div>
            )}

            {/* Split panes */}
            <div className="flex flex-col md:flex-row flex-1 min-h-0">

                {/* Left — editor */}
                <div className="flex flex-col w-full md:w-1/2 h-1/2 md:h-full border-b md:border-b-0 md:border-r border-ash/30 bg-white">
                    <div className="shrink-0 flex items-center px-3 py-1.5 border-b border-cyan/60 bg-cyan/10">
                        <span className="text-[10px] font-bold tracking-widest uppercase text-charcoal/40">JSON Input</span>
                    </div>

                    {showUrlPanel && (
                        <UrlPanel
                            onJsonLoaded={(json) => { setJsonString(json); parseJson(json); setShowUrlPanel(false); }}
                            onClose={() => setShowUrlPanel(false)}
                        />
                    )}

                    <textarea
                        className="flex-1 w-full p-4 bg-transparent resize-none focus:outline-none text-sm leading-relaxed text-charcoal placeholder:text-ash"
                        style={{ fontFamily: "'JetBrains Mono', 'Fira Code', monospace", caretColor: '#94D1BE' }}
                        value={jsonString}
                        onChange={(e) => handleChange(e.target.value)}
                        placeholder={`{\n  "name": "John Doe",\n  "age": 30\n}`}
                        spellCheck={false}
                    />
                </div>

                {/* Right — tree */}
                <div className="flex flex-col w-full md:w-1/2 h-1/2 md:h-full bg-white">
                    {isValidJson && currentJson !== null ? (
                        <>
                            <Breadcrumb />
                            <div className="flex-1 overflow-y-auto">
                                {isLoading ? (
                                    <div className="flex flex-col items-center justify-center h-full gap-2">
                                        <Loader2 size={24} className="animate-spin text-aqua" />
                                        <p className="text-sm text-ash">Processing…</p>
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
                                            <div className="text-center py-8 text-sm text-ash">
                                                <p>Value: <span className="font-mono text-charcoal">{JSON.stringify(currentJson)}</span></p>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </>
                    ) : (
                        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
                            <h3 className="text-base font-semibold mb-1.5 text-charcoal">
                                {error ? 'Invalid JSON' : 'No JSON yet'}
                            </h3>
                            <p className="text-sm leading-relaxed text-ash">
                                {error ? 'Fix the syntax errors on the left.' : 'Paste JSON, upload a file, or load from a URL.'}
                            </p>
                        </div>
                    )}
                </div>

            </div>

            {/* Footer */}
            <footer className="shrink-0 bg-charcoal border-t border-charcoal px-4 sm:px-6 py-2.5 flex items-center justify-between">
                <p className="text-xs text-white/60">© {new Date().getFullYear()} Vasu Garg</p>
                <div className="flex items-center gap-0.5">
                    {SOCIALS.map(({ href, icon, label }) => (
                        <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                            className="w-7 h-7 rounded-md flex items-center justify-center opacity-50 hover:opacity-100 hover:bg-white/10 transition-all"
                        >
                            <img src={icon} alt={label} className="w-3.5 h-3.5" style={{ filter: iconFilter }} />
                        </a>
                    ))}
                </div>
            </footer>

        </div>
    );
}
