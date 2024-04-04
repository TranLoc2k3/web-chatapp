"use client";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

function BackButton() {
  const router = useRouter();
  const onClick = () => {
    router.back();
  };
  return (
    <Button
      onClick={onClick}
      variant="icon"
      className="rounded-[50%]"
      size="icon"
    >
      <ChevronLeft color="#081c36" strokeWidth={1.5} width={26} height={26} />
    </Button>
  );
}

export default BackButton;
