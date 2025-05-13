"use client"

import { useState } from "react"
import { CreditCard, Smartphone, Wallet } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useLanguage } from "./language-context"

interface PaymentSectionProps {
  onPayment: (method: string) => void
  total: number
}

export default function PaymentSection({ onPayment, total }: PaymentSectionProps) {
  const { language, t } = useLanguage()
  const [activeMethod, setActiveMethod] = useState("card")

  return (
    <div className="animate-in fade-in slide-in-from-bottom-5 duration-300">
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div
          className={`p-3 border rounded-lg text-center cursor-pointer transition-all ${
            activeMethod === "mpesa"
              ? "border-[#FFD700] bg-[rgba(255,20,147,0.2)]"
              : "border-[#FF1493] hover:bg-[rgba(255,20,147,0.1)]"
          }`}
          onClick={() => setActiveMethod("mpesa")}
        >
          <Smartphone className="w-5 h-5 mx-auto mb-1 text-[#FF1493]" />
          <div className="text-sm">Mpesa</div>
        </div>

        <div
          className={`p-3 border rounded-lg text-center cursor-pointer transition-all ${
            activeMethod === "emola"
              ? "border-[#FFD700] bg-[rgba(255,20,147,0.2)]"
              : "border-[#FF1493] hover:bg-[rgba(255,20,147,0.1)]"
          }`}
          onClick={() => setActiveMethod("emola")}
        >
          <Wallet className="w-5 h-5 mx-auto mb-1 text-[#FF1493]" />
          <div className="text-sm">Emola</div>
        </div>

        <div
          className={`p-3 border rounded-lg text-center cursor-pointer transition-all ${
            activeMethod === "card"
              ? "border-[#FFD700] bg-[rgba(255,20,147,0.2)]"
              : "border-[#FF1493] hover:bg-[rgba(255,20,147,0.1)]"
          }`}
          onClick={() => setActiveMethod("card")}
        >
          <CreditCard className="w-5 h-5 mx-auto mb-1 text-[#FF1493]" />
          <div className="text-sm">Card</div>
        </div>
      </div>

      {activeMethod === "card" && (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="cardNumber">{t("cardNumber")}</Label>
            <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="cardName">{t("cardholderName")}</Label>
            <Input id="cardName" defaultValue="Yasser Vilanculos" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="expiryDate">{t("expiryDate")}</Label>
              <Input id="expiryDate" placeholder="MM/YY" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="cvv">{t("cvv")}</Label>
              <Input id="cvv" placeholder="123" />
            </div>
          </div>

          <Button
            className="w-full bg-gradient-to-r from-[#FF1493] to-[#DB7093] hover:from-[#DB7093] hover:to-[#FF1493] text-white rounded-full mt-4"
            onClick={() => onPayment("card")}
          >
            {t("pay")} {total} MZN {t("now")}
          </Button>
        </div>
      )}

      {activeMethod === "mpesa" && (
        <div className="text-center space-y-4">
          <p>{t("mpesaPrompt")}</p>
          <div className="bg-[rgba(255,20,147,0.1)] p-4 rounded-lg border border-[#FF1493] mb-4">
            <p className="font-bold">{t("transferNumber")}</p>
            <p className="text-lg">+258 86 323 9800</p>
          </div>
          <Button
            className="w-full bg-gradient-to-r from-[#FF1493] to-[#DB7093] hover:from-[#DB7093] hover:to-[#FF1493] text-white rounded-full"
            onClick={() => onPayment("mpesa")}
          >
            {t("pay")} {total} MZN {t("with")} Mpesa
          </Button>
        </div>
      )}

      {activeMethod === "emola" && (
        <div className="text-center space-y-4">
          <p>{t("emolaRedirect")}</p>
          <div className="bg-[rgba(255,20,147,0.1)] p-4 rounded-lg border border-[#FF1493] mb-4">
            <p className="font-bold">{t("transferNumber")}</p>
            <p className="text-lg">+258 86 323 9800</p>
          </div>
          <Button
            className="w-full bg-gradient-to-r from-[#FF1493] to-[#DB7093] hover:from-[#DB7093] hover:to-[#FF1493] text-white rounded-full"
            onClick={() => onPayment("emola")}
          >
            {t("pay")} {total} MZN {t("with")} Emola
          </Button>
        </div>
      )}
    </div>
  )
}
