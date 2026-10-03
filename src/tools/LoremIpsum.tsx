import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ToolShell } from '../components/ToolShell'

type LoremType = 'words' | 'sentences' | 'paragraphs'

interface LoremIpsumProps {
  onClose: () => void
}

const LOREM_WORDS = [
  'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing',
  'elit', 'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore',
  'et', 'dolore', 'magna', 'aliqua', 'enim', 'ad', 'minim', 'veniam',
  'quis', 'nostrud', 'exercitation', 'ullamco', 'laboris', 'nisi',
  'aliquip', 'ex', 'ea', 'commodo', 'consequat', 'duis', 'aute', 'irure',
  'in', 'reprehenderit', 'voluptate', 'velit', 'esse', 'cillum', 'fugiat',
  'nulla', 'pariatur', 'excepteur', 'sint', 'occaecat', 'cupidatat', 'non',
  'proident', 'sunt', 'culpa', 'qui', 'officia', 'deserunt', 'mollit', 'anim',
  'id', 'est', 'laborum',
]

function generateWords(count: number): string {
  const words: string[] = []
  for (let i = 0; i < count; i++) {
    words.push(LOREM_WORDS[Math.floor(Math.random() * LOREM_WORDS.length)])
  }
  return words.join(' ')
}

function generateSentences(count: number): string {
  const sentences: string[] = []
  for (let i = 0; i < count; i++) {
    const wordCount = Math.floor(Math.random() * 10) + 5
    const sentence = generateWords(wordCount)
    sentences.push(sentence.charAt(0).toUpperCase() + sentence.slice(1) + '.')
  }
  return sentences.join(' ')
}

function generateParagraphs(count: number): string {
  const paragraphs: string[] = []
  for (let i = 0; i < count; i++) {
    const sentenceCount = Math.floor(Math.random() * 5) + 3
    paragraphs.push(generateSentences(sentenceCount))
  }
  return paragraphs.join('\n\n')
}

export const LoremIpsum: React.FC<LoremIpsumProps> = ({ onClose }) => {
  const { t } = useTranslation()
  const [output, setOutput] = useState('')
  const [type, setType] = useState<LoremType>('paragraphs')
  const [count, setCount] = useState('3')

  const handleProcess = () => {
    const n = Math.max(1, Math.min(1000, parseInt(count) || 1))
    let result = ''

    switch (type) {
      case 'words':
        result = generateWords(n)
        break
      case 'sentences':
        result = generateSentences(n)
        break
      case 'paragraphs':
        result = generateParagraphs(n)
        break
    }

    setOutput(result)
  }

  return (
    <ToolShell
      title="Lorem Ipsum"
      input=""
      output={output}
      onInputChange={() => {}}
      onProcess={handleProcess}
      onClose={onClose}
    >
      <div className="space-y-4">
        <div>
          <label className="text-label-md">Type</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value as LoremType)}
            className="w-full mt-1 px-3 py-2 border border-outline rounded-base bg-surface"
          >
            <option value="words">Words</option>
            <option value="sentences">Sentences</option>
            <option value="paragraphs">Paragraphs</option>
          </select>
        </div>
        <div>
          <label className="text-label-md">Count</label>
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
