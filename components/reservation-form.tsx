"use client"

import type React from "react"

import { useState } from "react"
import { CalendarCheck, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { DateTimePicker } from "./date-time-picker"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useLanguage } from "./language-context"

interface ReservationFormProps {
  onReserve: (reservation: {
    name: string
    email: string
    phone: string
    date: Date
    time: string
    guests: number
    tableId: string
  }) => void
  selectedTable: string | null
  onCancel: () => void
}

export default function ReservationForm({ onReserve, selectedTable, onCancel }: ReservationFormProps) {
  const { t } = useLanguage()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [time, setTime] = useState<string | undefined>(undefined)
  const [guests, setGuests] = useState<number>(2)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!date || !time || !selectedTable) return

    onReserve({
      name,
      email,
      phone,
      date,
      time,
      guests,
      tableId: selectedTable,
    })
  }

  return (
    <Card className="border-2 border-[#FF1493] shadow-lg">
      <CardHeader className="bg-gradient-to-r from-[#FF1493]/10 to-transparent">
        <CardTitle className="text-[#FFD700] flex items-center gap-2">
          <CalendarCheck className="h-5 w-5" /> {t("reserveTableTitle")} {selectedTable}
        </CardTitle>
        <CardDescription>{t("fillDetails")}</CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">{t("fullName")}</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="border-[#FF1493]"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">{t("email")}</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="border-[#FF1493]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">{t("phoneNumber")}</Label>
              <Input
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className="border-[#FF1493]"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>{t("dateTime")}</Label>
            <DateTimePicker date={date} setDate={setDate} time={time} setTime={setTime} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="guests">{t("numberOfGuests")}</Label>
            <div className="flex items-center">
              <Users className="mr-2 h-4 w-4 text-[#FF1493]" />
              <Select value={guests.toString()} onValueChange={(value) => setGuests(Number.parseInt(value))}>
                <SelectTrigger className="w-full border-2 border-[#FF1493]">
                  <SelectValue placeholder={t("numberOfGuests")} />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                    <SelectItem key={num} value={num.toString()}>
                      {num} {num === 1 ? t("guest") : t("guests")}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              className="flex-1 border-2 border-[#FF1493] text-[#FF1493]"
            >
              {t("cancel")}
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-gradient-to-r from-[#FF1493] to-[#DB7093] hover:from-[#DB7093] hover:to-[#FF1493] text-white"
              disabled={!date || !time}
            >
              {t("reserve")}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
