/**
 * CSV/TSV/DSV utilities
 */

export type Delimiter = ',' | ';' | '\t' | '|' | string

export interface CSVData {
  headers: string[]
  rows: string[][]
}

export function detectDelimiter(text: string): Delimiter {
  const lines = text.split('\n').slice(0, 5)
  const delimiters = [',', ';', '\t', '|']
  const counts: Record<string, number> = {}

  for (const delimiter of delimiters) {
    let count = 0
    for (const line of lines) {
      count += line.split(delimiter).length
    }
    counts[delimiter] = count
  }

  let maxCount = 0
  let bestDelimiter: Delimiter = ','

  for (const [delim, count] of Object.entries(counts)) {
    if (count > maxCount) {
      maxCount = count
      bestDelimiter = delim as Delimiter
    }
  }

  return bestDelimiter
}

export function parseCSV(text: string, delimiter: Delimiter = ','): CSVData {
  const lines = text.trim().split('\n')
  if (lines.length === 0) return { headers: [], rows: [] }

  const headers = parseCSVLine(lines[0], delimiter)
  const rows = lines.slice(1).map((line) => parseCSVLine(line, delimiter))

  return { headers, rows }
}

export function parseCSVLine(line: string, delimiter: Delimiter = ','): string[] {
  const result: string[] = []
  let current = ''
  let inQuotes = false

  for (let i = 0; i < line.length; i++) {
    const char = line[i]
    const nextChar = line[i + 1]

    if (char === '"') {
      if (inQuotes && nextChar === '"') {
        current += '"'
        i++
      } else {
        inQuotes = !inQuotes
      }
    } else if (char === delimiter && !inQuotes) {
      result.push(current.trim())
      current = ''
    } else {
      current += char
    }
  }

  result.push(current.trim())
  return result
}

export function formatCSVLine(values: string[], delimiter: Delimiter = ','): string {
  return values
    .map((val) => {
      if (val.includes(delimiter) || val.includes('"') || val.includes('\n')) {
        return `"${val.replace(/"/g, '""')}"`
      }
      return val
    })
    .join(delimiter)
}

export function csvToJSON(csvData: CSVData): Record<string, string>[] {
  return csvData.rows.map((row) => {
    const obj: Record<string, string> = {}
    csvData.headers.forEach((header, i) => {
      obj[header] = row[i] || ''
    })
    return obj
  })
}

export function jsonToCSV(data: Record<string, unknown>[], delimiter: Delimiter = ','): string {
  if (data.length === 0) return ''

  const headers = Object.keys(data[0])
  const headerLine = formatCSVLine(headers, delimiter)

  const rows = data.map((obj) =>
    formatCSVLine(headers.map((h) => String(obj[h] || '')), delimiter)
  )

  return [headerLine, ...rows].join('\n')
}

export function transposeCSV(csvData: CSVData): CSVData {
  const maxLength = Math.max(csvData.headers.length, ...csvData.rows.map((r) => r.length))

  const newRows: string[][] = []

  // Headers row becomes first data row
  newRows.push(csvData.headers)

  // Transpose data rows
  for (let col = 0; col < maxLength; col++) {
    const newRow: string[] = []
    for (let row = 0; row < csvData.rows.length; row++) {
      newRow.push(csvData.rows[row][col] || '')
    }
    newRows.push(newRow)
  }

  return {
    headers: newRows.length > 0 ? newRows[0] : [],
    rows: newRows.slice(1),
  }
}

export function deduplicateRows(csvData: CSVData, byColumns?: number[]): CSVData {
  const seen = new Set<string>()
  const dedupedRows: string[][] = []

  for (const row of csvData.rows) {
    let key: string
    if (byColumns) {
      key = byColumns.map((i) => row[i] || '').join('|')
    } else {
      key = row.join('|')
    }

    if (!seen.has(key)) {
      seen.add(key)
      dedupedRows.push(row)
    }
  }

  return {
    headers: csvData.headers,
    rows: dedupedRows,
  }
}

export function removeEmptyRows(csvData: CSVData): CSVData {
  return {
    headers: csvData.headers,
    rows: csvData.rows.filter((row) => row.some((cell) => cell.trim() !== '')),
  }
}

export function removeEmptyColumns(csvData: CSVData): CSVData {
  const nonEmptyIndices: number[] = []

  for (let i = 0; i < csvData.headers.length; i++) {
    const isEmpty = csvData.rows.every((row) => !row[i] || row[i].trim() === '')
    if (!isEmpty) {
      nonEmptyIndices.push(i)
    }
  }

  return {
    headers: nonEmptyIndices.map((i) => csvData.headers[i]),
    rows: csvData.rows.map((row) => nonEmptyIndices.map((i) => row[i] || '')),
  }
}

export function getColumnStatistics(
  csvData: CSVData,
  columnIndex: number
): {
  min: number
  max: number
  sum: number
  avg: number
  median: number
  stddev: number
  uniqueCount: number
  nullCount: number
} | null {
  const values = csvData.rows
    .map((row) => row[columnIndex])
    .map((v) => parseFloat(v))
    .filter((v) => !isNaN(v))

  if (values.length === 0) return null

  const min = Math.min(...values)
  const max = Math.max(...values)
  const sum = values.reduce((a, b) => a + b, 0)
  const avg = sum / values.length
  const sorted = values.sort((a, b) => a - b)
  const median = sorted.length % 2 === 0
    ? (sorted[sorted.length / 2 - 1] + sorted[sorted.length / 2]) / 2
    : sorted[Math.floor(sorted.length / 2)]

  const variance = values.reduce((sum, val) => sum + Math.pow(val - avg, 2), 0) / values.length
  const stddev = Math.sqrt(variance)

  const unique = new Set(csvData.rows.map((row) => row[columnIndex]))
  const uniqueCount = unique.size
  const nullCount = csvData.rows.filter(
    (row) => !row[columnIndex] || row[columnIndex].trim() === ''
  ).length

  return { min, max, sum, avg, median, stddev, uniqueCount, nullCount }
}
