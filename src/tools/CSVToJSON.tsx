import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { TextField } from '../components/TextField'
import { ToolShell } from '../components/ToolShell'
import { parseCSV, csvToJSON, detectDelimiter } from '../utils/csv'

interface CSVToJSONProps {
  onClose: () => void
}

export const CSVToJSON: React.FC<CSVToJSONProps> = ({ onClose }) => {
  const { t } = useTranslation()
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [delimiter, setDelimiter] = useState(',')
  const [pretty, setPretty] = useState(true)

  const handleProcess = () => {
    try {
      const detectedDelimiter = delimiter === 'auto' ? detectDelimiter(input) : (delimiter as any)
      const csvData = parseCSV(input, detectedDelimiter)
      const jsonData = csvToJSON(csvData)
      const result = pretty ? JSON.stringify(jsonData, null, 2) : JSON.stringify(jsonData)
      setOutput(result)
    } catch {
      setOutput('')
    }
  }

  return (
    <ToolShell
      title={t('tool_csv_to_json')}
      input={input}
      output={output}
      onInputChange={setInput}
      onProcess={handleProcess}
      onClose={onClose}
    >
      <div className="space-y-4">
        <TextField
          label={t('csv_delimiter')}
          value={delimiter}
          onChange={(e) => setDelimiter(e.target.value)}
          placeholder=","
          fullWidth
        />
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={pretty}
            onChange={(e) => setPretty(e.target.checked)}
            className="rounded"
          />
          <span className="text-body-md">{t('json_indent')}</span>
        </label>
      </div>
    </ToolShell>
  )
}
