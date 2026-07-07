import { type ReactNode } from "react";
import ProfileHeader from "./ProfileHeader";
import { siteConfig } from "@/data/content";

const PageShell = ({ children }: { children: ReactNode }) => (
  <div className="min-h-screen bg-background">
    <div className="mx-auto max-w-[720px] px-6">
      <ProfileHeader />
      <main>{children}</main>
      <footer className="mt-20 py-10 border-t border-border/60">
        <p className="text-[12px] text-muted-foreground/50">
          &copy; {new Date().getFullYear()} {siteConfig.name}
        </p>
      </footer>
    </div>
  </div>
);

export default PageShell;
