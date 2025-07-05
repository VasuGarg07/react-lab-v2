import { ChevronLeft, UploadCloud } from 'lucide-react';
import React, { useCallback, useState } from 'react';
import Breadcrumb from './BreadCrumb';
import { JsonValue } from './json.helper';
import TreeNode from './TreeNode';

const MAX_FILE_SIZE_MB = 2; // Limit to 2MB


const JsonTreeViewer: React.FC = () => {
    const [jsonString, setJsonString] = useState('');
    const [parsedJson, setParsedJson] = useState<JsonValue | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [currentPath, setCurrentPath] = useState<string[]>([]);
    const [activeView, setActiveView] = useState<'input' | 'view'>('input');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handlePathChange = useCallback((path: string[]) => {
        setCurrentPath(path);
    }, []);

    const handleBreadcrumbNavigation = (index: number) => {
        if (index === -1) {
            setCurrentPath([]);
        } else {
            setCurrentPath(currentPath.slice(0, index + 1));
        }
    };

    // Navigate through the JSON based on current path
    const getCurrentJson = (): JsonValue | null => {
        if (!parsedJson) return null;

        let current: JsonValue = parsedJson;
        for (const segment of currentPath) {
            if (typeof current === 'object' && current !== null) {
                // Handle array indices
                if (Array.isArray(current) && !isNaN(Number(segment))) {
                    current = current[Number(segment)];
                } else if (!Array.isArray(current) && segment in current) {
                    current = current[segment];
                } else {
                    return null; // Path not found
                }
            } else {
                return null; // Can't navigate further
            }
        }
        return current;
    };

    const handleJsonInput = (input: string) => {
        if (!input.trim()) {
            setParsedJson(null);
            setError(null);
            return;
        }

        setIsLoading(true);

        try {
            const data = JSON.parse(input);
            setParsedJson(data);
            setCurrentPath([]);
            setError(null);
            setActiveView('view');
        } catch (error) {
            setParsedJson(null);
            console.error(error)
            setError("Something Went Wrong!");
        } finally {
            setIsLoading(false);
        }
    };

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        // 1. File size validation
        const fileSizeMB = file.size / (1024 * 1024);
        if (fileSizeMB > MAX_FILE_SIZE_MB) {
            setError(`File too large. Max allowed size is ${MAX_FILE_SIZE_MB}MB. Your file is ${fileSizeMB.toFixed(2)}MB.`);
            return;
        }

        setIsLoading(true);
        const reader = new FileReader();

        reader.onload = (e) => {
            const content = e.target?.result as string;
            handleJsonInput(content);
        };

        reader.onerror = () => {
            setError('Failed to read file');
            setIsLoading(false);
        };

        reader.readAsText(file);
    };

    const currentJson = getCurrentJson();

    return (
        <div className="w-full h-full flex flex-col relative p-6 min-h-[calc(100vh-54px)]">
            <div className="flex items-center justify-between p-3 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-lg font-semibold text-gray-800 dark:text-white">JSON Tree Viewer</h2>
                <div className="flex items-center space-x-2">
                    <button
                        onClick={() => setActiveView('input')}
                        className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${activeView === 'input'
                            ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                            }`}
                    >
                        Edit
                    </button>
                    <button
                        onClick={() => handleJsonInput(jsonString)}
                        className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${activeView === 'view'
                            ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                            }`}
                        disabled={!jsonString.trim() || isLoading}>
                        View
                    </button>
                </div>
            </div>

            {error && (
                <div className="bg-red-100 dark:bg-red-900/20 border border-red-400 dark:border-red-800 text-sm text-red-700 dark:text-red-400 px-4 py-2 rounded-xl my-2 mx-auto">
                    {error}
                </div>
            )}

            {activeView === 'input' ? (
                <div className="p-4 flex flex-col flex-1">
                    <div className="flex flex-1 gap-4 mb-4">
                        <div className="flex-1">
                            <label className="block mb-1.5 text-sm font-medium text-gray-700 dark:text-gray-300">Paste JSON</label>
                            <textarea
                                className="w-full h-full p-3 border border-gray-300 dark:border-gray-700 rounded-md font-mono text-sm bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 focus:border-transparent"
                                value={jsonString}
                                onChange={(e) => setJsonString(e.target.value)}
                                placeholder='{
  "example": {
    "nested": [1, 2, 3],
    "value": true
  }
}'
                            />
                        </div>

                        <div className="flex items-center justify-center">
                            <span className="text-gray-500 dark:text-gray-400">OR</span>
                        </div>

                        <div className="flex-1">
                            <label className="block mb-1.5 text-sm font-medium text-gray-700 dark:text-gray-300">Upload JSON File</label>
                            <div className="h-full border border-gray-300 dark:border-gray-700 border-dashed rounded-md flex flex-col items-center justify-center p-4 bg-gray-50 dark:bg-gray-800">
                                <UploadCloud size={36} className="text-gray-400 dark:text-gray-500 mb-2" />
                                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 text-center">Drag & drop a JSON file or click to browse</p>
                                <label className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white py-2 px-4 rounded-md cursor-pointer transition-colors text-sm font-medium">
                                    Browse Files
                                    <input
                                        type="file"
                                        accept=".json"
                                        className="hidden"
                                        onChange={handleFileUpload}
                                    />
                                </label>
                            </div>
                        </div>
                    </div>

                    {parsedJson && (
                        <div className="mt-4 pt-2 flex justify-end">
                            <button
                                onClick={() => {
                                    if (isLoading) return;
                                    handleJsonInput(jsonString);
                                }}
                                className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white py-2 px-4 rounded-md transition-colors text-sm font-medium flex items-center"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <>
                                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                        Processing...
                                    </>
                                ) : (
                                    'View JSON Tree'
                                )}
                            </button>
                        </div>
                    )}
                </div>
            ) : (
                <div className="flex flex-col flex-1 p-4">
                    <Breadcrumb path={currentPath} onNavigate={handleBreadcrumbNavigation} />

                    <div className="bg-white dark:bg-gray-800 rounded-md border border-gray-200 dark:border-gray-700 flex-1 overflow-hidden shadow-sm">
                        <div className="p-3 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                            <h3 className="font-medium text-gray-800 dark:text-gray-200">
                                {currentPath.length > 0 ? currentPath[currentPath.length - 1] : 'Root'}
                            </h3>
                            {currentPath.length > 0 && (
                                <button
                                    onClick={() => setCurrentPath(currentPath.slice(0, -1))}
                                    className="text-blue-600 dark:text-blue-400 flex items-center text-sm"
                                >
                                    <ChevronLeft size={14} className="mr-1" />
                                    Back
                                </button>
                            )}
                        </div>
                        <div className="overflow-auto h-[calc(100%-3rem)]">
                            {isLoading ? (
                                <div className="flex flex-col items-center justify-center h-full p-4">
                                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500 dark:border-blue-400 mb-3"></div>
                                    <p className="text-gray-600 dark:text-gray-400">Processing JSON...</p>
                                </div>
                            ) : currentJson ? (
                                <div className="p-2">
                                    {Object.entries(currentJson).map(([key, val], index) => {
                                        const label = Array.isArray(currentJson) ? `${index}` : key;
                                        return (
                                            <TreeNode
                                                key={Array.isArray(currentJson) ? `${index}` : key}
                                                label={label}
                                                value={val}
                                                depth={0}
                                                path={currentPath}
                                                onPathChange={handlePathChange}
                                            />
                                        );
                                    })}
                                </div>
                            ) : (
                                <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                                    {error ? "Please fix the JSON format" : "Enter or upload JSON to visualize"}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="mt-4 flex justify-end">
                        <button
                            onClick={() => setActiveView('input')}
                            className="bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 py-2 px-4 rounded-md transition-colors text-sm font-medium"
                        >
                            Edit JSON
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default JsonTreeViewer;