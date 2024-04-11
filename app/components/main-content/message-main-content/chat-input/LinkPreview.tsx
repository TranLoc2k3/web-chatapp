import Image from "next/image";
import { useEffect, useState } from "react";

interface IProps {
  url: string;
}

export const LinkPreviewSkeleton = () => {
  return (
    <div className="bg-[#eef0f1] rounded-[8px] gap-3 p-2 flex items-center cursor-pointer mt-2">
      <div className="relative size-16">
        <div className="bg-gray-300 animate-pulse w-full h-full rounded-[6px] overflow-hidden"></div>
      </div>
      <div className="flex flex-col justify-center flex-1 overflow-hidden">
        <div className="bg-gray-300 animate-pulse w-3/4 h-4 mb-1 rounded"></div>
        <div className="bg-gray-300 animate-pulse w-full h-4 mb-1 rounded"></div>
        <div className="bg-gray-300 animate-pulse w-3/4 h-4 rounded"></div>
      </div>
    </div>
  );
};

function LinkPreview({ url }: IProps) {
  const [data, setData] = useState<any>(null);
  const q = {
    q: url,
  };
  useEffect(() => {
    const getData = async () => {
      const res = await fetch("https://api.linkpreview.net", {
        method: "POST",
        headers: {
          "X-Linkpreview-Api-Key": "fb20670c5ebe667e325ca2bf6d8e7b27",
        },
        mode: "cors",
        body: JSON.stringify(q),
      });
      const resData = await res.json();
      setData(resData);
    };
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (!data) return <LinkPreviewSkeleton />;
  return (
    <div className="bg-[#eef0f1] rounded-[8px] gap-3 p-2 flex items-center cursor-pointer mt-2 w-full overflow-hidden">
      <div className="relative size-16">
        <Image
          src={data.image}
          alt=""
          fill
          className="object-cover rounded-[6px] overflow-hidden"
        />
      </div>
      <div className="flex flex-col justify-center flex-1 overflow-hidden">
        <p className="font-[500] text-[#081c36] text-sm">{data.title}</p>
        <p className="text-ellipsis whitespace-nowrap break-all overflow-hidden text-sm text-[#081c36] w-full">
          {data.description}
        </p>
        <p className="text-ellipsis whitespace-nowrap break-all overflow-hidden text-sm text-[#005ae0]">
          {data.url}
        </p>
      </div>
    </div>
  );
}

export default LinkPreview;
