import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ToolShell } from '../components/ToolShell'
import { sortLines } from '../utils/text'

interface SortLinesProps {
  onClose: () => void
}

export const SortLines: React.FC<SortLinesProps> = ({ onClose }) => {
  const { t } = useTranslation()
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [order, setOrder] = useState<'asc' | 'desc'>('asc')
  const [by, setBy] = useState<'alpha' | 'length' | 'natural' | 'random' | 'reverse'>('alpha')

  const handleProcess = () => {
    const result = sortLines(input, { order, by })
    setOutput(result)
  }

  return (
    <ToolShell
      title={t('tool_sort')}
      input={input}
      output={output}
      onInputChange={setInput}
      onProcess={handleProcess}
      onClose={onClose}
    >
      <div className="space-y-4">
        <div>
          <label className="text-label-md">{t('sort_order')}</label>
          <select
            value={order}
            onChange={(e) => setOrder(e.target.value as 'asc' | 'desc')}
            className="w-full mt-1 px-3 py-2 border border-outline rounded-base bg-surface"
          >
            <option value="asc">{t('sort_asc')}</option>
            <option value="desc">{t('sort_desc')}</option>
          </select>
        </div>
        <div>
          <label className="text-label-md">{t('action')}</label>
          <select
            value={by}
            onChange={(e) => setBy(e.target.value as any)}
            className="w-full mt-1 px-3 py-2 border border-outline rounded-base bg-surface"
          >
            <option value="alpha">Alphabetically</option>
            <option value="length">{t('sort_length')}</option>
            <option value="natural">{t('sort_natural')}</option>
            <option value="random">{t('sort_random')}</option>
            <option value="reverse">{t('sort_reverse')}</option>
          </select>
        </div>
      </div>
    </ToolShell>
  )
}
