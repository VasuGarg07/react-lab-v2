import { Download, Link } from 'lucide-react';
import { useState } from 'react';
import Breadcrumb from './Breadcrumb';
import { formatJson, downloadFile } from './json.utilities';
import type { JsonValue } from './json.utilities';
import JsonUpload from './JsonUpload';
import UrlFetchDialog from './UrlFetchDialog';
import { useAppDispatch, useAppSelector } from './store/useRedux';
import { useModal } from '@react-lab/ui';
import { setParsedJson } from './store/jsonViewerSlice';
import JsonNode from './JsonNode';

export default function JsonLive() {
    const modal = useModal();
    const dispatch = useAppDispatch();
    const { parsedJson, currentPath } = useAppSelector((state) => state.jsonViewer);

    const [jsonString, setJsonString] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const parseJson = (input: string) => {
        if (!input.trim()) {
            dispatch(setParsedJson(null));
            setError(null);
            return;
        }
        try {
            dispatch(setParsedJson(JSON.parse(input)));
            setError(null);
        } catch {
            dispatch(setParsedJson(null));
            setError('Invalid JSON format');
        }
    };

    const handleJsonStringChange = (value: string) => {
        setJsonString(value);
        parseJson(value);
    };

    const getCurrentJson = (): JsonValue | null => {
        if (!parsedJson) return null;
        let current: JsonValue = parsedJson;
        for (const segment of currentPath) {
            if (current !== null && typeof current === 'object') {
                if (Array.isArray(current) && !isNaN(Number(segment))) {
                    current = current[Number(segment)];
                } else if (!Array.isArray(current) && segment in current) {
                    current = (current as Record<string, JsonValue>)[segment];
                } else {
                    return null;
                }
            } else {
                return null;
            }
        }
        return current;
    };

    const handleJsonLoaded = (json: string) => {
        setJsonString(json);
        parseJson(json);
    };

    const currentJson = getCurrentJson();
    const isValidJson = parsedJson !== null;

    return (
        <div className="w-full h-[calc(100vh-120px)] flex flex-col">
            {error && (
                <div className="mx-4 mt-3 mb-0 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-sm text-red-700 dark:text-red-400 px-4 py-2 rounded-lg shrink-0">
                    {error}
                </div>
            )}

            <div className="flex flex-col md:flex-row flex-1 min-h-0">
                {/* Left Panel - JSON Input */}
                <div className="relative w-full md:w-1/2 h-1/2 md:h-auto flex flex-col border-b md:border-b-0 md:border-r border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900">
                    <div className="absolute top-4 left-4 right-8 z-10 flex items-center justify-between">
                        <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400 bg-white/90 dark:bg-neutral-900/90 backdrop-blur-sm px-3 py-1.5 rounded-full border border-neutral-200 dark:border-neutral-700">
                            JSON Input
                        </span>
                        <div className="flex items-center gap-2">
                            <JsonUpload
                                compact
                                onJsonLoaded={handleJsonLoaded}
                                onError={(e) => setError(e)}
                                onLoadingChange={setIsLoading}
                            />
                            <button
                                onClick={() => modal.open(
                                    <UrlFetchDialog
                                        onJsonLoaded={(json) => { setJsonString(json); parseJson(json); }}
                                        onClose={modal.close}
                                    />
                                )}
                                className="flex items-center p-2 bg-blue-600/90 hover:bg-blue-600 text-white rounded-full transition-all duration-200 backdrop-blur-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:ring-offset-0"
                                title="Load from URL"
                            >
                                <Link className="w-3.5 h-3.5" />
                            </button>
                            {jsonString && (
                                <button
                                    onClick={() => { const f = formatJson(jsonString); setJsonString(f); }}
                                    className="text-xs font-medium px-3 py-1.5 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 bg-white/90 dark:bg-neutral-900/90 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-full transition-all duration-200 backdrop-blur-sm border border-neutral-200 dark:border-neutral-700 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:ring-offset-0"
                                >
                                    Beautify
                                </button>
                            )}
                            {isValidJson && (
                                <button
                                    onClick={() => downloadFile(JSON.stringify(parsedJson, null, 2), 'data.json', 'application/json')}
                                    className="flex items-center p-2 bg-emerald-600/90 hover:bg-emerald-600 text-white rounded-full transition-all duration-200 backdrop-blur-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:ring-offset-0"
                                    title="Download JSON"
                                >
                                    <Download className="w-3.5 h-3.5" />
                                </button>
                            )}
                        </div>
                    </div>

                    <textarea
                        className="w-full h-full p-4 pt-16 bg-transparent text-neutral-900 dark:text-neutral-100 resize-none focus:outline-none font-mono text-sm leading-relaxed border-none overflow-y-auto"
                        value={jsonString}
                        onChange={(e) => handleJsonStringChange(e.target.value)}
                        placeholder={`{\n  "name": "John Doe",\n  "age": 30,\n  "city": "New York"\n}`}
                        spellCheck={false}
                    />
                </div>

                {/* Right Panel - Tree View */}
                <div className="w-full md:w-1/2 h-1/2 md:h-auto flex flex-col bg-white dark:bg-neutral-900">
                    {isValidJson && currentJson !== null ? (
                        <>
                            <div className="shrink-0">
                                <Breadcrumb />
                            </div>
                            <div className="flex-1 overflow-y-auto">
                                {isLoading ? (
                                    <div className="flex flex-col items-center justify-center h-full p-4">
                                        <div className="animate-spin rounded-full h-10 w-10 border-2 border-blue-500 dark:border-blue-400 border-t-transparent mb-3" />
                                        <p className="text-neutral-600 dark:text-neutral-400">Processing JSON...</p>
                                    </div>
                                ) : (
                                    <div className="p-4 font-mono">
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
                                            <div className="text-center text-neutral-500 dark:text-neutral-400 py-8">
                                                <p>Current value is not an object or array</p>
                                                <p className="text-sm mt-2">
                                                    Value: <span className="font-mono">{JSON.stringify(currentJson)}</span>
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </>
                    ) : (
                        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
                            <div className="max-w-md">
                                <h3 className="text-lg font-medium text-neutral-800 dark:text-neutral-200 mb-2">
                                    {error ? 'Invalid JSON' : 'No JSON to Display'}
                                </h3>
                                <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed">
                                    {error
                                        ? 'Please fix the JSON syntax errors in the left panel.'
                                        : 'Enter valid JSON in the left panel, upload a file, or load from a URL to visualize the tree structure.'
                                    }
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
