/**
 * Text processing utilities
 */

export function removeDuplicateLines(
  text: string,
  options: {
    caseSensitive?: boolean
    trim?: boolean
    keep?: 'first' | 'last'
  } = {}
): string {
  const { caseSensitive = true, trim = false, keep = 'first' } = options
  const lines = text.split('\n')
  const seen = new Set<string>()
  const result = keep === 'first' ? [] : lines.reverse()
  const seen_set = new Set<string>()

  for (const line of result) {
    const key = caseSensitive ? line : line.toLowerCase()
    const trimmedKey = trim ? key.trim() : key

    if (!seen_set.has(trimmedKey)) {
      seen_set.add(trimmedKey)
      seen.add(line)
    }
  }

  const output = Array.from(seen)
  return keep === 'first' ? output.join('\n') : output.reverse().join('\n')
}

export function removeEmptyLines(text: string, trimWhitespace: boolean = true): string {
  const lines = text.split('\n')
  return lines
    .filter((line) => (trimWhitespace ? line.trim() !== '' : line !== ''))
    .join('\n')
}

export function removeLineBreaks(text: string): string {
  return text.replace(/\n/g, ' ').replace(/\r/g, '')
}

export function trimLines(text: string): string {
  return text
    .split('\n')
    .map((line) => line.trim())
    .join('\n')
}

export enum CaseType {
  UPPER = 'upper',
  LOWER = 'lower',
  TITLE = 'title',
  SENTENCE = 'sentence',
  CAMEL = 'camel',
  SNAKE = 'snake',
  KEBAB = 'kebab',
  CONSTANT = 'constant',
}

export function changeCase(text: string, caseType: CaseType): string {
  switch (caseType) {
    case CaseType.UPPER:
      return text.toUpperCase()
    case CaseType.LOWER:
      return text.toLowerCase()
    case CaseType.TITLE:
      return text
        .split(/\s+/)
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ')
    case CaseType.SENTENCE:
      return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()
    case CaseType.CAMEL:
      return text
        .split(/[\s_-]+/)
        .map((word, i) =>
          i === 0
            ? word.toLowerCase()
            : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        )
        .join('')
    case CaseType.SNAKE:
      return text
        .replace(/([A-Z])/g, '_$1')
        .replace(/[\s-]+/g, '_')
        .toLowerCase()
    case CaseType.KEBAB:
      return text
        .replace(/([A-Z])/g, '-$1')
        .replace(/[\s_]+/g, '-')
        .toLowerCase()
    case CaseType.CONSTANT:
      return text.replace(/([A-Z])/g, '_$1').replace(/[\s-]+/g, '_').toUpperCase()
    default:
      return text
  }
}

export function extractEmails(text: string, unique: boolean = true): string[] {
  const emailRegex = /[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g
  const emails = text.match(emailRegex) || []
  return unique ? Array.from(new Set(emails)) : emails
}

export function extractUrls(text: string, unique: boolean = true): string[] {
  const urlRegex = /https?:\/\/[^\s]+/g
  const urls = text.match(urlRegex) || []
  return unique ? Array.from(new Set(urls)) : urls
}

export function extractPhoneNumbers(text: string, unique: boolean = true): string[] {
  const phoneRegex = /(\+\d{1,3}[-.\s]?)?\(?\d{1,4}\)?[-.\s]?\d{1,4}[-.\s]?\d{1,9}/g
  const phones = text.match(phoneRegex) || []
  return unique ? Array.from(new Set(phones)) : phones
}

export function extractIPs(text: string, unique: boolean = true): string[] {
  const ipRegex =
    /\b(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\b/g
  const ips = text.match(ipRegex) || []
  return unique ? Array.from(new Set(ips)) : ips
}

export function sortLines(
  text: string,
  options: {
    order?: 'asc' | 'desc'
    by?: 'alpha' | 'length' | 'natural' | 'random' | 'reverse'
  } = {}
): string {
  const { order = 'asc', by = 'alpha' } = options
  let lines = text.split('\n')

  switch (by) {
    case 'alpha':
      lines.sort((a, b) => (order === 'asc' ? a.localeCompare(b) : b.localeCompare(a)))
      break
    case 'length':
      lines.sort((a, b) =>
        order === 'asc' ? a.length - b.length : b.length - a.length
      )
      break
    case 'natural':
      lines.sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
      if (order === 'desc') lines.reverse()
      break
    case 'random':
      for (let i = lines.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[lines[i], lines[j]] = [lines[j], lines[i]]
      }
      break
    case 'reverse':
      lines.reverse()
      break
  }

  return lines.join('\n')
}

export function reverseLines(text: string): string {
  return text.split('\n').reverse().join('\n')
}

export function numberLines(
  text: string,
  options: { start: number; step: number; separator: string } = {
    start: 1,
    step: 1,
    separator: '. ',
  }
): string {
  const { start, step, separator } = options
  const lines = text.split('\n')
  return lines.map((line, i) => `${start + i * step}${separator}${line}`).join('\n')
}

export function addPrefixSuffix(
  text: string,
  options: { prefix?: string; suffix?: string } = {}
): string {
  const { prefix = '', suffix = '' } = options
  return text
    .split('\n')
    .map((line) => `${prefix}${line}${suffix}`)
    .join('\n')
}

export function wrapLines(text: string, wrapper: string = '"'): string {
  return text
    .split('\n')
    .map((line) => `${wrapper}${line}${wrapper}`)
    .join('\n')
}

export function findAndReplace(
  text: string,
  find: string,
  replace: string,
  options: { regex?: boolean; global?: boolean; caseInsensitive?: boolean } = {}
): string {
  const { regex = false, global = true, caseInsensitive = false } = options

  if (!regex) {
    return global
      ? text.replaceAll(find, replace)
      : text.replace(find, replace)
  }

  try {
    const flags = (global ? 'g' : '') + (caseInsensitive ? 'i' : '')
    const regexObj = new RegExp(find, flags)
    return text.replace(regexObj, replace)
  } catch {
    return text
  }
}

export interface TextStats {
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

export function getTextStatistics(text: string): TextStats {
  const characters = text.length
  const charactersNoSpaces = text.replace(/\s/g, '').length
  const words = text.trim().split(/\s+/).filter((w) => w).length
  const lines = text.split('\n').length
  const sentences = text.split(/[.!?]+/).filter((s) => s.trim()).length
  const paragraphs = text.split(/\n\s*\n/).filter((p) => p.trim()).length
  const bytes = new TextEncoder().encode(text).length

  const wordArray = text.trim().split(/\s+/).filter((w) => w)
  const uniqueWords = new Set(wordArray.map((w) => w.toLowerCase())).size
  const avgWordLength =
    words > 0 ? wordArray.reduce((sum, w) => sum + w.length, 0) / words : 0
  const lineArray = text.split('\n')
  const avgLineLength =
    lines > 0 ? lineArray.reduce((sum, l) => sum + l.length, 0) / lines : 0

  return {
    characters,
    charactersNoSpaces,
    words,
    lines,
    sentences,
    paragraphs,
    bytes,
    uniqueWords,
    avgWordLength,
    avgLineLength,
  }
}
