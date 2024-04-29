import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import React from "react";
import { HeaderButton } from "../../conversation-info-header/ConversationInfoButton";

interface IProps {
  title: string;
  children: React.ReactNode;
}

interface SectionButtonProps {
  icon: React.ReactNode;
  title: string;
  subTitle?: string;
  isLink?: boolean;
  isDangerous?: boolean;
  rightIconList?: RightIconType[];
  onClick?: any;
}

interface RightIconType {
  icon: React.ReactNode;
  isDynamic?: boolean;
}

export const SectionButton = ({
  icon,
  title,
  rightIconList,
  subTitle,
  isLink = false,
  isDangerous = false,
  onClick,
}: SectionButtonProps) => {
  return (
    <div
      onClick={onClick}
      className="flex justify-between px-4 h-12 items-center hover:bg-[#f3f5f6] cursor-pointer w-full"
    >
      <div className="flex gap-3 items-center">
        {icon}
        <p className="flex flex-col">
          <span
            className={cn(
              "text-[#081C36] text-sm",
              `${isDangerous && "text-red-500"}`
            )}
          >
            {title}
          </span>
          <span
            className={cn(
              "text-xs",
              `${isLink ? "text-[#0068ff]" : "text-[#7589a3]"}`
            )}
          >
            {subTitle}
          </span>
        </p>
      </div>
      <div className="flex gap-2">
        {rightIconList?.map((rightIcon, index) => (
          <HeaderButton
            className={
              rightIcon.isDynamic ? "bg-transparent hover:bg-transparent" : ""
            }
            key={index}
            activeIcon={rightIcon.icon}
          />
        ))}
      </div>
    </div>
  );
};

function SectionWrapper({ title, children }: IProps) {
  return (
    <div className="border-t-8 border-[#eef0f1]">
      <Accordion type="single" defaultValue="item-1" collapsible>
        <AccordionItem className="border-none text-[#081C36]" value="item-1">
          <AccordionTrigger className="px-4 hover:no-underline py-3">
            {title}
          </AccordionTrigger>
          <AccordionContent className="p-0">{children}</AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

export default SectionWrapper;
