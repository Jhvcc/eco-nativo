"use client"

import { type TranslationResult } from "@/components/translation-interface"
import { Skeleton } from "./ui/skeleton"
import { Button } from "./ui/button"
import { Check, Copy } from "lucide-react"
import { useState } from "react"

interface TranslationOutputProps {
  result: TranslationResult | null
  isLoading: boolean
}

export function TranslationOutput({ result, isLoading }: TranslationOutputProps) {
  const [copied, setCopied] = useState<boolean>(false)

  const handleCopy = () => {
    if (result?.text) {
      navigator.clipboard.writeText(result.text)
      setCopied(true)
      setTimeout(() => {
        setCopied(false)
      }, 2000)
    }
  }

  return (
    <div className="flex flex-col h-full">
      <div className="relative flex-1 min-h-[300px] p-4 bg-slate-50 rounded-md">
        {isLoading ? (
          <div className="space-y-2">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        ) : result?.text ? (
          <>
            <div className="text-base break-words">{result.text}</div>

            {/* {result.alternativeSuggestions && result.alternativeSuggestions.length > 0 && (
              <div className="mt-4 pt-4 border-t border-slate-200">
                <h4 className="text-sm font-medium mb-2 text-slate-700">Alternative translations:</h4>
                <ul className="text-sm text-slate-600">
                  {result.alternativeSuggestions.map((alt, index) => (
                    <li key={index} className="mb-1">{alt}</li>
                  ))}
                </ul>
              </div>
            )}

            {result.culturalNotes && result.culturalNotes.length > 0 && (
              <div className="mt-4 pt-4 border-t border-slate-200">
                <h4 className="text-sm font-medium mb-2 flex items-center text-slate-700">
                  <Info className="w-4 h-4 mr-1" />
                  Cultural notes:
                </h4>
                <ul className="text-sm text-slate-600">
                  {result.culturalNotes.map((note, index) => (
                    <li key={index} className="mb-1">{note}</li>
                  ))}
                </ul>
              </div>
            )} */}

            <Button variant="ghost" size="icon" className="absolute top-2 right-2" onClick={handleCopy}>
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            </Button>
          </>
        ) : (
          <div className="h-full flex items-center justify-center text-slate-500 text-sm pointer-events-none select-none">
            Translation will appear here
          </div>
        )}
      </div>

      {result?.confidenceScore !== undefined && (
        <div className="mt-2 flex items-center">
          <span className="text-xs text-slate-500 mr-2">Confidence:</span>
          <div className="h-2 flex-1 bg-slate-200 rounded-full overflow-hidden">
            <div className="h-full bg-emerald-500" style={{ width: `${result.confidenceScore * 100}%` }}></div>
          </div>
          <span className="text-xs text-slate-500 ml-2">{Math.round(result.confidenceScore * 100)}%</span>
        </div>
      )}
    </div>
  )
}