import type { Wallet } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

import useUser from "~/lib/useUser";

const useAddWalletSetting = () => {
  const queryClient = useQueryClient();
  const { user } = useUser();
  return useMutation<Wallet, AxiosError, Partial<Wallet>>({
    mutationFn: (walletSettings) =>
      axios
        .put(`/api/wallet/${user?.id}`, walletSettings)
        .then((res) => res.data),

    onMutate: async (settings) => {
      await queryClient.cancelQueries(["streamer", user?.id]);
      const previousSettings = queryClient.getQueryData<Wallet>([
        "streamer",
        user?.id,
      ]);

      console.log(`mutated wallet settings`, { settings });

      if (previousSettings) {
        queryClient.setQueryData<Wallet>(["streamer", user?.id], {
          ...previousSettings,
        });
      }

      return { previousSettings };
    },
    onError: (err) => {
      console.error(err);
    },
    onSuccess(data, variables, context) {
      queryClient.invalidateQueries(["streamer", user?.id]);
    },
  });
};

export default useAddWalletSetting;
