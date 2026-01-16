"use client";

import * as React from "react";
import { EditorHeader } from "./EditorHeader";
import { EditorCanvas } from "./EditorCanvas";
import { EditorToolbar } from "./EditorToolbar";

export function Editor() {
  return (
    <div className="flex flex-col h-full w-full overflow-hidden">
      {/* Header stays at the top */}
      <EditorHeader />

      {/* Main content area: Canvas + Toolbar */}
      <div className="flex flex-1 min-h-0 w-full overflow-hidden">
        {/* Canvas takes all remaining space. min-w-0 is critical for flex shrinking. */}
        <EditorCanvas />

        {/* Toolbar has fixed width and never shrinks */}
        <EditorToolbar />
      </div>
    </div>
  );
}
