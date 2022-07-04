import { useEffect } from "react";
import Router from "next/router";
import { useMutation, useQuery } from "react-query";
import fetchJson from "./fetchJson";
import { User } from "./config";
import { Streamer } from "@prisma/client";
import useSWR from "swr";

async function fetchUser(): Promise<User> {
  const response = await fetchJson<any>(`/api/user`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  console.log(`response: ${response}\n`);
  return response;
}

async function loginUser(id: Streamer["id"] | undefined): Promise<User> {
  // this was an attempt to get rid of useSWR for everything
  const body = { hash: id };
  const user = await fetchJson<User>("/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  return user;
}

export default function useUser({
  redirectTo = "",
  redirectIfFound = false,
} = {}) {
  const { data: user, mutate: mutateUser } = useSWR<User>("/api/user");
  // const { data: user, error } = useQuery(["user"], () => fetchUser);
  // const mutation = useMutation(loginUser)
  // console.log(`Mutation: `, mutation)

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

  return { user, mutateUser };
}
