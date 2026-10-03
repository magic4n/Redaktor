import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { TextArea } from '../components/TextField'
import { Button } from '../components/Button'
import { ToolShell } from '../components/ToolShell'
import { removeDuplicateLines } from '../utils/text'

interface RemoveDuplicatesProps {
  onClose: () => void
}

export const RemoveDuplicates: React.FC<RemoveDuplicatesProps> = ({ onClose }) => {
  const { t } = useTranslation()
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [caseSensitive, setCaseSensitive] = useState(true)
  const [trim, setTrim] = useState(false)
  const [keep, setKeep] = useState<'first' | 'last'>('first')

  const handleProcess = () => {
    const result = removeDuplicateLines(input, { caseSensitive, trim, keep })
    setOutput(result)
  }

  return (
    <ToolShell
      title={t('tool_dedupe')}
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
            checked={caseSensitive}
            onChange={(e) => setCaseSensitive(e.target.checked)}
            className="rounded"
          />
          <span className="text-body-md">{t('dedupe_case_sensitive')}</span>
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={trim}
            onChange={(e) => setTrim(e.target.checked)}
            className="rounded"
          />
          <span className="text-body-md">{t('dedupe_trim')}</span>
        </label>
        <div>
          <label className="text-label-md">{t('dedupe_keep')}</label>
          <select
            value={keep}
            onChange={(e) => setKeep(e.target.value as 'first' | 'last')}
            className="w-full mt-1 px-3 py-2 border border-outline rounded-base bg-surface"
          >
            <option value="first">{t('dedupe_keep_first')}</option>
            <option value="last">{t('dedupe_keep_last')}</option>
          </select>
        </div>
      </div>
    </ToolShell>
  )
}
