"use client"

import { motion, AnimatePresence } from "framer-motion"
import { CheckCircle, XCircle, AlertCircle, Info, X } from "lucide-react"
import { useEffect, useState } from "react"

const ToastIcon = ({ type }) => {
  const icons = {
    success: CheckCircle,
    error: XCircle,
    warning: AlertCircle,
    info: Info,
  }

  const Icon = icons[type] || Info

  const colors = {
    success: "text-emerald-500",
    error: "text-red-500",
    warning: "text-amber-500",
    info: "text-blue-500",
  }

  return (
    <motion.div
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`${colors[type]} relative`}
    >
      <Icon className="w-6 h-6" />
      {type === "success" && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1.2, 1] }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="absolute -inset-1 bg-emerald-500/20 rounded-full blur-sm"
        />
      )}
    </motion.div>
  )
}

const CustomToast = ({ id, message, type = "info", duration = 4000, onClose }) => {
  const [isVisible, setIsVisible] = useState(true)
  const [progress, setProgress] = useState(100)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
      setTimeout(() => onClose(id), 300)
    }, duration)

    const progressTimer = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev - 100 / (duration / 100)
        return newProgress <= 0 ? 0 : newProgress
      })
    }, 100)

    return () => {
      clearTimeout(timer)
      clearInterval(progressTimer)
    }
  }, [duration, id, onClose])

  const backgroundColors = {
    success: "from-emerald-500/10 via-green-500/5 to-teal-500/10",
    error: "from-red-500/10 via-pink-500/5 to-rose-500/10",
    warning: "from-amber-500/10 via-yellow-500/5 to-orange-500/10",
    info: "from-blue-500/10 via-cyan-500/5 to-indigo-500/10",
  }

  const borderColors = {
    success: "border-emerald-500/20",
    error: "border-red-500/20",
    warning: "border-amber-500/20",
    info: "border-blue-500/20",
  }

  const progressColors = {
    success: "bg-gradient-to-r from-emerald-400 to-green-500",
    error: "bg-gradient-to-r from-red-400 to-pink-500",
    warning: "bg-gradient-to-r from-amber-400 to-yellow-500",
    info: "bg-gradient-to-r from-blue-400 to-cyan-500",
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: 300, scale: 0.8 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 300, scale: 0.8 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className={`
            relative overflow-hidden
            bg-gradient-to-br ${backgroundColors[type]}
            backdrop-blur-xl border ${borderColors[type]}
            rounded-2xl shadow-2xl
            p-4 min-w-[320px] max-w-[400px]
            group hover:scale-105 transition-transform duration-200
          `}
        >
          {/* Floating particles background */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-white/30 rounded-full"
                initial={{
                  x: Math.random() * 400,
                  y: Math.random() * 100,
                  opacity: 0,
                }}
                animate={{
                  x: Math.random() * 400,
                  y: Math.random() * 100,
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>

          {/* Main content */}
          <div className="relative z-10 flex items-start gap-3">
            <ToastIcon type={type} />

            <div className="flex-1 min-w-0">
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-gray-800 font-medium text-sm leading-relaxed"
              >
                {message}
              </motion.p>
            </div>

            <motion.button
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              onClick={() => {
                setIsVisible(false)
                setTimeout(() => onClose(id), 300)
              }}
              className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-white/20"
            >
              <X className="w-4 h-4" />
            </motion.button>
          </div>

          {/* Progress bar */}
          <motion.div
            initial={{ width: "100%" }}
            animate={{ width: `${progress}%` }}
            className={`
              absolute bottom-0 left-0 h-1 
              ${progressColors[type]}
              transition-all duration-100 ease-linear
            `}
          />

          {/* Shimmer effect */}
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              repeatDelay: 3,
              ease: "easeInOut",
            }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default CustomToast
