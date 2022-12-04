import { Streamer } from "@prisma/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { User } from "./config";
import fetchJson from "./fetchJson";

async function fetchUser() {
  return fetchJson<User>(`/api/user`);
}

async function loginUser(id?: Streamer["id"]) {
  return fetchJson<User>("/api/login", {
    method: "POST",
    body: { id },
  });
}

async function logoutUser() {
  return fetchJson<User>("/api/logout", {
    method: "POST",
  });
}

export default function useUser({
  redirectTo = "",
  redirectIfFound = false,
} = {}) {
  const router = useRouter();

  const { data: user, error } = useQuery(["user"], fetchUser);

  useEffect(() => {
    if (error) {
      console.warn(error);
    }
  }, [error]);

  const queryClient = useQueryClient();

  const loginMutation = useMutation(loginUser, {
    onSuccess: () => {
      queryClient.invalidateQueries(["user"]);
    },
  });

  const logoutMutation = useMutation(logoutUser, {
    onSuccess: () => {
      queryClient.invalidateQueries(["user"]);
    },
  });

  useEffect(() => {
    // if no redirect needed, just return (example: already on /dashboard)
    // if user data not yet there (fetch in progress, logged in or not) then don't do anything yet
    if (!redirectTo || !user) return;

    if (
      // If redirectTo is set, redirect if the user was not found.
      (redirectTo && !redirectIfFound && !user?.isLoggedIn) ||
      // If redirectIfFound is also set, redirect if the user was found
      (redirectIfFound && user?.isLoggedIn)
    ) {
      router.push(redirectTo);
    }
  }, [user, redirectIfFound, redirectTo, router]);

  return {
    user,
    login: loginMutation.mutate,
    logout: logoutMutation.mutate,
  };
}
