import React from 'react';
import * as ToggleGroup from '@radix-ui/react-toggle-group';
import { RectangleHorizontal, RectangleVertical, Search, Square } from 'lucide-react';

interface SearchBarProps {
    loading: boolean;
    value: string | null;
    onSearchInput: React.Dispatch<React.SetStateAction<string>>;
    onToggleChange: React.Dispatch<React.SetStateAction<string | null>>;
    onSubmit: (reset?: boolean) => Promise<void>;
}

const SearchBar: React.FC<SearchBarProps> = ({
    loading,
    value,
    onSearchInput,
    onSubmit,
    onToggleChange
}) => {
    return (
        <div className="flex flex-row flex-wrap items-center gap-2 w-full max-w-2xl mx-auto">
            <div className="relative flex-grow min-w-[240px]">
                <input
                    type="text"
                    placeholder="Search images from Unsplash"
                    className="w-full h-10 pl-10 pr-4 bg-white/90 dark:bg-zinc-800/90 text-black/90 dark:text-white/90 backdrop-blur-md border border-gray-200/50 dark:border-gray-700/50 rounded-xl focus:outline-none focus:ring-1 focus:ring--300 dark:focus:ring--700 shadow-sm transition-all disabled:opacity-60"
                    onChange={(e) => onSearchInput(e.target.value)}
                    disabled={loading}
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-gray-500" />
            </div>

            <ToggleGroup.Root
                className="inline-flex bg-white/90 dark:bg-zinc-800/90 backdrop-blur-md rounded-xl shadow-sm border border-gray-200/50 dark:border-gray-700/50 p-0.5"
                type="single"
                value={value || ''}
                onValueChange={(newValue) => {
                    onToggleChange(newValue || null);
                }}
                aria-label="Image orientation"
            >
                <ToggleGroup.Item
                    className="px-3 h-9 text-sm font-medium text-gray-700 dark:text-gray-300 rounded-lg data-[state=on]:bg-gray-100 dark:data-[state=on]:bg-gray-700 data-[state=on]:text-amber-600 dark:data-[state=on]:text-amber-400 transition-all"
                    value=""
                    aria-label="All orientations"
                >
                    All
                </ToggleGroup.Item>
                <ToggleGroup.Item
                    className="h-9 w-9 flex items-center justify-center text-gray-700 dark:text-gray-300 rounded-lg data-[state=on]:bg-gray-100 dark:data-[state=on]:bg-gray-700 data-[state=on]:text-amber-600 dark:data-[state=on]:text-amber-400 transition-all"
                    value="landscape"
                    aria-label="Landscape orientation"
                >
                    <RectangleHorizontal className="h-4 w-4" />
                </ToggleGroup.Item>
                <ToggleGroup.Item
                    className="h-9 w-9 flex items-center justify-center text-gray-700 dark:text-gray-300 rounded-lg data-[state=on]:bg-gray-100 dark:data-[state=on]:bg-gray-700 data-[state=on]:text-amber-600 dark:data-[state=on]:text-amber-400 transition-all"
                    value="portrait"
                    aria-label="Portrait orientation"
                >
                    <RectangleVertical className="h-4 w-4" />
                </ToggleGroup.Item>
                <ToggleGroup.Item
                    className="h-9 w-9 flex items-center justify-center text-gray-700 dark:text-gray-300 rounded-lg data-[state=on]:bg-gray-100 dark:data-[state=on]:bg-gray-700 data-[state=on]:text-amber-600 dark:data-[state=on]:text-amber-400 transition-all"
                    value="squarish"
                    aria-label="Square orientation"
                >
                    <Square className="h-4 w-4" />
                </ToggleGroup.Item>
            </ToggleGroup.Root>

            <button
                className="h-10 flex items-center justify-center gap-2 px-4 bg-teal-500 hover:bg-teal-600 dark:bg-teal-600 dark:hover:bg-teal-700 text-white font-medium rounded-xl transition-colors disabled:opacity-60 shadow-sm disabled:cursor-not-allowed"
                onClick={() => onSubmit(true)}
                disabled={loading}
            >
                {loading ? (
                    <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-1" />
                ) : null}
                <span>Search</span>
            </button>
        </div>
    );
};

export default SearchBar;