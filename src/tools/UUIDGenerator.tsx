import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ToolShell } from '../components/ToolShell'

type UUIDType = 'v4' | 'ulid' | 'nanoid'

interface UUIDGeneratorProps {
  onClose: () => void
}

// Simple UUID v4 generator
function generateUUIDv4(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0
    const v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

// Simple ULID generator
function generateULID(): string {
  const timestamp = Date.now().toString(36).padStart(10, '0')
  const random = Math.random().toString(36).substring(2, 12).padEnd(10, '0')
  return (timestamp + random).toUpperCase()
}

// Simple NanoID generator
function generateNanoID(): string {
  const alphabet = '1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
  let result = ''
  for (let i = 0; i < 21; i++) {
    result += alphabet[Math.floor(Math.random() * alphabet.length)]
  }
  return result
}

export const UUIDGenerator: React.FC<UUIDGeneratorProps> = ({ onClose }) => {
  const { t } = useTranslation()
  const [output, setOutput] = useState('')
  const [uuidType, setUUIDType] = useState<UUIDType>('v4')
  const [count, setCount] = useState('1')

  const handleProcess = () => {
    const n = Math.max(1, Math.min(1000, parseInt(count) || 1))
    const results: string[] = []

    for (let i = 0; i < n; i++) {
      switch (uuidType) {
        case 'v4':
          results.push(generateUUIDv4())
          break
        case 'ulid':
          results.push(generateULID())
          break
        case 'nanoid':
          results.push(generateNanoID())
          break
      }
    }

    setOutput(results.join('\n'))
  }

  return (
    <ToolShell
      title={t('tool_uuid')}
      input=""
      output={output}
      onInputChange={() => {}}
      onProcess={handleProcess}
      onClose={onClose}
      resultTitle={`${t('uuid_generate')} (${output.split('\n').filter(Boolean).length})`}
    >
      <div className="space-y-4">
        <div>
          <label className="text-label-md">{t('uuid_type')}</label>
          <select
            value={uuidType}
            onChange={(e) => setUUIDType(e.target.value as UUIDType)}
            className="w-full mt-1 px-3 py-2 border border-outline rounded-base bg-surface"
          >
            <option value="v4">{t('uuid_v4')}</option>
            <option value="ulid">{t('uuid_ulid')}</option>
            <option value="nanoid">{t('uuid_nanoid')}</option>
          </select>
        </div>
        <div>
          <label className="text-label-md">{t('uuid_count')}</label>
          <input
            type="number"
            min="1"
            max="1000"
            value={count}
            onChange={(e) => setCount(e.target.value)}
            className="w-full mt-1 px-3 py-2 border border-outline rounded-base bg-surface"
          />
        </div>
      </div>
    </ToolShell>
  )
}
