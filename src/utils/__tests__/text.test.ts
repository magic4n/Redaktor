import { describe, it, expect } from 'vitest'
import {
  removeDuplicateLines,
  removeEmptyLines,
  trimLines,
  changeCase,
  CaseType,
  extractEmails,
  sortLines,
  getTextStatistics,
} from '../text'

describe('Text utilities', () => {
  describe('removeDuplicateLines', () => {
    it('removes duplicate lines (case sensitive)', () => {
      const input = 'apple\nbanana\napple\ncherry'
      const result = removeDuplicateLines(input, { caseSensitive: true })
      expect(result).toBe('apple\nbanana\ncherry')
    })

    it('removes duplicate lines (case insensitive)', () => {
      const input = 'Apple\nbanana\napple\nCherry'
      const result = removeDuplicateLines(input, { caseSensitive: false })
      expect(result.split('\n').length).toBe(3)
    })

    it('handles keep first option', () => {
      const input = 'a\nb\na'
      const result = removeDuplicateLines(input, { keep: 'first' })
      expect(result).toBe('a\nb')
    })
  })

  describe('removeEmptyLines', () => {
    it('removes empty lines', () => {
      const input = 'line1\n\nline2\n  \nline3'
      const result = removeEmptyLines(input)
      expect(result.split('\n').length).toBe(3)
    })

    it('preserves non-empty lines', () => {
      const input = 'a\nb\nc'
      const result = removeEmptyLines(input)
      expect(result).toBe('a\nb\nc')
    })
  })

  describe('trimLines', () => {
    it('trims whitespace from each line', () => {
      const input = '  line1  \n\tline2\t\n  line3  '
      const result = trimLines(input)
      const lines = result.split('\n')
      expect(lines[0]).toBe('line1')
      expect(lines[1]).toBe('line2')
      expect(lines[2]).toBe('line3')
    })
  })

  describe('changeCase', () => {
    const text = 'Hello World'

    it('converts to uppercase', () => {
      expect(changeCase(text, CaseType.UPPER)).toBe('HELLO WORLD')
    })

    it('converts to lowercase', () => {
      expect(changeCase(text, CaseType.LOWER)).toBe('hello world')
    })

    it('converts to title case', () => {
      expect(changeCase('hello world', CaseType.TITLE)).toBe('Hello World')
    })

    it('converts to camelCase', () => {
      expect(changeCase('hello world', CaseType.CAMEL)).toBe('helloWorld')
    })

    it('converts to snake_case', () => {
      expect(changeCase('hello world', CaseType.SNAKE)).toBe('hello_world')
    })

    it('converts to kebab-case', () => {
      expect(changeCase('hello world', CaseType.KEBAB)).toBe('hello-world')
    })
  })

  describe('extractEmails', () => {
    it('extracts email addresses', () => {
      const input = 'Contact us at test@example.com or admin@site.org'
      const result = extractEmails(input)
      expect(result).toContain('test@example.com')
      expect(result).toContain('admin@site.org')
    })

    it('handles unique flag', () => {
      const input = 'test@example.com test@example.com'
      const result = extractEmails(input, true)
      expect(result.length).toBe(1)
    })

    it('returns empty array when no emails found', () => {
      const result = extractEmails('no emails here')
      expect(result).toEqual([])
    })
  })

  describe('sortLines', () => {
    it('sorts lines alphabetically ascending', () => {
      const input = 'banana\napple\ncherry'
      const result = sortLines(input, { order: 'asc', by: 'alpha' })
      expect(result).toBe('apple\nbanana\ncherry')
    })

    it('sorts lines alphabetically descending', () => {
      const input = 'apple\nbanana\ncherry'
      const result = sortLines(input, { order: 'desc', by: 'alpha' })
      expect(result).toBe('cherry\nbanana\napple')
    })

    it('sorts by line length', () => {
      const input = 'abc\nab\ntest'
      const result = sortLines(input, { order: 'asc', by: 'length' })
      const lines = result.split('\n')
      expect(lines[0].length).toBeLessThanOrEqual(lines[1].length)
    })

    it('reverses lines', () => {
      const input = '1\n2\n3'
      const result = sortLines(input, { by: 'reverse' })
      expect(result).toBe('3\n2\n1')
    })
  })

  describe('getTextStatistics', () => {
    it('calculates correct statistics', () => {
      const text = 'Hello World'
      const stats = getTextStatistics(text)
      expect(stats.characters).toBe(11)
      expect(stats.charactersNoSpaces).toBe(10)
      expect(stats.words).toBe(2)
      expect(stats.bytes).toBeGreaterThan(0)
    })

    it('handles multiple lines and paragraphs', () => {
      const text = 'Line 1\nLine 2\n\nParagraph 2'
      const stats = getTextStatistics(text)
      expect(stats.lines).toBe(4)
      expect(stats.paragraphs).toBe(2)
    })
  })
})
