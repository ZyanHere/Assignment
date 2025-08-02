"use client"
import { useState } from "react"
import OrderHistory from "./OrderHistory"
import ToReview from "./ToReview"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Package, Star, Sparkles } from "lucide-react"
import { motion } from "framer-motion"

export default function MyOrders() {
  const [activeTab, setActiveTab] = useState("orderHistory")

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          {/* Enhanced Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <Card className="bg-white/90 backdrop-blur-sm shadow-2xl border-0">
              <CardContent className="p-6 lg:p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-lg">
                    <Package className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      My Orders
                    </h1>
                    <p className="text-gray-600 mt-1">Track and manage your purchases</p>
                  </div>
                  <Sparkles className="w-6 h-6 text-purple-400 ml-auto" />
                </div>

                <TabsList className="flex flex-wrap justify-center bg-gradient-to-r from-gray-100 to-slate-100 p-2 rounded-2xl mx-auto shadow-lg gap-2">
                  <TabsTrigger
                    value="orderHistory"
                    className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-lg px-6 py-3 rounded-xl text-sm font-semibold transition-all flex-1 sm:flex-none text-center hover:bg-white/50"
                  >
                    <Package className="w-4 h-4 mr-2" />
                    Order History
                  </TabsTrigger>
                  <TabsTrigger
                    value="toReview"
                    className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-yellow-500 data-[state=active]:to-orange-500 data-[state=active]:text-white data-[state=active]:shadow-lg px-6 py-3 rounded-xl text-sm font-semibold transition-all flex-1 sm:flex-none text-center hover:bg-white/50"
                  >
                    <Star className="w-4 h-4 mr-2" />
                    To Review
                  </TabsTrigger>
                </TabsList>
              </CardContent>
            </Card>
          </motion.div>

          {/* Enhanced Tabs Content */}
          <TabsContent value="orderHistory" className="mt-0">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
              <OrderHistory />
            </motion.div>
          </TabsContent>

          <TabsContent value="toReview" className="mt-0">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
              <ToReview />
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
