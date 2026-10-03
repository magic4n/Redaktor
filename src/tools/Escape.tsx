import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ToolShell } from '../components/ToolShell'
import { htmlEscape, htmlUnescape, jsonEscape, jsonUnescape, sqlEscape, regexEscape } from '../utils/encode'

type EscapeType = 'html' | 'json' | 'url' | 'csv' | 'sql' | 'regex'

interface EscapeProps {
  onClose: () => void
}

export const Escape: React.FC<EscapeProps> = ({ onClose }) => {
  const { t } = useTranslation()
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [escapeType, setEscapeType] = useState<EscapeType>('html')
  const [action, setAction] = useState<'escape' | 'unescape'>('escape')

  const handleProcess = () => {
    try {
      let result = input

      if (escapeType === 'html') {
        result = action === 'escape' ? htmlEscape(input) : htmlUnescape(input)
      } else if (escapeType === 'json') {
        result = action === 'escape' ? jsonEscape(input) : jsonUnescape(input)
      } else if (escapeType === 'sql') {
        result = action === 'escape' ? sqlEscape(input) : input
      } else if (escapeType === 'regex') {
        result = action === 'escape' ? regexEscape(input) : input
      }

      setOutput(result)
    } catch {
      setOutput('')
    }
  }

  return (
    <ToolShell
      title={t('tool_escape')}
      input={input}
      output={output}
      onInputChange={setInput}
      onProcess={handleProcess}
      onClose={onClose}
    >
      <div className="space-y-4">
        <div>
          <label className="text-label-md">{t('escape_type')}</label>
          <select
            value={escapeType}
            onChange={(e) => setEscapeType(e.target.value as EscapeType)}
            className="w-full mt-1 px-3 py-2 border border-outline rounded-base bg-surface"
          >
            <option value="html">{t('escape_html')}</option>
            <option value="json">{t('escape_json')}</option>
            <option value="sql">{t('escape_sql')}</option>
            <option value="regex">{t('escape_regex')}</option>
          </select>
        </div>
        {(escapeType === 'html' || escapeType === 'json') && (
          <div>
            <label className="text-label-md">{t('action')}</label>
            <select
              value={action}
              onChange={(e) => setAction(e.target.value as 'escape' | 'unescape')}
              className="w-full mt-1 px-3 py-2 border border-outline rounded-base bg-surface"
            >
              <option value="escape">{t('encode')}</option>
              <option value="unescape">{t('decode')}</option>
            </select>
          </div>
        )}
      </div>
    </ToolShell>
  )
}
