import Link from "next/link";
import MaxWidthWrapper from "~/components/MaxWidthWrapper";
import { ThemeToggle } from "~/components/ThemeToggle";
import { getServerAuthSession } from "~/server/auth";
import { buttonVariants } from "~/components/ui/button";
import LogoutButton from "~/components/LogoutButton";

export async function Navbar() {
  const session = await getServerAuthSession();

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
              <Link href="/" className={buttonVariants({ variant: "link" })}>
                Home
              </Link>
              {!session?.user?.id ? (
                <>
                  <Link
                    href="/login"
                    className={buttonVariants({ variant: "link" })}
                  >
                    Login
                  </Link>

                  <Link
                    href="/registration"
                    className={buttonVariants({ variant: "link" })}
                  >
                    Sign up
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    href="/dashboard"
                    className={buttonVariants({ variant: "link" })}
                  >
                    Dashboard
                  </Link>
                  <LogoutButton />
                </>
              )}
              <div className="ml-4 hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                <ThemeToggle />
              </div>
            </div>
          </div>
        </MaxWidthWrapper>
      </header>
    </div>
  );
}
