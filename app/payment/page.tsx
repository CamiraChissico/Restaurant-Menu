"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"
import PaymentSection from "@/components/payment-section"
import PaymentConfirmation from "@/components/payment-confirmation"
import ReceiptModal from "@/components/receipt-modal"
import { LanguageProvider, useLanguage } from "@/components/language-context"

function PaymentPageContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { language, t } = useLanguage()
  const { toast } = useToast()

  // State
  const [orderId, setOrderId] = useState("")
  const [orderItems, setOrderItems] = useState<Array<{ name: string; price: number; emoji: string; quantity: number }>>(
    [],
  )
  const [selectedTable, setSelectedTable] = useState<string | null>(null)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [showReceipt, setShowReceipt] = useState(false)
  const [total, setTotal] = useState(0)
  const [isDataLoaded, setIsDataLoaded] = useState(false)

  // Parse order data from URL - only run once when component mounts or searchParams changes
  useEffect(() => {
    if (isDataLoaded) return // Skip if data is already loaded

    try {
      const orderIdParam = searchParams.get("orderId")
      const tableParam = searchParams.get("table")
      const totalParam = searchParams.get("total")
      const itemsParam = searchParams.get("items")

      if (orderIdParam) setOrderId(orderIdParam)
      if (tableParam) setSelectedTable(tableParam)
      if (totalParam) setTotal(Number.parseInt(totalParam))

      if (itemsParam) {
        const decodedItems = decodeURIComponent(itemsParam)
        const parsedItems = JSON.parse(decodedItems)
        setOrderItems(parsedItems)
      }

      setIsDataLoaded(true) // Mark data as loaded to prevent further processing
    } catch (error) {
      console.error("Error parsing order data:", error)
      toast({
        title: language === "PT" ? "Erro ao carregar dados" : "Error loading data",
        description:
          language === "PT"
            ? "Ocorreu um erro ao carregar os dados do pedido."
            : "There was an error loading your order data.",
        variant: "destructive",
      })
      setIsDataLoaded(true) // Mark as loaded even on error to prevent infinite retries
    }
  }, [searchParams, language, toast, isDataLoaded])

  // Handle payment
  const handlePayment = (method: string) => {
    // Show loading toast
    toast({
      title: language === "PT" ? "Processando pagamento" : "Processing payment",
      description:
        language === "PT"
          ? "Por favor, aguarde enquanto processamos seu pagamento..."
          : "Please wait while we process your payment...",
    })

    // Simulate payment processing
    setTimeout(() => {
      setShowConfirmation(true)

      // Show success toast
      toast({
        title: language === "PT" ? "Pagamento bem-sucedido!" : "Payment successful!",
        description:
          language === "PT"
            ? `Seu pedido #${orderId} foi confirmado para a mesa ${selectedTable}.`
            : `Your order #${orderId} has been confirmed for table ${selectedTable}.`,
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
    // Redirect back to menu after viewing receipt
    router.push("/")
  }

  // Return to menu
  const returnToMenu = () => {
    router.push("/")
  }

  // If no data is loaded yet, show a loading state
  if (!isDataLoaded) {
    return (
      <div className="min-h-screen p-4 md:p-8 bg-[#FFF0F5] text-[#5E3A4D] flex items-center justify-center">
        <Card className="p-8 border-2 border-[#FF1493] rounded-xl bg-[rgba(255,240,245,0.95)]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF1493] mx-auto mb-4"></div>
            <p className="text-lg font-semibold">{language === "PT" ? "Carregando..." : "Loading..."}</p>
          </div>
        </Card>
      </div>
    )
  }

  // If no order items were passed, show an error
  if (orderItems.length === 0 && isDataLoaded) {
    return (
      <div className="min-h-screen p-4 md:p-8 bg-[#FFF0F5] text-[#5E3A4D] flex items-center justify-center">
        <Card className="p-8 border-2 border-[#FF1493] rounded-xl bg-[rgba(255,240,245,0.95)] max-w-md">
          <div className="text-center">
            <div className="text-[#FF1493] text-5xl mb-4">⚠️</div>
            <h2 className="text-xl font-bold mb-4">
              {language === "PT" ? "Pedido não encontrado" : "Order not found"}
            </h2>
            <p className="mb-6">
              {language === "PT"
                ? "Não foi possível carregar os detalhes do seu pedido."
                : "We couldn't load your order details."}
            </p>
            <Button
              onClick={returnToMenu}
              className="bg-gradient-to-r from-[#FF1493] to-[#DB7093] hover:from-[#DB7093] hover:to-[#FF1493] text-white"
            >
              {language === "PT" ? "Voltar ao Menu" : "Return to Menu"}
            </Button>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-4 md:p-8 bg-[#FFF0F5] text-[#5E3A4D]">
      <Card className="max-w-3xl mx-auto border-2 border-[#FF1493] rounded-xl bg-[rgba(255,240,245,0.95)]">
        {/* Header */}
        <div className="text-center py-6 px-4 border-b-2 border-[#FF1493]/30">
          <h1 className="font-script text-3xl font-bold text-[#FFD700] mb-2">{t("paymentMethod")}</h1>
          <p className="text-[#FF1493]">
            {t("order")} #{orderId}
          </p>

          {selectedTable && (
            <div className="mt-2 inline-block bg-[rgba(255,215,0,0.1)] p-2 rounded-md border border-[#FFD700]">
              {t("tableSelected")}: <span className="font-bold">{selectedTable}</span>
            </div>
          )}
        </div>

        {/* Order Summary */}
        <div className="p-4 border-b-2 border-[#FF1493]/30">
          <h2 className="font-display text-xl text-[#FFD700] mb-3">{t("orderDetails")}</h2>

          <div className="space-y-2 max-h-[200px] overflow-y-auto mb-4">
            {orderItems.map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-center pb-2 border-b border-dashed border-[rgba(215,204,200,0.2)]"
              >
                <div className="flex-1">
                  <div className="flex items-center">
                    <span className="mr-1">{item.emoji}</span>
                    <span>{item.name}</span>
                  </div>
                  <div className="text-xs opacity-70">
                    {item.quantity} × {item.price} MZN
                  </div>
                </div>
                <div className="font-semibold">{item.price * item.quantity} MZN</div>
              </div>
            ))}
          </div>

          <div className="flex justify-between font-bold py-2 border-t-2 border-[#FF1493]/30">
            <span>{t("total")}:</span>
            <span className="text-[#FFD700] text-lg">{total} MZN</span>
          </div>
        </div>

        {/* Payment Options */}
        <div className="p-4">
          <PaymentSection onPayment={handlePayment} total={total} />
        </div>

        {/* Back Button */}
        <div className="p-4 border-t-2 border-[#FF1493]/30">
          <Button
            variant="outline"
            onClick={returnToMenu}
            className="flex items-center gap-2 border-2 border-[#FF1493] text-[#FF1493] hover:bg-[rgba(255,20,147,0.1)]"
          >
            <ArrowLeft className="h-4 w-4" />
            {t("returnToMenu")}
          </Button>
        </div>
      </Card>

      {/* Payment Confirmation */}
      {showConfirmation && (
        <PaymentConfirmation orderId={orderId} onViewReceipt={viewReceipt} selectedTable={selectedTable} />
      )}

      {/* Receipt Modal */}
      {showReceipt && (
        <ReceiptModal
          orderId={orderId}
          items={orderItems}
          total={total}
          onClose={closeReceipt}
          selectedTable={selectedTable}
        />
      )}

      {/* Toast notifications */}
      <Toaster />
    </div>
  )
}

export default function PaymentPage() {
  return (
    <LanguageProvider>
      <PaymentPageContent />
    </LanguageProvider>
  )
}
