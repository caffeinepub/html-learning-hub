import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Code2, Search } from "lucide-react";
import { ProgressRing } from "./ProgressRing";

interface AppHeaderProps {
  searchQuery: string;
  onSearchChange: (v: string) => void;
  progressPercent: number;
  activeNav: string;
  onNavChange: (v: string) => void;
}

const NAV_ITEMS = ["Dashboard", "Lessons"] as const;

export function AppHeader({
  searchQuery,
  onSearchChange,
  progressPercent,
  activeNav,
  onNavChange,
}: AppHeaderProps) {
  return (
    <header
      className="sticky top-0 z-50 flex items-center gap-4 px-6 h-[72px] border-b"
      style={{
        background: "oklch(1 0 0)",
        borderColor: "oklch(0.918 0.012 240)",
        boxShadow: "0 1px 4px oklch(0 0 0 / 0.06)",
      }}
    >
      {/* Brand */}
      <div className="flex items-center gap-2 min-w-[160px]">
        <div
          className="flex items-center justify-center w-8 h-8 rounded-lg"
          style={{ background: "oklch(0.695 0.13 184)" }}
        >
          <Code2 className="w-4 h-4" style={{ color: "white" }} />
        </div>
        <span
          className="text-lg font-bold tracking-tight"
          style={{ color: "oklch(0.18 0.012 264)" }}
        >
          Code<span style={{ color: "oklch(0.695 0.13 184)" }}>HTML</span>
        </span>
      </div>

      {/* Nav links */}
      <nav className="hidden md:flex items-center gap-1 ml-2">
        {NAV_ITEMS.map((item) => (
          <button
            key={item}
            type="button"
            data-ocid={`nav.${item.toLowerCase()}.link`}
            onClick={() => onNavChange(item)}
            className="px-4 py-1.5 rounded-full text-sm font-medium transition-all"
            style={{
              background:
                activeNav === item ? "oklch(0.93 0.012 220)" : "transparent",
              color:
                activeNav === item
                  ? "oklch(0.18 0.012 264)"
                  : "oklch(0.54 0.01 264)",
            }}
          >
            {item}
          </button>
        ))}
      </nav>

      {/* Search */}
      <div className="flex-1 max-w-xs relative">
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
          style={{ color: "oklch(0.54 0.01 264)" }}
        />
        <Input
          data-ocid="header.search_input"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search lessons…"
          className="pl-9 h-9 text-sm"
          style={{
            background: "oklch(0.963 0.008 240)",
            borderColor: "oklch(0.918 0.012 240)",
          }}
        />
      </div>

      <div className="ml-auto flex items-center gap-3">
        <ProgressRing
          percentage={progressPercent}
          size={44}
          strokeWidth={3.5}
        />
        <Avatar className="w-9 h-9">
          <AvatarFallback
            className="text-sm font-bold"
            style={{
              background: "oklch(0.93 0.04 184)",
              color: "oklch(0.45 0.13 184)",
            }}
          >
            U
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
