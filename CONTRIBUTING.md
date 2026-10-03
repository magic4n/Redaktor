# Руководство по разработке Redaktor

Спасибо за интерес к разработке Redaktor! Этот документ описывает как участвовать в проекте.

## Процесс разработки

### 1. Fork и Clone

```bash
git clone https://github.com/yourusername/redaktor.git
cd redaktor
npm install
```

### 2. Создайте ветку

```bash
git checkout -b feature/my-new-tool
```

### 3. Развивайте и тестируйте

```bash
npm run dev
npm run lint
npm run test
```

### 4. Отправьте Pull Request

- Описание: что добавляет/изменяет PR
- Скриншоты: для UI изменений
- Тесты: покрытие новой функциональности

## Стандарты кода

### TypeScript

- Используйте строгий режим (`strict: true`)
- Аннотируйте все типы
- Избегайте `any` типов

```tsx
// ✅ Good
const getName = (user: { name: string }): string => user.name

// ❌ Avoid
const getName = (user: any) => user.name
```

### React

- Используйте функциональные компоненты и hooks
- Назовите компоненты CamelCase
- Используйте пропсы вместо глобального состояния где возможно

```tsx
// ✅ Good
export const MyComponent: React.FC<Props> = ({ title, onClose }) => {
  return <div>{title}</div>
}

// ❌ Avoid
export function myComponent() {
  return <div>...</div>
}
```

### Стили

- Используйте Tailwind CSS для стилей
- Используйте Material You 3 цвета и типографию
- Избегайте inline styles

```tsx
// ✅ Good
<div className="bg-primary text-on-primary rounded-base p-4">

// ❌ Avoid
<div style={{ backgroundColor: 'blue', padding: '16px' }}>
```

## Добавление нового инструмента

### 1. Создайте компонент

**src/tools/MyNewTool.tsx**
```tsx
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ToolShell } from '../components/ToolShell'

interface MyNewToolProps {
  onClose: () => void
}

export const MyNewTool: React.FC<MyNewToolProps> = ({ onClose }) => {
  const { t } = useTranslation()
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')

  const handleProcess = () => {
    // Your logic here
    setOutput('result')
  }

  return (
    <ToolShell
      title={t('tool_my_new_tool')}
      input={input}
      output={output}
      onInputChange={setInput}
      onProcess={handleProcess}
      onClose={onClose}
    >
      {/* Your options here */}
    </ToolShell>
  )
}
```

### 2. Добавьте утилиты (если нужны)

**src/utils/myNewTool.ts**
```tsx
export function myNewToolProcess(input: string): string {
  // Processing logic
  return input
}
```

### 3. Добавьте локализацию

**src/locales/en.json**
```json
{
  "tool_my_new_tool": "My New Tool",
  "tool_my_new_tool_desc": "Description of my new tool",
  "my_new_tool_option": "Some option"
}
```

**src/locales/ru.json**
```json
{
  "tool_my_new_tool": "Мой новый инструмент",
  "tool_my_new_tool_desc": "Описание моего нового инструмента",
  "my_new_tool_option": "Какой-то параметр"
}
```

### 4. Зарегистрируйте инструмент

**src/App.tsx**
```tsx
import { MyNewTool } from './tools/MyNewTool'

const TOOLS: AppTool[] = [
  // ... existing tools
  {
    id: 'my-new-tool',
    name: 'My New Tool',
    description: 'Description of my new tool',
    category: 'text',
    icon: '✨',
    component: MyNewTool,
  },
]
```

### 5. Напишите тесты

**src/utils/myNewTool.test.ts**
```tsx
import { describe, it, expect } from 'vitest'
import { myNewToolProcess } from './myNewTool'

describe('myNewTool', () => {
  it('processes input correctly', () => {
    const result = myNewToolProcess('test')
    expect(result).toBe('expected')
  })
})
```

## Тестирование

### Unit тесты
```bash
npm run test
npm run test:ui
```

### E2E тесты
```bash
npm run test:e2e
```

### Lint проверки
```bash
npm run lint
npm run type-check
```

## Файловая структура для нового инструмента

```
src/
├── tools/
│   └── MyNewTool.tsx          # Основной компонент
├── utils/
│   └── myNewTool.ts           # Утилиты обработки
│   └── myNewTool.test.ts      # Тесты
└── locales/
    ├── en.json               # Английский
    └── ru.json              # Русский
```

## Коммит сообщения

Используйте формат:
```
type(scope): description

[optional body]
[optional footer]
```

Примеры:
```
feat(tools): add URL encoder tool
fix(csv): fix delimiter detection
docs(readme): update installation instructions
```

## Pull Request Checklist

- [ ] Код следует стандартам проекта
- [ ] Добавлены/обновлены тесты
- [ ] Добавлена локализация (EN + RU)
- [ ] README обновлён если необходимо
- [ ] Нет консольных ошибок/предупреждений
- [ ] TypeScript strict режим успешен

## Помощь

Если у вас есть вопросы:
1. Проверьте существующие issues
2. Создайте новый issue с описанием
3. Задайте вопрос в discussions

---

Спасибо за участие в Redaktor! 🚀
