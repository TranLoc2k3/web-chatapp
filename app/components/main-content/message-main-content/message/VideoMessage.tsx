import { FileIconBackground } from "@/app/components/icons/FileIconBackground";
import { detectTypeFileFromUrl } from "@/app/utils/detectTypeFile";
import { iconStyle } from "@/app/utils/iconStyle";
import { Button } from "@/components/ui/button";
import { DownloadIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import VideoPreviewModal from "./VideoPreviewModal";

interface IProps {
  fileName: string;
  fizeSize: string;
  fileUrl: string;
}

function VideoMessage({ fileName, fizeSize, fileUrl }: IProps) {
  const [openPreview, setOpenPreview] = useState(false);
  const fileExtension = detectTypeFileFromUrl(fileUrl);
  return (
    <div className="flex gap-3">
      <FileIconBackground />
      <div className="flex-1">
        <p className="font-[600]">{fileName}</p>
        <div className="text-[#7589A3] text-sm flex justify-between items-center">
          <p className="flex gap-2">
            {fizeSize}
            <span
              onClick={() => setOpenPreview(true)}
              className="cursor-pointer hover:underline"
            >
              Nhấn để xem trước
            </span>
          </p>
          <div>
            <Button variant="outline" size="icon">
              <Link target="_parent" download={true} href={fileUrl}>
                <DownloadIcon {...iconStyle} />
              </Link>
            </Button>
          </div>
        </div>
      </div>
      {openPreview && (
        <VideoPreviewModal
          onClose={() => setOpenPreview(false)}
          url={fileUrl}
        />
      )}
    </div>
  );
}

export default VideoMessage;