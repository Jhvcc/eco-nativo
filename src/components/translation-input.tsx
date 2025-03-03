"use client"

import { useEffect, useState } from "react";
import { Textarea } from "./ui/textarea";

interface TranslationInputProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export function TranslationInput({
  value,
  onChange,
  placeholder = "Enter text to translate..."
}: TranslationInputProps) {
  const [charCount, setCharCount] = useState<number>(0)

  useEffect(() => {
    setCharCount(value.length)
  }, [value])

  return (
    <div className="flex flex-col h-full">
      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="flex-1 min-h-[300px] resize-none text-base"
        placeholder={placeholder}
      />
      <div className="text-xs text-slate-500 mt-2 text-right pointer-events-none select-none">{charCount} characters</div>
    </div>
  )
}