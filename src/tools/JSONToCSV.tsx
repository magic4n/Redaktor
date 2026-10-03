import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { TextField } from '../components/TextField'
import { ToolShell } from '../components/ToolShell'
import { jsonToCSV } from '../utils/csv'

interface JSONToCSVProps {
  onClose: () => void
}

export const JSONToCSV: React.FC<JSONToCSVProps> = ({ onClose }) => {
  const { t } = useTranslation()
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [delimiter, setDelimiter] = useState(',')

  const handleProcess = () => {
    try {
      const jsonData = JSON.parse(input)
      if (!Array.isArray(jsonData)) {
        setOutput('')
        return
      }
      const result = jsonToCSV(jsonData, delimiter as any)
      setOutput(result)
    } catch {
      setOutput('')
    }
  }

  return (
    <ToolShell
      title={t('tool_json_to_csv')}
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
      </div>
    </ToolShell>
  )
}
