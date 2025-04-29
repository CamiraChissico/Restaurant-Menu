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
    // Simulate sending email
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Show success toast
    toast({
      title: t("messageSent"),
      description: t("thankYouMessage"),
      variant: "success",
    })

    // In a real application, you would send this data to your server
    console.log("Contact form data:", data)
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
            <a
              href="tel:+258842094211"
              className="flex items-center p-6 border-2 border-[#FF1493] rounded-xl transition-all hover:-translate-y-2 hover:shadow-lg"
            >
              <div className="w-12 h-12 rounded-full bg-[rgba(141,110,99,0.2)] flex items-center justify-center mr-4 text-[#FF1493]">
                <Phone className="h-5 w-5" />
              </div>
              <div>
                <div className="font-semibold text-[#FFD700]">{t("callUs")}</div>
                <div className="text-sm">+258 84 209 4211</div>
              </div>
            </a>

            <a
              href="mailto:chissicocamira1@gmail.com"
              className="flex items-center p-6 border-2 border-[#FF1493] rounded-xl transition-all hover:-translate-y-2 hover:shadow-lg"
            >
              <div className="w-12 h-12 rounded-full bg-[rgba(141,110,99,0.2)] flex items-center justify-center mr-4 text-[#FF1493]">
                <Mail className="h-5 w-5" />
              </div>
              <div>
                <div className="font-semibold text-[#FFD700]">{t("emailUs")}</div>
                <div className="text-sm">chissicocamira1@gmail.com</div>
              </div>
            </a>
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
