"use client"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { motion, AnimatePresence } from "framer-motion"
import { CreditCard, Plus, Trash2, Edit, Shield, Star, Sparkles } from "lucide-react"
import { useSession } from "next-auth/react"
import toast from "react-hot-toast"

const PaymentMethods = () => {
  const { data: session } = useSession()
  const [paymentMethods, setPaymentMethods] = useState([])
  const [loading, setLoading] = useState(true)

  const samplePaymentMethods = [
    {
      id: "1",
      type: "card",
      last4: "4242",
      brand: "Visa",
      expiryMonth: "12",
      expiryYear: "2025",
      isDefault: true,
      cardholderName: "John Doe",
    },
    {
      id: "2",
      type: "card",
      last4: "5555",
      brand: "Mastercard",
      expiryMonth: "08",
      expiryYear: "2026",
      isDefault: false,
      cardholderName: "John Doe",
    },
  ]

  useEffect(() => {
    const loadPaymentMethods = async () => {
      setLoading(true)
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000))
        setPaymentMethods(samplePaymentMethods)
      } catch (error) {
        console.error("Failed to load payment methods:", error)
        toast.error("Failed to load payment methods")
      } finally {
        setLoading(false)
      }
    }

    loadPaymentMethods()
  }, [])

  const handleRemovePaymentMethod = async (id) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500))
      setPaymentMethods((prev) => prev.filter((method) => method.id !== id))
      toast.success("Payment method removed successfully")
    } catch (error) {
      console.error("Failed to remove payment method:", error)
      toast.error("Failed to remove payment method")
    }
  }

  const handleSetDefault = async (id) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500))
      setPaymentMethods((prev) =>
        prev.map((method) => ({
          ...method,
          isDefault: method.id === id,
        })),
      )
      toast.success("Default payment method updated")
    } catch (error) {
      console.error("Failed to update default payment method:", error)
      toast.error("Failed to update default payment method")
    }
  }

  const getCardIcon = (brand) => {
    switch (brand.toLowerCase()) {
      case "visa":
        return "💳"
      case "mastercard":
        return "💳"
      case "amex":
        return "💳"
      default:
        return "💳"
    }
  }

  const getCardGradient = (brand) => {
    switch (brand.toLowerCase()) {
      case "visa":
        return "from-blue-500 to-blue-700"
      case "mastercard":
        return "from-red-500 to-orange-600"
      case "amex":
        return "from-green-500 to-emerald-600"
      default:
        return "from-gray-500 to-slate-600"
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4 sm:p-6 lg:p-8">
        <div className="max-w-6xl mx-auto">
          <Card className="bg-white/90 backdrop-blur-sm shadow-2xl border-0">
            <CardContent className="p-8">
              <div className="space-y-6">
                <div className="h-8 w-48 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg animate-pulse" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[...Array(2)].map((_, i) => (
                    <div
                      key={i}
                      className="h-48 bg-gradient-to-r from-gray-100 to-gray-200 rounded-2xl animate-pulse"
                    />
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <Card className="bg-white/90 backdrop-blur-sm shadow-2xl border-0">
            <CardContent className="p-6 lg:p-8">
              <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl shadow-lg">
                    <CreditCard className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h2 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                      Payment Methods
                    </h2>
                    <p className="text-gray-600 mt-1 text-lg">Manage your saved payment methods for quick checkout</p>
                  </div>
                  <Sparkles className="w-6 h-6 text-purple-400 ml-auto lg:ml-0" />
                </div>
                <Button className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white shadow-lg hover:shadow-xl transition-all gap-2 h-12 px-6">
                  <Plus className="w-4 h-4" />
                  Add Payment Method
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Payment Methods Grid */}
        {paymentMethods.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="bg-white/90 backdrop-blur-sm shadow-2xl border-0">
              <CardContent className="text-center py-16">
                <div className="p-8 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full w-32 h-32 mx-auto mb-6 flex items-center justify-center">
                  <CreditCard className="w-16 h-16 text-purple-500" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">No payment methods</h3>
                <p className="text-gray-600 mb-8 text-lg">
                  Add a payment method to make checkout faster and more secure
                </p>
                <Button className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white shadow-lg hover:shadow-xl transition-all gap-2 h-12 px-8">
                  <Plus className="w-4 h-4" />
                  Add Your First Payment Method
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <AnimatePresence>
              {paymentMethods.map((method, index) => (
                <motion.div
                  key={method.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -4 }}
                >
                  <Card
                    className={`relative overflow-hidden bg-white/90 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300 border-0 ${
                      method.isDefault ? "ring-2 ring-purple-500 ring-offset-2" : ""
                    }`}
                  >
                    <CardHeader className="pb-4">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-4">
                          <div
                            className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${getCardGradient(
                              method.brand,
                            )} flex items-center justify-center shadow-lg`}
                          >
                            <span className="text-3xl">{getCardIcon(method.brand)}</span>
                          </div>
                          <div>
                            <CardTitle className="text-xl font-bold text-gray-900">{method.brand}</CardTitle>
                            <p className="text-gray-600 font-mono text-lg">•••• •••• •••• {method.last4}</p>
                          </div>
                        </div>
                        <div className="flex flex-col gap-2">
                          {method.isDefault && (
                            <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1 font-semibold shadow-md flex items-center gap-1">
                              <Star className="w-3 h-3 fill-white" />
                              Default
                            </Badge>
                          )}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="bg-gradient-to-r from-gray-50 to-slate-50 rounded-xl p-4 space-y-3">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600 font-medium">Cardholder</span>
                          <span className="font-semibold text-gray-900">{method.cardholderName}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600 font-medium">Expires</span>
                          <span className="font-semibold text-gray-900">
                            {method.expiryMonth}/{method.expiryYear}
                          </span>
                        </div>
                      </div>

                      <div className="flex gap-2 pt-2">
                        {!method.isDefault && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleSetDefault(method.id)}
                            className="flex-1 hover:bg-green-50 hover:border-green-300 hover:text-green-700 transition-colors"
                          >
                            <Star className="w-4 h-4 mr-1" />
                            Set Default
                          </Button>
                        )}
                        <Button
                          variant="outline"
                          size="sm"
                          className="hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 transition-colors bg-transparent"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleRemovePaymentMethod(method.id)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50 hover:border-red-300 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* Security Notice */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Card className="bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-200 shadow-xl">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl shadow-lg">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-blue-900 text-lg mb-2">🔒 Bank-Level Security</h4>
                  <p className="text-blue-800 leading-relaxed">
                    Your payment information is protected with industry-standard encryption and security measures. We
                    never store your full card details on our servers, ensuring your financial data remains completely
                    secure.
                  </p>
                  <div className="flex items-center gap-4 mt-4 text-sm text-blue-700">
                    <span className="flex items-center gap-1">
                      <Shield className="w-4 h-4" />
                      SSL Encrypted
                    </span>
                    <span className="flex items-center gap-1">
                      <CreditCard className="w-4 h-4" />
                      PCI Compliant
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

export default PaymentMethods
