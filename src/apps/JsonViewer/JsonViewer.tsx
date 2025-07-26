import { Download, Link } from 'lucide-react';
import React, { useState, useCallback, useMemo } from 'react';
import Breadcrumb from './BreadCrumb';
import TreeNode from './TreeNode';
import FileUpload from './FileUpload';
import UrlFetchDialog from './UrlFetchDialog';
import { useJsonViewerStore } from './json.store';
import { formatJson, jsonToXml, downloadFile, JsonValue } from './json.utilities';

type OutputFormat = 'json' | 'xml';

const JsonTreeViewer: React.FC = () => {
    // Local state for things that don't need to be shared
    const [jsonString, setJsonString] = useState('');
    const [outputFormat, _] = useState<OutputFormat>('json');
    const [urlDialogOpen, setUrlDialogOpen] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    // Use individual selectors to avoid object creation on each render
    const parsedJson = useJsonViewerStore(state => state.parsedJson);
    const currentPath = useJsonViewerStore(state => state.currentPath);
    const setParsedJson = useJsonViewerStore(state => state.setParsedJson);

    // Parse JSON when input changes
    const parseJson = useCallback((input: string) => {
        if (!input.trim()) {
            setParsedJson(null);
            setError(null);
            return;
        }

        try {
            const parsed = JSON.parse(input);
            setParsedJson(parsed);
            setError(null);
        } catch (err) {
            setParsedJson(null);
            setError('Invalid JSON format');
        }
    }, [setParsedJson]);

    // Handle JSON input change
    const handleJsonStringChange = useCallback((value: string) => {
        setJsonString(value);
        parseJson(value);
    }, [parseJson]);

    // Get current JSON based on navigation path - memoized to prevent recalculation
    const currentJson = useMemo((): JsonValue | null => {
        if (!parsedJson) return null;

        let current: JsonValue = parsedJson;
        for (const segment of currentPath) {
            if (current !== null && typeof current === 'object') {
                if (Array.isArray(current) && !isNaN(Number(segment))) {
                    current = current[Number(segment)];
                } else if (!Array.isArray(current) && segment in current) {
                    current = (current as { [key: string]: JsonValue })[segment];
                } else {
                    return null;
                }
            } else {
                return null;
            }
        }
        return current;
    }, [parsedJson, currentPath]);

    const isValidJson = parsedJson !== null;

    // Handle JSON beautification
    const handleBeautify = useCallback(() => {
        if (jsonString) {
            const formatted = formatJson(jsonString);
            setJsonString(formatted);
        }
    }, [jsonString]);

    // Handle download
    const handleDownload = useCallback(() => {
        if (!parsedJson) return;

        const content = outputFormat === 'json'
            ? JSON.stringify(parsedJson, null, 2)
            : jsonToXml(parsedJson);

        const filename = `data.${outputFormat}`;
        const contentType = outputFormat === 'json' ? 'application/json' : 'application/xml';

        downloadFile(content, filename, contentType);
    }, [parsedJson, outputFormat]);

    // Callbacks for child components
    const onJsonLoaded = useCallback((json: string) => {
        setJsonString(json);
        parseJson(json);
    }, [parseJson]);

    const onError = useCallback((errorMsg: string) => {
        setError(errorMsg);
    }, []);

    const onLoadingChange = useCallback((loading: boolean) => {
        setIsLoading(loading);
    }, []);

    return (
        <div className="w-full relative min-h-[calc(100vh-56px)] flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-300 dark:border-gray-700">
                <h1 className="text-xl font-semibold text-gray-800 dark:text-white">JSON Viewer</h1>

                <div className="flex items-center space-x-3">
                    {/* Input Mode Buttons */}
                    <div className="flex items-center space-x-2">
                        <FileUpload
                            onJsonLoaded={onJsonLoaded}
                            onError={onError}
                            onLoadingChange={onLoadingChange}
                        />
                        <button
                            onClick={() => setUrlDialogOpen(true)}
                            className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-md transition-colors border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            title="Load from URL"
                        >
                            <Link size={16} className="mr-2" />
                            URL
                        </button>
                    </div>

                    {/* Actions */}
                    {isValidJson && (
                        <div className="flex items-center space-x-2">
                            {/* Format Toggle */}
                            {/* <select
                                value={outputFormat}
                                onChange={(e) => setOutputFormat(e.target.value as OutputFormat)}
                                className="px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value="json">JSON</option>
                                <option value="xml">XML</option>
                            </select> */}

                            {/* Download Button */}
                            <button
                                onClick={handleDownload}
                                className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                                title="Download file"
                            >
                                <Download size={16} className="mr-1" />
                                Download
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Error Message */}
            {error && (
                <div className="mx-4 mt-3 bg-red-100 dark:bg-red-900/20 border border-red-400 dark:border-red-800 text-sm text-red-700 dark:text-red-400 px-4 py-2 rounded-lg">
                    {error}
                </div>
            )}

            {/* Main Content - Side by Side Layout */}
            <div className="flex-1 flex min-h-0">
                {/* Left Panel - JSON Input */}
                <div className="w-1/2 flex flex-col border-r border-gray-300 dark:border-gray-700 lg:w-1/2 md:w-full">
                    {/* Input Controls */}
                    <div className="p-4 border-b border-gray-300 dark:border-gray-700 flex items-center justify-between">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            JSON Input
                        </label>
                        {jsonString && (
                            <button
                                onClick={handleBeautify}
                                className="pl-2 text-xs font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded transition-colors"
                            >
                                Beautify
                            </button>
                        )}
                    </div>

                    {/* JSON Textarea */}
                    <div className="flex-1 p-4">
                        <textarea
                            className="w-full h-full min-h-[400px] p-3 border border-gray-300 dark:border-gray-600 rounded-md font-mono text-sm bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 focus:border-transparent resize-none"
                            value={jsonString}
                            onChange={(e) => handleJsonStringChange(e.target.value)}
                            placeholder={`{
  "name": "John Doe",
  "age": 30,
  "city": "New York",
  "hobbies": ["reading", "coding", "gaming"],
  "address": {
    "street": "123 Main St",
    "zipCode": "10001"
  }
}`}
                            spellCheck={false}
                        />
                    </div>
                </div>

                {/* Right Panel - Tree View */}
                <div className="w-1/2 flex flex-col lg:w-1/2 md:w-full">
                    {isValidJson && currentJson !== null ? (
                        <>
                            {/* Breadcrumb Navigation */}
                            <Breadcrumb />

                            {/* Tree Content */}
                            <div className="flex-1 overflow-auto p-4">
                                {isLoading ? (
                                    <div className="flex flex-col items-center justify-center h-full">
                                        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500 dark:border-blue-400 mb-3"></div>
                                        <p className="text-gray-600 dark:text-gray-400">Processing JSON...</p>
                                    </div>
                                ) : (
                                    <div className="space-y-1 w-full h-full min-h-[400px] p-2 border border-gray-300 dark:border-gray-600 rounded-md font-mono text-sm bg-white dark:bg-gray-900 overflow-auto">
                                        {typeof currentJson === 'object' && currentJson !== null ? (
                                            Object.entries(currentJson).map(([key, value], index) => {
                                                const label = Array.isArray(currentJson) ? `${index}` : key;
                                                return (
                                                    <TreeNode
                                                        key={Array.isArray(currentJson) ? `${index}` : key}
                                                        label={label}
                                                        value={value}
                                                        depth={0}
                                                        path={currentPath}
                                                    />
                                                );
                                            })
                                        ) : (
                                            <div className="text-center text-gray-500 dark:text-gray-400 py-8">
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
                                <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-2">
                                    {error ? "Invalid JSON" : "No JSON to Display"}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                                    {error
                                        ? "Please fix the JSON syntax errors in the left panel."
                                        : "Enter valid JSON in the left panel, upload a file, or load from a URL to visualize the tree structure."
                                    }
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* URL Dialog */}
            <UrlFetchDialog
                open={urlDialogOpen}
                onClose={() => setUrlDialogOpen(false)}
                onJsonLoaded={onJsonLoaded}
                onError={onError}
                onLoadingChange={onLoadingChange}
            />
        </div>
    );
};

export default JsonTreeViewer;