import Image from "next/image";
import FileMessage from "./FileMessage";

const MessageItem = () => {
  return (
    <div className="flex gap-3 mx-4">
      {/* Sender */}
      <div>
        <Image
          src="https://products111.s3.ap-southeast-1.amazonaws.com/Avatar84704462651"
          alt=""
          width={40}
          height={40}
          className="h-10 rounded-full"
        />
      </div>
      {/* Content */}
      <div className="bg-white p-3 rounded-[8px] w-[376px] max-w-[calc(100%-100px)]">
        <p className="text-[#7589A3] text-sm mb-3">Ngọc Thắng</p>
        <FileMessage />
        <p className="text-[#476285] text-xs mt-3">11:00</p>
      </div>
    </div>
  );
};

export default MessageItem;
