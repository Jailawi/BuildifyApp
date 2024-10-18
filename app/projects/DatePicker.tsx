"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

interface Props {
    date: string | Date;
    setDate: any;
    onChange: (date: string | undefined) => void;
}

export function DatePicker({ date, setDate, onChange }: Props) {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant={"outline"}
                    className={cn(
                        "w-[280px] justify-start text-left font-normal border border-zinc-800",
                        !date && "text-muted-foreground"
                    )}
                >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 bg-neutral-900 border border-zinc-800">
                <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(date) => {
                        setDate(
                            new Date(
                                date.getFullYear(),
                                date.getMonth(),
                                date.getDate(),
                                date.getHours(),
                                date.getMinutes() - date?.getTimezoneOffset()
                            )
                        );
                        onChange(
                            date
                                ? new Date(
                                      date.getFullYear(),
                                      date.getMonth(),
                                      date.getDate(),
                                      date.getHours(),
                                      date.getMinutes()
                                  ).toISOString()
                                : ""
                        );
                    }}
                    initialFocus
                />
            </PopoverContent>
        </Popover>
    );
}
