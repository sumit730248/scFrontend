import { Search } from "lucide-react";

const SearchBar = ({searchPlaceHolder}) => {
  return (
    <div className="flex-1 max-w-md mx-8 hidden md:flex">
      <div className="relative w-full">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md leading-5 bg-white dark:bg-gray-700 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          placeholder={searchPlaceHolder}
        />
      </div>
    </div>
  );
};

export default SearchBar;
