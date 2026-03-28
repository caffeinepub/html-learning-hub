import { Skeleton } from "@/components/ui/skeleton";
import { Toaster } from "@/components/ui/sonner";
import { BookOpen } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import type { Lesson } from "./backend.d";
import { AppHeader } from "./components/AppHeader";
import { LessonContent } from "./components/LessonContent";
import { LessonSidebar } from "./components/LessonSidebar";
import { useGetAllLessons } from "./hooks/useQueries";

const STORAGE_KEY = "completed_lessons";

function getCompletedFromStorage(): Set<string> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return new Set();
    const parsed = JSON.parse(raw);
    return new Set(Array.isArray(parsed) ? parsed : []);
  } catch {
    return new Set();
  }
}

function saveCompleted(completed: Set<string>) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...completed]));
}

export default function App() {
  const { data: lessons = [], isLoading } = useGetAllLessons();
  const [currentSlug, setCurrentSlug] = useState<string | null>(null);
  const [completedIds, setCompletedIds] = useState<Set<string>>(
    getCompletedFromStorage,
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [activeNav, setActiveNav] = useState("Lessons");

  // Set initial lesson
  useEffect(() => {
    if (lessons.length > 0 && !currentSlug) {
      setCurrentSlug(lessons[0].slug);
    }
  }, [lessons, currentSlug]);

  // Filter sidebar lessons by search
  const filteredLessons = useMemo(() => {
    if (!searchQuery.trim()) return lessons;
    const q = searchQuery.toLowerCase();
    return lessons.filter(
      (l) =>
        l.title.toLowerCase().includes(q) ||
        l.description.toLowerCase().includes(q),
    );
  }, [lessons, searchQuery]);

  const currentLesson: Lesson | undefined = useMemo(
    () => lessons.find((l) => l.slug === currentSlug),
    [lessons, currentSlug],
  );

  const currentIndex = lessons.findIndex((l) => l.slug === currentSlug);

  const handlePrev = () => {
    if (currentIndex > 0) setCurrentSlug(lessons[currentIndex - 1].slug);
  };

  const handleNext = () => {
    if (currentIndex < lessons.length - 1)
      setCurrentSlug(lessons[currentIndex + 1].slug);
  };

  const handleMarkComplete = () => {
    if (!currentLesson) return;
    const updated = new Set(completedIds);
    updated.add(currentLesson.slug);
    setCompletedIds(updated);
    saveCompleted(updated);
    toast.success("Lesson marked as complete!", {
      description: currentLesson.title,
    });
    // Auto-advance to next lesson
    if (currentIndex < lessons.length - 1) {
      setTimeout(() => setCurrentSlug(lessons[currentIndex + 1].slug), 600);
    }
  };

  const progressPercent =
    lessons.length > 0 ? (completedIds.size / lessons.length) * 100 : 0;

  return (
    <div
      className="flex flex-col min-h-screen"
      style={{ background: "oklch(0.963 0.008 240)" }}
    >
      <Toaster position="top-right" />

      <AppHeader
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        progressPercent={progressPercent}
        activeNav={activeNav}
        onNavChange={setActiveNav}
      />

      <div
        className="flex flex-1 overflow-hidden"
        style={{ height: "calc(100vh - 72px)" }}
      >
        {/* Sidebar */}
        {isLoading ? (
          <aside
            className="hidden md:flex flex-col p-4 gap-3"
            style={{
              width: 280,
              minWidth: 280,
              background: "oklch(1 0 0)",
              borderRight: "1px solid oklch(0.918 0.012 240)",
            }}
          >
            {["s1", "s2", "s3", "s4", "s5", "s6", "s7", "s8"].map((sk) => (
              <Skeleton key={sk} className="h-8 w-full rounded-lg" />
            ))}
          </aside>
        ) : (
          <LessonSidebar
            lessons={filteredLessons}
            currentSlug={currentSlug ?? ""}
            completedIds={completedIds}
            onSelect={(l) => setCurrentSlug(l.slug)}
          />
        )}

        {/* Main content */}
        <main className="flex-1 overflow-hidden">
          {isLoading ? (
            <div
              className="p-8 flex flex-col gap-4"
              data-ocid="lesson.loading_state"
            >
              <Skeleton className="h-8 w-64" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-4/6" />
              <Skeleton className="h-64 w-full rounded-xl" />
            </div>
          ) : currentLesson ? (
            <AnimatePresence mode="wait">
              <motion.div
                key={currentLesson.slug}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
                className="h-full"
              >
                <LessonContent
                  lesson={currentLesson}
                  onPrev={handlePrev}
                  onNext={handleNext}
                  hasPrev={currentIndex > 0}
                  hasNext={currentIndex < lessons.length - 1}
                  isCompleted={completedIds.has(currentLesson.slug)}
                  onMarkComplete={handleMarkComplete}
                />
              </motion.div>
            </AnimatePresence>
          ) : (
            <div
              className="flex flex-col items-center justify-center h-full gap-4"
              data-ocid="lesson.empty_state"
            >
              <BookOpen
                className="w-12 h-12"
                style={{ color: "oklch(0.7 0.04 220)" }}
              />
              <p className="text-sm" style={{ color: "oklch(0.54 0.01 264)" }}>
                Select a lesson to get started
              </p>
            </div>
          )}
        </main>
      </div>

      {/* Footer */}
      <footer
        className="flex items-center justify-between px-6 py-3 text-xs"
        style={{
          background: "oklch(1 0 0)",
          borderTop: "1px solid oklch(0.918 0.012 240)",
          color: "oklch(0.54 0.01 264)",
        }}
      >
        <span>© {new Date().getFullYear()} CodeHTML. All rights reserved.</span>
        <a
          href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
            typeof window !== "undefined" ? window.location.hostname : "",
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline"
          style={{ color: "oklch(0.695 0.13 184)" }}
        >
          Built with ❤️ using caffeine.ai
        </a>
      </footer>
    </div>
  );
}
