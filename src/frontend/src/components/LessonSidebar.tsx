import { ScrollArea } from "@/components/ui/scroll-area";
import { BookOpen, CheckCircle2, ChevronRight, Code } from "lucide-react";
import type { Lesson } from "../backend.d";

interface LessonSidebarProps {
  lessons: Lesson[];
  currentSlug: string;
  completedIds: Set<string>;
  onSelect: (lesson: Lesson) => void;
}

const DIFFICULTY_ORDER = ["Beginner", "Intermediate", "Advanced"];

export function LessonSidebar({
  lessons,
  currentSlug,
  completedIds,
  onSelect,
}: LessonSidebarProps) {
  const grouped = DIFFICULTY_ORDER.reduce(
    (acc, diff) => {
      acc[diff] = lessons.filter((l) => l.difficulty === diff);
      return acc;
    },
    {} as Record<string, Lesson[]>,
  );

  return (
    <aside
      className="hidden md:flex flex-col"
      style={{
        width: 280,
        minWidth: 280,
        background: "oklch(1 0 0)",
        borderRight: "1px solid oklch(0.918 0.012 240)",
      }}
    >
      <div
        className="px-4 py-3 border-b"
        style={{ borderColor: "oklch(0.918 0.012 240)" }}
      >
        <h2
          className="text-sm font-semibold"
          style={{ color: "oklch(0.18 0.012 264)" }}
        >
          Course Outline
        </h2>
        <p className="text-xs mt-0.5" style={{ color: "oklch(0.54 0.01 264)" }}>
          {lessons.length} lessons total
        </p>
      </div>

      <ScrollArea className="flex-1 py-2">
        {DIFFICULTY_ORDER.map((diff) => {
          const group = grouped[diff];
          if (!group || group.length === 0) return null;
          return (
            <div key={diff} className="mb-4">
              <div
                className="px-4 py-2 text-[11px] font-bold tracking-widest uppercase"
                style={{ color: "oklch(0.65 0.08 184)" }}
              >
                {diff}
              </div>
              {group.map((lesson, idx) => {
                const isActive = lesson.slug === currentSlug;
                const isDone = completedIds.has(lesson.slug);
                const icon =
                  diff === "Beginner" ? (
                    <BookOpen className="w-3.5 h-3.5 flex-shrink-0" />
                  ) : (
                    <Code className="w-3.5 h-3.5 flex-shrink-0" />
                  );
                return (
                  <button
                    key={lesson.slug}
                    type="button"
                    data-ocid={`sidebar.lesson.item.${idx + 1}`}
                    onClick={() => onSelect(lesson)}
                    className="w-full flex items-center gap-2.5 px-4 py-2 text-left text-sm transition-all group"
                    style={{
                      background: isActive
                        ? "oklch(0.93 0.012 220)"
                        : "transparent",
                      color: isActive
                        ? "oklch(0.18 0.012 264)"
                        : isDone
                          ? "oklch(0.54 0.01 264)"
                          : "oklch(0.35 0.01 264)",
                      fontWeight: isActive ? 600 : 400,
                      borderLeft: isActive
                        ? "3px solid oklch(0.695 0.13 184)"
                        : "3px solid transparent",
                    }}
                  >
                    <span
                      style={{
                        color: isActive
                          ? "oklch(0.695 0.13 184)"
                          : "oklch(0.7 0.04 220)",
                      }}
                    >
                      {icon}
                    </span>
                    <span className="flex-1 truncate">{lesson.title}</span>
                    {isDone && (
                      <CheckCircle2
                        className="w-3.5 h-3.5 flex-shrink-0"
                        style={{ color: "oklch(0.695 0.13 184)" }}
                      />
                    )}
                    {isActive && !isDone && (
                      <ChevronRight
                        className="w-3.5 h-3.5 flex-shrink-0"
                        style={{ color: "oklch(0.695 0.13 184)" }}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          );
        })}
      </ScrollArea>
    </aside>
  );
}
