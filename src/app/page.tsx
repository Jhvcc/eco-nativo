import { Responsive } from "@/components/responsive";
import { TranslationInterface } from "@/components/translation-interface";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold text-center mb-2 text-slate-800">
          Advanced Translation Tool
        </h1>
        <p className="text-center text-slate-600 mb-8">
          Professional translations with back translation verification
        </p>

        <TranslationInterface />
      </div>
      <Responsive />
    </main>
  );
}
