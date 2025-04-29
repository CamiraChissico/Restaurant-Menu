"use client"

import type React from "react"

import { useState } from "react"
import { Send, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useLanguage } from "./language-context"

interface ContactFormProps {
  onSubmit: (data: {
    name: string
    email: string
    subject: string
    message: string
  }) => Promise<void>
}

export default function ContactForm({ onSubmit }: ContactFormProps) {
  const { t } = useLanguage()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [subject, setSubject] = useState("")
  const [message, setMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      await onSubmit({ name, email, subject, message })
      setIsSubmitted(true)
      // Reset form
      setName("")
      setEmail("")
      setSubject("")
      setMessage("")
    } catch (err) {
      setError(typeof err === "string" ? err : "An error occurred. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-md mx-auto">
      {isSubmitted ? (
        <div className="text-center p-6 bg-[rgba(255,20,147,0.1)] rounded-lg border border-[#FF1493]">
          <CheckCircle className="w-12 h-12 mx-auto text-green-500 mb-4" />
          <h3 className="text-xl font-bold text-[#FFD700] mb-2">{t("messageSent")}</h3>
          <p className="mb-4">{t("thankYouMessage")}</p>
          <Button
            variant="outline"
            className="border-2 border-[#FF1493] text-[#FF1493] hover:bg-[#DB7093] hover:text-white"
            onClick={() => setIsSubmitted(false)}
          >
            {t("sendAnother")}
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">{t("fullName")}</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="border-[#FF1493]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">{t("email")}</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="border-[#FF1493]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="subject">{t("subject")}</Label>
            <Input
              id="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
              className="border-[#FF1493]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">{t("message")}</Label>
            <Textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              className="min-h-[120px] border-[#FF1493]"
            />
          </div>

          {error && <div className="text-red-500 text-sm p-2 bg-red-50 rounded">{error}</div>}

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-[#FF1493] to-[#DB7093] hover:from-[#DB7093] hover:to-[#FF1493] text-white"
            disabled={isSubmitting}
          >
            {isSubmitting ? t("sending") : t("sendMessage")} {!isSubmitting && <Send className="ml-2 h-4 w-4" />}
          </Button>
        </form>
      )}
    </div>
  )
}
