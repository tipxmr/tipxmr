import { Streamer } from "@prisma/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Router from "next/router";
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

export default function useUser({
  redirectTo = "",
  redirectIfFound = false,
} = {}) {
  const { data: user, error } = useQuery(["user"], fetchUser);

  useEffect(() => {
    if (error) {
      console.warn(error);
    }
  }, [error]);

  const queryClient = useQueryClient();
  const mutation = useMutation(loginUser, {
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
      Router.push(redirectTo);
    }
  }, [user, redirectIfFound, redirectTo]);

  return { user, mutate: mutation.mutate };
}
