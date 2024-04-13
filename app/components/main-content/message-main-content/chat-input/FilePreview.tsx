import { FileWordIcon } from "@/app/components/icons/FileWordIcon";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Trash } from "lucide-react";
import { getIconOfFile } from "../message/FileMessage";
import { detectTypeFileFromUrl } from "@/app/utils/detectTypeFile";

interface IProps {
  fileName: string;
}

function FilePreview({ fileName }: IProps) {
  const fileExtension = detectTypeFileFromUrl(fileName);
  const FileIcon = getIconOfFile(fileExtension);
  return (
    <div>
      <div
        className={cn(
          "size-[72px] relative border border-[#d6dbe1] bg-[#f3f5f6] rounded-[4px] overflow-hidden box-border cursor-pointer"
        )}
      >
        <div className="flex justify-center items-center flex-col gap-1 py-2">
          <FileIcon width={34} height={34} />
          <p className="text-xs text-[#081C36] p-1 w-full text-ellipsis whitespace-nowrap break-all overflow-hidden">
            {fileName}
          </p>
        </div>
      </div>
    </div>
  );
}

export default FilePreview;
