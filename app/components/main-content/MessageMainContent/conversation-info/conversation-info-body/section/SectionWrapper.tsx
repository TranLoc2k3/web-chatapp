import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import React from "react";

interface IProps {
  title: string;
  children: React.ReactNode;
}

interface SectionButtonProps {
  icon: React.ReactNode;
  title: string;
  rightIcon?: React.ReactNode[];
}

export const SectionButton = ({
  icon,
  title,
  rightIcon,
}: SectionButtonProps) => {
  return (
    <div className="flex gap-3 px-4 h-12 items-center hover:bg-[#f3f5f6] cursor-pointer w-full">
      <div>
        {icon}
        <span className="text-[#081C36] text-sm">{title}</span>
      </div>
      <div>{rightIcon}</div>
    </div>
  );
};

function SectionWrapper({ title, children }: IProps) {
  return (
    <div className="border-t-8 border-[#eef0f1]">
      <Accordion type="single" collapsible>
        <AccordionItem className="border-none text-[#081C36]" value="item-1">
          <AccordionTrigger className="px-4 hover:no-underline pb-2">
            {title}
          </AccordionTrigger>
          <AccordionContent className="p-0">{children}</AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

export default SectionWrapper;
