"use client"

import { useState } from "react"
import { CreditCard, Smartphone, Wallet } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface PaymentSectionProps {
  onPayment: (method: string) => void
  total: number
}

export default function PaymentSection({ onPayment, total }: PaymentSectionProps) {
  const [activeMethod, setActiveMethod] = useState("card")

  return (
    <div className="px-4 md:px-8 pb-8 animate-in fade-in slide-in-from-bottom-5 duration-300">
      <h3 className="text-center text-2xl md:text-3xl font-display text-[#FFD700] mb-6 relative inline-block left-1/2 -translate-x-1/2 px-8">
        Payment Method
      </h3>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div
          className={`p-4 border-2 rounded-lg text-center cursor-pointer transition-all ${
            activeMethod === "mpesa"
              ? "border-[#FFD700] bg-[rgba(255,20,147,0.2)]"
              : "border-[#FF1493] hover:bg-[rgba(255,20,147,0.1)]"
          }`}
          onClick={() => setActiveMethod("mpesa")}
        >
          <Smartphone className="w-8 h-8 mx-auto mb-2 text-[#FF1493]" />
          <div>Mpesa</div>
        </div>

        <div
          className={`p-4 border-2 rounded-lg text-center cursor-pointer transition-all ${
            activeMethod === "emola"
              ? "border-[#FFD700] bg-[rgba(255,20,147,0.2)]"
              : "border-[#FF1493] hover:bg-[rgba(255,20,147,0.1)]"
          }`}
          onClick={() => setActiveMethod("emola")}
        >
          <Wallet className="w-8 h-8 mx-auto mb-2 text-[#FF1493]" />
          <div>Emola</div>
        </div>

        <div
          className={`p-4 border-2 rounded-lg text-center cursor-pointer transition-all ${
            activeMethod === "card"
              ? "border-[#FFD700] bg-[rgba(255,20,147,0.2)]"
              : "border-[#FF1493] hover:bg-[rgba(255,20,147,0.1)]"
          }`}
          onClick={() => setActiveMethod("card")}
        >
          <CreditCard className="w-8 h-8 mx-auto mb-2 text-[#FF1493]" />
          <div>Card</div>
        </div>
      </div>

      {activeMethod === "card" && (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="cardNumber">Card Number</Label>
            <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="cardName">Cardholder Name</Label>
            <Input id="cardName" defaultValue="Yasser Vilanculos" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="expiryDate">Expiry Date</Label>
              <Input id="expiryDate" placeholder="MM/YY" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="cvv">CVV</Label>
              <Input id="cvv" placeholder="123" />
            </div>
          </div>

          <Button
            className="w-full bg-gradient-to-r from-[#FF1493] to-[#DB7093] hover:from-[#DB7093] hover:to-[#FF1493] text-white rounded-full mt-4"
            onClick={() => onPayment("card")}
          >
            Pay {total} MZN Now
          </Button>
        </div>
      )}

      {activeMethod === "mpesa" && (
        <div className="text-center space-y-4">
          <p>You will receive an Mpesa prompt on your phone to complete payment.</p>
          <Button
            className="w-full bg-gradient-to-r from-[#FF1493] to-[#DB7093] hover:from-[#DB7093] hover:to-[#FF1493] text-white rounded-full"
            onClick={() => onPayment("mpesa")}
          >
            Pay {total} MZN with Mpesa
          </Button>
        </div>
      )}

      {activeMethod === "emola" && (
        <div className="text-center space-y-4">
          <p>You will be redirected to Emola to complete your payment.</p>
          <Button
            className="w-full bg-gradient-to-r from-[#FF1493] to-[#DB7093] hover:from-[#DB7093] hover:to-[#FF1493] text-white rounded-full"
            onClick={() => onPayment("emola")}
          >
            Pay {total} MZN with Emola
          </Button>
        </div>
      )}
    </div>
  )
}
