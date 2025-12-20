"use client";

import { ClipboardCheckIcon } from "@/components/ui/clipboard-check";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { useRef, useState } from "react";
import { toast } from "sonner"; // Assuming sonner is used for toasts, or I can use a simple state for feedback

interface CodeBlockClientProps {
  html: string;
  language?: string;
  filename?: string;
}

export function CodeBlockClient({
  html,
  language,
  filename,
}: CodeBlockClientProps) {
  const [isCopied, setIsCopied] = useState(false);
  const checkIconRef = useRef<{ startAnimation: () => void; stopAnimation: () => void }>(null);

  const copyToClipboard = async () => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;
    const text = tempDiv.textContent || tempDiv.innerText || "";

    try {
      await navigator.clipboard.writeText(text);
      setIsCopied(true);
      checkIconRef.current?.startAnimation();
      
      // Reset after 2 seconds
      setTimeout(() => {
        setIsCopied(false);
        checkIconRef.current?.stopAnimation();
      }, 2000);
    } catch (err) {
      console.error("Failed to copy code: ", err);
    }
  };

  return (
    <div className="relative my-4 overflow-hidden rounded-md border bg-neutral-900 border-neutral-800">
      {/* Header */}
      {(filename || language) && (
        <div className="flex items-center justify-between bg-neutral-800/50 px-4 py-2 border-b border-neutral-700/50">
          <div className="flex items-center gap-2">
            {filename && (
              <span className="font-mono text-xs text-neutral-200">
                {filename}
              </span>
            )}
            {/* Optional: Use language as fallback or badge? User example shows filename prominently. 
                I'll verify if language should be shown if filename is missing. 
                For now, showing filename is priority. */}
          </div>
          <div className="flex items-center gap-2">
             {language && !filename && (
                <span className="font-mono text-xs text-neutral-400 capitalize">
                    {language}
                </span>
            )}
             <button
              onClick={copyToClipboard}
              className="text-neutral-400 hover:text-white transition-colors focus:outline-none"
              title="Copy to clipboard"
            >
              <ClipboardCheckIcon ref={checkIconRef} size={16} />
            </button>
          </div>
        </div>
      )}

      {/* Content */}
      <div className={cn("relative", !filename && !language && "pt-2")}>
        {!filename && !language && (
           <button
              onClick={copyToClipboard}
              className="absolute top-2 right-2 z-10 p-2 rounded-md bg-neutral-800/50 text-neutral-400 hover:bg-neutral-700 hover:text-white transition-colors focus:outline-none backdrop-blur-sm"
              title="Copy to clipboard"
            >
               <ClipboardCheckIcon ref={checkIconRef} size={16} />
            </button>
        )}

        <ScrollArea className="w-full" type="auto">
          <code
            className="shiki css-variables block w-full p-4 pt-1 font-mono text-sm leading-relaxed whitespace-pre !bg-transparent"
            dangerouslySetInnerHTML={{ __html: html }}
          />
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </div>
  );
}
