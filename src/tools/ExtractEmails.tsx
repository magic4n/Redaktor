import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ToolShell } from '../components/ToolShell'
import { extractEmails } from '../utils/text'

interface ExtractEmailsProps {
  onClose: () => void
}

export const ExtractEmails: React.FC<ExtractEmailsProps> = ({ onClose }) => {
  const { t } = useTranslation()
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [unique, setUnique] = useState(true)

  const handleProcess = () => {
    const emails = extractEmails(input, unique)
    setOutput(emails.join('\n'))
  }

  return (
    <ToolShell
      title={t('tool_extract_emails')}
      input={input}
      output={output}
      onInputChange={setInput}
      onProcess={handleProcess}
      onClose={onClose}
      resultTitle={t('emails_found', { count: output.split('\n').filter(Boolean).length })}
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
