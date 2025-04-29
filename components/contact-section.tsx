"use client"
import { Phone, Mail, Heart } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { useLanguage } from "./language-context"
import ContactForm from "./contact-form"

export default function ContactSection() {
  const { t } = useLanguage()
  const { toast } = useToast()

  const handleSubmitContactForm = async (data: {
    name: string
    email: string
    subject: string
    message: string
  }) => {
    // Show a success message but don't actually send the data
    toast({
      title: t("messageSent"),
      description: t("thankYouMessage"),
      variant: "success",
    })

    // Log the data that would have been sent
    console.log("Contact form data (not sent):", data)
  }

  return (
    <div className="px-4 md:px-8 py-8 mt-8 border-t-2 border-[#FF1493]">
      <div className="flex items-center justify-center mb-6">
        <div className="h-[2px] w-24 bg-gradient-to-r from-transparent via-[#FF1493] to-transparent"></div>
        <Heart className="mx-4 text-[#FF1493]" />
        <div className="h-[2px] w-24 bg-gradient-to-r from-transparent via-[#FF1493] to-transparent"></div>
      </div>

      <h3 className="text-center text-2xl md:text-3xl font-display text-[#FFD700] mb-4">{t("contactUs")}</h3>

      <p className="text-center italic mb-8">{t("hearFromYou")}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {/* Contact Info */}
        <div className="space-y-6">
          <h4 className="text-xl font-display text-[#FFD700] mb-4">{t("getInTouch")}</h4>
          <p className="mb-6">{t("contactFormDescription")}</p>

          <div className="flex flex-col gap-4">
            <div className="flex items-center p-6 border-2 border-[#FF1493] rounded-xl">
              <div className="w-12 h-12 rounded-full bg-[rgba(141,110,99,0.2)] flex items-center justify-center mr-4 text-[#FF1493]">
                <Phone className="h-5 w-5" />
              </div>
              <div>
                <div className="font-semibold text-[#FFD700]">{t("callUs")}</div>
                <div className="text-sm">+258 84 209 4211</div>
              </div>
            </div>

            <div className="flex items-center p-6 border-2 border-[#FF1493] rounded-xl">
              <div className="w-12 h-12 rounded-full bg-[rgba(141,110,99,0.2)] flex items-center justify-center mr-4 text-[#FF1493]">
                <Mail className="h-5 w-5" />
              </div>
              <div>
                <div className="font-semibold text-[#FFD700]">{t("emailUs")}</div>
                <div className="text-sm">chissicocamira1@gmail.com</div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="border-2 border-[#FF1493] rounded-xl p-6">
          <ContactForm onSubmit={handleSubmitContactForm} />
        </div>
      </div>
    </div>
  )
}
