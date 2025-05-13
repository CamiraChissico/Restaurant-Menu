"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

type Language = "EN" | "PT"

// Define all translations
export const translations = {
  EN: {
    // General
    restaurantName: "La Belle Cuisine",
    tagline: "FINE DINING EXPERIENCE",
    seasonalMenu: "Seasonal Menu • 2024 • Open 11AM-10PM",
    darkMode: "Dark",
    lightMode: "Light",

    // Menu sections
    starters: "Starters",
    mains: "Main Courses",
    desserts: "Desserts",
    drinks: "Drinks",

    // Table availability
    showTables: "Show Available Tables",
    hideTables: "Hide Tables",
    available: "available",
    tableAvailability: "Table Availability",
    selectTable: "Select a table for your dining experience",
    dineInNow: "Dine-In Now",
    makeReservation: "Make Reservation",
    seats: "Seats",
    selectATable: "Select a Table",
    reserveTable: "Reserve Table",

    // Reservation form
    reserveTableTitle: "Reserve Table",
    fillDetails: "Fill in your details to reserve this table",
    fullName: "Full Name",
    email: "Email",
    phoneNumber: "Phone Number",
    dateTime: "Date & Time",
    pickDate: "Pick a date",
    pickTime: "Pick a time",
    numberOfGuests: "Number of Guests",
    guest: "Guest",
    guests: "Guests",
    cancel: "Cancel",
    reserve: "Reserve Table",

    // Reservation confirmation
    reservationConfirmed: "Reservation Confirmed!",
    confirmationCode: "Confirmation Code",
    table: "Table",
    date: "Date",
    time: "Time",
    name: "Name",
    confirmationEmail: "A confirmation email has been sent to",
    modifyReservation: "You can modify or cancel your reservation up to 2 hours before your scheduled time.",
    close: "Close",

    // Order summary
    yourOrder: "Your Order",
    items: "items",
    tableSelected: "Table selected",
    emptyCart: "Your cart is empty",
    total: "Total",
    checkout: "Checkout",
    pleaseSelectTable: "Please select a table before checkout",

    // Payment
    paymentMethod: "Payment Method",
    cardNumber: "Card Number",
    cardholderName: "Cardholder Name",
    expiryDate: "Expiry Date",
    cvv: "CVV",
    pay: "Pay",
    now: "Now",
    with: "with",
    mpesaPrompt: "You will receive an Mpesa prompt on your phone to complete payment.",
    emolaRedirect: "You will be redirected to Emola to complete your payment.",
    transferNumber: "Transfer to number:",
    returnToMenu: "Return to Menu",
    orderDetails: "Order Details",

    // Payment confirmation
    paymentSuccessful: "Payment Successful!",
    thankYou: "Thank you for your order. Your order #",
    hasBeenConfirmed: "has been confirmed and is being prepared.",
    yourTable: "Your table",
    notification: "You will receive a notification when your order is ready.",
    viewReceipt: "View Receipt",

    // Receipt
    receipt: "Receipt",
    order: "Order #",
    orderDetails: "ORDER DETAILS",
    subtotal: "Subtotal",
    deliveryFee: "Delivery Fee",
    print: "Print",
    save: "Save",
    thankYouDining: "Thank you for dining with us!",

    // Contact
    contactUs: "Contact Us",
    hearFromYou: "We'd love to hear from you! ✨",
    callUs: "Call Us",
    emailUs: "Email Us",
    subject: "Subject",
    message: "Message",
    sendMessage: "Send Message",
    sending: "Sending...",
    messageSent: "Message Sent!",
    thankYouMessage: "Thank you for your message. We'll get back to you as soon as possible.",
    sendAnother: "Send Another Message",
    getInTouch: "Get in Touch",
    contactFormDescription: "Have questions or feedback? Fill out the form below and we'll get back to you shortly.",

    // Food descriptions
    // Will be added directly in the menu data
  },
  PT: {
    // General
    restaurantName: "La Belle Cuisine",
    tagline: "EXPERIÊNCIA DE ALTA GASTRONOMIA",
    seasonalMenu: "Menu Sazonal • 2024 • Aberto 11h-22h",
    darkMode: "Escuro",
    lightMode: "Claro",

    // Menu sections
    starters: "Entradas",
    mains: "Pratos Principais",
    desserts: "Sobremesas",
    drinks: "Bebidas",

    // Table availability
    showTables: "Mostrar Mesas Disponíveis",
    hideTables: "Ocultar Mesas",
    available: "disponíveis",
    tableAvailability: "Disponibilidade de Mesas",
    selectTable: "Selecione uma mesa para sua experiência gastronômica",
    dineInNow: "Jantar Agora",
    makeReservation: "Fazer Reserva",
    seats: "Lugares",
    selectATable: "Selecione uma Mesa",
    reserveTable: "Reservar Mesa",

    // Reservation form
    reserveTableTitle: "Reservar Mesa",
    fillDetails: "Preencha seus dados para reservar esta mesa",
    fullName: "Nome Completo",
    email: "Email",
    phoneNumber: "Número de Telefone",
    dateTime: "Data e Hora",
    pickDate: "Escolha uma data",
    pickTime: "Escolha um horário",
    numberOfGuests: "Número de Convidados",
    guest: "Convidado",
    guests: "Convidados",
    cancel: "Cancelar",
    reserve: "Reservar Mesa",

    // Reservation confirmation
    reservationConfirmed: "Reserva Confirmada!",
    confirmationCode: "Código de Confirmação",
    table: "Mesa",
    date: "Data",
    time: "Hora",
    name: "Nome",
    confirmationEmail: "Um email de confirmação foi enviado para",
    modifyReservation: "Você pode modificar ou cancelar sua reserva até 2 horas antes do horário agendado.",
    close: "Fechar",

    // Order summary
    yourOrder: "Seu Pedido",
    items: "itens",
    tableSelected: "Mesa selecionada",
    emptyCart: "Seu carrinho está vazio",
    total: "Total",
    checkout: "Finalizar Pedido",
    pleaseSelectTable: "Por favor, selecione uma mesa antes de finalizar",

    // Payment
    paymentMethod: "Método de Pagamento",
    cardNumber: "Número do Cartão",
    cardholderName: "Nome no Cartão",
    expiryDate: "Data de Validade",
    cvv: "CVV",
    pay: "Pagar",
    now: "Agora",
    with: "com",
    mpesaPrompt: "Você receberá uma solicitação Mpesa no seu telefone para concluir o pagamento.",
    emolaRedirect: "Você será redirecionado para o Emola para concluir seu pagamento.",
    transferNumber: "Número para transferência:",
    returnToMenu: "Voltar ao Menu",
    orderDetails: "Detalhes do Pedido",

    // Payment confirmation
    paymentSuccessful: "Pagamento Bem-sucedido!",
    thankYou: "Obrigado pelo seu pedido. Seu pedido #",
    hasBeenConfirmed: "foi confirmado e está sendo preparado.",
    yourTable: "Sua mesa",
    notification: "Você receberá uma notificação quando seu pedido estiver pronto.",
    viewReceipt: "Ver Recibo",

    // Receipt
    receipt: "Recibo",
    order: "Pedido #",
    orderDetails: "DETALHES DO PEDIDO",
    subtotal: "Subtotal",
    deliveryFee: "Taxa de Entrega",
    print: "Imprimir",
    save: "Salvar",
    thankYouDining: "Obrigado por jantar conosco!",

    // Contact
    contactUs: "Contate-nos",
    hearFromYou: "Adoraríamos ouvir de você! ✨",
    callUs: "Ligue para Nós",
    emailUs: "Envie-nos um Email",
    subject: "Assunto",
    message: "Mensagem",
    sendMessage: "Enviar Mensagem",
    sending: "Enviando...",
    messageSent: "Mensagem Enviada!",
    thankYouMessage: "Obrigado pela sua mensagem. Entraremos em contato o mais breve possível.",
    sendAnother: "Enviar Outra Mensagem",
    getInTouch: "Entre em Contato",
    contactFormDescription: "Tem perguntas ou feedback? Preencha o formulário abaixo e entraremos em contato em breve.",

    // Food descriptions
    // Will be added directly in the menu data
  },
}

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: keyof typeof translations.EN) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("EN")

  const t = (key: keyof typeof translations.EN): string => {
    return translations[language][key] || key
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
