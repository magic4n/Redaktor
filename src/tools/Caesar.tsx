import React, { useState, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { ToolShell } from '../components/ToolShell'
import { caesarCipher } from '../utils/encode'

interface CaesarProps {
  onClose: () => void
}

export const Caesar: React.FC<CaesarProps> = ({ onClose }) => {
  const { t } = useTranslation()
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [shift, setShift] = useState('3')

  const preview = useMemo(() => {
    if (!input) return ''
    return caesarCipher(input, parseInt(shift) || 0)
  }, [input, shift])

  const handleProcess = () => {
    setOutput(preview)
  }

  return (
    <ToolShell
      title="Caesar Cipher"
      input={input}
      output={output}
      onInputChange={setInput}
      onProcess={handleProcess}
      onClose={onClose}
    >
      <div className="space-y-4">
        <div>
          <label className="text-label-md">Shift (1-25)</label>
          <input
            type="number"
            min="0"
            max="25"
            value={shift}
            onChange={(e) => setShift(e.target.value)}
            className="w-full mt-1 px-3 py-2 border border-outline rounded-base bg-surface"
          />
        </div>
        {input && (
          <div className="p-3 rounded-base bg-primary-container text-on-primary-container text-body-sm">
            Preview: {preview}
          </div>
        )}
      </div>
    </ToolShell>
  )
}
