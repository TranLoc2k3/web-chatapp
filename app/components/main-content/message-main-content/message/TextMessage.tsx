import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface IProps {
  content: string;
  isLink: boolean;
}

const LinkMessage = ({ url }: { url: string }) => {
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
  }, [url]);
  if (!data?.image)
    return (
      <Link
        href={url}
        className="text-[#005ae0] block break-all"
        target="_blank"
      >
        {url}
      </Link>
    );

  return (
    <div className="w-full min-w-[230px]">
      <Link
        href={url}
        className="text-[#005ae0] block break-all"
        target="_blank"
      >
        <span className="mb-1 block">{url}</span>
        <Image
          src={data?.image}
          alt=""
          width={300}
          height={100}
          className="rounded-md w-full"
        />

        <p className="font-[500] text-[#081c36] text-sm my-1">{data.title}</p>
        <p className="text-ellipsis whitespace-nowrap break-all overflow-hidden text-sm text-[#081c36] w-full">
          {data.description}
        </p>
        <p className="text-ellipsis whitespace-nowrap break-all overflow-hidden text-sm text-[#005ae0]">
          {data.url}
        </p>
      </Link>
    </div>
  );
};

function TextMessage({ content, isLink }: IProps) {
  return (
    <div>
      {!isLink ? (
        <p className="break-all">{content}</p>
      ) : (
        <LinkMessage url={content} />
      )}
    </div>
  );
}

export default TextMessage;
