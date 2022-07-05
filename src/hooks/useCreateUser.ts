import { useMutation } from "react-query";
import { Streamer } from "@prisma/client";
import fetchJson, { FetchError } from "~/lib/fetchJson";
import { User } from "~/lib/config";
import useUser from "~/lib/useUser";

type NewUserData = Pick<Streamer, "id" | "alias" | "name">;

async function createUser({
  id,
  alias,
  name,
}: NewUserData): Promise<User> {
  return fetchJson<{
    streamer: User;
  }>(`/api/streamer`, {
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
  const { user, mutateUser } = useUser({
    redirectIfFound: true,
    redirectTo: "/dashboard",
  });

  return useMutation<User, FetchError, NewUserData>(
    (newUser) => {
      return createUser(newUser);
    },
    {
      onSuccess: async ({ id }) => {
        await fetchJson(`/api/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            hash: id,
          }),
        });

        mutateUser(id);
      },
    }
  );
}
