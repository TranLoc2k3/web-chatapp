import { SearchIcon } from "lucide-react";

function Search() {
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
      />
    </div>
  );
}

export default Search;
