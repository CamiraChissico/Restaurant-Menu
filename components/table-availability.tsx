"use client"

import { useState, useEffect } from "react"
import { Calendar, Check, Table2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ReservationForm from "./reservation-form"
import { useLanguage } from "./language-context"
import { motion } from "framer-motion"

interface TableAvailabilityProps {
  onSelectTable: (tableId: string) => void
  selectedTable: string | null
  onReserveTable: (reservation: {
    name: string
    email: string
    phone: string
    date: Date
    time: string
    guests: number
    tableId: string
  }) => void
}

// Sample table data
const tables = [
  { id: "T1", seats: 2, location: "Window", status: "available" },
  { id: "T2", seats: 2, location: "Window", status: "available" },
  { id: "T3", seats: 4, location: "Center", status: "available" },
  { id: "T4", seats: 4, location: "Center", status: "reserved" },
  { id: "T5", seats: 6, location: "Garden", status: "available" },
  { id: "T6", seats: 8, location: "Private Room", status: "reserved" },
]

export default function TableAvailability({ onSelectTable, selectedTable, onReserveTable }: TableAvailabilityProps) {
  const { t } = useLanguage()
  const [showTables, setShowTables] = useState(false)
  const [activeTab, setActiveTab] = useState("dine-in")
  const [showReservationForm, setShowReservationForm] = useState(false)
  const [isButtonPulsing, setIsButtonPulsing] = useState(true)

  const availableTablesCount = tables.filter((table) => table.status === "available").length
  const totalTables = tables.length

  // Stop pulsing animation after a few seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsButtonPulsing(false)
    }, 5000)
    return () => clearTimeout(timer)
  }, [])

  const handleReserveClick = () => {
    if (selectedTable) {
      setShowReservationForm(true)
    }
  }

  const handleCancelReservation = () => {
    setShowReservationForm(false)
  }

  return (
    <div className="mb-8">
      <div className="relative py-6 px-4 bg-gradient-to-r from-[rgba(255,20,147,0.1)] via-transparent to-[rgba(255,20,147,0.1)] rounded-xl border-2 border-dashed border-[#FF1493] mb-8">
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-[#FFD700] text-[#5E3A4D] px-4 py-1 rounded-full font-bold text-sm">
          {t("tableAvailability")}
        </div>

        <div className="flex flex-col items-center justify-center">
          <div className="flex items-center justify-center mb-4 text-center">
            <Table2 className="h-6 w-6 mr-2 text-[#FF1493]" />
            <span className="text-lg font-semibold">
              {availableTablesCount}/{totalTables} {t("available")}
            </span>
          </div>

          <motion.div
            animate={isButtonPulsing ? { scale: [1, 1.05, 1] } : {}}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
          >
            <Button
              size="lg"
              onClick={() => setShowTables(!showTables)}
              className={`text-lg px-8 py-6 h-auto shadow-lg ${
                showTables
                  ? "bg-[#DB7093] hover:bg-[#FF1493] text-white"
                  : "bg-gradient-to-r from-[#FF1493] to-[#DB7093] hover:from-[#DB7093] hover:to-[#FF1493] text-white"
              } rounded-full transition-all duration-300 transform hover:scale-105`}
            >
              {showTables ? (
                t("hideTables")
              ) : (
                <>
                  <span className="mr-2">👀</span> {t("showTables")}
                </>
              )}
            </Button>
          </motion.div>
        </div>
      </div>

      {showTables && (
        <Card className="border-2 border-[#FF1493] shadow-lg animate-in fade-in-50 slide-in-from-top-5 duration-300">
          <CardHeader className="pb-2 bg-gradient-to-r from-[rgba(255,20,147,0.2)] to-transparent">
            <CardTitle className="text-[#FFD700] text-xl flex items-center">
              <Table2 className="h-5 w-5 mr-2" /> {t("tableAvailability")}
            </CardTitle>
            <CardDescription>{t("selectTable")}</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-4">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="dine-in">{t("dineInNow")}</TabsTrigger>
                <TabsTrigger value="reserve">{t("makeReservation")}</TabsTrigger>
              </TabsList>
            </Tabs>

            {activeTab === "dine-in" ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {tables.map((table) => (
                  <Button
                    key={table.id}
                    variant="outline"
                    disabled={table.status === "reserved"}
                    onClick={() => onSelectTable(table.id)}
                    className={`h-auto py-4 flex flex-col items-center justify-center border-2 ${
                      table.status === "reserved"
                        ? "border-gray-300 opacity-50"
                        : selectedTable === table.id
                          ? "border-[#FFD700] bg-[rgba(255,215,0,0.1)]"
                          : "border-[#FF1493]"
                    }`}
                  >
                    <div className="text-lg font-bold">{table.id}</div>
                    <div className="text-sm">
                      {table.seats} {t("seats")}
                    </div>
                    <div className="text-xs opacity-70">{table.location}</div>
                    {selectedTable === table.id && (
                      <div className="absolute top-2 right-2 bg-[#FFD700] rounded-full p-1">
                        <Check className="h-3 w-3 text-white" />
                      </div>
                    )}
                  </Button>
                ))}
              </div>
            ) : (
              <>
                {!showReservationForm ? (
                  <div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {tables.map((table) => (
                        <Button
                          key={table.id}
                          variant="outline"
                          onClick={() => onSelectTable(table.id)}
                          className={`h-auto py-4 flex flex-col items-center justify-center border-2 ${
                            selectedTable === table.id
                              ? "border-[#FFD700] bg-[rgba(255,215,0,0.1)]"
                              : "border-[#FF1493]"
                          }`}
                        >
                          <div className="text-lg font-bold">{table.id}</div>
                          <div className="text-sm">
                            {table.seats} {t("seats")}
                          </div>
                          <div className="text-xs opacity-70">{table.location}</div>
                          {selectedTable === table.id && (
                            <div className="absolute top-2 right-2 bg-[#FFD700] rounded-full p-1">
                              <Check className="h-3 w-3 text-white" />
                            </div>
                          )}
                        </Button>
                      ))}
                    </div>
                    <div className="mt-4 flex justify-center">
                      <Button
                        onClick={handleReserveClick}
                        disabled={!selectedTable}
                        className="bg-gradient-to-r from-[#FF1493] to-[#DB7093] hover:from-[#DB7093] hover:to-[#FF1493] text-white"
                      >
                        <Calendar className="mr-2 h-4 w-4" />
                        {selectedTable ? `${t("reserveTable")} ${selectedTable}` : t("selectATable")}
                      </Button>
                    </div>
                  </div>
                ) : (
                  <ReservationForm
                    onReserve={onReserveTable}
                    selectedTable={selectedTable}
                    onCancel={handleCancelReservation}
                  />
                )}
              </>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
