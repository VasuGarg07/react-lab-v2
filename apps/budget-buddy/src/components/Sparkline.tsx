import { useId } from 'react';

interface SparklineProps {
    data: number[];
    color?: string;
    height?: number;
    className?: string;
    fill?: boolean;
}

/**
 * Dependency-free SVG sparkline with a smooth (Catmull-Rom → bézier) path
 * and an optional gradient area fill. Scales to its container width.
 */
export default function Sparkline({
    data,
    color = '#E4572E',
    height = 56,
    className = '',
    fill = true,
}: SparklineProps) {
    const id = useId();
    const W = 300;
    const H = height;
    const pad = 4;

    if (data.length < 2) {
        return (
            <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" className={`w-full ${className}`} style={{ height }}>
                <line
                    x1={0} y1={H / 2} x2={W} y2={H / 2}
                    stroke={color} strokeWidth={2} strokeOpacity={0.4} strokeDasharray="4 5" strokeLinecap="round"
                />
            </svg>
        );
    }

    const min = Math.min(...data);
    const max = Math.max(...data);
    const span = max - min || 1;

    const pts = data.map((v, i) => {
        const x = (i / (data.length - 1)) * (W - pad * 2) + pad;
        const y = H - pad - ((v - min) / span) * (H - pad * 2);
        return [x, y] as const;
    });

    // Smooth path via Catmull-Rom spline converted to cubic béziers.
    let d = `M ${pts[0][0]} ${pts[0][1]}`;
    for (let i = 0; i < pts.length - 1; i++) {
        const p0 = pts[i - 1] || pts[i];
        const p1 = pts[i];
        const p2 = pts[i + 1];
        const p3 = pts[i + 2] || p2;
        const c1x = p1[0] + (p2[0] - p0[0]) / 6;
        const c1y = p1[1] + (p2[1] - p0[1]) / 6;
        const c2x = p2[0] - (p3[0] - p1[0]) / 6;
        const c2y = p2[1] - (p3[1] - p1[1]) / 6;
        d += ` C ${c1x} ${c1y}, ${c2x} ${c2y}, ${p2[0]} ${p2[1]}`;
    }
    const area = `${d} L ${pts[pts.length - 1][0]} ${H} L ${pts[0][0]} ${H} Z`;

    return (
        <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" className={`w-full ${className}`} style={{ height }}>
            <defs>
                <linearGradient id={`grad-${id}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={color} stopOpacity={0.28} />
                    <stop offset="100%" stopColor={color} stopOpacity={0} />
                </linearGradient>
            </defs>
            {fill && <path d={area} fill={`url(#grad-${id})`} />}
            <path
                d={d}
                fill="none"
                stroke={color}
                strokeWidth={2.5}
                strokeLinecap="round"
                strokeLinejoin="round"
                pathLength={1}
                style={{ strokeDasharray: 1, strokeDashoffset: 1, animation: 'draw 1.1s ease-out forwards' }}
            />
            <circle cx={pts[pts.length - 1][0]} cy={pts[pts.length - 1][1]} r={3} fill={color} />
        </svg>
    );
}
