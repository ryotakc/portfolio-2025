import { unstable_ViewTransition as ViewTransition } from "react";
import { Analytics } from "@vercel/analytics/react";
import NavbarWrapper from "@/components/navbar-wrapper";
import { ModeToggle } from "@/components/mode-toggle";
import { LanguageToggle } from "@/components/language-toggle";

export default function SidebarSiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar Area */}
      <aside className="hidden lg:flex flex-col w-64 border-r border-rurikon-border dark:border-rurikon-border-dark p-6 fixed h-full">
        <div className="mb-8">
            <span className="font-bold text-xl">Leo</span>
        </div>
        <NavbarWrapper />
        <div className="mt-auto flex flex-col gap-4">
             <LanguageToggle />
             <ModeToggle />
        </div>
      </aside>

      {/* Mobile Header (similar to Minimal for now on mobile) */}
       <div className="lg:hidden fixed w-full z-40 bg-background/80 backdrop-blur-md p-4 border-b">
         <NavbarWrapper />
       </div>

      {/* Main Content */}
      <main className="flex-1 lg:ml-64 p-6 lg:p-12 max-w-4xl mx-auto">
         <div className="mt-16 lg:mt-0">
            <ViewTransition name="crossfade">
              {children}
              <Analytics />
            </ViewTransition>
         </div>
      </main>

       <div className="lg:hidden fixed bottom-4 right-4 flex flex-col gap-2 z-50">
          <LanguageToggle />
          <ModeToggle />
       </div>
    </div>
  );
}
