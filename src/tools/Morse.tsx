import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ToolShell } from '../components/ToolShell'

interface MorseProps {
  onClose: () => void
}

const MORSE_CODE_DICT: Record<string, string> = {
  'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.',
  'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..',
  'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.',
  'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
  'Y': '-.--', 'Z': '--..', '0': '-----', '1': '.----', '2': '..---',
  '3': '...--', '4': '....-', '5': '.....', '6': '-....', '7': '--...',
  '8': '---..', '9': '----.', '.': '.-.-.-', ',': '--..--', '?': '..--..',
  "'": '.----.',  '!': '-.-.--', '/': '-..-.', '(': '-.--.', ')': '-.--.-',
  '&': '.-...', ':': '---...', ';': '-.-.-.', '=': '-...-', '+': '.-.-.',
  '-': '-....-', '_': '..--.-', '"': '.-..-.', '$': '...-..-', '@': '.--.-.',
  ' ': '/',
}

const REVERSE_MORSE: Record<string, string> = Object.fromEntries(
  Object.entries(MORSE_CODE_DICT).map(([k, v]) => [v, k])
)

function textToMorse(text: string): string {
  return text
    .toUpperCase()
    .split('')
    .map((char) => MORSE_CODE_DICT[char] || '')
    .filter(Boolean)
    .join(' ')
}

function morseToText(morse: string): string {
  return morse
    .split(' ')
    .map((code) => REVERSE_MORSE[code] || '?')
    .join('')
}

export const Morse: React.FC<MorseProps> = ({ onClose }) => {
  const { t } = useTranslation()
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [action, setAction] = useState<'encode' | 'decode'>('encode')

  const handleProcess = () => {
    try {
      const result = action === 'encode' ? textToMorse(input) : morseToText(input)
      setOutput(result)
    } catch {
      setOutput('')
    }
  }

  return (
    <ToolShell
      title="Morse Code"
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
            value={action}
            onChange={(e) => setAction(e.target.value as 'encode' | 'decode')}
            className="w-full mt-1 px-3 py-2 border border-outline rounded-base bg-surface"
          >
            <option value="encode">{t('encode')}</option>
            <option value="decode">{t('decode')}</option>
          </select>
        </div>
        <p className="text-body-sm text-on-surface-variant">
          {action === 'encode' ? 'Text to Morse' : 'Morse (space-separated) to Text'}
        </p>
      </div>
    </ToolShell>
  )
}
