import React, { ChangeEvent, use } from "react";

import { SearchIcon } from "lucide-react";
import { useBearStore } from "@/app/global-state/store";

const Search: React.FC = () => {
const searchTerm= useBearStore((state) => state.searchTerm);
const setSearchTerm = useBearStore((state) => state.setSearchTerm);
const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
  setSearchTerm(e.target.value);
};
  return (
    <div className="relative flex-1">
      <SearchIcon
        width={14}
        height={14}
        className="absolute top-1/2 -translate-y-1/2 left-3 text-[#081c36]"
      />
      <input
        type="text"
        placeholder="Tìm kiếm"
        className="px-8 bg-[#eaedf0] border border-[#eaedf0] rounded-[5px] w-full text-sm placeholder:text-sm h-8 leading-8"
        value={searchTerm}
        onChange={handleSearchChange}
      />
    </div>
  );
}

export default Search;
