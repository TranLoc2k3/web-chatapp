import React, { ChangeEvent } from "react";

import { SearchIcon } from "lucide-react";
interface SearchProps {
  // nhận value thay đổi để check.
  searchTerm: string;
  onSearchChange: (value: string) => void;
}
const Search: React.FC<SearchProps> = ({ searchTerm, onSearchChange }) => {
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    onSearchChange(event.target.value);
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
        onChange={handleInputChange}
      />
    </div>
  );
}

export default Search;
