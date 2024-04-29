import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import BackButton from "../header/BackButton";
import { useBearStore } from "@/app/global-state/store";

interface IProps {
  title: string;
  children: React.ReactNode;
}

function ContentLayout({ title, children }: IProps) {
  const setOpenChildModalConversationInfo = useBearStore(
    (state) => state.setOpenChildModalConversationInfo
  );
  return (
    <>
      <div
        //   onClick={onClose}
        className={cn(
          "fixed inset-0",
          // `${state.isOpenConversationInfo ? "" : "hidden"}`,
          "md:hidden"
        )}
      />
      <div
        className={cn(
          "w-[344px] h-dvh shadow-[0_0_10px_rgba(0,0,0,0.25)] bg-white absolute top-0 right-0 z-10 transition-all duration-300",

          "md:relative"
        )}
      >
        {/* Title */}
        <div className="h-[68px] flex items-center px-3">
          <BackButton onClick={setOpenChildModalConversationInfo} />
          <p className="text-[17px] text-[#081c36] font-[600] text-center leading-[68px] flex-1">
            {title}
          </p>
        </div>
        <Separator />
        <div className="px-3">{children}</div>
      </div>
    </>
  );
}

export default ContentLayout;
