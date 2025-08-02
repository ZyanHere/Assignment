"use client"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, Phone, MessageSquare, Send, Loader2, MapPin, Sparkles, Clock, Globe } from "lucide-react"
import { fetchUserMessages } from "@/lib/api/profile"
import { useSession } from "next-auth/react"
import toast from "react-hot-toast"

export default function Messages() {
  const { data: session } = useSession()
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)
  const [sending, setSending] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })

  useEffect(() => {
    const loadMessages = async () => {
      if (session?.user?.token) {
        try {
          const messagesData = await fetchUserMessages()
          setMessages(messagesData)
        } catch (error) {
          console.error("Failed to fetch messages:", error)
        } finally {
          setLoading(false)
        }
      } else {
        setLoading(false)
      }
    }

    loadMessages()
  }, [session])

  useEffect(() => {
    if (session?.user) {
      setFormData((prev) => ({
        ...prev,
        name: session.user.name || "",
        email: session.user.email || "",
      }))
    }
  }, [session])

  const handleInputChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSending(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast.success("Message sent successfully!")
      setFormData({
        name: session?.user?.name || "",
        email: session?.user?.email || "",
        phone: "",
        subject: "",
        message: "",
      })
    } catch (error) {
      console.error("Failed to send message:", error)
      toast.error("Failed to send message. Please try again.")
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4 sm:p-6 lg:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto"
      >
        <Card className="bg-white/90 backdrop-blur-sm shadow-2xl border-0 overflow-hidden">
          {/* Enhanced Header */}
          <CardHeader className="bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 border-b border-gray-100">
            <CardTitle className="flex items-center gap-4 text-2xl sm:text-3xl">
              <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-lg">
                <MessageSquare className="w-8 h-8 text-white" />
              </div>
              <div>
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-bold">
                  Contact Us
                </span>
                <p className="text-gray-600 text-base font-normal mt-2">
                  Have questions about Last Minute Deal? Send us a message and we'll respond within 24 hours.
                </p>
              </div>
              <Sparkles className="w-6 h-6 text-purple-400 ml-auto" />
            </CardTitle>
          </CardHeader>

          <div className="flex flex-col lg:flex-row">
            {/* Enhanced Contact Info Sidebar */}
            <div className="bg-gradient-to-br from-slate-50 to-gray-100 p-6 lg:p-8 lg:w-2/5 border-b lg:border-b-0 lg:border-r border-gray-200">
              <div className="space-y-8">
                {/* Company Info */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="mb-8"
                >
                  <div className="p-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl shadow-lg mb-4">
                    <h3 className="font-bold text-xl text-white mb-2">TWWIOS TECHNOLOGIES</h3>
                    <h4 className="font-semibold text-blue-100">PRIVATE LIMITED</h4>
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    Your trusted partner for last-minute deals on retail products, hotels, movies, and events.
                  </p>
                </motion.div>

                {/* Contact Methods */}
                <div className="space-y-6">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="flex items-start gap-4 p-4 bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow"
                  >
                    <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl shadow-lg">
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-gray-900">Call Us</h3>
                      <p className="text-gray-600 mt-1 text-sm">Available for customer support</p>
                      <p className="font-bold mt-2 text-green-600 text-lg">8149042420</p>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="flex items-start gap-4 p-4 bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow"
                  >
                    <div className="p-3 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl shadow-lg">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-gray-900">Email Us</h3>
                      <p className="text-gray-600 mt-1 text-sm flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        We'll respond within 24 hours
                      </p>
                      <p className="font-bold mt-2 text-blue-600 text-lg">info@lastminutessdeal.com</p>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                    className="flex items-start gap-4 p-4 bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow"
                  >
                    <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl shadow-lg">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-gray-900">Visit Us</h3>
                      <p className="text-gray-600 mt-1 text-sm">Registered & Operational Office</p>
                      <p className="font-semibold mt-2 text-purple-600 text-sm leading-relaxed">
                        Fl no. 01, Dhatrak Sankul, PNVT, Panchvati, Nashik Nashik MAHARASHTRA 422003
                      </p>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 }}
                    className="flex items-start gap-4 p-4 bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow"
                  >
                    <div className="p-3 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl shadow-lg">
                      <Globe className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-gray-900">Website</h3>
                      <p className="text-gray-600 mt-1 text-sm">Visit our online platform</p>
                      <p className="font-bold mt-2 text-orange-600 text-lg">www.lastminutessdeal.com</p>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Enhanced Contact Form */}
            <div className="p-6 lg:p-8 lg:w-3/5">
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                      <label htmlFor="name" className="text-sm font-semibold text-gray-700 mb-2 block">
                        Your Name
                      </label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="John Doe"
                        className="h-12 border-gray-200 focus:border-purple-400 focus:ring-purple-400 transition-all"
                        required
                      />
                    </motion.div>

                    <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                      <label htmlFor="email" className="text-sm font-semibold text-gray-700 mb-2 block">
                        Your Email
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="john@example.com"
                        className="h-12 border-gray-200 focus:border-purple-400 focus:ring-purple-400 transition-all"
                        required
                      />
                    </motion.div>

                    <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                      <label htmlFor="phone" className="text-sm font-semibold text-gray-700 mb-2 block">
                        Phone Number
                      </label>
                      <Input
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="8149042420"
                        className="h-12 border-gray-200 focus:border-purple-400 focus:ring-purple-400 transition-all"
                      />
                    </motion.div>

                    <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                      <label htmlFor="subject" className="text-sm font-semibold text-gray-700 mb-2 block">
                        Subject
                      </label>
                      <Input
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        placeholder="How can we help?"
                        className="h-12 border-gray-200 focus:border-purple-400 focus:ring-purple-400 transition-all"
                        required
                      />
                    </motion.div>
                  </div>

                  <motion.div whileHover={{ scale: 1.01 }} transition={{ duration: 0.2 }}>
                    <label htmlFor="message" className="text-sm font-semibold text-gray-700 mb-2 block">
                      Your Message
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Tell us about your inquiry regarding our products, services, or any other questions..."
                      className="min-h-[150px] border-gray-200 focus:border-purple-400 focus:ring-purple-400 transition-all resize-none"
                      required
                    />
                  </motion.div>

                  <div className="flex justify-end pt-4">
                    <Button
                      type="submit"
                      className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all h-12 px-8 text-base font-semibold"
                      disabled={sending}
                    >
                      {sending ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 mr-2" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </motion.div>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  )
}
