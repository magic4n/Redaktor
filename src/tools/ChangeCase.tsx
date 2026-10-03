import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ToolShell } from '../components/ToolShell'
import { changeCase, CaseType } from '../utils/text'

interface ChangeCaseProps {
  onClose: () => void
}

export const ChangeCase: React.FC<ChangeCaseProps> = ({ onClose }) => {
  const { t } = useTranslation()
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [caseType, setCaseType] = useState<CaseType>(CaseType.UPPER)

  const caseOptions = [
    { value: CaseType.UPPER, label: t('case_upper') },
    { value: CaseType.LOWER, label: t('case_lower') },
    { value: CaseType.TITLE, label: t('case_title') },
    { value: CaseType.SENTENCE, label: t('case_sentence') },
    { value: CaseType.CAMEL, label: t('case_camel') },
    { value: CaseType.SNAKE, label: t('case_snake') },
    { value: CaseType.KEBAB, label: t('case_kebab') },
    { value: CaseType.CONSTANT, label: t('case_constant') },
  ]

  const handleProcess = () => {
    const result = changeCase(input, caseType)
    setOutput(result)
  }

  return (
    <ToolShell
      title={t('tool_case')}
      input={input}
      output={output}
      onInputChange={setInput}
      onProcess={handleProcess}
      onClose={onClose}
    >
      <div className="space-y-4">
        <div>
          <label className="text-label-md">{t('action')}</label>
          <select
            value={caseType}
            onChange={(e) => setCaseType(e.target.value as CaseType)}
            className="w-full mt-1 px-3 py-2 border border-outline rounded-base bg-surface"
          >
            {caseOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </ToolShell>
  )
}
