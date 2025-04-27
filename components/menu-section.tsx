"use client"

import { Clock, Truck } from "lucide-react"
import { Button } from "@/components/ui/button"

interface MenuItem {
  name: string
  emoji: string
  price: number
  description: string
  prepTime: number
}

interface MenuSectionProps {
  title: string
  items: MenuItem[]
  isActive: boolean
  onAddToCart: (item: { name: string; price: number; emoji: string }) => void
}

export default function MenuSection({ title, items, isActive, onAddToCart }: MenuSectionProps) {
  if (!isActive) return null

  return (
    <div className="animate-in fade-in slide-in-from-bottom-5 duration-300">
      <h3 className="text-center text-2xl md:text-3xl font-display text-[#FFD700] mb-6 relative inline-block left-1/2 -translate-x-1/2 px-8">
        {title}
      </h3>

      <div className="space-y-8">
        {items.map((item, index) => (
          <div
            key={index}
            className="pb-6 border-b border-dashed border-[#FF1493]/30 transition-transform hover:translate-x-2"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="font-display text-xl font-bold text-[#FFD700]">
                {item.emoji} {item.name}
              </div>
              <div className="flex-1 border-b border-dotted border-[#FF1493] mx-4"></div>
              <div className="text-lg font-display text-[#FF1493] font-bold">{item.price} MZN</div>
            </div>

            <div className="pl-4 border-l-2 border-[#DB7093] text-sm mb-3">{item.description}</div>

            <div className="flex items-center text-xs text-[#FFD700] italic mb-2">
              <Clock className="h-3 w-3 mr-1 text-[#FF1493]" />
              Ready in {item.prepTime} min •
              <Truck className="h-3 w-3 mx-1 text-[#FF1493]" />
              Delivery available
            </div>

            <Button
              variant="outline"
              size="sm"
              className="float-right border-2 border-[#FF1493] text-[#FF1493] hover:bg-[#DB7093] hover:text-white rounded-full"
              onClick={() => onAddToCart({ name: item.name, price: item.price, emoji: item.emoji })}
            >
              Add to Order
            </Button>
            <div className="clear-both"></div>
          </div>
        ))}
      </div>
    </div>
  )
}
