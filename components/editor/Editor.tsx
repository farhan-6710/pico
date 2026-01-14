"use client";

import * as React from "react";
import { EditorHeader } from "./EditorHeader";
import { EditorCanvas } from "./EditorCanvas";
import { EditorToolbar } from "./EditorToolbar";

export function Editor() {
  return (
    <div className="flex flex-col h-full bg-background">
      <EditorHeader />
      <div className="flex flex-1 overflow-hidden">
        <EditorCanvas />
        <EditorToolbar />
      </div>
    </div>
  );
}
