import React from 'react'

type TextFieldVariant = 'filled' | 'outlined'

interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  variant?: TextFieldVariant
  error?: boolean
  helperText?: string
  fullWidth?: boolean
  className?: string
}

export const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(
  (
    {
      label,
      variant = 'outlined',
      error = false,
      helperText,
      fullWidth = false,
      className = '',
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'px-4 py-2 rounded-base font-body-md transition-all duration-200 focus:outline-none'

    const variantStyles = {
      filled:
        'bg-primary-container text-on-primary-container border-0 focus:bg-primary focus:bg-opacity-10',
      outlined:
        'bg-surface border border-outline text-on-surface focus:border-primary focus:border-2',
    }

    const errorStyles = error
      ? 'border-error text-error focus:border-error'
      : 'text-on-surface'

    const widthStyles = fullWidth ? 'w-full' : ''

    return (
      <div className={`flex flex-col gap-1 ${widthStyles}`}>
        {label && <label className="text-label-md text-on-surface-variant">{label}</label>}
        <input
          ref={ref}
          className={`${baseStyles} ${variantStyles[variant]} ${errorStyles} ${widthStyles} ${className}`}
          {...props}
        />
        {helperText && (
          <p className={`text-label-sm ${error ? 'text-error' : 'text-on-surface-variant'}`}>
            {helperText}
          </p>
        )}
      </div>
    )
  }
)

TextField.displayName = 'TextField'

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  variant?: TextFieldVariant
  error?: boolean
  helperText?: string
  fullWidth?: boolean
  className?: string
}

export const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    {
      label,
      variant = 'outlined',
      error = false,
      helperText,
      fullWidth = true,
      className = '',
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'px-4 py-2 rounded-base font-body-md transition-all duration-200 focus:outline-none resize-none'

    const variantStyles = {
      filled:
        'bg-primary-container text-on-primary-container border-0 focus:bg-primary focus:bg-opacity-10',
      outlined:
        'bg-surface border border-outline text-on-surface focus:border-primary focus:border-2',
    }

    const errorStyles = error
      ? 'border-error text-error focus:border-error'
      : 'text-on-surface'

    const widthStyles = fullWidth ? 'w-full' : ''

    return (
      <div className={`flex flex-col gap-1 ${widthStyles}`}>
        {label && <label className="text-label-md text-on-surface-variant">{label}</label>}
        <textarea
          ref={ref}
          className={`${baseStyles} ${variantStyles[variant]} ${errorStyles} ${widthStyles} ${className}`}
          {...props}
        />
        {helperText && (
          <p className={`text-label-sm ${error ? 'text-error' : 'text-on-surface-variant'}`}>
            {helperText}
          </p>
        )}
      </div>
    )
  }
)

TextArea.displayName = 'TextArea'
