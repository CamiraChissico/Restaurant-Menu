"use client"

import { useState } from "react"
import { Calendar, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ReservationForm from "./reservation-form"
import { useLanguage } from "./language-context"

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

  const availableTablesCount = tables.filter((table) => table.status === "available").length
  const totalTables = tables.length

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
      <Button
        variant="outline"
        onClick={() => setShowTables(!showTables)}
        className="mb-4 border-2 border-[#FF1493] text-[#FF1493] hover:bg-[#DB7093] hover:text-white rounded-full"
      >
        {showTables ? t("hideTables") : `${t("showTables")} (${availableTablesCount}/${totalTables})`}
      </Button>

      {showTables && (
        <Card className="border-2 border-[#FF1493]">
          <CardHeader className="pb-2">
            <CardTitle className="text-[#FFD700] text-xl">{t("tableAvailability")}</CardTitle>
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
