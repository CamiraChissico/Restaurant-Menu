"use client"

import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "./language-context"

interface ReservationConfirmationProps {
  reservation: {
    name: string
    email: string
    phone: string
    date: Date
    time: string
    guests: number
    tableId: string
    confirmationCode: string
  }
  onClose: () => void
}

export default function ReservationConfirmation({ reservation, onClose }: ReservationConfirmationProps) {
  const { language, t } = useLanguage()

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-in fade-in duration-300 p-4">
      <div className="bg-white dark:bg-[#5E3A4D] p-8 rounded-xl max-w-md w-full text-center border-2 border-[#FF1493] shadow-xl">
        <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
          <Check className="w-8 h-8 text-green-600 dark:text-green-300" />
        </div>

        <h3 className="text-2xl font-bold text-[#FFD700] mb-2">{t("reservationConfirmed")}</h3>

        <div className="mb-6 text-left bg-[rgba(255,215,0,0.1)] p-4 rounded-lg border border-[#FFD700]">
          <p className="mb-1">
            <span className="font-bold">{t("confirmationCode")}:</span> {reservation.confirmationCode}
          </p>
          <p className="mb-1">
            <span className="font-bold">{t("table")}:</span> {reservation.tableId}
          </p>
          <p className="mb-1">
            <span className="font-bold">{t("date")}:</span>{" "}
            {format(reservation.date, "PPPP", { locale: language === "PT" ? ptBR : undefined })}
          </p>
          <p className="mb-1">
            <span className="font-bold">{t("time")}:</span> {reservation.time}
          </p>
          <p className="mb-1">
            <span className="font-bold">{t("guests")}:</span> {reservation.guests}
          </p>
          <p className="mb-1">
            <span className="font-bold">{t("name")}:</span> {reservation.name}
          </p>
        </div>

        <p className="text-sm mb-6">
          {t("confirmationEmail")} {reservation.email}. {t("modifyReservation")}
        </p>

        <Button
          className="w-full bg-gradient-to-r from-[#FF1493] to-[#DB7093] hover:from-[#DB7093] hover:to-[#FF1493] text-white rounded-full"
          onClick={onClose}
        >
          {t("close")}
        </Button>
      </div>
    </div>
  )
}
