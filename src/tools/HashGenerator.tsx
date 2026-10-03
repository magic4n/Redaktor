import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ToolShell } from '../components/ToolShell'
import { sha256, sha512, sha1 } from '../utils/crypto'

type HashAlgorithm = 'md5' | 'sha1' | 'sha256' | 'sha512'

interface HashGeneratorProps {
  onClose: () => void
}

export const HashGenerator: React.FC<HashGeneratorProps> = ({ onClose }) => {
  const { t } = useTranslation()
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [algorithm, setAlgorithm] = useState<HashAlgorithm>('sha256')

  const handleProcess = async () => {
    try {
      let result = ''
      switch (algorithm) {
        case 'sha1':
          result = await sha1(input)
          break
        case 'sha256':
          result = await sha256(input)
          break
        case 'sha512':
          result = await sha512(input)
          break
        default:
          result = ''
      }
      setOutput(result)
    } catch {
      setOutput('')
    }
  }

  return (
    <ToolShell
      title={t('tool_hash')}
      input={input}
      output={output}
      onInputChange={setInput}
      onProcess={handleProcess}
      onClose={onClose}
    >
      <div className="space-y-4">
        <div>
          <label className="text-label-md">{t('hash_algorithm')}</label>
          <select
            value={algorithm}
            onChange={(e) => setAlgorithm(e.target.value as HashAlgorithm)}
            className="w-full mt-1 px-3 py-2 border border-outline rounded-base bg-surface"
          >
            <option value="sha1">{t('hash_sha1')}</option>
            <option value="sha256">{t('hash_sha256')}</option>
            <option value="sha512">{t('hash_sha512')}</option>
          </select>
        </div>
      </div>
    </ToolShell>
  )
}
