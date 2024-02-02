import { Streamer } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

import useUser from "~/lib/useUser";

type NewUserData = Pick<Streamer, "id" | "alias" | "name">;

export default function useCreateUser() {
  const { login } = useUser({
    redirectIfFound: true,
    redirectTo: "/dashboard",
  });

  return useMutation<Streamer, AxiosError, NewUserData>({
    mutationFn: ({ id, alias, name }) =>
      axios.post(`/api/streamer`, { id, alias, name }).then((res) => res.data),
    onSuccess: async ({ id }) => {
      login(id);
    },
  });
}
