import React, { ChangeEvent, useRef } from "react";
import { Search } from "lucide-react";

interface SearchProp {
  searchTerm: string;
  onChangeSearch: (value: string) => void;
}
const SearchFriend: React.FC<SearchProp> = ({ searchTerm, onChangeSearch }) => {
  const clickInput = useRef<HTMLInputElement>(null);
  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChangeSearch(event.target.value);
  };
  const handleSearchClick = (ref: React.RefObject<HTMLInputElement>) => {
    ref.current?.focus();
  };
  return (
    <div
      className=" border-2 flex space-x-2 w-[30%] h-[30px] p-1 items-center"
      onClick={() => handleSearchClick(clickInput)}
    >
      <Search className="hover:cursor-pointer w-[15px] ml-2" />
      <input
        type="text"
        placeholder="Tìm bạn"
        className="text-sm"
        value={searchTerm}
        onChange={handleSearchChange}
        ref={clickInput}
      />
    </div>
  );
};
export default SearchFriend;
