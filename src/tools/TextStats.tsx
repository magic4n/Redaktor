import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { ToolShell } from '../components/ToolShell'
import { getTextStatistics } from '../utils/text'

interface TextStatsProps {
  onClose: () => void
}

export const TextStats: React.FC<TextStatsProps> = ({ onClose }) => {
  const { t } = useTranslation()
  const [input, setInput] = React.useState('')
  const [output, setOutput] = React.useState('')

  const stats = useMemo(() => {
    if (!input) return null
    return getTextStatistics(input)
  }, [input])

  const handleProcess = () => {
    if (!stats) return

    const output = `Characters: ${stats.characters}
Characters (no spaces): ${stats.charactersNoSpaces}
Words: ${stats.words}
Lines: ${stats.lines}
Sentences: ${stats.sentences}
Paragraphs: ${stats.paragraphs}
Bytes: ${stats.bytes}
Unique words: ${stats.uniqueWords}
Average word length: ${stats.avgWordLength.toFixed(2)}
Average line length: ${stats.avgLineLength.toFixed(2)}`

    setOutput(output)
  }

  return (
    <ToolShell
      title={t('tool_text_stats')}
      input={input}
      output={output}
      onInputChange={setInput}
      onProcess={handleProcess}
      onClose={onClose}
      resultTitle={t('stats_characters')}
    >
      {stats && (
        <div className="space-y-3 text-body-sm">
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-primary-container p-2 rounded">
              <p className="text-label-sm text-on-primary-container">{t('stats_characters')}</p>
              <p className="text-headline-sm">{stats.characters}</p>
            </div>
            <div className="bg-primary-container p-2 rounded">
              <p className="text-label-sm text-on-primary-container">{t('stats_words')}</p>
              <p className="text-headline-sm">{stats.words}</p>
            </div>
            <div className="bg-secondary-container p-2 rounded">
              <p className="text-label-sm text-on-secondary-container">{t('stats_lines')}</p>
              <p className="text-headline-sm">{stats.lines}</p>
            </div>
            <div className="bg-secondary-container p-2 rounded">
              <p className="text-label-sm text-on-secondary-container">{t('stats_paragraphs')}</p>
              <p className="text-headline-sm">{stats.paragraphs}</p>
            </div>
          </div>
        </div>
      )}
    </ToolShell>
  )
}
