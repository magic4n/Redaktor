import React, { useState, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { TextField, TextArea } from '../components/TextField'
import { Button } from '../components/Button'
import { ToolShell } from '../components/ToolShell'
import { findAndReplace } from '../utils/text'

interface FindReplaceProps {
  onClose: () => void
}

export const FindReplace: React.FC<FindReplaceProps> = ({ onClose }) => {
  const { t } = useTranslation()
  const [input, setInput] = useState('')
  const [find, setFind] = useState('')
  const [replace, setReplace] = useState('')
  const [useRegex, setUseRegex] = useState(false)
  const [caseInsensitive, setCaseInsensitive] = useState(false)
  const [global, setGlobal] = useState(true)
  const [output, setOutput] = useState('')

  const matchCount = useMemo(() => {
    if (!find) return 0
    try {
      const flags = (global ? 'g' : '') + (caseInsensitive ? 'i' : '')
      const pattern = useRegex ? new RegExp(find, flags) : new RegExp(find.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), flags)
      const matches = input.match(pattern)
      return matches ? matches.length : 0
    } catch {
      return 0
    }
  }, [input, find, useRegex, caseInsensitive, global])

  const handleProcess = () => {
    const result = findAndReplace(input, find, replace, {
      regex: useRegex,
      global,
      caseInsensitive,
    })
    setOutput(result)
  }

  return (
    <ToolShell
      title={t('tool_find_replace')}
      input={input}
      output={output}
      onInputChange={setInput}
      onProcess={handleProcess}
      onClose={onClose}
    >
      <div className="space-y-4">
        <TextField
          label={t('find')}
          value={find}
          onChange={(e) => setFind(e.target.value)}
          fullWidth
        />
        <TextField
          label={t('replace')}
          value={replace}
          onChange={(e) => setReplace(e.target.value)}
          fullWidth
        />
        {find && (
          <p className="text-body-sm text-on-surface-variant">
            {t('matches_found', { count: matchCount })}
          </p>
        )}
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={useRegex}
            onChange={(e) => setUseRegex(e.target.checked)}
            className="rounded"
          />
          <span className="text-body-md">{t('regex')}</span>
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={caseInsensitive}
            onChange={(e) => setCaseInsensitive(e.target.checked)}
            className="rounded"
          />
          <span className="text-body-md">{t('case_insensitive')}</span>
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={global}
            onChange={(e) => setGlobal(e.target.checked)}
            className="rounded"
          />
          <span className="text-body-md">{t('global')}</span>
        </label>
      </div>
    </ToolShell>
  )
}
