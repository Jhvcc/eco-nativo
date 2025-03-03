"use client"

import { Check, ChevronsUpDown } from "lucide-react"
import { Button } from "./ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "./ui/command"
import { cn } from "@/lib/utils"
import { useState } from "react"

interface LanguageSelectorProps {
  value: string
  onChange: (value: string) => void
  includeAuto?: boolean
  detectedLanguage?: string
}


const languages = [
  { value: "en-US", label: "English (US)" },
  { value: "en-GB", label: "English (UK)" },
  { value: "es", label: "Spanish" },
  { value: "fr", label: "French" },
  { value: "de", label: "German" },
  { value: "it", label: "Italian" },
  { value: "pt", label: "Portuguese" },
  { value: "ru", label: "Russian" },
  { value: "zh", label: "Chinese (Simplified)" },
  { value: "ja", label: "Japanese" },
  { value: "ko", label: "Korean" },
  { value: "ar", label: "Arabic" },
  { value: "hi", label: "Hindi" },
  { value: "tr", label: "Turkish" },
  { value: "nl", label: "Dutch" },
  { value: "sv", label: "Swedish" },
  { value: "pl", label: "Polish" },
  { value: "vi", label: "Vietnamese" },
  { value: "th", label: "Thai" },
]

export function LanguageSelector({
  value,
  onChange,
  includeAuto = false,
  detectedLanguage = ""
}: LanguageSelectorProps) {
  const [open, setOpen] = useState<boolean>(false)
  const allOptions = includeAuto ? [{ value: "auto", label: "Auto-detect" }, ...languages] : languages

  const selectedLanguage = allOptions.find(lang => lang.value === value)

  const displayValue = value === "auto" && detectedLanguage ? `Auto-detect (${languages.find(lang => lang.value === detectedLanguage)?.label || detectedLanguage})` : selectedLanguage?.label || "Select Language"

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant={"outline"} role="combobox" aria-expanded={open} className="w-[200px] justify-between">
          {displayValue}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command className="bg-white">
          <CommandInput placeholder="Search Language..." />
          <CommandList>
            <CommandEmpty>No language found.</CommandEmpty>
            <CommandGroup>
              {allOptions.map(lang => (
                <CommandItem
                  key={lang.value}
                  value={lang.value}
                  onSelect={(currentValue) => {
                    onChange(currentValue)
                    setOpen(false)
                  }}
                >
                  <Check className={cn("mr-2 h-2 w-4", value === lang.value ? "opacity-100" : "opacity-0")} />
                  {lang.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}