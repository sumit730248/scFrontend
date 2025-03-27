import { Search } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchBar = ({ searchPlaceHolder }) => {
  const [query, setQuery] = useState("");
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const navigate = useNavigate();

  const handleSearch = () => {
    if (query.trim()) {
      navigate(`/search/${query}`);
      setIsSearchExpanded(false);
    }
  };

  const toggleSearchExpand = () => {
    setIsSearchExpanded(!isSearchExpanded);
  };

  return (
    <div className="flex items-center">
      {/* Mobile Search Toggle Button */}
      <button className="md:hidden mr-2" onClick={toggleSearchExpand}>
        <Search className="h-6 w-6 text-gray-600 dark:text-gray-300" />
      </button>

      {/* Search Input - Responsive Layout */}
      <div
        className={`
        fixed left-0 right-0 top-16 p-4 bg-white dark:bg-gray-800 shadow-md transition-all duration-300 ease-in-out
        md:static md:block md:flex-1 md:max-w-md md:mx-8 md:p-0 md:shadow-none
        ${isSearchExpanded ? "block" : "hidden"}
      `}
      >
        <div className="relative w-full">
          <div
            className="absolute inset-y-0 left-0 pl-3 flex items-center cursor-pointer"
            onClick={handleSearch}
          >
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md leading-5 
            bg-white dark:bg-gray-700 placeholder-gray-500 dark:placeholder-gray-400 
            text-gray-900 dark:text-white focus:outline-none focus:ring-1 
            focus:ring-blue-500 focus:border-blue-500"
            placeholder={searchPlaceHolder}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
