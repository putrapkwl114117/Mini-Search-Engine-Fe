import { useState, useEffect, useRef } from "react";
import { Search } from "lucide-react";

const LogoSearchBar = ({
  search,
  setSearch,
  handleSearch,
  searchPerformed,
  setSearchPerformed,
}) => {
  const [suggestions, setSuggestions] = useState([]);
  const [hasSelected, setHasSelected] = useState(false);
  const previousSearch = useRef("");


  useEffect(() => {
    if (searchPerformed && search !== previousSearch.current) {
      setSearchPerformed(false);
    }
  }, [search, searchPerformed]);
  

  useEffect(() => {
    if (search.trim().length === 0) {
      setSuggestions([]);
      return;
    }

    if (hasSelected) {
      setSuggestions([]);
      setHasSelected(false);
      return;
    }

    if (searchPerformed) {
      setSuggestions([]);
      return;
    }

    const fetchSuggestions = async () => {
      try {
        const res = await fetch(
          `http://127.0.0.1:8000/suggestions?query=${encodeURIComponent(
            search
          )}`
        );
        const data = await res.json();
        setSuggestions(data.suggestions);
      } catch (err) {
        console.error("Failed to fetch suggestions", err);
        setSuggestions([]);
      }
    };

    const delayDebounce = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(delayDebounce);
  }, [search, hasSelected, searchPerformed]);

  const onSearch = () => {
    setSuggestions([]);
    previousSearch.current = search;
    handleSearch();
  };

  const handleSuggestionClick = (suggestion) => {
    setSearch(suggestion);
    previousSearch.current = suggestion;
    setHasSelected(true);
    handleSearch();
  };

  return (
    <div className="relative flex flex-col w-full max-w-2xl mb-6">
      {/* Logo besar + nama dan slogan */}
      {!searchPerformed && (
        <div className="flex flex-col items-center gap-1">
          <div className="flex items-start gap-1">
            <img src="/logo1.png" alt="Logo" className="w-16 h-16 -mt-8" />
            <h1 className="text-3xl font-bold text-blue-600 -mt-4">
              DiagnoSense
            </h1>
          </div>
          <p className="text-sm font-semibold text-gray-700  dark:text-gray-300 -ml-2 mb-6">
            Your Digital Health Detective
          </p>
        </div>
      )}

      {/* Search input */}
      <div className="flex items-center gap-4 pl-4 relative">
        {searchPerformed && (
          <div className="absolute -left-12">
            <img src="/logo1.png" alt="Logo" className="w-10 h-10" />
          </div>
        )}

        <input
          type="text"
          className={`w-full p-3 pl-6 pr-12 text-lg 
    ${
      suggestions.length > 0 && search.trim().length > 0
        ? "rounded-t-lg"
        : "rounded-full"
    }
    border border-gray-300 dark:border-gray-600 
    shadow-md bg-white dark:bg-gray-800 
    text-gray-900 dark:text-white 
    placeholder-gray-500 dark:placeholder-gray-400 
    focus:outline-none focus:ring-1 focus:ring-gray-600`}
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") onSearch();
          }}
        />

        <button
          type="submit"
          className="absolute right-3 top-1/2 transform -translate-y-1/2 
            text-blue-500 hover:text-blue-600"
          onClick={onSearch}
        >
          <Search size={24} />
        </button>
      </div>

      {/* Suggestions */}
      {suggestions.length > 0 && search.trim().length > 0 && (
        <ul
          className="absolute top-full left-4 right-0 mt-0.5
      bg-white dark:bg-gray-800 
      border-x border-b border-gray-300 dark:border-gray-600 
      rounded-b-lg shadow-xl z-10 overflow-hidden"
        >
          {suggestions.map((item, index) => (
            <li
              key={index}
              onClick={() => handleSuggestionClick(item)}
              className="px-6 py-2 text-sm font-semibold hover:bg-blue-100 dark:hover:bg-gray-700 cursor-pointer 
          text-gray-800 dark:text-white"
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LogoSearchBar;
