import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ToolShell } from '../components/ToolShell'
import { urlEncode, urlDecode } from '../utils/encode'

interface URLEncodeProps {
  onClose: () => void
}

export const URLEncode: React.FC<URLEncodeProps> = ({ onClose }) => {
  const { t } = useTranslation()
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [action, setAction] = useState<'encode' | 'decode'>('encode')

  const handleProcess = () => {
    try {
      const result = action === 'encode' ? urlEncode(input) : urlDecode(input)
      setOutput(result)
    } catch {
      setOutput('')
    }
  }

  return (
    <ToolShell
      title={t('tool_url_encode')}
      input={input}
      output={output}
      onInputChange={setInput}
      onProcess={handleProcess}
      onClose={onClose}
    >
      <div className="space-y-4">
        <div>
          <label className="text-label-md">{t('action')}</label>
          <select
            value={action}
            onChange={(e) => setAction(e.target.value as 'encode' | 'decode')}
            className="w-full mt-1 px-3 py-2 border border-outline rounded-base bg-surface"
          >
            <option value="encode">{t('encode')}</option>
            <option value="decode">{t('decode')}</option>
          </select>
        </div>
      </div>
    </ToolShell>
  )
}
