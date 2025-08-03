"use client"

import { useState, useCallback } from "react"
import { createContext, useContext } from "react"
import CustomToast from "./custom-toast"
import { motion, AnimatePresence } from "framer-motion"

const ToastContext = createContext()

export const useToast = () => {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider")
  }
  return context
}

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([])

  const addToast = useCallback((message, type = "info", duration = 4000) => {
    const id = Date.now() + Math.random()
    const newToast = { id, message, type, duration }

    setToasts((prev) => [...prev, newToast])

    return id
  }, [])

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }, [])

  const toast = {
    success: (message, duration) => addToast(message, "success", duration),
    error: (message, duration) => addToast(message, "error", duration),
    warning: (message, duration) => addToast(message, "warning", duration),
    info: (message, duration) => addToast(message, "info", duration),
  }

  return (
    <ToastContext.Provider value={{ toast, addToast, removeToast }}>
      {children}

      {/* Toast Container */}
      <div className="fixed bottom-4 right-4 z-[9999] pointer-events-none">
        <div className="flex flex-col gap-3 pointer-events-auto">
          <AnimatePresence mode="popLayout">
            {toasts.map((toastItem, index) => (
              <motion.div
                key={toastItem.id}
                layout
                initial={{ opacity: 0, y: 50, scale: 0.8 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: { delay: index * 0.1 },
                }}
                exit={{ opacity: 0, x: 300, scale: 0.8 }}
              >
                <CustomToast {...toastItem} onClose={removeToast} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </ToastContext.Provider>
  )
}
