"use client"

import { useState, useEffect } from "react"
import { Moon, Sun, Languages } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"
import MenuSection from "@/components/menu-section"
import OrderSummary from "@/components/order-summary"
import PaymentSection from "@/components/payment-section"
import ReceiptModal from "@/components/receipt-modal"
import PaymentConfirmation from "@/components/payment-confirmation"
import ContactSection from "@/components/contact-section"

// Menu data
const menuData = {
  starters: [
    {
      name: "Camarão Alho",
      emoji: "🍤",
      price: 450,
      description: "Succulent garlic prawns sautéed in olive oil, garlic, and chili flakes, served with crusty bread.",
      prepTime: 15,
    },
    {
      name: "Avocado Bruschetta",
      emoji: "🥑",
      price: 350,
      description: "Toasted bread topped with mashed avocado, cherry tomatoes, red onion, and balsamic glaze.",
      prepTime: 10,
    },
    {
      name: "Mushroom Soup",
      emoji: "🍄",
      price: 300,
      description: "Creamy wild mushroom soup with a touch of truffle oil and fresh herbs.",
      prepTime: 12,
    },
  ],
  mains: [
    {
      name: "Frango à Cafreal",
      emoji: "🥩",
      price: 650,
      description: "Spicy Goan-style chicken marinated in green masala, served with fries or rice.",
      prepTime: 25,
    },
    {
      name: "Peixe Grelhado",
      emoji: "🐟",
      price: 750,
      description:
        "Fresh local fish grilled to perfection with lemon butter sauce, served with vegetables and mashed potatoes.",
      prepTime: 20,
    },
    {
      name: "Espaguete à Bolonhesa",
      emoji: "🍝",
      price: 550,
      description: "Classic spaghetti with rich beef bolognese sauce and parmesan cheese.",
      prepTime: 18,
    },
  ],
  desserts: [
    {
      name: "Chocolate Mousse",
      emoji: "🍫",
      price: 300,
      description: "Rich dark chocolate mousse with whipped cream and fresh berries.",
      prepTime: 5,
    },
    {
      name: "Pudim de Leite",
      emoji: "🍮",
      price: 250,
      description: "Traditional Mozambican milk pudding with caramel sauce.",
      prepTime: 5,
    },
    {
      name: "Ananás Assado",
      emoji: "🍍",
      price: 280,
      description: "Grilled pineapple with cinnamon and coconut ice cream.",
      prepTime: 8,
    },
  ],
  drinks: [
    {
      name: "Cocktails",
      emoji: "🍹",
      price: 400,
      description: "Try our R&R Special (rum, raspberry, lime) or Tropical Sunset (vodka, mango, passionfruit).",
      prepTime: 7,
    },
    {
      name: "Wine Selection",
      emoji: "🍷",
      price: 500,
      description: "Selection of South African and Portuguese wines by the glass or bottle.",
      prepTime: 5,
    },
    {
      name: "Non-Alcoholic",
      emoji: "🍹",
      price: 200,
      description: "Fresh juices (mango, passionfruit, pineapple), iced teas, and artisanal sodas.",
      prepTime: 3,
    },
  ],
}

export default function RestaurantMenu() {
  const [activeSection, setActiveSection] = useState("starters")
  const [orderItems, setOrderItems] = useState<Array<{ name: string; price: number; emoji: string; quantity: number }>>(
    [],
  )
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [language, setLanguage] = useState("EN")
  const [showPaymentSection, setShowPaymentSection] = useState(false)
  const [showReceipt, setShowReceipt] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [orderId, setOrderId] = useState("")
  const { toast } = useToast()

  // Generate a random order ID
  useEffect(() => {
    setOrderId(`LBC-${Math.floor(Math.random() * 10000)}`)
  }, [])

  // Toggle dark mode
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
  }

  // Toggle language
  const toggleLanguage = () => {
    setLanguage(language === "EN" ? "PT" : "EN")
  }

  // Add item to cart
  const addToCart = (item: { name: string; price: number; emoji: string }) => {
    setOrderItems((prevItems) => {
      // Check if item already exists in cart
      const existingItemIndex = prevItems.findIndex((i) => i.name === item.name)

      if (existingItemIndex >= 0) {
        // Item exists, increase quantity
        const updatedItems = [...prevItems]
        updatedItems[existingItemIndex].quantity += 1
        return updatedItems
      } else {
        // Item doesn't exist, add new item
        return [...prevItems, { ...item, quantity: 1 }]
      }
    })

    // Show notification
    toast({
      title: "Item added to cart",
      description: `${item.emoji} ${item.name} has been added to your order.`,
    })
  }

  // Remove item from cart
  const removeFromCart = (index: number) => {
    const removedItem = orderItems[index]

    setOrderItems((prevItems) => {
      if (prevItems[index].quantity > 1) {
        // If quantity > 1, decrease quantity
        const updatedItems = [...prevItems]
        updatedItems[index].quantity -= 1
        return updatedItems
      } else {
        // If quantity = 1, remove item
        return prevItems.filter((_, i) => i !== index)
      }
    })

    // Show notification
    toast({
      title: "Item removed from cart",
      description: `${removedItem.emoji} ${removedItem.name} has been removed from your order.`,
      variant: "destructive",
    })
  }

  // Calculate total price
  const calculateTotal = () => {
    return orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  }

  // Handle checkout
  const handleCheckout = () => {
    if (orderItems.length === 0) {
      toast({
        title: "Empty cart",
        description: "Please add items to your cart before checking out.",
        variant: "destructive",
      })
      return
    }
    setShowPaymentSection(true)
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" })
  }

  // Handle payment
  const handlePayment = (method: string) => {
    // Show loading toast
    toast({
      title: "Processing payment",
      description: "Please wait while we process your payment...",
    })

    // Simulate payment processing
    setTimeout(() => {
      setShowConfirmation(true)

      // Show success toast
      toast({
        title: "Payment successful!",
        description: `Your order #${orderId} has been confirmed.`,
        variant: "success",
      })
    }, 2000)
  }

  // View receipt
  const viewReceipt = () => {
    setShowReceipt(true)
  }

  // Close receipt
  const closeReceipt = () => {
    setShowReceipt(false)
    // Reset cart and payment section after viewing receipt
    setOrderItems([])
    setShowPaymentSection(false)
    setShowConfirmation(false)
    // Generate new order ID for next order
    setOrderId(`LBC-${Math.floor(Math.random() * 10000)}`)
  }

  return (
    <div
      className={`min-h-screen p-4 md:p-8 transition-colors duration-300 ${isDarkMode ? "bg-[#5E3A4D] text-[#FFF9FB]" : "bg-[#FFF0F5] text-[#5E3A4D]"}`}
    >
      {/* Theme/Language Toggles */}
      <div className="fixed top-4 right-4 z-50 flex flex-col md:flex-row gap-2">
        <Button variant="outline" size="sm" onClick={toggleTheme} className="rounded-full flex items-center gap-2">
          {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          {isDarkMode ? "Light" : "Dark"}
        </Button>
        <Button variant="outline" size="sm" onClick={toggleLanguage} className="rounded-full flex items-center gap-2">
          <Languages className="h-4 w-4" />
          {language}
        </Button>
      </div>

      <Card
        className={`max-w-6xl mx-auto relative overflow-hidden border-2 border-[#FF1493] rounded-xl ${isDarkMode ? "bg-[rgba(94,58,77,0.95)]" : "bg-[rgba(255,240,245,0.95)]"}`}
      >
        {/* Menu Header */}
        <div className="text-center py-8 px-4">
          <h1 className="font-script text-4xl md:text-6xl font-bold text-[#FFD700] mb-2">La Belle Cuisine</h1>
          <h2 className="font-display text-xl md:text-2xl text-[#FF1493] tracking-widest -mt-2">
            FINE DINING EXPERIENCE
          </h2>

          <div className="flex items-center justify-center my-6">
            <div className="h-[2px] w-24 bg-gradient-to-r from-transparent via-[#FF1493] to-transparent"></div>
            <div className="mx-4 text-[#FF1493] text-xl">✨</div>
            <div className="h-[2px] w-24 bg-gradient-to-r from-transparent via-[#FF1493] to-transparent"></div>
          </div>

          <div className="italic text-[#FF1493]">Seasonal Menu • 2024 • Open 11AM-10PM</div>
        </div>

        {/* Menu Navigation */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-8 px-4">
          <Button
            variant={activeSection === "starters" ? "default" : "outline"}
            onClick={() => setActiveSection("starters")}
            className={`rounded-full ${activeSection === "starters" ? "bg-[#DB7093] hover:bg-[#DB7093]/90" : ""}`}
          >
            🍤 Starters
          </Button>
          <Button
            variant={activeSection === "mains" ? "default" : "outline"}
            onClick={() => setActiveSection("mains")}
            className={`rounded-full ${activeSection === "mains" ? "bg-[#DB7093] hover:bg-[#DB7093]/90" : ""}`}
          >
            🍲 Main Courses
          </Button>
          <Button
            variant={activeSection === "desserts" ? "default" : "outline"}
            onClick={() => setActiveSection("desserts")}
            className={`rounded-full ${activeSection === "desserts" ? "bg-[#DB7093] hover:bg-[#DB7093]/90" : ""}`}
          >
            🍰 Desserts
          </Button>
          <Button
            variant={activeSection === "drinks" ? "default" : "outline"}
            onClick={() => setActiveSection("drinks")}
            className={`rounded-full ${activeSection === "drinks" ? "bg-[#DB7093] hover:bg-[#DB7093]/90" : ""}`}
          >
            🍹 Drinks
          </Button>
        </div>

        {/* Menu Sections */}
        <div className="px-4 md:px-8 pb-8">
          {Object.keys(menuData).map((section) => (
            <MenuSection
              key={section}
              title={section.charAt(0).toUpperCase() + section.slice(1)}
              items={menuData[section as keyof typeof menuData]}
              isActive={activeSection === section}
              onAddToCart={addToCart}
            />
          ))}
        </div>

        {/* Payment Section */}
        {showPaymentSection && <PaymentSection onPayment={handlePayment} total={calculateTotal()} />}

        {/* Contact Section */}
        <ContactSection />
      </Card>

      {/* Order Summary */}
      <OrderSummary
        items={orderItems}
        onRemoveItem={removeFromCart}
        onCheckout={handleCheckout}
        total={calculateTotal()}
      />

      {/* Payment Confirmation */}
      {showConfirmation && <PaymentConfirmation orderId={orderId} onViewReceipt={viewReceipt} />}

      {/* Receipt Modal */}
      {showReceipt && (
        <ReceiptModal orderId={orderId} items={orderItems} total={calculateTotal()} onClose={closeReceipt} />
      )}

      {/* Toast notifications */}
      <Toaster />
    </div>
  )
}
