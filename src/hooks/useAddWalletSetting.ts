import type { Wallet } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

import useUser from "~/lib/useUser";

const useAddWalletSetting = () => {
  const queryClient = useQueryClient();
  const { user } = useUser();
  return useMutation({
    mutationFn: (walletSettings: Partial<Wallet>) =>
      axios.put(`/api/wallet/${user?.id}`, walletSettings),

    onMutate: async (settings: Partial<Wallet>) => {
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
