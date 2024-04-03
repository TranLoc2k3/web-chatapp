import { iconStyle } from "@/app/utils/iconStyle";
import { Link } from "lucide-react";

function LinkItem() {
  return (
    <div className="px-4 flex gap-2 h-16 items-center cursor-pointer hover:bg-[#f3f5f6]">
      <div className="size-10 bg-[#f9fafb] rounded flex items-center justify-center border border-[#d6dbe1]">
        <Link {...iconStyle} />
      </div>
      <div className="flex-1">
        <span className="text-sm text-[#081C36] font-[600]">
          https://www.facebook.com/
        </span>
        <p className="text-[#7589A3] text-xs text-right">Hôm nay</p>
      </div>
    </div>
  );
}

export default LinkItem;
