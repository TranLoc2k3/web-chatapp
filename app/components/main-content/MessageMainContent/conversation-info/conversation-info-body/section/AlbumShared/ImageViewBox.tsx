import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { MoreHorizontal, Play, Share } from "lucide-react";
import Image from "next/image";

export enum ViewBoxType {
  IMAGE = "image",
  VIDEO = "video",
}

interface IProps {
  type: ViewBoxType;
}

function ImageViewBox({ type }: IProps) {
  return (
    <div className="cursor-pointer relative [&_div:last-child]:hover:block">
      <Image
        src="https://kenh14cdn.com/thumb_w/660/203336854389633024/2023/7/8/photo-9-16888099662661094157342.jpg"
        alt=""
        width={72}
        height={72}
        className="w-[72px] h-[72px] object-cover rounded"
      />
      {/* Play Button -> Video */}
      {type === ViewBoxType.VIDEO && (
        <div
          className={cn(
            "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-8",
            "rounded-[50%] bg-[rgba(0,0,0,0.6)] flex items-center justify-center"
          )}
        >
          <Play
            fill="#FFF"
            width={20}
            height={20}
            strokeWidth={1.5}
            stroke="#FFF"
          />
        </div>
      )}
      {/* Button */}
      <div className="absolute top-2 right-[2px] hidden">
        <Button
          variant="icon"
          size="icon"
          className="size-6 rounded mx-1 bg-white"
        >
          <Share strokeWidth={1.5} width={16} height={16} />
        </Button>
        <Button
          variant="icon"
          size="icon"
          className="size-6 rounded mx-[2px] bg-white"
        >
          <MoreHorizontal strokeWidth={1.5} width={16} height={16} />
        </Button>
      </div>
    </div>
  );
}

export default ImageViewBox;
