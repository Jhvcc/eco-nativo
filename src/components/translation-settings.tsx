import { BookOpen, Briefcase, FileText, MessageSquare } from "lucide-react"
import { type TranslationStyle, type TranslationDomain } from "./translation-interface"

interface TranslationSettingsProps {
  translationStyle: string
  domain: string
  onStyleChange: (style: TranslationStyle) => void
  onDomainChange: (domain: TranslationDomain) => void
}

interface StyleOption {
  value: TranslationStyle
  label: string
  icon: React.ReactNode
  description: string
}

const styleOptions: StyleOption[] = [
  {
    value: "casual",
    label: "Casual",
    icon: <MessageSquare className="h-4 w-4" />,
    description: "Informal, conversational language suitable for everyday communication",
  },
  {
    value: "formal",
    label: "Formal",
    icon: <FileText className="h-4 w-4" />,
    description: "Polite, proper language suitable for official contexts",
  },
  {
    value: "business",
    label: "Business",
    icon: <Briefcase className="h-4 w-4" />,
    description: "Professional language suitable for workplace and commercial contexts",
  },
  {
    value: "academic",
    label: "Academic",
    icon: <BookOpen className="h-4 w-4" />,
    description: "Scholarly language suitable for educational and research contexts",
  },
]

export function TranslationSettings({
  translationStyle,
  onStyleChange,
}: TranslationSettingsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {styleOptions.map((option) => (
        <div
          key={option.value}
          className={`p-4 rounded-lg border cursor-pointer transition-colors ${translationStyle === option.value ? "border-primary bg-primary/10" : "border-slate-200 hover:border-slate-300"}`}
          onClick={() => onStyleChange(option.value)}
        >
          <div className="flex items-center mb-2">
            <div
              className={`mr-2 ${translationStyle === option.value ? "text-primary" : "text-slate-500"}`}
            >
              {option.icon}
            </div>
            <h3
              className={`font-medium ${translationStyle === option.value ? "text-primary" : "text-slate-700"}`}
            >
              {option.label}
            </h3>
          </div>
          <p className="text-xs text-slate-600">
            {option.description}
          </p>
        </div>
      ))}
    </div>
  )
}