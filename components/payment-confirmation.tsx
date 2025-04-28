"use client"

import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "./language-context"

interface PaymentConfirmationProps {
  orderId: string
  onViewReceipt: () => void
  selectedTable: string | null
}

export default function PaymentConfirmation({ orderId, onViewReceipt, selectedTable }: PaymentConfirmationProps) {
  const { t } = useLanguage()

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-in fade-in duration-300">
      <div className="bg-white dark:bg-[#5E3A4D] p-8 rounded-xl max-w-md w-full text-center border-2 border-[#FF1493] shadow-xl">
        <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
          <Check className="w-8 h-8 text-green-600 dark:text-green-300" />
        </div>

        <h3 className="text-2xl font-bold text-[#FFD700] mb-2">{t("paymentSuccessful")}</h3>

        <p className="mb-2">
          {t("thankYou")}
          {orderId} {t("hasBeenConfirmed")}
        </p>

        {selectedTable && (
          <p className="mb-4 p-2 bg-[rgba(255,215,0,0.1)] rounded-md border border-[#FFD700] inline-block">
            {t("yourTable")}: <span className="font-bold">{selectedTable}</span>
          </p>
        )}

        <p className="text-sm mb-6 opacity-80">{t("notification")}</p>

        <Button
          className="w-full bg-gradient-to-r from-[#FF1493] to-[#DB7093] hover:from-[#DB7093] hover:to-[#FF1493] text-white rounded-full"
          onClick={onViewReceipt}
        >
          {t("viewReceipt")}
        </Button>
      </div>
    </div>
  )
}
