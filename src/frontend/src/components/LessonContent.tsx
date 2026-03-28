import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CheckCircle2, ChevronLeft, ChevronRight, Circle } from "lucide-react";
import type { Lesson } from "../backend.d";
import { CodeEditor } from "./CodeEditor";

interface LessonContentProps {
  lesson: Lesson;
  onPrev: () => void;
  onNext: () => void;
  hasPrev: boolean;
  hasNext: boolean;
  isCompleted: boolean;
  onMarkComplete: () => void;
}

const DIFFICULTY_COLORS: Record<string, { bg: string; text: string }> = {
  Beginner: { bg: "oklch(0.93 0.08 150)", text: "oklch(0.35 0.12 150)" },
  Intermediate: { bg: "oklch(0.93 0.08 80)", text: "oklch(0.45 0.16 80)" },
  Advanced: { bg: "oklch(0.93 0.08 30)", text: "oklch(0.45 0.18 30)" },
};

type ContentNode =
  | { type: "empty"; key: string }
  | { type: "h1" | "h2"; key: string; text: string }
  | { type: "li"; key: string; text: string }
  | { type: "p"; key: string; text: string };

function parseContent(content: string): ContentNode[] {
  return content.split("\n").map((line, i) => {
    const trimmed = line.trim();
    const key = `line-${i}-${trimmed.slice(0, 8)}`;
    if (!trimmed) return { type: "empty", key };
    if (trimmed.startsWith("## "))
      return { type: "h2", key, text: trimmed.slice(3) };
    if (trimmed.startsWith("# "))
      return { type: "h1", key, text: trimmed.slice(2) };
    if (trimmed.startsWith("- ") || trimmed.startsWith("* "))
      return { type: "li", key, text: trimmed.slice(2) };
    return { type: "p", key, text: trimmed };
  });
}

function renderNode(node: ContentNode) {
  switch (node.type) {
    case "empty":
      return <div key={node.key} className="h-2" />;
    case "h1":
      return (
        <h2
          key={node.key}
          className="text-lg font-bold mt-5 mb-2"
          style={{ color: "oklch(0.18 0.012 264)" }}
        >
          {node.text}
        </h2>
      );
    case "h2":
      return (
        <h2
          key={node.key}
          className="text-base font-bold mt-4 mb-1.5"
          style={{ color: "oklch(0.18 0.012 264)" }}
        >
          {node.text}
        </h2>
      );
    case "li":
      return (
        <li
          key={node.key}
          className="ml-5 text-sm"
          style={{ color: "oklch(0.35 0.01 264)", lineHeight: 1.7 }}
        >
          {node.text}
        </li>
      );
    case "p":
      return (
        <p
          key={node.key}
          className="text-sm"
          style={{
            color: "oklch(0.35 0.01 264)",
            lineHeight: 1.7,
            marginBottom: "0.5rem",
          }}
        >
          {node.text}
        </p>
      );
  }
}

export function LessonContent({
  lesson,
  onPrev,
  onNext,
  hasPrev,
  hasNext,
  isCompleted,
  onMarkComplete,
}: LessonContentProps) {
  const colors =
    DIFFICULTY_COLORS[lesson.difficulty] ?? DIFFICULTY_COLORS.Beginner;
  const nodes = parseContent(lesson.content);

  return (
    <ScrollArea className="flex-1 h-full">
      <div className="px-8 py-6 max-w-4xl">
        {/* Title row */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Badge
                className="text-xs font-semibold px-2.5 py-0.5"
                style={{
                  background: colors.bg,
                  color: colors.text,
                  border: "none",
                }}
              >
                {lesson.difficulty}
              </Badge>
              {isCompleted && (
                <span
                  className="flex items-center gap-1 text-xs font-medium"
                  style={{ color: "oklch(0.695 0.13 184)" }}
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Completed
                </span>
              )}
            </div>
            <h1
              className="text-2xl font-bold"
              style={{ color: "oklch(0.18 0.012 264)" }}
            >
              {lesson.title}
            </h1>
          </div>

          {/* Prev/Next */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <Button
              data-ocid="lesson.pagination_prev"
              size="sm"
              variant="outline"
              onClick={onPrev}
              disabled={!hasPrev}
              className="gap-1"
              style={{ borderColor: "oklch(0.918 0.012 240)" }}
            >
              <ChevronLeft className="w-4 h-4" />
              Prev
            </Button>
            <Button
              data-ocid="lesson.pagination_next"
              size="sm"
              variant="outline"
              onClick={onNext}
              disabled={!hasNext}
              className="gap-1"
              style={{ borderColor: "oklch(0.918 0.012 240)" }}
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Description */}
        <p
          className="text-sm mb-5 p-4 rounded-lg"
          style={{
            background: "oklch(0.93 0.04 184 / 0.35)",
            color: "oklch(0.35 0.01 264)",
            borderLeft: "3px solid oklch(0.695 0.13 184)",
            lineHeight: 1.7,
          }}
        >
          {lesson.description}
        </p>

        {/* Content */}
        <div className="lesson-content mb-6">
          {nodes.map((node) => renderNode(node))}
        </div>

        {/* Mark complete */}
        <div className="flex items-center gap-3 mb-6">
          <Button
            data-ocid="lesson.primary_button"
            onClick={onMarkComplete}
            disabled={isCompleted}
            className="gap-2"
            style={{
              background: isCompleted
                ? "oklch(0.93 0.04 184)"
                : "oklch(0.695 0.13 184)",
              color: isCompleted ? "oklch(0.45 0.13 184)" : "white",
              border: "none",
            }}
          >
            {isCompleted ? (
              <CheckCircle2 className="w-4 h-4" />
            ) : (
              <Circle className="w-4 h-4" />
            )}
            {isCompleted ? "Lesson Completed" : "Mark as Complete"}
          </Button>
        </div>

        {/* Code Editor */}
        <div>
          <h2
            className="text-base font-bold mb-3"
            style={{ color: "oklch(0.18 0.012 264)" }}
          >
            Try It Yourself
          </h2>
          <CodeEditor initialCode={lesson.codeExample} />
        </div>
      </div>
    </ScrollArea>
  );
}
