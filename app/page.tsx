"use client";

import { useEffect } from "react";
import { useTheme } from "next-themes";

import { Card } from "@/components/ui/card";
import SnippetForm from "./components/SnippetForm";
import Search from "./components/Search";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";

import { SidebarProvider } from "@/components/ui/sidebar";
import { SidebarInset } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { AppSidebar } from "@/components/app-sidebar";

import "react-toastify/dist/ReactToastify.css";

export default function Dashboard() {
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const currentTheme = localStorage.getItem("theme") || "system";
    setTheme(currentTheme);
  }, [setTheme]);

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 justify-between items-center w-full gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <div className="relative w-72 ">
              <Search />
            </div>
          </div>

          <div className="flex items-center gap-2 px-4">
            <Button size="sm">
              <PlusIcon className="w-4 h-4" />
              Add snippet
            </Button>
          </div>
        </header>
        <div className="flex h-screen bg-background text-foreground">
          <div className="flex-1 overflow-y-auto">
            <div className="p-8">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold">
                  Welcome back Jo&euml;l! 👋
                </h2>
              </div>
              {/* Create new snippet form */}
              <Card className="flex flex-col gap-4 p-4">
                <SnippetForm theme={(theme as "light" | "dark") || "dark"} />
              </Card>

              {/* Your pinned snippets */}
              {/* <div className="my-8">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-semibold">Popular snippets</h2>
                  <Button variant="outline" size="sm">
                    <PencilIcon className="w-4 h-4 mr-2" />
                    Edit pins
                  </Button>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
