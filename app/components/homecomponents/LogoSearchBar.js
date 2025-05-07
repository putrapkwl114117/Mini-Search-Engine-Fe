import { useState, useEffect, useRef } from "react";
import { Search } from "lucide-react";

const LogoSearchBar = ({
  search,
  setSearch,
  handleSearch,
  searchPerformed,
}) => {
  const [suggestions, setSuggestions] = useState([]);
  const [hasSelected, setHasSelected] = useState(false);
  const previousSearch = useRef("");

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

    if (searchPerformed && search !== previousSearch.current) {
    } else if (searchPerformed) {
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
      <div className="flex items-center gap-4 pl-4 relative">
        {searchPerformed && (
          <div className="absolute -left-12">
            <img src="/logo1.png" alt="Logo" className="w-10 h-10" />
          </div>
        )}
        <input
          type="text"
          className="w-full p-3 pl-6 pr-12 text-lg rounded-full 
            border border-gray-300 dark:border-gray-600 
            shadow-md bg-white dark:bg-gray-800 
            text-gray-900 dark:text-white 
            placeholder-gray-500 dark:placeholder-gray-400 
            focus:outline-none focus:ring-1 focus:ring-blue-600"
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

      {suggestions.length > 0 && (
        <ul
          className="absolute top-full mt-1 w-full 
          bg-white dark:bg-gray-800 
          border border-gray-300 dark:border-gray-600 
          rounded-lg shadow-lg z-10"
        >
          {suggestions.map((item, index) => (
            <li
              key={index}
              onClick={() => handleSuggestionClick(item)}
              className="px-4 py-2 hover:bg-blue-100 dark:hover:bg-gray-700 cursor-pointer 
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
