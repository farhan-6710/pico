"use client";

import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/navigation/AppSidebar";
import { Editor } from "@/components/editor";
import { MobileComingSoon } from "@/components/editor/MobileComingSoon";

export default function Page() {

  return (
    <>
      <MobileComingSoon />
      <SidebarProvider defaultOpen={true}>
        <AppSidebar />
        <SidebarInset className="bg-background overflow-hidden h-screen flex flex-col">
          <Editor />
        </SidebarInset>
      </SidebarProvider>
    </>
  );
}
