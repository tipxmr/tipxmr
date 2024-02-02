import MaxWidthWrapper from "./MaxWidthWrapper";
import { ThemeToggle } from "./ThemeToggle";

export function Navbar() {
  return (
    <div className="sticky inset-x-0 top-0 z-50 h-16">
      <header className="relative  border-b  border-border bg-background">
        <MaxWidthWrapper>
          <div className="flex h-16 flex-grow items-center">
            <div className="flex lg:ml-0">{/* SiteLogo */}</div>

            <div className="flex flex-grow lg:hidden" />
            {/* MobileNav */}
            <div className="z-50 hidden lg:ml-8 lg:block lg:self-stretch">
              {/* DesktopNav */}
            </div>
            {/* Sign up/Logged in  Menu - may not be needed */}
            <div className="ml-auto flex items-center ">
              <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                <ThemeToggle />
              </div>
            </div>
          </div>
        </MaxWidthWrapper>
      </header>
    </div>
  );
}
