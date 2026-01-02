import * as React from "react";
import { format } from "date-fns";
import { DayPicker, DateRange } from "react-day-picker";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "react-day-picker/dist/style.css";

interface DateRangePickerProps {
  className?: string;
  date: DateRange | undefined;
  setDate: (date: DateRange | undefined) => void;
  minDate?: Date;
}

export function DateRangePicker({
  className,
  date,
  setDate,
  minDate = new Date(),
}: DateRangePickerProps) {
  return (
    <div
      className={`p-4 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-2xl ${className}`}
    >
      <DayPicker
        mode="range"
        defaultMonth={date?.from}
        selected={date}
        onSelect={setDate}
        numberOfMonths={1}
        pagedNavigation
        showOutsideDays
        fromDate={minDate}
        classNames={{
          months:
            "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
          month: "space-y-4",
          caption: "flex justify-center pt-1 relative items-center mb-2",
          caption_label: "text-sm font-semibold text-gray-900 dark:text-white",
          nav: "space-x-1 flex items-center absolute w-full justify-between opacity-100 px-1", // improved nav positioning
          nav_button:
            "h-7 w-7 bg-transparent p-0 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors rounded-full flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-800",
          nav_button_previous: "z-10",
          nav_button_next: "z-10",
          table: "w-full border-collapse space-y-1",
          head_row: "flex",
          head_cell:
            "text-gray-500 dark:text-gray-400 rounded-md w-9 font-normal text-[0.8rem]",
          row: "flex w-full mt-2",
          cell: "text-center text-sm p-0 relative [&:has([aria-selected])]:bg-blue-50/50 dark:[&:has([aria-selected])]:bg-blue-900/20 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
          day: "h-9 w-9 p-0 font-normal aria-selected:opacity-100 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors text-gray-900 dark:text-gray-200",
          day_range_end: "day-range-end",
          day_selected:
            "bg-blue-600 text-white hover:bg-blue-600 hover:text-white focus:bg-blue-600 focus:text-white rounded-md shadow-sm",
          day_today:
            "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white font-semibold",
          day_outside: "text-gray-300 dark:text-gray-600 opacity-50",
          day_disabled: "text-gray-300 dark:text-gray-600 opacity-50",
          day_range_middle:
            "aria-selected:bg-blue-50 aria-selected:text-blue-700 dark:aria-selected:bg-blue-900/30 dark:aria-selected:text-blue-300 rounded-none",
          day_hidden: "invisible",
        }}
        components={{
          IconLeft: ({ ...props }) => <ChevronLeft className="h-4 w-4" />,
          IconRight: ({ ...props }) => <ChevronRight className="h-4 w-4" />,
        }}
      />
    </div>
  );
}
