"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "~/components/ui/button";

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();

  if (resolvedTheme === "dark")
    return (
      <Button variant="outline" onClick={() => setTheme("light")}>
        <Sun />
      </Button>
    );

  if (resolvedTheme === "light")
    return (
      <Button variant="outline" onClick={() => setTheme("dark")}>
        <Moon />
      </Button>
    );
}
