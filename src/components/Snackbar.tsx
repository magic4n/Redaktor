import React, { useEffect } from 'react'

type SnackbarType = 'success' | 'error' | 'info' | 'warning'

interface SnackbarProps {
  message: string
  type?: SnackbarType
  duration?: number
  onClose: () => void
  className?: string
}

export const Snackbar: React.FC<SnackbarProps> = ({
  message,
  type = 'info',
  duration = 3000,
  onClose,
  className = '',
}) => {
  useEffect(() => {
    const timer = setTimeout(onClose, duration)
    return () => clearTimeout(timer)
  }, [duration, onClose])

  const typeStyles = {
    success: 'bg-tertiary-container text-on-tertiary-container',
    error: 'bg-error-container text-on-error-container',
    info: 'bg-primary-container text-on-primary-container',
    warning: 'bg-secondary-container text-on-secondary-container',
  }

  return (
    <div
      className={`fixed bottom-6 left-6 right-6 max-w-md px-6 py-4 rounded-base shadow-lg ${typeStyles[type]} ${className} animate-slide-up`}
      role="alert"
    >
      <p className="text-body-md">{message}</p>
    </div>
  )
}
