"use client"

import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"

interface PaymentConfirmationProps {
  orderId: string
  onViewReceipt: () => void
}

export default function PaymentConfirmation({ orderId, onViewReceipt }: PaymentConfirmationProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-in fade-in duration-300">
      <div className="bg-white dark:bg-[#5E3A4D] p-8 rounded-xl max-w-md w-full text-center border-2 border-[#FF1493] shadow-xl">
        <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
          <Check className="w-8 h-8 text-green-600 dark:text-green-300" />
        </div>

        <h3 className="text-2xl font-bold text-[#FFD700] mb-2">Payment Successful!</h3>

        <p className="mb-4">
          Thank you for your order. Your order #{orderId} has been confirmed and is being prepared.
        </p>

        <p className="text-sm mb-6 opacity-80">
          You will receive a notification when your order is ready for pickup or delivery.
        </p>

        <Button
          className="w-full bg-gradient-to-r from-[#FF1493] to-[#DB7093] hover:from-[#DB7093] hover:to-[#FF1493] text-white rounded-full"
          onClick={onViewReceipt}
        >
          View Receipt
        </Button>
      </div>
    </div>
  )
}
