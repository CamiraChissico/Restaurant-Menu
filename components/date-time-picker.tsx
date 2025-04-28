"use client"
import { CalendarIcon, Clock } from "lucide-react"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useLanguage } from "./language-context"

interface DateTimePickerProps {
  date: Date | undefined
  setDate: (date: Date | undefined) => void
  time: string | undefined
  setTime: (time: string | undefined) => void
}

// Generate time slots from 11:00 to 22:00 (restaurant hours)
const generateTimeSlots = () => {
  const slots = []
  for (let hour = 11; hour <= 22; hour++) {
    const hourStr = hour.toString().padStart(2, "0")
    slots.push(`${hourStr}:00`)
    if (hour < 22) {
      slots.push(`${hourStr}:30`)
    }
  }
  return slots
}

const timeSlots = generateTimeSlots()

export function DateTimePicker({ date, setDate, time, setTime }: DateTimePickerProps) {
  const { language, t } = useLanguage()

  return (
    <div className="flex flex-col md:flex-row gap-4">
      <div className="flex-1">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full justify-start text-left font-normal border-2 border-[#FF1493] hover:bg-[rgba(255,20,147,0.1)]",
                !date && "text-muted-foreground",
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4 text-[#FF1493]" />
              {date ? (
                format(date, "PPP", { locale: language === "PT" ? ptBR : undefined })
              ) : (
                <span>{t("pickDate")}</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              initialFocus
              disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
              className="border-2 border-[#FF1493]"
              locale={language === "PT" ? ptBR : undefined}
            />
          </PopoverContent>
        </Popover>
      </div>

      <div className="flex-1">
        <Select value={time} onValueChange={setTime}>
          <SelectTrigger className="w-full border-2 border-[#FF1493] hover:bg-[rgba(255,20,147,0.1)]" disabled={!date}>
            <SelectValue placeholder={t("pickTime")}>
              {time ? (
                <div className="flex items-center">
                  <Clock className="mr-2 h-4 w-4 text-[#FF1493]" />
                  <span>{time}</span>
                </div>
              ) : (
                <div className="flex items-center">
                  <Clock className="mr-2 h-4 w-4 text-[#FF1493]" />
                  <span>{t("pickTime")}</span>
                </div>
              )}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {timeSlots.map((slot) => (
              <SelectItem key={slot} value={slot}>
                {slot}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
