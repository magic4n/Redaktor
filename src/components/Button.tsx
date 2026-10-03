import React from 'react'

type ButtonVariant = 'filled' | 'tonal' | 'outlined' | 'text'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  loading?: boolean
  disabled?: boolean
  children: React.ReactNode
  className?: string
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'filled',
      size = 'md',
      loading = false,
      disabled = false,
      children,
      className = '',
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center font-medium transition-all duration-200 rounded-base focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed'

    const variantStyles = {
      filled: 'bg-primary text-on-primary hover:shadow-md active:shadow-sm',
      tonal:
        'bg-primary-container text-on-primary-container hover:shadow-sm active:shadow-none',
      outlined:
        'border border-outline text-primary hover:bg-primary hover:bg-opacity-5 active:bg-opacity-10',
      text: 'text-primary hover:bg-primary hover:bg-opacity-8 active:bg-opacity-12',
    }

    const sizeStyles = {
      sm: 'px-3 py-1.5 text-label-md',
      md: 'px-6 py-2 text-label-lg',
      lg: 'px-8 py-3 text-title-sm',
    }

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
        {...props}
      >
        {loading ? (
          <>
            <span className="inline-block w-4 h-4 mr-2 border-2 border-current border-t-transparent rounded-full animate-spin" />
            {children}
          </>
        ) : (
          children
        )}
      </button>
    )
  }
)

Button.displayName = 'Button'
