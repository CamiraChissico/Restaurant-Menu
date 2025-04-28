"use client"

import { ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useLanguage } from "./language-context"

interface OrderItem {
  name: string
  price: number
  emoji: string
  quantity: number
}

interface OrderSummaryProps {
  items: OrderItem[]
  onRemoveItem: (index: number) => void
  onCheckout: () => void
  total: number
  selectedTable: string | null
}

export default function OrderSummary({ items, onRemoveItem, onCheckout, total, selectedTable }: OrderSummaryProps) {
  const { t } = useLanguage()

  return (
    <Card className="fixed right-4 top-20 md:top-4 w-72 md:w-80 z-40 border-2 border-[#FF1493] shadow-lg max-h-[80vh] overflow-hidden flex flex-col">
      <CardHeader className="pb-2 border-b border-dashed border-[#FF1493]">
        <div className="flex justify-between items-center">
          <CardTitle className="text-[#FFD700] text-lg">{t("yourOrder")}</CardTitle>
          <div className="bg-[rgba(141,110,99,0.2)] px-2 py-1 rounded-full text-[#FF1493] text-sm font-bold">
            {items.reduce((sum, item) => sum + item.quantity, 0)} {t("items")}
          </div>
        </div>
        {selectedTable && (
          <div className="text-sm mt-1 bg-[rgba(255,215,0,0.1)] p-2 rounded-md border border-[#FFD700]">
            {t("tableSelected")}: <span className="font-bold">{selectedTable}</span>
          </div>
        )}
      </CardHeader>

      <CardContent className="overflow-y-auto max-h-[40vh] py-4">
        {items.length === 0 ? (
          <div className="text-center py-4 text-sm opacity-70">{t("emptyCart")}</div>
        ) : (
          <div className="space-y-2">
            {items.map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-center pb-2 border-b border-dashed border-[rgba(215,204,200,0.2)]"
              >
                <div className="flex-1">
                  <div className="flex items-center">
                    <span>{item.emoji}</span>
                    <span className="ml-1">{item.name}</span>
                  </div>
                  <div className="text-xs opacity-70">
                    {item.quantity} × {item.price} MZN
                  </div>
                </div>
                <div className="font-semibold">{item.price * item.quantity} MZN</div>
                <button className="ml-2 text-[#FF1493] hover:text-[#DB7093]" onClick={() => onRemoveItem(index)}>
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
      </CardContent>

      <CardFooter className="flex flex-col pt-0">
        <div className="w-full flex justify-between font-bold py-4 border-t border-dashed border-[#FF1493]">
          <span>{t("total")}:</span>
          <span className="text-[#FFD700] text-lg">{total} MZN</span>
        </div>

        <Button
          className="w-full bg-gradient-to-r from-[#FF1493] to-[#DB7093] hover:from-[#DB7093] hover:to-[#FF1493] text-white rounded-full"
          onClick={onCheckout}
          disabled={items.length === 0 || !selectedTable}
        >
          <ShoppingCart className="mr-2 h-4 w-4" /> {t("checkout")}
        </Button>

        {items.length > 0 && !selectedTable && (
          <div className="text-xs text-center mt-2 text-[#FF1493]">{t("pleaseSelectTable")}</div>
        )}
      </CardFooter>
    </Card>
  )
}
