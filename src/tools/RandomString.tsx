import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ToolShell } from '../components/ToolShell'

type Charset = 'alpha' | 'alphanumeric' | 'numeric' | 'special'

interface RandomStringProps {
  onClose: () => void
}

const CHARSETS: Record<Charset, string> = {
  alpha: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
  alphanumeric:
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
  numeric: '0123456789',
  special:
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*',
}

function generateRandomString(length: number, charset: string): string {
  let result = ''
  for (let i = 0; i < length; i++) {
    result += charset.charAt(Math.floor(Math.random() * charset.length))
  }
  return result
}

export const RandomString: React.FC<RandomStringProps> = ({ onClose }) => {
  const { t } = useTranslation()
  const [output, setOutput] = useState('')
  const [length, setLength] = useState('16')
  const [count, setCount] = useState('1')
  const [charset, setCharset] = useState<Charset>('alphanumeric')

  const handleProcess = () => {
    const len = Math.max(1, Math.min(512, parseInt(length) || 16))
    const cnt = Math.max(1, Math.min(100, parseInt(count) || 1))
    const chars = CHARSETS[charset]
    const results: string[] = []

    for (let i = 0; i < cnt; i++) {
      results.push(generateRandomString(len, chars))
    }

    setOutput(results.join('\n'))
  }

  return (
    <ToolShell
      title={t('tool_random_string')}
      input=""
      output={output}
      onInputChange={() => {}}
      onProcess={handleProcess}
      onClose={onClose}
    >
      <div className="space-y-4">
        <div>
          <label className="text-label-md">{t('string_length')}</label>
          <input
            type="number"
            min="1"
            max="512"
            value={length}
            onChange={(e) => setLength(e.target.value)}
            className="w-full mt-1 px-3 py-2 border border-outline rounded-base bg-surface"
          />
        </div>
        <div>
          <label className="text-label-md">{t('string_count')}</label>
          <input
            type="number"
            min="1"
            max="100"
            value={count}
            onChange={(e) => setCount(e.target.value)}
            className="w-full mt-1 px-3 py-2 border border-outline rounded-base bg-surface"
          />
        </div>
        <div>
          <label className="text-label-md">{t('string_charset')}</label>
          <select
            value={charset}
            onChange={(e) => setCharset(e.target.value as Charset)}
            className="w-full mt-1 px-3 py-2 border border-outline rounded-base bg-surface"
          >
            <option value="alpha">{t('string_charset_alpha')}</option>
            <option value="alphanumeric">{t('string_charset_alphanumeric')}</option>
            <option value="numeric">{t('string_charset_numeric')}</option>
            <option value="special">{t('string_charset_special')}</option>
          </select>
        </div>
      </div>
    </ToolShell>
  )
}
