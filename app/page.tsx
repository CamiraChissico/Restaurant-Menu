"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Moon, Sun, Languages } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"
import MenuSection from "@/components/menu-section"
import OrderSummary from "@/components/order-summary"
import ContactSection from "@/components/contact-section"
import TableAvailability from "@/components/table-availability"
import ReservationConfirmation from "@/components/reservation-confirmation"
import { LanguageProvider, useLanguage } from "@/components/language-context"

// Menu data with real images
const menuData = {
  starters: [
    {
      nameEN: "Matapa with Shrimp",
      namePT: "Matapa com Camarão",
      emoji: "🥬",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-KkCIu0Rl5UT9357uD8VkHOQUZo7AK0.png",
      price: 420,
      descriptionEN:
        "Traditional Mozambican dish made with cassava leaves, coconut milk, and peanuts, served with rice and topped with sautéed shrimp.",
      descriptionPT:
        "Prato tradicional moçambicano feito com folhas de mandioca, leite de coco e amendoim, servido com arroz e coberto com camarão salteado.",
      prepTime: 25,
    },
    {
      nameEN: "Peri-Peri Chicken Livers",
      namePT: "Fígados de Frango Peri-Peri",
      emoji: "🍗",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-crRFNRak7UjRuEn0i851Ilx883zCcO.png",
      price: 380,
      descriptionEN:
        "Spicy chicken livers cooked in a traditional Mozambican peri-peri sauce, served with crusty bread.",
      descriptionPT:
        "Fígados de frango picantes cozidos em molho peri-peri tradicional moçambicano, servidos com pão crocante.",
      prepTime: 15,
    },
    {
      nameEN: "Garlic Prawns",
      namePT: "Camarão Alho",
      emoji: "🍤",
      image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?q=80&w=1000&auto=format&fit=crop",
      price: 450,
      descriptionEN:
        "Succulent garlic prawns sautéed in olive oil, garlic, and chili flakes, served with crusty bread.",
      descriptionPT: "Camarões suculentos salteados em azeite, alho e flocos de pimenta, servidos com pão crocante.",
      prepTime: 15,
    },
    {
      nameEN: "Avocado Bruschetta",
      namePT: "Bruschetta de Abacate",
      emoji: "🥑",
      image: "https://images.unsplash.com/photo-1588137378633-dea1336ce1e2?q=80&w=1000&auto=format&fit=crop",
      price: 350,
      descriptionEN: "Toasted bread topped with mashed avocado, cherry tomatoes, red onion, and balsamic glaze.",
      descriptionPT: "Pão torrado coberto com abacate amassado, tomates cereja, cebola roxa e glacê balsâmico.",
      prepTime: 15,
    },
    {
      nameEN: "Mushroom Soup",
      namePT: "Sopa de Cogumelos",
      emoji: "🍄",
      image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?q=80&w=1000&auto=format&fit=crop",
      price: 300,
      descriptionEN: "Creamy wild mushroom soup with a touch of truffle oil and fresh herbs.",
      descriptionPT: "Sopa cremosa de cogumelos silvestres com um toque de óleo de trufa e ervas frescas.",
      prepTime: 15,
    },
    {
      nameEN: "Caprese Salad",
      namePT: "Salada Caprese",
      emoji: "🍅",
      image: "https://images.unsplash.com/photo-1592417817098-8fd3d9eb14a5?q=80&w=1000&auto=format&fit=crop",
      price: 320,
      descriptionEN:
        "Fresh mozzarella, tomatoes, and basil drizzled with balsamic reduction and extra virgin olive oil.",
      descriptionPT: "Mozzarella fresca, tomates e manjericão regados com redução balsâmica e azeite extra virgem.",
      prepTime: 15,
    },
    {
      nameEN: "Seafood Ceviche",
      namePT: "Ceviche de Frutos do Mar",
      emoji: "🐟",
      image: "https://images.unsplash.com/photo-1632789395770-20e6f63be806?q=80&w=1000&auto=format&fit=crop",
      price: 480,
      descriptionEN: "Fresh seafood marinated in citrus juices with red onion, cilantro, and avocado.",
      descriptionPT: "Frutos do mar frescos marinados em sucos cítricos com cebola roxa, coentro e abacate.",
      prepTime: 15,
    },
  ],
  mains: [
    {
      nameEN: "Piri Piri Chicken",
      namePT: "Frango Piri Piri",
      emoji: "🍗",
      image: "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?q=80&w=1000&auto=format&fit=crop",
      price: 580,
      descriptionEN:
        "Flame-grilled chicken marinated in authentic Mozambican piri piri sauce, served with fries and salad.",
      descriptionPT:
        "Frango grelhado marinado em autêntico molho piri piri moçambicano, servido com batatas fritas e salada.",
      prepTime: 25,
    },
    {
      nameEN: "Cafreal Chicken",
      namePT: "Frango à Cafreal",
      emoji: "🍗",
      image: "https://images.unsplash.com/photo-1610057099431-d73a1c9d2f2f?q=80&w=1000&auto=format&fit=crop",
      price: 650,
      descriptionEN: "Spicy Goan-style chicken marinated in green masala, served with fries or rice.",
      descriptionPT: "Frango picante ao estilo de Goa marinado em masala verde, servido com batatas fritas ou arroz.",
      prepTime: 15,
    },
    {
      nameEN: "Grilled Fish",
      namePT: "Peixe Grelhado",
      emoji: "🐟",
      image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?q=80&w=1000&auto=format&fit=crop",
      price: 750,
      descriptionEN:
        "Fresh local fish grilled to perfection with lemon butter sauce, served with vegetables and mashed potatoes.",
      descriptionPT:
        "Peixe local fresco grelhado à perfeição com molho de manteiga e limão, servido com legumes e purê de batata.",
      prepTime: 15,
    },
    {
      nameEN: "Spaghetti Bolognese",
      namePT: "Espaguete à Bolonhesa",
      emoji: "🍝",
      image: "https://images.unsplash.com/photo-1622973536968-3ead9e780960?q=80&w=1000&auto=format&fit=crop",
      price: 550,
      descriptionEN: "Classic spaghetti with rich beef bolognese sauce and parmesan cheese.",
      descriptionPT: "Espaguete clássico com molho bolonhesa de carne bovina e queijo parmesão.",
      prepTime: 15,
    },
    {
      nameEN: "Grilled Lobster",
      namePT: "Lagosta Grelhada",
      emoji: "🦞",
      image: "https://images.unsplash.com/photo-1559737558-2f5a35f4523b?q=80&w=1000&auto=format&fit=crop",
      price: 1200,
      descriptionEN:
        "Fresh local lobster grilled with garlic butter, served with saffron rice and seasonal vegetables.",
      descriptionPT:
        "Lagosta local fresca grelhada com manteiga de alho, servida com arroz de açafrão e legumes da estação.",
      prepTime: 15,
    },
    {
      nameEN: "Beef Tenderloin",
      namePT: "Filé Mignon",
      emoji: "🥩",
      image: "https://images.unsplash.com/photo-1600891964092-4316c288032e?q=80&w=1000&auto=format&fit=crop",
      price: 950,
      descriptionEN:
        "Premium beef tenderloin cooked to your preference, served with red wine reduction and truffle mashed potatoes.",
      descriptionPT:
        "Filé mignon premium cozido à sua preferência, servido com redução de vinho tinto e purê de batata com trufa.",
      prepTime: 15,
    },
  ],
  desserts: [
    {
      nameEN: "Chocolate Mousse",
      namePT: "Mousse de Chocolate",
      emoji: "🍫",
      image: "https://images.unsplash.com/photo-1511715282680-fbf93a50e721?q=80&w=1000&auto=format&fit=crop",
      price: 300,
      descriptionEN: "Rich dark chocolate mousse with whipped cream and fresh berries.",
      descriptionPT: "Mousse de chocolate amargo com chantilly e frutas vermelhas frescas.",
      prepTime: 15,
    },
    {
      nameEN: "Milk Pudding",
      namePT: "Pudim de Leite",
      emoji: "🍮",
      image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?q=80&w=1000&auto=format&fit=crop",
      price: 250,
      descriptionEN: "Traditional Mozambican milk pudding with caramel sauce.",
      descriptionPT: "Pudim de leite tradicional moçambicano com calda de caramelo.",
      prepTime: 15,
    },
    {
      nameEN: "Grilled Pineapple",
      namePT: "Ananás Assado",
      emoji: "🍍",
      image: "https://images.unsplash.com/photo-1625943553852-781c6dd46faa?q=80&w=1000&auto=format&fit=crop",
      price: 280,
      descriptionEN: "Grilled pineapple with cinnamon and coconut ice cream.",
      descriptionPT: "Ananás grelhado com canela e sorvete de coco.",
      prepTime: 15,
    },
    {
      nameEN: "Passion Fruit Cheesecake",
      namePT: "Cheesecake de Maracujá",
      emoji: "🍰",
      image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?q=80&w=1000&auto=format&fit=crop",
      price: 320,
      descriptionEN: "Creamy cheesecake with tangy passion fruit topping and graham cracker crust.",
      descriptionPT: "Cheesecake cremoso com cobertura de maracujá e base de biscoito graham.",
      prepTime: 15,
    },
    {
      nameEN: "Coconut Flan",
      namePT: "Pudim de Coco",
      emoji: "🥥",
      image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?q=80&w=1000&auto=format&fit=crop",
      price: 270,
      descriptionEN: "Silky coconut flan with caramelized sugar and toasted coconut flakes.",
      descriptionPT: "Pudim de coco sedoso com açúcar caramelizado e flocos de coco torrado.",
      prepTime: 15,
    },
  ],
  drinks: [
    {
      nameEN: "Coconut Water",
      namePT: "Água de Coco",
      emoji: "🥥",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-Zwp5hNfhDk7DspaQJ0AEn2RRhK4UMJ.png",
      price: 180,
      descriptionEN: "Fresh coconut water served with ice and lime, perfect for a refreshing tropical experience.",
      descriptionPT:
        "Água de coco fresca servida com gelo e limão, perfeita para uma experiência tropical refrescante.",
      prepTime: 5,
    },
    {
      nameEN: "Cocktails",
      namePT: "Coquetéis",
      emoji: "🍹",
      image: "https://images.unsplash.com/photo-1536935338788-846bb9981813?q=80&w=1000&auto=format&fit=crop",
      price: 400,
      descriptionEN: "Try our R&R Special (rum, raspberry, lime) or Tropical Sunset (vodka, mango, passionfruit).",
      descriptionPT:
        "Experimente nosso Especial R&R (rum, framboesa, limão) ou Pôr do Sol Tropical (vodka, manga, maracujá).",
      prepTime: 15,
    },
    {
      nameEN: "Wine Selection",
      namePT: "Seleção de Vinhos",
      emoji: "🍷",
      image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=1000&auto=format&fit=crop",
      price: 500,
      descriptionEN: "Selection of South African and Portuguese wines by the glass or bottle.",
      descriptionPT: "Seleção de vinhos sul-africanos e portugueses em taça ou garrafa.",
      prepTime: 15,
    },
    {
      nameEN: "Non-Alcoholic",
      namePT: "Sem Álcool",
      emoji: "🧃",
      image: "https://images.unsplash.com/photo-1621263764928-df1444c5e859?q=80&w=1000&auto=format&fit=crop",
      price: 200,
      descriptionEN: "Fresh juices (mango, passionfruit, pineapple), iced teas, and artisanal sodas.",
      descriptionPT: "Sucos frescos (manga, maracujá, abacaxi), chás gelados e refrigerantes artesanais.",
      prepTime: 15,
    },
    {
      nameEN: "Craft Beer Selection",
      namePT: "Seleção de Cervejas Artesanais",
      emoji: "🍺",
      image: "https://images.unsplash.com/photo-1566633806327-68e152aaf26d?q=80&w=1000&auto=format&fit=crop",
      price: 350,
      descriptionEN: "Local and imported craft beers, including IPA, stout, and wheat beer varieties.",
      descriptionPT: "Cervejas artesanais locais e importadas, incluindo variedades de IPA, stout e cerveja de trigo.",
      prepTime: 15,
    },
    {
      nameEN: "Signature Mocktails",
      namePT: "Mocktails Exclusivos",
      emoji: "🥤",
      image: "https://images.unsplash.com/photo-1604404895906-1cba0f221e14?q=80&w=1000&auto=format&fit=crop",
      price: 280,
      descriptionEN: "Alcohol-free signature drinks like Coconut Dream and Berry Blast with fresh fruits and herbs.",
      descriptionPT:
        "Bebidas exclusivas sem álcool como Sonho de Coco e Explosão de Frutas Vermelhas com frutas e ervas frescas.",
      prepTime: 15,
    },
  ],
}

function RestaurantMenuContent() {
  const router = useRouter()
  const { language, setLanguage, t } = useLanguage()
  const [activeSection, setActiveSection] = useState("starters")
  const [orderItems, setOrderItems] = useState<Array<{ name: string; price: number; emoji: string; quantity: number }>>(
    [],
  )
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [orderId, setOrderId] = useState("")
  const [selectedTable, setSelectedTable] = useState<string | null>(null)
  const [showReservationConfirmation, setShowReservationConfirmation] = useState(false)
  const [currentReservation, setCurrentReservation] = useState<any>(null)
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

  // Handle table selection
  const handleSelectTable = (tableId: string) => {
    setSelectedTable(tableId)
    toast({
      title: language === "PT" ? "Mesa selecionada" : "Table selected",
      description: language === "PT" ? `Você selecionou a mesa ${tableId}` : `You've selected table ${tableId}`,
    })
  }

  // Handle table reservation
  const handleReserveTable = (reservation: {
    name: string
    email: string
    phone: string
    date: Date
    time: string
    guests: number
    tableId: string
  }) => {
    // Generate a confirmation code
    const confirmationCode = `RES-${Math.floor(Math.random() * 10000)}`

    // Show loading toast
    toast({
      title: language === "PT" ? "Processando reserva" : "Processing reservation",
      description:
        language === "PT"
          ? "Por favor, aguarde enquanto processamos sua reserva..."
          : "Please wait while we process your reservation...",
    })

    // Simulate reservation processing
    setTimeout(() => {
      const fullReservation = {
        ...reservation,
        confirmationCode,
      }

      setCurrentReservation(fullReservation)
      setShowReservationConfirmation(true)

      // Show success toast
      toast({
        title: language === "PT" ? "Reserva confirmada!" : "Reservation confirmed!",
        description:
          language === "PT"
            ? `Sua mesa ${reservation.tableId} foi reservada para ${reservation.time} em ${reservation.date.toLocaleDateString()}.`
            : `Your table ${reservation.tableId} has been reserved for ${reservation.time} on ${reservation.date.toLocaleDateString()}.`,
        variant: "success",
      })
    }, 1500)
  }

  // Close reservation confirmation
  const handleCloseReservationConfirmation = () => {
    setShowReservationConfirmation(false)
    setSelectedTable(null)
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
      title: language === "PT" ? "Item adicionado ao carrinho" : "Item added to cart",
      description:
        language === "PT"
          ? `${item.emoji} ${item.name} foi adicionado ao seu pedido.`
          : `${item.emoji} ${item.name} has been added to your order.`,
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
      title: language === "PT" ? "Item removido do carrinho" : "Item removed from cart",
      description:
        language === "PT"
          ? `${removedItem.emoji} ${removedItem.name} foi removido do seu pedido.`
          : `${removedItem.emoji} ${removedItem.name} has been removed from your order.`,
      variant: "destructive",
    })
  }

  // Calculate total price
  const calculateTotal = () => {
    return orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  }

  // Handle checkout - now redirects to payment page
  const handleCheckout = () => {
    if (orderItems.length === 0) {
      toast({
        title: language === "PT" ? "Carrinho vazio" : "Empty cart",
        description:
          language === "PT"
            ? "Por favor, adicione itens ao seu carrinho antes de finalizar."
            : "Please add items to your cart before checking out.",
        variant: "destructive",
      })
      return
    }

    if (!selectedTable) {
      toast({
        title: language === "PT" ? "Nenhuma mesa selecionada" : "No table selected",
        description:
          language === "PT"
            ? "Por favor, selecione uma mesa antes de finalizar."
            : "Please select a table before checking out.",
        variant: "destructive",
      })
      return
    }

    // Prepare order data for URL parameters
    const encodedItems = encodeURIComponent(JSON.stringify(orderItems))
    const total = calculateTotal()

    // Redirect to payment page with order data
    router.push(`/payment?orderId=${orderId}&table=${selectedTable}&total=${total}&items=${encodedItems}`)
  }

  // Add this useEffect to scroll to the table availability section when the page loads
  useEffect(() => {
    // Add a small delay to ensure the page is fully loaded
    const timer = setTimeout(() => {
      const tableSection = document.getElementById("table-availability-section")
      if (tableSection) {
        tableSection.scrollIntoView({ behavior: "smooth", block: "center" })
      }
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div
      className={`min-h-screen p-4 md:p-8 transition-colors duration-300 ${isDarkMode ? "bg-[#5E3A4D] text-[#FFF9FB]" : "bg-[#FFF0F5] text-[#5E3A4D]"}`}
    >
      {/* Theme/Language Toggles */}
      <div className="fixed top-4 right-4 z-50 flex flex-col md:flex-row gap-2">
        <Button variant="outline" size="sm" onClick={toggleTheme} className="rounded-full flex items-center gap-2">
          {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          {isDarkMode ? t("lightMode") : t("darkMode")}
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
          <h1 className="font-script text-4xl md:text-6xl font-bold text-[#FFD700] mb-2">{t("restaurantName")}</h1>
          <h2 className="font-display text-xl md:text-2xl text-[#FF1493] tracking-widest -mt-2">{t("tagline")}</h2>

          <div className="flex items-center justify-center my-6">
            <div className="h-[2px] w-24 bg-gradient-to-r from-transparent via-[#FF1493] to-transparent"></div>
            <div className="mx-4 text-[#FF1493] text-xl">✨</div>
            <div className="h-[2px] w-24 bg-gradient-to-r from-transparent via-[#FF1493] to-transparent"></div>
          </div>

          <div className="italic text-[#FF1493]">{t("seasonalMenu")}</div>
        </div>

        {/* Table Availability Section */}
        <div id="table-availability-section" className="px-4 md:px-8">
          <TableAvailability
            onSelectTable={handleSelectTable}
            selectedTable={selectedTable}
            onReserveTable={handleReserveTable}
          />
        </div>

        {/* Menu Navigation */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-8 px-4">
          <Button
            variant={activeSection === "starters" ? "default" : "outline"}
            onClick={() => setActiveSection("starters")}
            className={`rounded-full ${activeSection === "starters" ? "bg-[#DB7093] hover:bg-[#DB7093]/90" : ""}`}
          >
            🍤 {t("starters")}
          </Button>
          <Button
            variant={activeSection === "mains" ? "default" : "outline"}
            onClick={() => setActiveSection("mains")}
            className={`rounded-full ${activeSection === "mains" ? "bg-[#DB7093] hover:bg-[#DB7093]/90" : ""}`}
          >
            🍲 {t("mains")}
          </Button>
          <Button
            variant={activeSection === "desserts" ? "default" : "outline"}
            onClick={() => setActiveSection("desserts")}
            className={`rounded-full ${activeSection === "desserts" ? "bg-[#DB7093] hover:bg-[#DB7093]/90" : ""}`}
          >
            🍰 {t("desserts")}
          </Button>
          <Button
            variant={activeSection === "drinks" ? "default" : "outline"}
            onClick={() => setActiveSection("drinks")}
            className={`rounded-full ${activeSection === "drinks" ? "bg-[#DB7093] hover:bg-[#DB7093]/90" : ""}`}
          >
            🍹 {t("drinks")}
          </Button>
        </div>

        {/* Menu Sections */}
        <div className="px-4 md:px-8 pb-8">
          {Object.keys(menuData).map((section) => (
            <MenuSection
              key={section}
              title={language === "PT" ? t(section) : section.charAt(0).toUpperCase() + section.slice(1)}
              items={menuData[section as keyof typeof menuData]}
              isActive={activeSection === section}
              onAddToCart={addToCart}
            />
          ))}
        </div>

        {/* Contact Section */}
        <ContactSection />
      </Card>

      {/* Order Summary */}
      <OrderSummary
        items={orderItems}
        onRemoveItem={removeFromCart}
        onCheckout={handleCheckout}
        total={calculateTotal()}
        selectedTable={selectedTable}
      />

      {/* Reservation Confirmation */}
      {showReservationConfirmation && currentReservation && (
        <ReservationConfirmation reservation={currentReservation} onClose={handleCloseReservationConfirmation} />
      )}

      {/* Toast notifications */}
      <Toaster />
    </div>
  )
}

export default function RestaurantMenu() {
  return (
    <LanguageProvider>
      <RestaurantMenuContent />
    </LanguageProvider>
  )
}
