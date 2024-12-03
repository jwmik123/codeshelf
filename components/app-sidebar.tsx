"use client";

import * as React from "react";
import {
  BookOpen,
  Bot,
  EyeIcon,
  Frame,
  LibraryBig,
  LifeBuoy,
  Map,
  PieChart,
  PlusCircle,
  Scissors,
  Send,
  Settings2,
} from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect } from "react";

import { NavMain } from "@/components/nav-main";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const data = {
  user: {
    name: "Joël Mik",
    email: "joel@codeshelf.ai",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "My Snippets",
      url: "#",
      icon: Scissors,
      isActive: true,
      items: [
        {
          title: "Add Snippet",
          icon: PlusCircle,
          url: "#",
        },
        {
          title: "View Snippets",
          icon: EyeIcon,
          url: "#",
        },
      ],
    },
    {
      title: "Snippet Library",
      url: "#",
      icon: LibraryBig,
    },
    {
      title: "Documentation",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Introduction",
          url: "#",
        },
        {
          title: "Get Started",
          url: "#",
        },
        {
          title: "Tutorials",
          url: "#",
        },
        {
          title: "Changelog",
          url: "#",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Support",
      url: "#",
      icon: LifeBuoy,
    },
    {
      title: "Feedback",
      url: "#",
      icon: Send,
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const currentTheme = localStorage.getItem("theme") || "system";
    setTheme(currentTheme);
  }, [setTheme]);
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <LibraryBig className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">CodeShelf AI</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} setTheme={setTheme} theme={theme || "dark"} />
      </SidebarFooter>
    </Sidebar>
  );
}
