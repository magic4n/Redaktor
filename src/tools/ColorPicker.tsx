import React, { useState, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { ToolShell } from '../components/ToolShell'

interface ColorPicker {
  onClose: () => void
}

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null
}

function rgbToHex(r: number, g: number, b: number): string {
  return '#' + [r, g, b].map((x) => x.toString(16).padStart(2, '0')).join('').toUpperCase()
}

function rgbToHsl(r: number, g: number, b: number): { h: number; s: number; l: number } {
  r /= 255
  g /= 255
  b /= 255
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h = 0
  let s = 0
  const l = (max + min) / 2

  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6
        break
      case g:
        h = ((b - r) / d + 2) / 6
        break
      case b:
        h = ((r - g) / d + 4) / 6
        break
    }
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  }
}

export const ColorPicker: React.FC<ColorPicker> = ({ onClose }) => {
  const { t } = useTranslation()
  const [input, setInput] = useState('#FF5733')
  const [output, setOutput] = useState('')

  const colorData = useMemo(() => {
    const hex = input.startsWith('#') ? input : `#${input}`
    const rgb = hexToRgb(hex)

    if (!rgb) return null

    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b)

    return {
      hex: hex.toUpperCase(),
      rgb: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`,
      hsl: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`,
      rgba: `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 1)`,
      hsla: `hsla(${hsl.h}, ${hsl.s}%, ${hsl.l}%, 1)`,
    }
  }, [input])

  const handleProcess = () => {
    if (!colorData) return

    const output = `HEX: ${colorData.hex}
RGB: ${colorData.rgb}
RGBA: ${colorData.rgba}
HSL: ${colorData.hsl}
HSLA: ${colorData.hsla}`

    setOutput(output)
  }

  return (
    <ToolShell
      title={t('tool_color_picker')}
      input={input}
      output={output}
      onInputChange={setInput}
      onProcess={handleProcess}
      onClose={onClose}
    >
      <div className="space-y-4">
        {colorData && (
          <>
            <div
              className="w-full h-24 rounded-base border-4 border-outline"
              style={{ backgroundColor: colorData.hex }}
            />
            <div className="space-y-2 text-body-sm">
              <p className="font-mono">{colorData.hex}</p>
              <p className="font-mono">{colorData.rgb}</p>
              <p className="font-mono">{colorData.hsl}</p>
            </div>
          </>
        )}
      </div>
    </ToolShell>
  )
}
