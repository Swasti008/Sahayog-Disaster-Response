import React from "react";
import { Search, Filter, Grid, Calendar } from "lucide-react";

const SearchBar = () => {
  return (
    <div className="flex items-center bg-white rounded-full shadow-md p-2 max-w-xl mb-2">
      <div className="flex-grow flex items-center px-3">
        <input
          type="text"
          placeholder="Search"
          className="w-full bg-transparent outline-none text-gray-700 placeholder-gray-400"
        />
        <Search className="text-gray-400 w-5 h-5 ml-2" />
      </div>
      <div className="flex items-center border-l border-gray-300 pl-3">
        <button className="text-gray-400 hover:text-gray-600 p-1">
          <Filter className="w-5 h-5" />
        </button>
        <div className="border-l border-gray-300 h-6 mx-2"></div>
        <button className="bg-black text-white rounded p-1.5">
          <Grid className="w-5 h-5" />
        </button>
        <button className="text-gray-400 hover:text-gray-600 p-1.5">
          <Calendar className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
