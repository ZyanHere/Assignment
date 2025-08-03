let toastInstance = null

export const setToastInstance = (instance) => {
  toastInstance = instance
}

// Legacy compatibility layer
const toast = {
  success: (message, options = {}) => {
    if (toastInstance) {
      return toastInstance.success(message, options.duration)
    }
    console.warn("Toast instance not available. Make sure ToastProvider is wrapped around your app.")
  },
  error: (message, options = {}) => {
    if (toastInstance) {
      return toastInstance.error(message, options.duration)
    }
    console.warn("Toast instance not available. Make sure ToastProvider is wrapped around your app.")
  },
  warning: (message, options = {}) => {
    if (toastInstance) {
      return toastInstance.warning(message, options.duration)
    }
    console.warn("Toast instance not available. Make sure ToastProvider is wrapped around your app.")
  },
  info: (message, options = {}) => {
    if (toastInstance) {
      return toastInstance.info(message, options.duration)
    }
    console.warn("Toast instance not available. Make sure ToastProvider is wrapped around your app.")
  },
}

export default toast