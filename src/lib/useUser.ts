import { useEffect } from "react";
import Router from "next/router";
import { useMutation, useQuery, useQueryClient } from "react-query";
import fetchJson from "./fetchJson";
import { User } from "./config";
import { Streamer } from "@prisma/client";

async function fetchUser(): Promise<User> {
  return fetchJson<any>(`/api/user`);
}

async function loginUser(
  id: Streamer["id"] | undefined
): Promise<User> {
  const body = { hash: id };
  return fetchJson<User>("/api/login", {
    method: "POST",
    body,
  });
}

export default function useUser({
  redirectTo = "",
  redirectIfFound = false,
} = {}) {
  const { data: user, error } = useQuery(["user"], fetchUser);
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

  return { user, mutateUser: mutation.mutate };
}
