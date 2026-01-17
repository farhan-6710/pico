"use client";

import * as React from "react";
import Link from "next/link";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { X, Heart, Sparkles } from "lucide-react";
import { FOOTER_ITEMS, NAV_ITEMS } from "@/constants/navItems";

type AppSidebarProps = React.ComponentProps<typeof Sidebar>;

export function AppSidebar({ className, ...props }: AppSidebarProps) {
  return (
    <Sidebar
      collapsible="icon"
      className={cn("border-r border-sidebar-border", className)}
      {...props}
    >
      <SidebarHeader className="p-3">
        <div className="flex items-center gap-2 group-data-[collapsible=icon]:justify-center">
          <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-sm">
            P
          </div>
          <span className="text-lg font-semibold group-data-[collapsible=icon]:hidden">
            Pico
          </span>
        </div>
      </SidebarHeader>

      <SidebarSeparator />

      <SidebarContent className="py-2">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {NAV_ITEMS.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton asChild tooltip={item.label}>
                    <Link href={item.href}>
                      <item.icon className="size-4" />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarSeparator />

      {/* Support Banner */}
      <div className="p-2 group-data-[collapsible=icon]:hidden">
        <div className="relative rounded-lg border border-sidebar-border bg-sidebar-accent/50 p-3">
          <Button
            variant="ghost"
            size="icon-xs"
            className="absolute right-1 top-1 text-muted-foreground hover:text-foreground"
            aria-label="Dismiss"
          >
            <X className="size-3" />
          </Button>
          <div className="flex items-center gap-2 mb-1">
            <div className="flex size-6 items-center justify-center rounded-full bg-primary/20">
              <Sparkles className="size-3 text-primary" />
            </div>
            <span className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
              Support Pico
            </span>
          </div>
          <p className="text-sm font-medium mb-1">Help Us Grow 🌱</p>
          <p className="text-xs text-muted-foreground mb-2 leading-relaxed">
            Pico is free, no ads, no subscriptions. Your support helps us
            continue growing.
          </p>
          <Button size="lg" className="w-full gap-2 text-md">
            <Heart className="size-4 fill-rose-500 text-rose-500" />
            Support
          </Button>
        </div>
      </div>

      <SidebarFooter className="p-2">
        <SidebarMenu>
          {FOOTER_ITEMS.map((item) => (
            <SidebarMenuItem key={item.label}>
              <SidebarMenuButton asChild tooltip={item.label}>
                <Link href={item.href}>
                  <item.icon className="size-4" />
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
