"use client";

import { LanguageSelector } from "./language-selector"
import { TranslationInput } from "./translation-input"
import { useEffect, useState } from "react"
import { Button } from "./ui/button";
import { TranslationOutput } from "./translation-output";
import { RotateCcw } from "lucide-react";
import { BackTranslation } from "./back-translation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { TranslationSettings } from "./translation-settings";
import { toast } from "sonner"
import { detectLanguage } from "@/lib/detect-language";

export type TranslationStyle = "casual" | "formal" | "business" | "academic"
export type TranslationDomain = "general" | "legal" | "medical" | "technical" | "it"

export interface TranslationResult {
  text?: string
  alternativeSuggestions?: string[]
  culturalNotes?: string[]
  confidenceScore?: number
}

export function TranslationInterface() {
  const [sourceLanguage, setSourceLanguage] = useState<"auto" | string>("auto")
  const [targetLanguage, setTargetLanguage] = useState<string>("en-US")
  const [detectedLanguage, setDetectedLanguage] = useState<string>("")
  const [sourceText, setSourceText] = useState<string>("")
  const [translationResult, setTranslationResult] = useState<TranslationResult | null>(null)
  const [backTranslationResult, setBackTranslationResult] = useState<TranslationResult | null>(null)
  const [isTranslating, setIsTranslating] = useState<boolean>(false)
  const [isBackTranslating, setIsBackTranslating] = useState<boolean>(false)
  const [translationStyle, setTranslationStyle] = useState<TranslationStyle>("casual")
  const [domain, setDomain] = useState<TranslationDomain>("general")

  // Auto-detect language when source text changes
  useEffect(() => {
    const detectSourceLanguage = async () => {
      if (sourceText.trim().length > 5 && sourceLanguage === "auto") {
        try {
          const detected = await detectLanguage(sourceText)
          console.log({ detected })
          setDetectedLanguage(detected)
        } catch (error) {
          console.error("Language detection failed: ", error)
        }
      }
    }

    detectSourceLanguage()
  }, [sourceText, sourceLanguage])

  // Perform translation when text or settings change
  useEffect(() => {
    const performTranslation = async () => {
      if (sourceText.trim().length > 0) {
        setIsTranslating(true)
        try {
          const result = await translationText({
            text: sourceText,
            sourceLanguage: sourceLanguage === "auto" ? detectedLanguage || "en-US" : sourceLanguage,
            targetLanguage,
            style: translationStyle,
            domain
          })
          setTranslationResult(result)
        } catch (error) {
          console.error("Translation failed: ", error)
          toast("Translation Error", {
            description: "Failed to translate text. Please type again.",
          })
        } finally {
          setIsTranslating(false)
        }
      } else {
        setTranslationResult(null)
        setBackTranslationResult(null)
      }
    }

    // Debounce translation to avoid too many request
    const timeoutId = setTimeout(performTranslation, 1000)
    return () => clearTimeout(timeoutId)
  }, [sourceText, sourceLanguage, targetLanguage, translationStyle, domain, detectedLanguage])

  const handleBackTranslation = async () => {
    if (!translationResult?.text) return

    setIsBackTranslating(true)
    try {
      const result = await translateText({
        text: translationResult.text,
        sourceLanguage: targetLanguage,
        targetLanguage: sourceLanguage === "auto" ? detectedLanguage || "en-US" : sourceLanguage,
        style: translationStyle,
        domain
      })
      setTranslationResult(result)
    } catch (error) {
      console.error("Back translation failed: ", error)
      toast("Back Translation Error", {
        description: "Failed to perform back translation. Please try again."
      })
    } finally {
      setIsBackTranslating(false)
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 divide-x divide-slate-200">
        {/* Source Text column */}
        <div className="p-4 flex flex-col h-full">
          <div className="flex justify-between items-center mb-4 gap-2">
            <LanguageSelector
              value={sourceLanguage}
              onChange={setSourceLanguage}
              includeAuto={true}
              detectedLanguage={detectedLanguage}
            />
            {/* <div className="flex gap-2">
              <Button variant={"outline"} size="icon" title="Voice input">
                <Mic className="w-4 h-4" />
              </Button>
              <Button variant={"outline"} size="icon" title="Upload document">
                <FileUp className="w-4 h-4" />
              </Button>
              <Button variant={"outline"} size="icon" title="Image text recognization">
                <Camera className="w-4 h-4" />
              </Button>
            </div> */}
          </div>

          <TranslationInput value={sourceText} onChange={setSourceText} placeholder="Enter text to translation..." />
        </div>

        {/* Translation Result column */}
        <div className="p-4 flex flex-col h-full">
          <div className="flex justify-between items-center mb-4">
            <LanguageSelector
              value={targetLanguage}
              onChange={setTargetLanguage}
              includeAuto={false}
            />
            <Button
              variant="outline"
              size="sm"
              onClick={handleBackTranslation}
              disabled={!translationResult?.text || isBackTranslating}
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Back Translate
            </Button>
          </div>

          <TranslationOutput result={translationResult} isLoading={isTranslating} />
        </div>

        {/* Back Translation Column */}
        {backTranslationResult &&
          <div className="p-4 flex flex-col h-full">
            <h3 className="text-lg font-medium mb-4 text-slate-800">Back Translation</h3>
            <BackTranslation result={backTranslationResult} originalText={sourceText} isLoading={isBackTranslating} />
          </div>
        }
      </div>

      {/* Settings Panel */}
      <div className="border-t border-slate-200 p-4">
        <Tabs defaultValue="settings">
          <TabsList className="mb-4">
            <TabsTrigger value="style" className="cursor-pointer">
              Translation Style
            </TabsTrigger>
            <TabsTrigger value="domain" className="cursor-pointer">
              Domain
            </TabsTrigger>
            <TabsTrigger value="settings" className="cursor-pointer">
              Advanced Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="style">
            <TranslationSettings
              translationStyle={translationStyle}
              onStyleChange={setTranslationStyle}
              domain={domain}
              onDomainChange={setDomain}
            />
          </TabsContent>

          <TabsContent value="domain">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
              {(["general", "legal", "medical", "technical", "it"] as TranslationDomain[]).map((d) => (
                <Button
                  key={d}
                  variant={domain === d ? "default" : "outline"}
                  onClick={() => setDomain(d)}
                  className="capitalize"
                >
                  {d}
                </Button>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="settings">
            <div className="text-sm text-slate-600">
              Additional settings for customizing translation behavior will be available soon.
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div >
  )
}