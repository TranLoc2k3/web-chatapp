import { FileExcelIcon } from "@/app/components/icons/FileExcelIcon";
import { FileIconBackground } from "@/app/components/icons/FileIconBackground";
import { FileOtherIcon } from "@/app/components/icons/FileOtherIcon";
import { FilePdfIcon } from "@/app/components/icons/FilePdfIcon";
import { FilePowerPointIcon } from "@/app/components/icons/FilePowerPointIcon";
import { FileWordIcon } from "@/app/components/icons/FileWordIcon";
import { FileZipIcon } from "@/app/components/icons/FileZipIcon";
import { detectTypeFileFromUrl } from "@/app/utils/detectTypeFile";
import { iconStyle } from "@/app/utils/iconStyle";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { DownloadIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export const fileIcons = {
  word: FileWordIcon,
  excel: FileExcelIcon,
  pptx: FilePowerPointIcon,
  zip: FileZipIcon,
  csv: FileIconBackground,
  txt: FileIconBackground,
  pdf: FilePdfIcon,
  other: FileOtherIcon,
};

interface IProps {
  fileUrl: string;
}

export const getIconOfFile = (fileExtension: string) => {
  let typeOfFile = "";
  switch (fileExtension) {
    case "doc":
      typeOfFile = "word";
      break;
    case "docx":
      typeOfFile = "word";
      break;
    case "xls":
      typeOfFile = "excel";
      break;
    case "xlsx":
      typeOfFile = "excel";
      break;
    case "pdf":
      typeOfFile = "pdf";
      break;
    case "zip":
      typeOfFile = "zip";
      break;
    case "rar":
      typeOfFile = "zip";
      break;
    case "csv":
      typeOfFile = "csv";
      break;
    case "txt":
      typeOfFile = "txt";
      break;
    case "pptx":
      typeOfFile = "pptx";
      break;
    default:
      typeOfFile = "other";
      break;
  }
  return fileIcons[typeOfFile as keyof typeof fileIcons] || FileIconBackground;
};

function FileMessage({ fileUrl }: IProps) {
  const [fileProps, setFileProps] = useState<any>({
    name: "",
    size: "",
    type: "",
  });
  const fileExtension = detectTypeFileFromUrl(fileUrl);
  const FileIcon = getIconOfFile(fileExtension);
  const getFileName = (fileUrl: string) => {
    const uuidRegex =
      /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}_/;

    return decodeURIComponent(fileUrl.replace(uuidRegex, ""));
  };
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(fileUrl);

      setFileProps({
        name: getFileName(fileUrl.split(".com/")[1]),
        size: Math.floor(res.headers["content-length"] / 1024) + " KB",
        type: res.headers["content-type"],
      });
    };
    fetchData();
  }, [fileUrl]);
  return (
    <div className="flex gap-3">
      <FileIcon />
      <div className="flex-1 pr-3 pt-1">
        <p className="font-[500] line-clamp-1 text-sm">{fileProps.name}</p>
        <div className="text-[#7589A3] text-[13px] flex justify-between items-center mt-1">
          <span>{fileProps.size}</span>
          <div>
            <Button variant="outline" size="icon" className="size-7">
              <Link target="_parent" download={true} href={fileUrl}>
                <DownloadIcon {...iconStyle} widths={20} height={20} />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FileMessage;
