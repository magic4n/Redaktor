import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ToolShell } from '../components/ToolShell'
import { removeEmptyLines } from '../utils/text'

interface RemoveEmptyProps {
  onClose: () => void
}

export const RemoveEmpty: React.FC<RemoveEmptyProps> = ({ onClose }) => {
  const { t } = useTranslation()
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [trimWhitespace, setTrimWhitespace] = useState(true)

  const handleProcess = () => {
    const result = removeEmptyLines(input, trimWhitespace)
    setOutput(result)
  }

  return (
    <ToolShell
      title={t('tool_remove_empty')}
      input={input}
      output={output}
      onInputChange={setInput}
      onProcess={handleProcess}
      onClose={onClose}
    >
      <div className="space-y-4">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={trimWhitespace}
            onChange={(e) => setTrimWhitespace(e.target.checked)}
            className="rounded"
          />
          <span className="text-body-md">{t('dedupe_trim')}</span>
        </label>
      </div>
    </ToolShell>
  )
}
