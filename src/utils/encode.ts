/**
 * Encoding/decoding utilities
 */

export function base64Encode(text: string): string {
  return btoa(unescape(encodeURIComponent(text)))
}

export function base64Decode(encoded: string): string {
  try {
    return decodeURIComponent(escape(atob(encoded)))
  } catch {
    return ''
  }
}

export function urlEncode(text: string): string {
  return encodeURIComponent(text)
}

export function urlDecode(encoded: string): string {
  try {
    return decodeURIComponent(encoded)
  } catch {
    return encoded
  }
}

export function htmlEscape(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  }
  return text.replace(/[&<>"']/g, (char) => map[char] || char)
}

export function htmlUnescape(text: string): string {
  const map: Record<string, string> = {
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#39;': "'",
  }
  let result = text
  for (const [encoded, decoded] of Object.entries(map)) {
    result = result.replaceAll(encoded, decoded)
  }
  return result
}

export function jsonEscape(text: string): string {
  return text
    .replace(/\\/g, '\\\\')
    .replace(/"/g, '\\"')
    .replace(/\n/g, '\\n')
    .replace(/\r/g, '\\r')
    .replace(/\t/g, '\\t')
    .replace(/\b/g, '\\b')
    .replace(/\f/g, '\\f')
}

export function jsonUnescape(text: string): string {
  return text
    .replace(/\\"/g, '"')
    .replace(/\\\\/g, '\\')
    .replace(/\\n/g, '\n')
    .replace(/\\r/g, '\r')
    .replace(/\\t/g, '\t')
    .replace(/\\b/g, '\b')
    .replace(/\\f/g, '\f')
}

export function csvEscape(text: string): string {
  if (text.includes(',') || text.includes('"') || text.includes('\n')) {
    return `"${text.replace(/"/g, '""')}"`
  }
  return text
}

export function sqlEscape(text: string): string {
  return text.replace(/'/g, "''")
}

export function regexEscape(text: string): string {
  return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

export function rot13(text: string): string {
  return text.replace(/[a-zA-Z]/g, (char) => {
    const start = char <= 'Z' ? 65 : 97
    return String.fromCharCode(start + ((char.charCodeAt(0) - start + 13) % 26))
  })
}

export function caesarCipher(text: string, shift: number): string {
  return text.replace(/[a-zA-Z]/g, (char) => {
    const start = char <= 'Z' ? 65 : 97
    return String.fromCharCode(start + ((char.charCodeAt(0) - start + shift) % 26))
  })
}
