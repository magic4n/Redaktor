import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ToolShell } from '../components/ToolShell'
import { trimLines } from '../utils/text'

interface TrimLinesProps {
  onClose: () => void
}

export const TrimLines: React.FC<TrimLinesProps> = ({ onClose }) => {
  const { t } = useTranslation()
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')

  const handleProcess = () => {
    const result = trimLines(input)
    setOutput(result)
  }

  return (
    <ToolShell
      title={t('tool_trim_lines')}
      input={input}
      output={output}
      onInputChange={setInput}
      onProcess={handleProcess}
      onClose={onClose}
    >
      <div className="p-3 rounded-base bg-primary-container text-on-primary-container text-body-sm">
        {t('tool_trim_lines_desc')}
      </div>
    </ToolShell>
  )
}
