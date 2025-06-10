"use client";

import { useState, useEffect } from "react";
import { CircleUserRound, Frown, Sun, Moon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import AuthModal from "./components/modal/AuthModal";
import LoadingBar from "./components/LoadingBar";
import SearchResults from "./components/SearchResults";
import LogoSearchBar from "./components/homecomponents/LogoSearchBar";
import CategoryMenu from "./components/homecomponents/CategoryMenu";
import SearchResultSummary from "./components/homecomponents/SearchResultSummary";
import SearchResultsPagination from "./components/homecomponents/SearchResultsPagination";
import ContentDetail from "./components/homecomponents/ContentDetail";
import ImageResults from "./components/homecomponents/ImageResult";
import { useTheme } from "next-themes";




export default function HomePage() {
  const [search, setSearch] = useState("");
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [summary, setSummary] = useState("");
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [selectedContent, setSelectedContent] = useState(null);
  const [category, setCategory] = useState("all");
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const router = useRouter();
  const searchParams = useSearchParams();

  
  useEffect(() => {
    const query = searchParams.get("query");
    if (query) {
      const decodedQuery = decodeURIComponent(query.replace(/\+/g, " "));
      setSearch(decodedQuery);
      setSearchPerformed(true);
      setTimeout(() => {
        handleSearch(decodedQuery);
      }, 0);
    }
  }, []);
  


  useEffect(() => {
    if (searchPerformed && results.length > 0 && selectedContent === null) {
      if (!window.chatbase || window.chatbase("getState") !== "initialized") {
        window.chatbase = (...args) => {
          if (!window.chatbase.q) window.chatbase.q = [];
          window.chatbase.q.push(args);
        };

        window.chatbase = new Proxy(window.chatbase, {
          get(target, prop) {
            if (prop === "q") return target.q;
            return (...args) => target(prop, ...args);
          },
        });

        const script = document.createElement("script");
        script.src = "https://www.chatbase.co/embed.min.js";
        script.id = "3FKe4Kpm4-oD58kFe7fSu";
        script.setAttribute("domain", "www.chatbase.co");
        document.body.appendChild(script);
      }
    }
  }, [searchPerformed, results, selectedContent]);
  


  const handleSearch = async (manualSearch) => {
    const searchTerm = manualSearch || search;
    if (!searchTerm.trim()) return;

    const queryParam = encodeURIComponent(
      searchTerm.trim().replace(/\s+/g, "+")
    );
    router.push(`/?query=${queryParam}`, undefined, { shallow: true });


    setIsLoading(true);
    setSearchPerformed(true);

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/search?query=${encodeURIComponent(
          searchTerm
        )}&category=${category}&page=${page}`
      );
      if (!response.ok) {
        throw new Error("Request failed with status " + response.status);
      }
      const data = await response.json();
      setSummary(data.summary);
      setResults(data.results);
      setTotalResults(data.totalResults);
      const pages = Math.ceil(data.totalResults / 10);
      setTotalPages(pages);
    } catch (error) {
      console.error("Error fetching search results:", error);
      alert("Terjadi kesalahan: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };
  


const handleCategoryChange = (newCategory) => {
  setCategory(newCategory);
  setPage(1);
  setSearchPerformed(true); 
  setCategory(newCategory);
  setTimeout(() => {
    handleSearch(); 
  }, 0); 
};

const handlePaginationChange = (newPage) => {
  setPage(newPage);
  handleSearch(); 
};

  const handleTitleClick = (content) => {
    setSelectedContent(content);
  };

  const handleBackToResults = () => {
    setSelectedContent(null);
  };

  function ThemeToggle() {
    const { theme, setTheme } = useTheme();

    return (
      <button
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 transition-all relative group hover:scale-105 active:scale-95 transform translate-x-4"
        title="Toggle Theme"
      >
        {/* Tali yang memanjang ke atas di luar tombol */}
        <span className="absolute top-[-47px] left-1/2 transform -translate-x-1/2 w-[0.5px] h-12 bg-gray-800 dark:bg-gray-200 rounded-full transition-all duration-300 group-hover:h-12 group-hover:top-[-30px]"></span>

        {/* Ikon tema */}
        {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}

        {/* Efek jatuh saat tombol ditekan */}
        <span className="absolute inset-0 bg-transparent group-active:bg-gray-300 dark:group-active:bg-gray-600 rounded-full transition-all duration-200 transform group-active:translate-y-1"></span>
      </button>
    );
  }


  return (
    <div className="flex flex-col items-center min-h-screen bg-white dark:bg-zinc-900 text-black dark:text-white p-0 m-0">
      {isLoading && <LoadingBar />}
      <div className="w-full flex items-center justify-end pr-4 pt-8">
        <ThemeToggle
          size={20}
          className="text-blue-600 cursor-pointer translate-y-12 -translate-x-4"
        />
        <CircleUserRound
          size={36}
          className="text-blue-600 dark:text-blue-400 cursor-pointer hover:text-blue-800 translate-y-12 -translate-x-4"
          onClick={() => setIsAuthModalOpen(true)}
        />
      </div>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />

      <div className="flex flex-col items-center justify-center flex-grow w-full px-4">
        <LogoSearchBar
          search={search}
          setSearch={setSearch}
          handleSearch={handleSearch}
          searchPerformed={searchPerformed}
           setSearchPerformed={setSearchPerformed} 
        />

        <CategoryMenu
          selectedCategory={selectedCategory}
          searchPerformed={searchPerformed && !isLoading}
          handleCategoryChange={(newCategory) => {
            setSelectedCategory(newCategory);
            handleCategoryChange(newCategory);
          }}
        />

        {selectedContent ? (
          <ContentDetail
            content={selectedContent}
            onBack={handleBackToResults}
          />
        ) : (
          <>
            {searchPerformed &&
              !isLoading &&
              results.length > 0 &&
              category !== "image" && <SearchResultSummary summary={summary} />}

            {searchPerformed && !isLoading && results.length > 0 && (
              <>
                {category === "image" ? (
                  <ImageResults results={results} />
                ) : (
                  <SearchResults
                    results={results}
                    onTitleClick={handleTitleClick}
                  />
                )}
              </>
            )}

            {searchPerformed && !isLoading && results.length === 0 && (
              <div className="text-center mt-10 text-gray-500 flex flex-col items-center">
                <Frown size={48} className="mb-2 text-gray-400" />
                <p className="text-lg font-semibold">Hasil tidak ditemukan</p>
                <p className="text-sm text-gray-400">
                  Coba gunakan kata kunci lain yang lebih spesifik Sayang..!!!.
                </p>
              </div>
            )}

            {searchPerformed && !isLoading && results.length > 0 && (
              <SearchResultsPagination
                currentPage={page}
                totalPages={totalPages}
                handlePaginationChange={handlePaginationChange}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}
