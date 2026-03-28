import { Button } from "@/components/ui/button";
import { Play, RotateCcw } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

interface CodeEditorProps {
  initialCode: string;
}

export function CodeEditor({ initialCode }: CodeEditorProps) {
  const [code, setCode] = useState(initialCode);
  const [previewDoc, setPreviewDoc] = useState(initialCode);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    setCode(initialCode);
    setPreviewDoc(initialCode);
  }, [initialCode]);

  const runCode = useCallback(() => {
    setPreviewDoc(code);
  }, [code]);

  const resetCode = useCallback(() => {
    setCode(initialCode);
    setPreviewDoc(initialCode);
  }, [initialCode]);

  const lineNumbers = code.split("\n").map((_, lineIdx) => lineIdx + 1);

  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{
        border: "1px solid oklch(0.918 0.012 240)",
        boxShadow: "0 2px 12px oklch(0 0 0 / 0.06)",
      }}
    >
      {/* Panel headers */}
      <div
        className="grid grid-cols-2"
        style={{ borderBottom: "1px solid oklch(0.3 0.04 220)" }}
      >
        <div
          className="flex items-center gap-2 px-4 py-2.5"
          style={{ background: "oklch(0.18 0.04 220)" }}
        >
          <span
            className="w-2.5 h-2.5 rounded-full"
            style={{ background: "oklch(0.7 0.2 30)" }}
          />
          <span
            className="w-2.5 h-2.5 rounded-full"
            style={{ background: "oklch(0.75 0.2 80)" }}
          />
          <span
            className="w-2.5 h-2.5 rounded-full"
            style={{ background: "oklch(0.7 0.18 140)" }}
          />
          <span
            className="ml-2 text-xs font-medium"
            style={{ color: "oklch(0.65 0.03 220)" }}
          >
            Code Editor
          </span>
        </div>
        <div
          className="flex items-center gap-2 px-4 py-2.5"
          style={{
            background: "oklch(1 0 0)",
            borderLeft: "1px solid oklch(0.918 0.012 240)",
          }}
        >
          <span
            className="w-2 h-2 rounded-full"
            style={{ background: "oklch(0.695 0.13 184)" }}
          />
          <span
            className="text-xs font-medium"
            style={{ color: "oklch(0.54 0.01 264)" }}
          >
            Live Preview
          </span>
        </div>
      </div>

      {/* Editor + Preview */}
      <div className="grid grid-cols-2" style={{ minHeight: 340 }}>
        {/* Editor */}
        <div className="code-editor-wrapper" style={{ borderRadius: 0 }}>
          <div className="line-numbers">
            {lineNumbers.map((num) => (
              <div key={num}>{num}</div>
            ))}
          </div>
          <textarea
            data-ocid="editor.editor"
            className="code-textarea"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            spellCheck={false}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
          />
        </div>

        {/* Preview */}
        <div
          className="flex flex-col"
          style={{ borderLeft: "1px solid oklch(0.918 0.012 240)" }}
        >
          <iframe
            ref={iframeRef}
            data-ocid="editor.canvas_target"
            srcDoc={previewDoc}
            sandbox="allow-scripts"
            title="HTML Preview"
            className="w-full flex-1 bg-white"
            style={{ minHeight: 340, border: "none" }}
          />
        </div>
      </div>

      {/* Action bar */}
      <div
        className="flex items-center justify-between px-4 py-3"
        style={{
          background: "oklch(0.18 0.04 220)",
          borderTop: "1px solid oklch(0.3 0.04 220)",
        }}
      >
        <div className="flex items-center gap-2">
          <Button
            data-ocid="editor.submit_button"
            size="sm"
            onClick={runCode}
            className="gap-2 text-sm font-medium"
            style={{
              background: "oklch(0.695 0.13 184)",
              color: "white",
              border: "none",
            }}
          >
            <Play className="w-3.5 h-3.5" />
            Run Code
          </Button>
          <Button
            data-ocid="editor.secondary_button"
            size="sm"
            variant="outline"
            onClick={resetCode}
            className="gap-2 text-sm"
            style={{
              borderColor: "oklch(0.5 0.04 220)",
              color: "oklch(0.75 0.03 220)",
              background: "transparent",
            }}
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset
          </Button>
        </div>
        <span className="text-xs" style={{ color: "oklch(0.5 0.03 220)" }}>
          Click Run Code to update preview
        </span>
      </div>
    </div>
  );
}
