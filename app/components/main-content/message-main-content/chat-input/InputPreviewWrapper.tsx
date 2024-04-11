import { Button } from "@/components/ui/button";
import FilePreview from "./FilePreview";
import ImagePreview from "./ImagePreview";
import { Trash } from "lucide-react";

interface IProps {
  fileList: File[];
  setFileList: React.Dispatch<React.SetStateAction<File[]>>;
}

// Image or File
export const detectTypeOfPreview = (file: File) => {
  const type = file.type;
  if (type.includes("image")) return "image";
  return "file";
};

function InputPreviewWrapper({ fileList, setFileList }: IProps) {
  // Filename + lastModified -> 2 field nhận diện giữa các file nếu trùng tên
  const onDelete = (fileName: string, lastModified: number) => {
    const newFileList = fileList.filter(
      (file) => file.name !== fileName && file.lastModified !== lastModified
    );
    setFileList(newFileList);
  };
  return (
    <div className="py-[10px] px-3 flex gap-3">
      {fileList.map((file, index) => {
        const type = detectTypeOfPreview(file);
        return (
          <div key={index} className="relative [&:hover_button]:flex">
            {type === "image" ? (
              <ImagePreview file={file} />
            ) : (
              <FilePreview fileName={file.name} />
            )}

            <Button
              className="bg-white border border-[#dfe2e7] justify-center items-center size-6 absolute z-[1] top-1 right-1 rounded-[4px] overflow-hidden hidden"
              size="icon"
              variant="icon"
              onClick={() => onDelete(file.name, file.lastModified)}
            >
              <Trash width={16} height={16} strokeWidth={1.6} />
            </Button>
          </div>
        );
      })}
    </div>
  );
}

export default InputPreviewWrapper;
