"use client"

import { format } from "date-fns"
import { X, Printer, Download } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ReceiptItem {
  name: string
  price: number
  emoji: string
  quantity: number
}

interface ReceiptModalProps {
  orderId: string
  items: ReceiptItem[]
  total: number
  onClose: () => void
}

export default function ReceiptModal({ orderId, items, total, onClose }: ReceiptModalProps) {
  const currentDate = new Date()
  const formattedDate = format(currentDate, "dd/MM/yyyy")
  const formattedTime = format(currentDate, "HH:mm:ss")

  // Calculate subtotal, tax, and delivery fee
  const subtotal = total
  const tax = Math.round(subtotal * 0.17) // 17% VAT
  const deliveryFee = 100
  const grandTotal = subtotal + tax + deliveryFee

  // Function to print receipt
  const printReceipt = () => {
    window.print()
  }

  // Function to download receipt as PDF (simplified)
  const downloadReceipt = () => {
    alert("Receipt download functionality would be implemented here")
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-in fade-in duration-300 p-4">
      <div className="bg-white dark:bg-[#5E3A4D] p-6 rounded-xl max-w-md w-full border-2 border-[#FF1493] shadow-xl">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">Receipt</h3>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="border-2 border-dashed border-[#FF1493] p-4 rounded-lg mb-4">
          <div className="text-center mb-4">
            <h2 className="font-script text-2xl font-bold text-[#FFD700]">La Belle Cuisine</h2>
            <p className="text-xs opacity-70">Fine Dining Experience</p>
          </div>

          <div className="text-sm space-y-1 mb-4">
            <div className="flex justify-between">
              <span>Order #:</span>
              <span className="font-semibold">{orderId}</span>
            </div>
            <div className="flex justify-between">
              <span>Date:</span>
              <span>{formattedDate}</span>
            </div>
            <div className="flex justify-between">
              <span>Time:</span>
              <span>{formattedTime}</span>
            </div>
          </div>

          <div className="border-t border-dashed border-gray-300 dark:border-gray-600 pt-3 mb-3">
            <div className="text-xs font-semibold mb-2">ORDER DETAILS</div>
            {items.map((item, index) => (
              <div key={index} className="flex justify-between text-sm mb-2">
                <div>
                  <span>
                    {item.emoji} {item.name}
                  </span>
                  <div className="text-xs opacity-70">
                    {item.quantity} × {item.price} MZN
                  </div>
                </div>
                <div className="font-semibold">{item.price * item.quantity} MZN</div>
              </div>
            ))}
          </div>

          <div className="border-t border-dashed border-gray-300 dark:border-gray-600 pt-3 space-y-1 text-sm">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>{subtotal} MZN</span>
            </div>
            <div className="flex justify-between">
              <span>VAT (17%):</span>
              <span>{tax} MZN</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery Fee:</span>
              <span>{deliveryFee} MZN</span>
            </div>
            <div className="flex justify-between font-bold pt-2 border-t border-dashed border-gray-300 dark:border-gray-600">
              <span>Total:</span>
              <span>{grandTotal} MZN</span>
            </div>
          </div>

          <div className="text-center mt-4 text-xs italic opacity-70">Thank you for dining with us!</div>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" className="flex-1" onClick={printReceipt}>
            <Printer className="h-4 w-4 mr-2" /> Print
          </Button>
          <Button variant="outline" className="flex-1" onClick={downloadReceipt}>
            <Download className="h-4 w-4 mr-2" /> Save
          </Button>
        </div>
      </div>
    </div>
  )
}
