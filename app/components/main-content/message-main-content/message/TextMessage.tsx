import Link from "next/link";

interface IProps {
  content: string;
  isLink: boolean;
}

function TextMessage({ content, isLink }: IProps) {
  return (
    <div>
      {!isLink ? (
        <p className="break-all">{content}</p>
      ) : (
        <Link
          href={content}
          className="text-[#005ae0] block break-all"
          target="_blank"
        >
          {content}
        </Link>
      )}
    </div>
  );
}

export default TextMessage;
