import type { Wallet } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import fetchJson from "~/lib/fetchJson";
import useUser from "~/lib/useUser";

type UpdateObject = {
  streamer?: string;
  data: Partial<Wallet>;
};
const useAddWalletSetting = () => {
  const queryClient = useQueryClient();
  const { user } = useUser();
  return useMutation({
    mutationFn: (walletSettings) => {
      const body = { walletSettings };
      return fetchJson(`/api/wallet/${user?.id}`, {
        method: "POST",
        body,
      });
    },

    onMutate: async (settings: UpdateObject) => {
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
    onError: (err, variables, context) => {
      console.error(err);
      if (context?.previousSettings) {
        queryClient.setQueryData<Wallet>(
          ["streamer", user?.id],
          context.previousSettings
        );
      }
    },
    onSuccess(data, variables, context) {
      queryClient.invalidateQueries(["streamer", user?.id]);
    },
  });
};

export default useAddWalletSetting;
