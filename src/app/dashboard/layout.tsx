"use client";

import { redirect } from "next/navigation";
import type { ReactNode } from "react";
import { useMemo } from "react";

import useUser from "~/lib/useUser";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const { user } = useUser();

  const isLoggedIn = useMemo(
    () => user?.isLoggedIn ?? false,
    [user?.isLoggedIn]
  );

  if (!isLoggedIn) {
    redirect("/login");
  }

  return children;
}
