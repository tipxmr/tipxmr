import { useMutation } from "react-query";
import { Streamer } from "@prisma/client";
import fetchJson, { FetchError } from "~/lib/fetchJson";
import useUser from "~/lib/useUser";

type NewUserData = Pick<Streamer, "id" | "alias" | "name">;

async function createStreamer({ id, alias, name }: NewUserData) {
  return fetchJson<Streamer>(`/api/streamer`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      id,
      name,
      alias,
    }),
  });
}

export default function useCreateUser() {
  const { user, mutate: mutateUser } = useUser({
    redirectIfFound: true,
    redirectTo: "/dashboard",
  });

  return useMutation<Streamer, FetchError, NewUserData>(createStreamer, {
    onSuccess: async ({ id }) => {
      await fetchJson(`/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id,
        }),
      });

      mutateUser(id);
    },
  });
}
