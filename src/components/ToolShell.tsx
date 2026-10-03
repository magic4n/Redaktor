import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Copy, Download, X, ArrowRightLeft } from 'lucide-react'
import { Button } from './Button'
import { TextArea } from './TextField'
import { Snackbar } from './Snackbar'

interface ToolShellProps {
  title: string
  input: string
  output: string
  onInputChange: (value: string) => void
  onProcess: () => void
  onClose: () => void
  resultTitle?: string
  children?: React.ReactNode
}

export const ToolShell: React.FC<ToolShellProps> = ({
  title,
  input,
  output,
  onInputChange,
  onProcess,
  onClose,
  resultTitle,
  children,
}) => {
  const { t } = useTranslation()
  const [snackbar, setSnackbar] = useState<{ message: string; type: 'success' | 'error' } | null>(
    null
  )

  const handleCopy = () => {
    navigator.clipboard.writeText(output).then(() => {
      setSnackbar({ message: t('copied'), type: 'success' })
    })
  }

  const handleDownload = () => {
    const element = document.createElement('a')
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(output))
    element.setAttribute('download', `${title.toLowerCase().replace(/\s+/g, '-')}.txt`)
    element.style.display = 'none'
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
    setSnackbar({ message: t('downloaded'), type: 'success' })
  }

  const handleSwap = () => {
    onInputChange(output)
  }

  const handleClear = () => {
    onInputChange('')
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-surface rounded-lg shadow-lg w-full max-w-6xl h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-outline">
          <h2 className="text-headline-md">{title}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-primary-container rounded-full transition"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="flex flex-1 overflow-hidden">
          {/* Left panel - Input + Options */}
          <div className="flex flex-col w-1/3 border-r border-outline">
            <div className="p-4 flex-1 overflow-auto">
              <label className="text-label-lg text-on-surface-variant mb-2 block">
                {t('input')}
              </label>
              <TextArea
                value={input}
                onChange={(e) => onInputChange(e.target.value)}
                placeholder={t('press_ctrl_enter')}
                className="w-full h-full"
              />
            </div>

            {children && (
              <div className="p-4 border-t border-outline bg-surface-variant bg-opacity-30 max-h-40 overflow-auto">
                {children}
              </div>
            )}

            <div className="p-4 border-t border-outline flex gap-2">
              <Button onClick={onProcess} className="flex-1">
                {t('apply')}
              </Button>
              <Button variant="outlined" onClick={handleClear} className="flex-1">
                {t('clear')}
              </Button>
            </div>
          </div>

          {/* Right panel - Output */}
          <div className="flex flex-col flex-1">
            <div className="p-4 flex items-center justify-between border-b border-outline">
              <h3 className="text-title-md">{resultTitle || t('output')}</h3>
              <div className="flex gap-2">
                <Button
                  variant="outlined"
                  size="sm"
                  onClick={handleSwap}
                  title={t('swap')}
                  className="p-2"
                >
                  <ArrowRightLeft size={20} />
                </Button>
                <Button
                  variant="outlined"
                  size="sm"
                  onClick={handleCopy}
                  title={t('copy')}
                  className="p-2"
                >
                  <Copy size={20} />
                </Button>
                <Button
                  variant="outlined"
                  size="sm"
                  onClick={handleDownload}
                  title={t('download')}
                  className="p-2"
                >
                  <Download size={20} />
                </Button>
              </div>
            </div>
            <div className="flex-1 overflow-auto p-4">
              <pre className="font-mono text-body-sm text-on-surface break-words whitespace-pre-wrap">
                {output || <span className="text-on-surface-variant">{t('no_data')}</span>}
              </pre>
            </div>
          </div>
        </div>
      </div>

      {snackbar && (
        <Snackbar
          message={snackbar.message}
          type={snackbar.type}
          onClose={() => setSnackbar(null)}
        />
      )}
    </div>
  )
}
