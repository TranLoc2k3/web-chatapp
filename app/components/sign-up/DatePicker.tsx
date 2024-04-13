import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

interface IProps {
  date: Date | undefined;
  setDate: Dispatch<SetStateAction<Date | undefined>>;
}

function DatePicker({ date, setDate }: IProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "P") : <span>Chọn ngày sinh</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          locale={vi}
          className="p-2"
          classNames={{
            caption: "flex justify-between pt-1 relative items-center",
            caption_label: "flex items-center text-base font-medium",
          }}
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
          defaultMonth={date}
          captionLayout="dropdown-buttons"
          fromYear={1900}
          toYear={new Date().getFullYear() - 14}
        />
      </PopoverContent>
    </Popover>
  );
}

export default DatePicker;
