import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { ToolShell } from '../components/ToolShell'

type PasswordStrength = 'weak' | 'fair' | 'good' | 'strong' | 'very_strong'

interface PasswordStrengthProps {
  onClose: () => void
}

function checkPasswordStrength(password: string): { strength: PasswordStrength; score: number } {
  let score = 0

  // Length check
  if (password.length >= 8) score += 1
  if (password.length >= 12) score += 1
  if (password.length >= 16) score += 1

  // Complexity checks
  if (/[a-z]/.test(password)) score += 1
  if (/[A-Z]/.test(password)) score += 1
  if (/[0-9]/.test(password)) score += 1
  if (/[^A-Za-z0-9]/.test(password)) score += 2

  let strength: PasswordStrength
  if (score <= 1) strength = 'weak'
  else if (score <= 2) strength = 'fair'
  else if (score <= 4) strength = 'good'
  else if (score <= 6) strength = 'strong'
  else strength = 'very_strong'

  return { strength, score: Math.min(score, 8) }
}

export const PasswordStrength: React.FC<PasswordStrengthProps> = ({ onClose }) => {
  const { t } = useTranslation()
  const [input, setInput] = React.useState('')
  const [output, setOutput] = React.useState('')

  const passwordData = useMemo(() => {
    if (!input) return null
    return checkPasswordStrength(input)
  }, [input])

  const handleProcess = () => {
    if (!passwordData) return

    const strengthLabels: Record<PasswordStrength, string> = {
      weak: t('strength_weak'),
      fair: t('strength_fair'),
      good: t('strength_good'),
      strong: t('strength_strong'),
      very_strong: t('strength_very_strong'),
    }

    const checks = [
      { name: 'Length >= 8', value: input.length >= 8 },
      { name: 'Length >= 12', value: input.length >= 12 },
      { name: 'Has lowercase', value: /[a-z]/.test(input) },
      { name: 'Has uppercase', value: /[A-Z]/.test(input) },
      { name: 'Has numbers', value: /[0-9]/.test(input) },
      { name: 'Has special chars', value: /[^A-Za-z0-9]/.test(input) },
    ]

    const output = `Strength: ${strengthLabels[passwordData.strength]}
Score: ${passwordData.score}/8

Checks:
${checks.map((c) => `${c.value ? '✓' : '✗'} ${c.name}`).join('\n')}`

    setOutput(output)
  }

  const strengthColors: Record<PasswordStrength, string> = {
    weak: 'bg-error-container',
    fair: 'bg-secondary-container',
    good: 'bg-tertiary-container',
    strong: 'bg-primary-container',
    very_strong: 'bg-primary-container',
  }

  return (
    <ToolShell
      title={t('tool_password_strength')}
      input={input}
      output={output}
      onInputChange={setInput}
      onProcess={handleProcess}
      onClose={onClose}
    >
      {passwordData && (
        <div className="space-y-4">
          <div className={`p-4 rounded-base ${strengthColors[passwordData.strength]}`}>
            <p className="text-label-sm">Strength</p>
            <div className="w-full h-2 bg-surface-variant rounded-full mt-2">
              <div
                className={`h-full rounded-full ${
                  passwordData.strength === 'weak'
                    ? 'bg-error'
                    : passwordData.strength === 'fair'
                      ? 'bg-secondary'
                      : 'bg-primary'
                }`}
                style={{ width: `${(passwordData.score / 8) * 100}%` }}
              />
            </div>
          </div>
        </div>
      )}
    </ToolShell>
  )
}
