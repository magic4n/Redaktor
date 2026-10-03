import React, { useState, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { TextField } from '../components/TextField'
import { ToolShell } from '../components/ToolShell'

interface RegexTesterProps {
  onClose: () => void
}

export const RegexTester: React.FC<RegexTesterProps> = ({ onClose }) => {
  const { t } = useTranslation()
  const [testString, setTestString] = useState('')
  const [pattern, setPattern] = useState('')
  const [flags, setFlags] = useState('g')
  const [output, setOutput] = useState('')

  const matches = useMemo(() => {
    if (!pattern || !testString) return []
    try {
      const regex = new RegExp(pattern, flags)
      const result = []
      let match
      while ((match = regex.exec(testString)) !== null) {
        result.push({
          full: match[0],
          groups: match.slice(1),
          index: match.index,
        })
        if (!flags.includes('g')) break
      }
      return result
    } catch {
      return []
    }
  }, [pattern, flags, testString])

  const handleProcess = () => {
    const result = matches
      .map(
        (m) =>
          `Match: ${m.full}\nIndex: ${m.index}${m.groups.length > 0 ? '\nGroups: ' + m.groups.join(', ') : ''}`
      )
      .join('\n---\n')
    setOutput(result || t('regex_no_match'))
  }

  return (
    <ToolShell
      title={t('tool_regex_tester')}
      input={testString}
      output={output}
      onInputChange={setTestString}
      onProcess={handleProcess}
      onClose={onClose}
      resultTitle={t('regex_matches')}
    >
      <div className="space-y-4">
        <TextField label={t('regex_pattern')} value={pattern} onChange={(e) => setPattern(e.target.value)} fullWidth />
        <TextField label={t('regex_flags')} value={flags} onChange={(e) => setFlags(e.target.value)} fullWidth />
        <p className="text-body-sm text-on-surface-variant">{t('regex_matches')}: {matches.length}</p>
      </div>
    </ToolShell>
  )
}
