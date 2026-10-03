import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Menu, Settings as SettingsIcon, Search, X } from 'lucide-react'
import { useAppStore } from './store'
import { Button } from './components/Button'
import { ToolCard } from './components/ToolCard'
import { TextField } from './components/TextField'

// Tools
import { RemoveDuplicates } from './tools/RemoveDuplicates'
import { FindReplace } from './tools/FindReplace'
import { ChangeCase } from './tools/ChangeCase'
import { ExtractEmails } from './tools/ExtractEmails'
import { ExtractURLs } from './tools/ExtractURLs'
import { Base64 } from './tools/Base64'
import { HashGenerator } from './tools/HashGenerator'
import { RegexTester } from './tools/RegexTester'
import { CSVToJSON } from './tools/CSVToJSON'
import { JSONToCSV } from './tools/JSONToCSV'
import { SortLines } from './tools/SortLines'
import { JSONFormatter } from './tools/JSONFormatter'
import { JSONValidator } from './tools/JSONValidator'
import { TextStats } from './tools/TextStats'
import { URLEncode } from './tools/URLEncode'
import { Escape } from './tools/Escape'
import { UUIDGenerator } from './tools/UUIDGenerator'
import { RemoveEmpty } from './tools/RemoveEmpty'
import { TrimLines } from './tools/TrimLines'
import { ColorPicker } from './tools/ColorPicker'
import { RandomString } from './tools/RandomString'
import { PasswordStrength } from './tools/PasswordStrength'
import { Morse } from './tools/Morse'
import { Caesar } from './tools/Caesar'
import { LoremIpsum } from './tools/LoremIpsum'

interface AppTool {
  id: string
  name: string
  description: string
  category: 'text' | 'csv' | 'json' | 'files' | 'utility'
  icon: string
  component: React.ComponentType<{ onClose: () => void }>
}

const TOOLS: AppTool[] = [
  // Text Tools
  {
    id: 'dedupe',
    name: 'Remove Duplicates',
    description: 'Remove duplicate lines from text',
    category: 'text',
    icon: '🔀',
    component: RemoveDuplicates,
  },
  {
    id: 'find-replace',
    name: 'Find & Replace',
    description: 'Find and replace text with regex support',
    category: 'text',
    icon: '🔍',
    component: FindReplace,
  },
  {
    id: 'case',
    name: 'Change Case',
    description: 'Convert text to different cases',
    category: 'text',
    icon: '🔤',
    component: ChangeCase,
  },
  {
    id: 'sort-lines',
    name: 'Sort Lines',
    description: 'Sort text lines',
    category: 'text',
    icon: '↕️',
    component: SortLines,
  },
  {
    id: 'extract-emails',
    name: 'Extract Emails',
    description: 'Extract email addresses from text',
    category: 'text',
    icon: '📧',
    component: ExtractEmails,
  },
  {
    id: 'extract-urls',
    name: 'Extract URLs',
    description: 'Extract URLs from text',
    category: 'text',
    icon: '🔗',
    component: ExtractURLs,
  },
  {
    id: 'remove-empty',
    name: 'Remove Empty Lines',
    description: 'Remove empty and whitespace-only lines',
    category: 'text',
    icon: '🧹',
    component: RemoveEmpty,
  },
  {
    id: 'trim-lines',
    name: 'Trim Lines',
    description: 'Remove leading/trailing whitespace',
    category: 'text',
    icon: '✂️',
    component: TrimLines,
  },
  {
    id: 'text-stats',
    name: 'Text Statistics',
    description: 'Analyze text content',
    category: 'text',
    icon: '📊',
    component: TextStats,
  },
  {
    id: 'base64',
    name: 'Base64 Encode/Decode',
    description: 'Encode or decode Base64',
    category: 'text',
    icon: '🔐',
    component: Base64,
  },
  {
    id: 'url-encode',
    name: 'URL Encode/Decode',
    description: 'Encode or decode URL-safe strings',
    category: 'text',
    icon: '🌐',
    component: URLEncode,
  },
  {
    id: 'escape',
    name: 'Escape / Unescape',
    description: 'Escape special characters',
    category: 'text',
    icon: '⚠️',
    component: Escape,
  },
  {
    id: 'hash',
    name: 'Hash Generator',
    description: 'Generate cryptographic hashes',
    category: 'text',
    icon: '#️⃣',
    component: HashGenerator,
  },
  {
    id: 'uuid',
    name: 'UUID / ULID Generator',
    description: 'Generate unique identifiers',
    category: 'utility',
    icon: '🎲',
    component: UUIDGenerator,
  },
  {
    id: 'random-string',
    name: 'Random String',
    description: 'Generate random strings',
    category: 'utility',
    icon: '🎰',
    component: RandomString,
  },

  // CSV Tools
  {
    id: 'csv-to-json',
    name: 'CSV to JSON',
    description: 'Convert CSV to JSON format',
    category: 'csv',
    icon: '📊',
    component: CSVToJSON,
  },
  {
    id: 'json-to-csv',
    name: 'JSON to CSV',
    description: 'Convert JSON array to CSV',
    category: 'csv',
    icon: '📋',
    component: JSONToCSV,
  },

  // JSON Tools
  {
    id: 'json-format',
    name: 'JSON Formatter',
    description: 'Format and minify JSON',
    category: 'json',
    icon: '🔧',
    component: JSONFormatter,
  },
  {
    id: 'json-validator',
    name: 'JSON Validator',
    description: 'Validate JSON syntax',
    category: 'json',
    icon: '✓',
    component: JSONValidator,
  },

  // Utility Tools
  {
    id: 'regex-tester',
    name: 'Regex Tester',
    description: 'Test regular expressions with live preview',
    category: 'utility',
    icon: '🎯',
    component: RegexTester,
  },
  {
    id: 'color-picker',
    name: 'Color Picker',
    description: 'Convert between color formats',
    category: 'utility',
    icon: '🎨',
    component: ColorPicker,
  },
  {
    id: 'password-strength',
    name: 'Password Strength',
    description: 'Check password strength',
    category: 'utility',
    icon: '🔒',
    component: PasswordStrength,
  },
  {
    id: 'morse',
    name: 'Morse Code',
    description: 'Encode and decode Morse code',
    category: 'utility',
    icon: '📡',
    component: Morse,
  },
  {
    id: 'caesar',
    name: 'Caesar Cipher',
    description: 'Encode with Caesar cipher',
    category: 'text',
    icon: '🔐',
    component: Caesar,
  },
  {
    id: 'lorem-ipsum',
    name: 'Lorem Ipsum',
    description: 'Generate Lorem Ipsum placeholder text',
    category: 'utility',
    icon: '📝',
    component: LoremIpsum,
  },
]

const CATEGORIES = [
  { id: 'text', name: 'Text', icon: '📝' },
  { id: 'csv', name: 'CSV / TSV', icon: '📊' },
  { id: 'json', name: 'JSON / YAML / XML', icon: '🔗' },
  { id: 'files', name: 'Files', icon: '📁' },
  { id: 'utility', name: 'Utility', icon: '🔧' },
]

function App() {
  const { t, i18n } = useTranslation()
  const store = useAppStore()
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedTool, setSelectedTool] = useState<AppTool | null>(null)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [settingsOpen, setSettingsOpen] = useState(false)

  const filteredTools = TOOLS.filter((tool) => {
    const matchesSearch =
      tool.name.toLowerCase().includes(search.toLowerCase()) ||
      tool.description.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = !selectedCategory || tool.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const favorites = TOOLS.filter((t) => store.isFavorite(t.id))
  const recentToolIds = store.recentTools.map((t) => t.id)

  const handleOpenTool = (tool: AppTool) => {
    setSelectedTool(tool)
    store.addRecentTool(tool.id, tool.name)
  }

  const handleCloseTool = () => {
    setSelectedTool(null)
  }

  const handleToggleFavorite = (toolId: string) => {
    store.toggleFavorite(toolId)
  }

  const handleLanguageChange = (lang: string) => {
    i18n.changeLanguage(lang)
    store.updateSettings({ language: lang })
  }

  if (selectedTool) {
    const Tool = selectedTool.component
    return <Tool onClose={handleCloseTool} />
  }

  return (
    <div className="h-screen w-screen bg-background flex flex-col">
      {/* Top App Bar */}
      <div className="bg-surface border-b border-outline px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-primary-container rounded-full transition lg:hidden"
          >
            <Menu size={24} />
          </button>
          <div>
            <h1 className="text-headline-md">{t('app_name')}</h1>
            <p className="text-body-sm text-on-surface-variant">{t('app_subtitle')}</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <select
            value={i18n.language}
            onChange={(e) => handleLanguageChange(e.target.value)}
            className="px-3 py-2 rounded-base border border-outline bg-surface"
          >
            <option value="en">English</option>
            <option value="ru">Русский</option>
          </select>
          <button
            onClick={() => setSettingsOpen(!settingsOpen)}
            className="p-2 hover:bg-primary-container rounded-full transition"
          >
            <SettingsIcon size={24} />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden flex">
        {/* Sidebar */}
        {sidebarOpen && (
          <div className="w-64 bg-surface-variant bg-opacity-30 border-r border-outline overflow-auto p-4">
            <h2 className="text-title-md mb-4">{t('tools_text')}</h2>
            <div className="space-y-2 mb-6">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(selectedCategory === cat.id ? null : cat.id)}
                  className={`w-full text-left px-4 py-2 rounded-base transition ${
                    selectedCategory === cat.id
                      ? 'bg-primary-container text-on-primary-container'
                      : 'hover:bg-primary-container hover:bg-opacity-20'
                  }`}
                >
                  {cat.icon} {cat.name}
                </button>
              ))}
            </div>

            {favorites.length > 0 && (
              <>
                <h3 className="text-title-sm mb-3">{t('favorites')}</h3>
                <div className="space-y-2 mb-6">
                  {favorites.map((tool) => (
                    <button
                      key={tool.id}
                      onClick={() => handleOpenTool(tool)}
                      className="w-full text-left px-4 py-2 rounded-base hover:bg-primary-container hover:bg-opacity-20 transition text-body-md"
                    >
                      {tool.icon} {tool.name}
                    </button>
                  ))}
                </div>
              </>
            )}

            {recentToolIds.length > 0 && (
              <>
                <h3 className="text-title-sm mb-3">{t('recent_tools')}</h3>
                <div className="space-y-2">
                  {recentToolIds.slice(0, 5).map((toolId) => {
                    const tool = TOOLS.find((t) => t.id === toolId)
                    return tool ? (
                      <button
                        key={tool.id}
                        onClick={() => handleOpenTool(tool)}
                        className="w-full text-left px-4 py-2 rounded-base hover:bg-primary-container hover:bg-opacity-20 transition text-body-md"
                      >
                        {tool.icon} {tool.name}
                      </button>
                    ) : null
                  })}
                </div>
              </>
            )}
          </div>
        )}

        {/* Tools Grid */}
        <div className="flex-1 overflow-auto p-6">
          {/* Search */}
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-3 text-on-surface-variant" size={20} />
              <input
                type="text"
                placeholder={t('search_tools')}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-base border border-outline bg-surface focus:outline-none focus:border-primary"
              />
            </div>
          </div>

          {/* Tools Grid */}
          {filteredTools.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredTools.map((tool) => (
                <ToolCard
                  key={tool.id}
                  name={tool.name}
                  description={tool.description}
                  icon={tool.icon}
                  isFavorite={store.isFavorite(tool.id)}
                  onOpen={() => handleOpenTool(tool)}
                  onToggleFavorite={() => handleToggleFavorite(tool.id)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-on-surface-variant text-body-lg">{t('no_results')}</p>
            </div>
          )}
        </div>
      </div>

      {/* Settings Panel */}
      {settingsOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-surface rounded-lg shadow-lg p-6 max-w-md w-full">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-headline-md">{t('settings')}</h2>
              <button onClick={() => setSettingsOpen(false)} className="p-2">
                <X size={24} />
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <label className="text-label-md block mb-2">{t('theme')}</label>
                <select
                  value={store.settings.theme}
                  onChange={(e) =>
                    store.updateSettings({ theme: e.target.value as any })
                  }
                  className="w-full px-3 py-2 border border-outline rounded-base bg-surface"
                >
                  <option value="light">{t('light')}</option>
                  <option value="dark">{t('dark')}</option>
                  <option value="system">{t('system')}</option>
                </select>
              </div>

              <div>
                <label className="text-label-md block mb-2">{t('seed_color')}</label>
                <div className="grid grid-cols-4 gap-2">
                  {['#0061A4', '#006E90', '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F'].map(
                    (color) => (
                      <button
                        key={color}
                        onClick={() => store.updateSettings({ seedColor: color })}
                        className={`w-10 h-10 rounded-lg border-2 transition ${
                          store.settings.seedColor === color
                            ? 'border-on-surface'
                            : 'border-transparent'
                        }`}
                        style={{ backgroundColor: color }}
                      />
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
