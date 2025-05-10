"use client"

import { Clock, Truck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "./language-context"
import Image from "next/image"

interface MenuItem {
  name: string
  nameEN: string
  namePT: string
  emoji: string
  image: string
  price: number
  description: string
  descriptionEN: string
  descriptionPT: string
  prepTime: number
}

interface MenuSectionProps {
  title: string
  items: MenuItem[]
  isActive: boolean
  onAddToCart: (item: { name: string; price: number; emoji: string }) => void
}

export default function MenuSection({ title, items, isActive, onAddToCart }: MenuSectionProps) {
  const { language } = useLanguage()

  if (!isActive) return null

  return (
    <div className="animate-in fade-in slide-in-from-bottom-5 duration-300">
      <h3 className="text-center text-2xl md:text-3xl font-display text-[#FFD700] mb-6 relative inline-block left-1/2 -translate-x-1/2 px-8">
        {title}
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {items.map((item, index) => (
          <div
            key={index}
            className="bg-white/10 rounded-lg overflow-hidden shadow-md border border-[#FF1493]/30 transition-all hover:shadow-lg hover:scale-[1.02]"
          >
            <div className="relative h-48 w-full overflow-hidden">
              <Image
                src={item.image || "/placeholder.svg?height=300&width=500"}
                alt={language === "PT" ? item.namePT : item.nameEN}
                width={500}
                height={300}
                className="w-full h-full object-cover transition-transform hover:scale-110 duration-500"
              />
              <div className="absolute top-2 right-2 bg-[#FF1493] text-white px-3 py-1 rounded-full text-sm font-bold">
                {item.price} MZN
              </div>
            </div>

            <div className="p-4">
              <h4 className="font-display text-xl font-bold text-[#FFD700] mb-2">
                {language === "PT" ? item.namePT : item.nameEN}
              </h4>

              <div className="text-sm mb-3 min-h-[60px]">
                {language === "PT" ? item.descriptionPT : item.descriptionEN}
              </div>

              <div className="flex items-center text-xs text-[#FFD700] italic mb-4">
                <Clock className="h-3 w-3 mr-1 text-[#FF1493]" />
                {item.prepTime ? `${item.prepTime} min •` : "15 min •"}
                <Truck className="h-3 w-3 mx-1 text-[#FF1493]" />
                {language === "PT" ? "Entrega disponível" : "Delivery available"}
              </div>

              <Button
                variant="outline"
                size="sm"
                className="w-full border-2 border-[#FF1493] text-[#FF1493] hover:bg-[#DB7093] hover:text-white rounded-full"
                onClick={() =>
                  onAddToCart({
                    name: language === "PT" ? item.namePT : item.nameEN,
                    price: item.price,
                    emoji: item.emoji,
                  })
                }
              >
                {language === "PT" ? "Adicionar ao Pedido" : "Add to Order"}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
