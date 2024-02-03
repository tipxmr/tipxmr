import Image from "next/image";
import Link from "next/link";
import React from "react";
import MaxWidthWrapper from "~/components/MaxWidthWrapper";
import { ThemeToggle } from "~/components/ThemeToggle";
import { buttonVariants } from "~/components/ui/button";
import { getServerAuthSession } from "~/server/auth";
import { AspectRatio } from "./ui/aspect-ratio";
import MobileNav from "./MobileNav";
import DesktopNav from "./DesktopNav";

export async function Navbar() {
  const session = await getServerAuthSession();

  return (
    <div className="sticky inset-x-0 top-0 z-50 h-16">
      <header className="relative  border-b  border-border bg-background">
        <MaxWidthWrapper>
          <div className="flex h-16 flex-grow items-center">
            <div className="flex md:flex-1 lg:ml-0 lg:flex-shrink">
              <Link href="/" className={buttonVariants({ variant: "link" })}>
                <div className="w-[110px] md:w-[220px]">
                  <AspectRatio ratio={5 / 1}>
                    <Image
                      src="/logo.png"
                      alt="TipXMR logo"
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 50px) 50vw, 33vw"
                    />
                  </AspectRatio>
                </div>
              </Link>
            </div>
            {/* MobileNav */}
            <MobileNav user={session?.user} />
            <DesktopNav user={session?.user} />
            <div className="z-50 hidden lg:ml-8 lg:block lg:self-stretch">
              {/* DesktopNav */}
            </div>
            {/* Sign up/Logged in  Menu - may not be needed */}
            <div className="ml-auto flex items-center ">
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
