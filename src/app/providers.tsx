import { ThemeProvider } from "next-themes";

import { TooltipProvider } from "@/common/tooltip";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    // Bannerly's brand is cream and maroon, so the site always renders in light mode.
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} forcedTheme="light">
      <TooltipProvider>{children}</TooltipProvider>
    </ThemeProvider>
  );
}
