import React from 'react'
import { Star } from 'lucide-react'
import { Button } from './Button'

interface ToolCardProps {
  name: string
  description: string
  icon: string
  isFavorite: boolean
  onOpen: () => void
  onToggleFavorite: () => void
}

export const ToolCard: React.FC<ToolCardProps> = ({
  name,
  description,
  icon,
  isFavorite,
  onOpen,
  onToggleFavorite,
}) => {
  return (
    <div className="bg-surface-variant bg-opacity-50 border border-outline-variant rounded-base p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <span className="text-4xl">{icon}</span>
        <button
          onClick={(e) => {
            e.stopPropagation()
            onToggleFavorite()
          }}
          className={`p-2 rounded-full transition ${
            isFavorite ? 'bg-primary text-on-primary' : 'bg-surface hover:bg-primary-container'
          }`}
        >
          <Star size={20} fill={isFavorite ? 'currentColor' : 'none'} />
        </button>
      </div>
      <h3 className="text-title-sm font-medium mb-1">{name}</h3>
      <p className="text-body-sm text-on-surface-variant mb-4">{description}</p>
      <Button onClick={onOpen} fullWidth variant="tonal">
        Open
      </Button>
    </div>
  )
}
