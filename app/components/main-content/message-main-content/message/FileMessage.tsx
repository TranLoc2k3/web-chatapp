"use client";
import { FileWordIcon } from "@/app/components/icons/FileWordIcon";
import { iconStyle } from "@/app/utils/iconStyle";
import { Button } from "@/components/ui/button";
import { DownloadIcon } from "lucide-react";
import Link from "next/link";

function FileMessage() {
  return (
    <div className="flex gap-3">
      <FileWordIcon />
      <div className="flex-1">
        <p className="font-[600]">TinTin.docx</p>
        <div className="text-[#7589A3] text-sm flex justify-between items-center">
          <span>18.39 KB</span>
          <div>
            <Button variant="outline" size="icon">
              <Link
                target="_parent"
                href="https://demo-s3-bucket-iuh.s3.ap-southeast-1.amazonaws.com/Tao_XacMinh_ChuKy.docx"
              >
                <DownloadIcon {...iconStyle} />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FileMessage;
