import React, { useState, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { ToolShell } from '../components/ToolShell'

interface JSONValidatorProps {
  onClose: () => void
}

export const JSONValidator: React.FC<JSONValidatorProps> = ({ onClose }) => {
  const { t } = useTranslation()
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')

  const validation = useMemo(() => {
    if (!input.trim()) {
      return { valid: false, message: t('no_data') }
    }

    try {
      JSON.parse(input)
      return { valid: true, message: t('json_valid') }
    } catch (e: any) {
      const message = e.message
      const match = message.match(/position (\d+)/)
      let line = 1
      let column = 1

      if (match) {
        const position = parseInt(match[1])
        for (let i = 0; i < position && i < input.length; i++) {
          if (input[i] === '\n') {
            line++
            column = 1
          } else {
            column++
          }
        }
      }

      return {
        valid: false,
        message: t('json_error_at', { line, column, message }),
      }
    }
  }, [input, t])

  const handleProcess = () => {
    setOutput(validation.message)
  }

  return (
    <ToolShell
      title={t('tool_json_validator')}
      input={input}
      output={output}
      onInputChange={setInput}
      onProcess={handleProcess}
      onClose={onClose}
      resultTitle={
        validation.valid ? t('json_valid') : t('json_invalid')
      }
    >
      <div className="space-y-4">
        <div
          className={`p-3 rounded-base text-body-sm ${
            validation.valid
              ? 'bg-tertiary-container text-on-tertiary-container'
              : 'bg-error-container text-on-error-container'
          }`}
        >
          {validation.message}
        </div>
      </div>
    </ToolShell>
  )
}
