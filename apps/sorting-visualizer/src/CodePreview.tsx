import type { AlgoInfo } from './algorithms.data';

type TokenType = 'keyword' | 'number' | 'comment' | 'string' | 'plain';
type Token = { type: TokenType; text: string };

const KEYWORDS = new Set([
    'function', 'return', 'const', 'let', 'var', 'for', 'while',
    'if', 'else', 'of', 'in', 'new', 'true', 'false', 'null',
]);

function tokenize(line: string): Token[] {
    const tokens: Token[] = [];
    const re = /(\/\/.*$)|("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`)|([A-Za-z_$][A-Za-z0-9_$]*)|(\d+(?:\.\d+)?)|([^\w\s]|\s+)/g;
    let m: RegExpExecArray | null;
    while ((m = re.exec(line)) !== null) {
        if (m[1])      tokens.push({ type: 'comment', text: m[1] });
        else if (m[2]) tokens.push({ type: 'string',  text: m[2] });
        else if (m[3]) tokens.push({ type: KEYWORDS.has(m[3]) ? 'keyword' : 'plain', text: m[3] });
        else if (m[4]) tokens.push({ type: 'number',  text: m[4] });
        else           tokens.push({ type: 'plain',   text: m[5] });
    }
    return tokens;
}

const TOKEN_COLOR: Record<TokenType, string> = {
    keyword: '#c792ea',
    number:  '#f78c6c',
    string:  '#c3e88d',
    comment: '#546e7a',
    plain:   '#cdd6f4',
};

const complexityColor = (c: string): string => {
    if (c.includes('n²'))                      return '#f28b82';
    if (c.includes('n log n') || c === 'O(n)') return '#81c995';
    if (c === 'O(1)' || c === 'O(log n)')      return '#78dcca';
    return '#aecbfa';
};

const extractFilename = (code: string): string => {
    const m = code.match(/function\s+([A-Za-z_$][A-Za-z0-9_$]*)/);
    return m ? `${m[1]}.js` : 'algorithm.js';
};

const TD_STYLE: React.CSSProperties = { paddingTop: 0, paddingBottom: 0 };

export default function CodePreview({ info }: { info: AlgoInfo }) {
    const lines = info.code.split('\n');
    const filename = extractFilename(info.code);

    return (
        <div
            className="rounded-xl overflow-hidden shadow-sm border border-neutral-200 dark:border-neutral-800"
            style={{ backgroundColor: '#1e1e2e' }}
        >
            {/* Title bar */}
            <div
                className="flex items-center px-4 py-2.5"
                style={{
                    background: 'linear-gradient(180deg, #313244 0%, #292938 100%)',
                    borderBottom: '1px solid rgba(255,255,255,0.06)',
                }}
            >
                <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#FF5F57' }} />
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#FEBC2E' }} />
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#28C840' }} />
                </div>
                <div className="flex-1 text-center">
                    <span className="text-xs font-medium" style={{ color: '#585b70' }}>{filename}</span>
                </div>
                <div className="w-13.5" />
            </div>

            {/* Code area */}
            <div className="overflow-x-auto">
                <table
                    className="w-full border-collapse"
                    style={{ fontFamily: "'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace", fontSize: '12.5px', lineHeight: '1.7' }}
                >
                    <tbody>
                        {lines.map((line, i) => (
                            <tr key={i}>
                                <td
                                    className="select-none text-right px-4"
                                    style={{ ...TD_STYLE, color: '#45475a', width: '1%', whiteSpace: 'nowrap', verticalAlign: 'top', userSelect: 'none' }}
                                >
                                    {i + 1}
                                </td>
                                <td className="pr-6" style={{ ...TD_STYLE, whiteSpace: 'pre' }}>
                                    {tokenize(line).map((tok, j) => (
                                        <span key={j} style={{ color: TOKEN_COLOR[tok.type] }}>{tok.text}</span>
                                    ))}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Status bar */}
            <div
                className="flex items-center gap-5 px-4 py-2"
                style={{
                    background: 'linear-gradient(180deg, #181825 0%, #11111b 100%)',
                    borderTop: '1px solid rgba(255,255,255,0.05)',
                }}
            >
                {[
                    { label: 'Time',  value: info.timeComplexity },
                    { label: 'Space', value: info.spaceComplexity },
                ].map(({ label, value }) => (
                    <div key={label} className="flex items-center gap-1.5">
                        <span style={{ color: '#45475a', fontSize: '11px', fontFamily: 'monospace' }}>{label}</span>
                        <span style={{ color: complexityColor(value), fontSize: '11px', fontFamily: 'monospace', fontWeight: 600 }}>{value}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
