import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ToolShell } from '../components/ToolShell'

interface JSONFormatterProps {
  onClose: () => void
}

export const JSONFormatter: React.FC<JSONFormatterProps> = ({ onClose }) => {
  const { t } = useTranslation()
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [indent, setIndent] = useState('2')
  const [sortKeys, setSortKeys] = useState(false)
  const [minify, setMinify] = useState(false)

  const handleProcess = () => {
    try {
      const parsed = JSON.parse(input)
      let result: string

      if (minify) {
        result = JSON.stringify(parsed)
      } else {
        result = JSON.stringify(parsed, null, parseInt(indent))
      }

      // Sort keys if needed
      if (sortKeys && !minify) {
        const sorted = JSON.parse(result, (key, value) => {
          if (value && typeof value === 'object' && !Array.isArray(value)) {
            return Object.keys(value)
              .sort()
              .reduce((obj: any, k) => {
                obj[k] = value[k]
                return obj
              }, {})
          }
          return value
        })
        result = JSON.stringify(sorted, null, parseInt(indent))
      }

      setOutput(result)
    } catch {
      setOutput('')
    }
  }

  return (
    <ToolShell
      title={t('tool_json_format')}
      input={input}
      output={output}
      onInputChange={setInput}
      onProcess={handleProcess}
      onClose={onClose}
    >
      <div className="space-y-4">
        <div>
          <label className="text-label-md">{t('json_indent')}</label>
          <select
            value={indent}
            onChange={(e) => setIndent(e.target.value)}
            disabled={minify}
            className="w-full mt-1 px-3 py-2 border border-outline rounded-base bg-surface disabled:opacity-50"
          >
            <option value="2">2</option>
            <option value="4">4</option>
            <option value="tab">Tab</option>
          </select>
        </div>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={sortKeys}
            onChange={(e) => setSortKeys(e.target.checked)}
            disabled={minify}
            className="rounded"
          />
          <span className="text-body-md">{t('json_sort_keys')}</span>
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={minify}
            onChange={(e) => setMinify(e.target.checked)}
            className="rounded"
          />
          <span className="text-body-md">{t('json_minify')}</span>
        </label>
      </div>
    </ToolShell>
  )
}
