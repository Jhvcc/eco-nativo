"use client";

import { TranslationResult } from "./translation-interface";
import { diffWords } from "diff";
import { Skeleton } from "./ui/skeleton";
import { cn } from "@/lib/utils";


interface BackTranslationProps {
  result: TranslationResult | null
  originalText: string
  isLoading: boolean
}

export function BackTranslation({ result, originalText, isLoading }: BackTranslationProps) {
  // Calculate differences between original text and back  translation
  const differences = result?.text ? diffWords(originalText, result.text) : []

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 min-h-[300px] p-4 bg-slate-50 rounded-md">
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
          <div className="text-base">
            {differences.map((part, index) => (
              <span
                key={index}
                className={cn(
                  part.added && "bg-green-100 text-green-800",
                  part.removed && "bg-red-100 text-red-800"
                )}
              >
                {part.value}
              </span>
            ))}
          </div>
        ) : (
          <div className="h-full flex items-center justify-center text-slate-500 text-sm pointer-events-none select-none">
            Click &ldquo;Back Translation&rdquo; to verify translation accuracy
          </div>
        )}
      </div>
    </div>
  )
}