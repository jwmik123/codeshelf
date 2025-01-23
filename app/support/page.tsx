import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset } from "@/components/ui/sidebar";

import { SidebarProvider } from "@/components/ui/sidebar";

export default function Support() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div className="min-h-screen flex flex-col justify-center items-center">
          <div className="bg-primary-foreground text-secondary-foreground p-8 rounded-lg shadow-sm max-w-md w-full mx-4">
            <h1 className="text-2xl font-semibold  text-center mb-6">
              Codeshelf Support
            </h1>
            <div className="text-center ">
              For assistance, please contact us at:
              <a
                href="mailto:support@codeshelf.app"
                className="block mt-2 text-blue-600 hover:text-blue-800 font-medium"
              >
                support@codeshelf.app
              </a>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
