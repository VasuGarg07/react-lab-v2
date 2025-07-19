import ImageGallery from "@/apps/SnapFind/ImageGallery";
import SearchBar from "@/apps/SnapFind/SearchBar";
import { toastService } from "@/shared/toastr";
import Pagination from "@/ui/Pagination";
import React, { useEffect, useState } from "react";
import { useUnsplashImages } from "./useUnsplashImages";

const SnapFind: React.FC = () => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [value, setValue] = useState<string | null>(null);
  const { images, totalPages, isLoading, error, refetch } = useUnsplashImages({ query, page, value });

  // Handle search submission
  const handleSubmit = async (reset: boolean = false) => {
    if (!query.trim()) {
      toastService.error('Please input your query');
      return;
    }

    reset ? setPage(1) : refetch();
  };

  useEffect(() => {
    if (error) {
      toastService.error('Unable to load images. Please try again later.');
    }
  }, [error]);

  return (
    <div className="container max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8 flex flex-col items-center relative">
      <div className="w-full bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-neutral-200/50 dark:border-neutral-800/50 mb-8">
        <h1 className="tracking-wider text-4xl sm:text-5xl md:text-6xl text-center text-violet-600 dark:text-violet-400 font-bold mb-6 drop-shadow-sm">
          SNAP FIND
        </h1>

        <SearchBar
          loading={isLoading}
          value={value}
          onSearchInput={setQuery}
          onSubmit={handleSubmit}
          onToggleChange={setValue}
        />
      </div>

      {/* Flexible space */}
      <div className="flex-grow" />

      {/* Image Gallery */}
      {images?.length > 0 && (
        <div className="w-full">
          <ImageGallery images={images} />
        </div>
      )}

      {/* Loading Indicator */}
      {isLoading && (
        <div className="flex justify-center my-8">
          <div className="relative w-24 h-24">
            <div className="absolute inset-0 rounded-full border-t-4 border-b-4 border-blue-500 animate-spin"></div>
            <div className="absolute inset-3 rounded-full border-t-4 border-b-4 border-pink-500 animate-spin-reverse duration-700"></div>
          </div>
        </div>
      )}

      {/* Flexible space */}
      <div className="flex-grow" />

      {/* Pagination */}
      {images?.length > 0 && totalPages > 1 && (
        <div className="mt-8 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md rounded-xl p-4 shadow-md border border-neutral-200/50 dark:border-neutral-800/50">
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </div>
      )}
    </div>
  );
};

export default SnapFind;