import { describe, it, expect } from 'vitest'
import {
  parseCSV,
  parseCSVLine,
  formatCSVLine,
  detectDelimiter,
  csvToJSON,
  jsonToCSV,
  transposeCSV,
  deduplicateRows,
} from '../csv'

describe('CSV utilities', () => {
  describe('parseCSVLine', () => {
    it('parses simple CSV line', () => {
      const result = parseCSVLine('a,b,c', ',')
      expect(result).toEqual(['a', 'b', 'c'])
    })

    it('handles quoted fields with commas', () => {
      const result = parseCSVLine('a,"b,c",d', ',')
      expect(result).toEqual(['a', 'b,c', 'd'])
    })

    it('handles escaped quotes', () => {
      const result = parseCSVLine('a,"b""c",d', ',')
      expect(result).toEqual(['a', 'b"c', 'd'])
    })

    it('handles different delimiters', () => {
      const result = parseCSVLine('a;b;c', ';')
      expect(result).toEqual(['a', 'b', 'c'])
    })
  })

  describe('formatCSVLine', () => {
    it('formats simple values', () => {
      const result = formatCSVLine(['a', 'b', 'c'], ',')
      expect(result).toBe('a,b,c')
    })

    it('quotes values with commas', () => {
      const result = formatCSVLine(['a', 'b,c', 'd'], ',')
      expect(result).toBe('a,"b,c",d')
    })

    it('escapes quotes in values', () => {
      const result = formatCSVLine(['a', 'b"c', 'd'], ',')
      expect(result).toBe('a,"b""c",d')
    })
  })

  describe('detectDelimiter', () => {
    it('detects comma delimiter', () => {
      const text = 'a,b,c\n1,2,3\n4,5,6'
      const result = detectDelimiter(text)
      expect(result).toBe(',')
    })

    it('detects semicolon delimiter', () => {
      const text = 'a;b;c\n1;2;3\n4;5;6'
      const result = detectDelimiter(text)
      expect(result).toBe(';')
    })

    it('detects tab delimiter', () => {
      const text = 'a\tb\tc\n1\t2\t3'
      const result = detectDelimiter(text)
      expect(result).toBe('\t')
    })
  })

  describe('parseCSV', () => {
    it('parses CSV correctly', () => {
      const csv = 'name,age\nAlice,30\nBob,25'
      const result = parseCSV(csv, ',')
      expect(result.headers).toEqual(['name', 'age'])
      expect(result.rows.length).toBe(2)
      expect(result.rows[0]).toEqual(['Alice', '30'])
    })
  })

  describe('csvToJSON', () => {
    it('converts CSV to JSON correctly', () => {
      const csvData = {
        headers: ['name', 'age'],
        rows: [
          ['Alice', '30'],
          ['Bob', '25'],
        ],
      }
      const result = csvToJSON(csvData)
      expect(result).toEqual([
        { name: 'Alice', age: '30' },
        { name: 'Bob', age: '25' },
      ])
    })

    it('handles missing values', () => {
      const csvData = {
        headers: ['name', 'age'],
        rows: [['Alice']],
      }
      const result = csvToJSON(csvData)
      expect(result[0].age).toBe('')
    })
  })

  describe('jsonToCSV', () => {
    it('converts JSON to CSV correctly', () => {
      const data = [
        { name: 'Alice', age: 30 },
        { name: 'Bob', age: 25 },
      ]
      const result = jsonToCSV(data, ',')
      const lines = result.split('\n')
      expect(lines[0]).toBe('name,age')
      expect(lines[1]).toContain('Alice')
    })

    it('returns empty string for empty array', () => {
      const result = jsonToCSV([], ',')
      expect(result).toBe('')
    })
  })

  describe('transposeCSV', () => {
    it('transposes CSV correctly', () => {
      const csvData = {
        headers: ['a', 'b', 'c'],
        rows: [
          ['1', '2', '3'],
          ['4', '5', '6'],
        ],
      }
      const result = transposeCSV(csvData)
      expect(result.headers).toEqual(['a', 'b', 'c'])
      expect(result.rows[0]).toEqual(['1', '4'])
    })
  })

  describe('deduplicateRows', () => {
    it('removes duplicate rows', () => {
      const csvData = {
        headers: ['a', 'b'],
        rows: [
          ['1', '2'],
          ['3', '4'],
          ['1', '2'],
        ],
      }
      const result = deduplicateRows(csvData)
      expect(result.rows.length).toBe(2)
    })

    it('deduplicates by specific columns', () => {
      const csvData = {
        headers: ['id', 'name', 'age'],
        rows: [
          ['1', 'Alice', '30'],
          ['1', 'Alice', '31'],
          ['2', 'Bob', '25'],
        ],
      }
      const result = deduplicateRows(csvData, [0])
      expect(result.rows.length).toBe(2)
    })
  })
})
