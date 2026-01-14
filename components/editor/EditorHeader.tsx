"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEditorStore } from "@/lib/stores/editor-store";
import {
  Check,
  Save,
  Download,
  MoreHorizontal,
  FileDown,
  Image as ImageIcon,
  Archive,
  Settings,
} from "lucide-react";
import { ModeToggle } from "../shared/ModeToggle";

function formatTimeAgo(date: Date | null, now: Date): string {
  if (!date) return "Never saved";

  const diffMs = now.getTime() - date.getTime();
  const diffSecs = Math.floor(diffMs / 1000);
  const diffMins = Math.floor(diffSecs / 60);
  const diffHours = Math.floor(diffMins / 60);

  if (diffSecs < 10) return "Saved just now";
  if (diffSecs < 60) return `Saved ${diffSecs}s ago`;
  if (diffMins < 60) return `Saved ${diffMins}m ago`;
  if (diffHours < 24) return `Saved ${diffHours}h ago`;
  return `Saved ${date.toLocaleDateString()}`;
}

export function EditorHeader() {
  const { projectName, lastSaved, markSaved } = useEditorStore();
  const [isEditing, setIsEditing] = React.useState(false);
  const [editedName, setEditedName] = React.useState(projectName);
  const [currentTime, setCurrentTime] = React.useState<Date | null>(null);

  // Only start tracking time on client to avoid hydration mismatch
  React.useEffect(() => {
    setCurrentTime(new Date());
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 10000); // Update every 10 seconds
    return () => clearInterval(interval);
  }, []);

  const handleSave = () => {
    markSaved();
  };

  const handleNameSubmit = () => {
    setIsEditing(false);
    // TODO: Update project name in store
  };

  return (
    <header className="flex items-center justify-between h-12 px-2 border-b border-border bg-background">
      {/* Left section */}
      <div className="flex items-center gap-2">
        <SidebarTrigger aria-label="Toggle sidebar" />
        <Separator orientation="vertical" className="h-6" />

        {/* Project name */}
        <div className="flex items-center gap-2 px-2 py-1 rounded-lg bg-muted/50 border border-border">
          <div className="size-5 rounded bg-primary/20 flex items-center justify-center">
            <ImageIcon className="size-3 text-primary" aria-hidden />
          </div>
          {isEditing ? (
            <Input
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
              onBlur={handleNameSubmit}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleNameSubmit();
                if (e.key === "Escape") {
                  setEditedName(projectName);
                  setIsEditing(false);
                }
              }}
              className="h-6 w-32 text-xs px-1 bg-transparent border-none focus-visible:ring-0"
              autoFocus
            />
          ) : (
            <span
              className="text-xs font-medium cursor-pointer hover:text-primary"
              onClick={() => setIsEditing(true)}
            >
              {projectName}
            </span>
          )}
          <Button
            variant="ghost"
            size="icon-xs"
            className="text-muted-foreground"
            aria-label="More options"
          >
            <MoreHorizontal className="size-3" />
          </Button>
        </div>
      </div>

      {/* Center section - save status */}
      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <Check className="size-3.5 text-primary" />
        <span suppressHydrationWarning>
          {currentTime ? formatTimeAgo(lastSaved, currentTime) : "Saved"}
        </span>
      </div>

      {/* Right section */}
      <div className="flex items-center gap-2">
        <ModeToggle />
        <Button
          variant="ghost"
          size="sm"
          className="gap-1.5"
          aria-label="Settings"
        >
          <Settings className="size-4" />
        </Button>

        <Separator orientation="vertical" className="h-6" />

        <Button
          variant="outline"
          size="sm"
          className="gap-1.5"
          onClick={handleSave}
        >
          <Save className="size-4" />
          Save file
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="default" size="sm" className="gap-1.5">
              <Download className="size-4" />
              Export
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <ImageIcon className="size-4 mr-2" aria-hidden />
              Export as PNG
            </DropdownMenuItem>
            <DropdownMenuItem>
              <FileDown className="size-4 mr-2" />
              Export as SVG
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Archive className="size-4 mr-2" />
              Export All Sizes (ZIP)
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
