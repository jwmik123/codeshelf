"use client";

import * as React from "react";
import {
  EyeIcon,
  Frame,
  LibraryBig,
  LifeBuoy,
  Languages,
  Map,
  PieChart,
  PlusCircle,
  Scissors,
  Send,
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
      title: "AllSnippets",
      url: "/snippets",
      icon: Scissors,
      isActive: true,
    },
    {
      title: "My Snippets",
      url: "/user-snippets",
      icon: Scissors,
      isActive: true,
      items: [
        {
          title: "Add Snippet",
          icon: PlusCircle,
          url: "/",
        },
        {
          title: "View My Snippets",
          icon: EyeIcon,
          url: "/user-snippets",
        },
      ],
    },
    {
      title: "Language",
      isActive: true,
      url: "#",
      icon: Languages,
      items: [
        {
          title: "JavaScript",

          url: "/snippets?language=javascript",
        },
        {
          title: "Python",

          url: "/snippets?language=python",
        },
        {
          title: "Go",

          url: "/snippets?language=go",
        },
        {
          title: "Rust",

          url: "/snippets?language=rust",
        },
        {
          title: "Java",

          url: "/snippets?language=java",
        },
        {
          title: "C#",

          url: "/snippets?language=csharp",
        },
        {
          title: "C++",

          url: "/snippets?language=cpp",
        },
      ],
    },
    {
      title: "Shelf",
      url: "#",
      icon: LibraryBig,
      items: [
        {
          title: "Algorithms",
          url: "#",
        },
        {
          title: "Data Structures",
          url: "#",
        },
        {
          title: "Web Development",
          url: "#",
        },
        {
          title: "Machine Learning",
          url: "#",
        },
        {
          title: "AI",
          url: "#",
        },
      ],
    },
    // {
    //   title: "Settings",
    //   url: "#",
    //   icon: Settings2,
    //   items: [
    //     {
    //       title: "General",
    //       url: "#",
    //     },
    //     {
    //       title: "Team",
    //       url: "#",
    //     },
    //     {
    //       title: "Billing",
    //       url: "#",
    //     },
    //     {
    //       title: "Limits",
    //       url: "#",
    //     },
    //   ],
    // },
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
              <a href="/">
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
