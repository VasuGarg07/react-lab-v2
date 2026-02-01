type TextWindowProps = {
  lines: string[];
  lineStarts: number[];
  activeLine: number;
  cursor: number;
  typed: string[];
  expected: string;
  windowSize?: number;
};

export function TextWindow({
  lines,
  lineStarts,
  activeLine,
  cursor,
  typed,
  expected,
  windowSize = 7,
}: TextWindowProps) {
  const visibleLines = lines.slice(activeLine, activeLine + windowSize);

  return (
    <div className="font-mono text-[18px] sm:text-[20px] md:text-[22px] tracking-[0.06em] leading-[1.6] text-slate-700 dark:text-slate-300">
      {visibleLines.map((line, offset) => {
        const lineIndex = activeLine + offset;
        const lineStart = lineStarts[lineIndex] ?? 0;

        return (
          <div
            key={lineIndex}
            className="border-b border-slate-200/60 dark:border-slate-700/60 py-1.5 last:border-b-0"
          >
            {Array.from(line).map((char, charIndex) => {
              const globalIndex = lineStart + charIndex;
              const typedChar = typed[globalIndex] ?? "";
              const hasTyped = typedChar.length > 0;
              const isCorrect = hasTyped && typedChar === expected[globalIndex];
              const isWrong = hasTyped && typedChar !== expected[globalIndex];
              const isCursor = globalIndex === cursor;

              // Display non-breaking space for spaces
              const displayChar = char === " " ? "\u00A0" : char;

              // Build class names
              let className = "inline-block align-baseline rounded-lg px-[5px] py-px mx-px transition-colors duration-100";
              
              if (isCorrect) {
                className += " bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-300";
              } else if (isWrong) {
                className += " bg-rose-100 dark:bg-rose-900/40 text-rose-800 dark:text-rose-300";
              } else {
                className += " text-slate-700 dark:text-slate-300";
              }

              // Cursor indicator
              if (isCursor) {
                className += " border-b-[4px] border-blue-600 dark:border-blue-400 rounded-none pb-0";
              }

              return (
                <span key={globalIndex} className={className}>
                  {displayChar}
                </span>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}