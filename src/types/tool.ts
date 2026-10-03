export type ToolCategory = 'text' | 'csv' | 'json' | 'files' | 'utility'

export interface Tool {
  id: string
  name: string
  description: string
  category: ToolCategory
  icon: string
  component: React.ComponentType<{ onClose: () => void }>
}

export interface TextStatistics {
  characters: number
  charactersNoSpaces: number
  words: number
  lines: number
  sentences: number
  paragraphs: number
  bytes: number
  uniqueWords: number
  avgWordLength: number
  avgLineLength: number
}
