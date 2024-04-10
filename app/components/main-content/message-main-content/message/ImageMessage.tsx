import Image from "next/image";

interface IProps {
  url: string;
}

function ImageMessage({ url }: IProps) {
  return (
    <div>
      <Image
        width={1280}
        height={368}
        quality={100}
        className="h-[368px]"
        alt=""
        src={url}
      />
    </div>
  );
}

export default ImageMessage;
