import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ToolShell } from '../components/ToolShell'
import { extractUrls } from '../utils/text'

interface ExtractURLsProps {
  onClose: () => void
}

export const ExtractURLs: React.FC<ExtractURLsProps> = ({ onClose }) => {
  const { t } = useTranslation()
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [unique, setUnique] = useState(true)

  const handleProcess = () => {
    const urls = extractUrls(input, unique)
    setOutput(urls.join('\n'))
  }

  return (
    <ToolShell
      title={t('tool_extract_urls')}
      input={input}
      output={output}
      onInputChange={setInput}
      onProcess={handleProcess}
      onClose={onClose}
      resultTitle={t('urls_found', { count: output.split('\n').filter(Boolean).length })}
    >
      <div className="space-y-4">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={unique}
            onChange={(e) => setUnique(e.target.checked)}
            className="rounded"
          />
          <span className="text-body-md">{t('unique_only')}</span>
        </label>
      </div>
    </ToolShell>
  )
}
