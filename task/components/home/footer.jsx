"use client"
import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  Send,
  MapPin,
  Mail,
  User,
  LogIn,
  ShoppingCart,
  Heart,
  LayoutList,
  BookOpen,
  Shield,
  HelpCircle,
  PhoneCall,
} from "lucide-react"

export default function Footer() {
  const [email, setEmail] = useState("")

  const handleSendClick = () => {
    if (!email.trim()) return
    const subject = encodeURIComponent("Subscribe Me")
    const body = encodeURIComponent(`Please subscribe me to your list.\nEmail: ${email}`)
    window.location.href = `mailto:info@thelastminutesdeal.com?subject=${subject}&body=${body}`
  }

  const linkVariants = {
    hover: { x: 5, color: "#8B5CF6", transition: { type: "spring", stiffness: 400, damping: 10 } },
  }

  const iconVariants = {
    hover: { scale: 1.1 },
    tap: { scale: 0.95 },
  }

  return (
    <footer className="bg-gradient-to-br from-gray-50 to-purple-50 py-16 px-4 sm:px-8 md:px-16 rounded-t-3xl shadow-2xl mt-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10 md:gap-12 lg:gap-16">

          {/* Exclusive/Subscribe */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <h3 className="font-extrabold text-xl sm:text-2xl md:text-3xl text-gray-900 mb-6">Exclusive</h3>
            <p className="mt-4 font-semibold text-lg sm:text-xl text-gray-800">Subscribe</p>
            <p className="mt-3 text-sm text-gray-600">Get 10% off your first order</p>
            <div className="mt-6 flex items-center border border-gray-300 rounded-lg overflow-hidden relative max-w-xs bg-white shadow-sm focus-within:ring-2 focus-within:ring-purple-400 transition-all duration-200">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 outline-none bg-transparent pr-12 text-sm sm:text-base text-gray-800"
              />
              <motion.button
                type="button"
                onClick={handleSendClick}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-gray-100 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Send email"
              >
                <Send className="w-5 h-5 text-gray-600" />
              </motion.button>
            </div>
          </motion.div>

          {/* Support */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}>
            <h3 className="font-extrabold text-xl sm:text-2xl md:text-3xl text-gray-900 mb-6">Support</h3>
            <address className="not-italic text-sm sm:text-base text-gray-700 space-y-3">
              <div className="flex items-start gap-2">
                <MapPin className="w-5 h-5 text-purple-500 mt-1" />
                <span>Fl no. 01, Dhatrak Sankul, PNVT, Panchvati, Nashik MAHARASHTRA 422003</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-purple-500" />
                <a href="mailto:info@thelastminutesdeal.com" className="hover:underline hover:text-purple-600 transition-colors">
                  info@thelastminutesdeal.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <PhoneCall className="w-5 h-5 text-purple-500" />
                <a href="tel:9067444400" className="hover:underline hover:text-purple-600 transition-colors">
                  9067444400
                </a>
              </div>
            </address>
          </motion.div>

          {/* Account */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}>
            <h3 className="font-extrabold text-xl sm:text-2xl md:text-3xl text-gray-900 mb-6">Account</h3>
            <ul className="text-sm sm:text-base text-gray-700 space-y-4">
              <li><Link href="/profile?tab=about" className="flex items-center gap-2 group"><User className="w-4 h-4 text-purple-400 group-hover:text-purple-600" /><motion.span variants={linkVariants} whileHover="hover">My Account</motion.span></Link></li>
              <li><Link href="/auth/login" className="flex items-center gap-2 group"><LogIn className="w-4 h-4 text-purple-400 group-hover:text-purple-600" /><motion.span variants={linkVariants} whileHover="hover">Login / Register</motion.span></Link></li>
              <li><Link href="/cart" className="flex items-center gap-2 group"><ShoppingCart className="w-4 h-4 text-purple-400 group-hover:text-purple-600" /><motion.span variants={linkVariants} whileHover="hover">Cart</motion.span></Link></li>
              <li><Link href="/profile?tab=saveddeals" className="flex items-center gap-2 group"><Heart className="w-4 h-4 text-purple-400 group-hover:text-purple-600" /><motion.span variants={linkVariants} whileHover="hover">Wishlist</motion.span></Link></li>
              <li><Link href="/categories" className="flex items-center gap-2 group"><LayoutList className="w-4 h-4 text-purple-400 group-hover:text-purple-600" /><motion.span variants={linkVariants} whileHover="hover">Shop</motion.span></Link></li>
            </ul>
          </motion.div>

          {/* Quick Link */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }}>
            <h3 className="font-extrabold text-xl sm:text-2xl md:text-3xl text-gray-900 mb-6">Quick Link</h3>
            <ul className="text-sm sm:text-base text-gray-700 space-y-4">
              <li><Link href="/terms" className="flex items-center gap-2 group"><BookOpen className="w-4 h-4 text-purple-400 group-hover:text-purple-600" /><motion.span variants={linkVariants} whileHover="hover">Terms Of Use</motion.span></Link></li>
              <li><Link href="/privacy" className="flex items-center gap-2 group"><Shield className="w-4 h-4 text-purple-400 group-hover:text-purple-600" /><motion.span variants={linkVariants} whileHover="hover">Privacy Policy</motion.span></Link></li>
              <li><Link href="/faq" className="flex items-center gap-2 group"><HelpCircle className="w-4 h-4 text-purple-400 group-hover:text-purple-600" /><motion.span variants={linkVariants} whileHover="hover">FAQ</motion.span></Link></li>
              <li><Link href="/contact" className="flex items-center gap-2 group"><PhoneCall className="w-4 h-4 text-purple-400 group-hover:text-purple-600" /><motion.span variants={linkVariants} whileHover="hover">Contact</motion.span></Link></li>
            </ul>
          </motion.div>

          {/* Download App + Socials */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.4 }}>
            <h3 className="font-extrabold text-xl sm:text-2xl md:text-3xl text-gray-900 mb-6">Download App</h3>
            {/* <p className="text-sm text-gray-600 mt-3">Save $3 with App New User Only</p> */}
            <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <Image src="/home/footer/qrcode.png?height=75&width=75" alt="QR Code" width={75} height={75} className="rounded-lg shadow-md" />
              <div className="flex flex-col gap-3 ml-0 sm:ml-2">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Image src="/home/footer/playStore.png?height=40&width=120" alt="Google Play" width={120} height={40} className="rounded-md shadow-sm cursor-pointer" />
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Image src="/home/footer/appstore.png?height=40&width=120" alt="App Store" width={120} height={40} className="rounded-md shadow-sm cursor-pointer" />
                </motion.div>
              </div>
            </div>

            {/* Replaced icons with actual SVGs */}
            <div className="flex space-x-6 mt-8">
              {["fb", "tw", "ig", "Linkedin"].map((platform, index) => (
                <motion.a
                  key={platform}
                  href="#"
                  whileHover="hover"
                  whileTap="tap"
                  variants={iconVariants}
                  aria-label={platform}
                >
                  <Image
                    src={`/home/footer/${platform}.svg`}
                    alt={platform}
                    width={24}
                    height={24}
                    className="hover:opacity-80 transition"
                  />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="mt-16 pt-8 border-t border-gray-200 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} Exclusive. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
