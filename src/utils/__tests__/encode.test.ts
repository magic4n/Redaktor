import { describe, it, expect } from 'vitest'
import {
  base64Encode,
  base64Decode,
  urlEncode,
  urlDecode,
  htmlEscape,
  htmlUnescape,
  jsonEscape,
  jsonUnescape,
  rot13,
  caesarCipher,
} from '../encode'

describe('Encoding utilities', () => {
  describe('Base64', () => {
    it('encodes text to base64', () => {
      const encoded = base64Encode('Hello World')
      expect(encoded).toBe('SGVsbG8gV29ybGQ=')
    })

    it('decodes base64 to text', () => {
      const decoded = base64Decode('SGVsbG8gV29ybGQ=')
      expect(decoded).toBe('Hello World')
    })

    it('handles special characters', () => {
      const text = 'Test@123!#$'
      const encoded = base64Encode(text)
      const decoded = base64Decode(encoded)
      expect(decoded).toBe(text)
    })
  })

  describe('URL encoding', () => {
    it('encodes URL strings', () => {
      const encoded = urlEncode('Hello World')
      expect(encoded).toBe('Hello%20World')
    })

    it('decodes URL strings', () => {
      const decoded = urlDecode('Hello%20World')
      expect(decoded).toBe('Hello World')
    })
  })

  describe('HTML escaping', () => {
    it('escapes HTML entities', () => {
      const result = htmlEscape('<div>test</div>')
      expect(result).toBe('&lt;div&gt;test&lt;/div&gt;')
    })

    it('unescapes HTML entities', () => {
      const result = htmlUnescape('&lt;div&gt;test&lt;/div&gt;')
      expect(result).toBe('<div>test</div>')
    })

    it('handles quotes and ampersands', () => {
      const text = '"test" & \'single\''
      const escaped = htmlEscape(text)
      const unescaped = htmlUnescape(escaped)
      expect(unescaped).toBe(text)
    })
  })

  describe('JSON escaping', () => {
    it('escapes special characters for JSON', () => {
      const result = jsonEscape('line1\nline2\t"quoted"')
      expect(result).toContain('\\n')
      expect(result).toContain('\\t')
      expect(result).toContain('\\"')
    })

    it('unescapes JSON strings', () => {
      const escaped = 'line1\\nline2\\t\\"quoted\\"'
      const result = jsonUnescape(escaped)
      expect(result).toBe('line1\nline2\t"quoted"')
    })
  })

  describe('ROT13', () => {
    it('encodes text with ROT13', () => {
      const result = rot13('Hello')
      expect(result).toBe('Uryyb')
    })

    it('is reversible', () => {
      const text = 'HelloWorld'
      const encoded = rot13(text)
      const decoded = rot13(encoded)
      expect(decoded).toBe(text)
    })
  })

  describe('Caesar cipher', () => {
    it('encodes with custom shift', () => {
      const result = caesarCipher('abc', 1)
      expect(result).toBe('bcd')
    })

    it('handles wrap-around', () => {
      const result = caesarCipher('xyz', 3)
      expect(result).toBe('abc')
    })

    it('preserves non-alphabetic characters', () => {
      const result = caesarCipher('a1b2c3', 1)
      expect(result).toBe('b1c2d3')
    })
  })
})
