import { X } from "lucide-react";

interface IProps {
  url: string;
  onClose: () => void;
}

function VideoPreviewModal({ url, onClose }: IProps) {
  return (
    <div className="fixed top-0 right-0 left-0 bottom-0 bg-white z-[9999999]">
      <video className="size-full" controls autoPlay>
        <source src={url} />
      </video>
      <div
        onClick={onClose}
        className="absolute top-10 right-10 cursor-pointer hover:opacity-80"
      >
        <X />
      </div>
    </div>
  );
}

export default VideoPreviewModal;
