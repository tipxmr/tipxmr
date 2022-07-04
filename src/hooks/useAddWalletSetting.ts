import { Wallet } from "@prisma/client";
import { useMutation, useQueryClient } from "react-query";
import fetchJson from "~/lib/fetchJson";
import useUser from "~/lib/useUser";

type UpdateObject = {
  streamer?: string;
  data: {};
};
const useAddWalletSetting = () => {
  const queryClient = useQueryClient();
  const { user } = useUser();
  return useMutation(
    (walletSettings) => {
      const body = { walletSettings };
      return fetchJson(`/api/wallet/settings/update/${user?.id}`, {
        method: "POST",
        body,
      });
    },
    {
      onMutate: async (settings: UpdateObject) => {
        await queryClient.cancelQueries(["streamer", user?.id]);
        const previousSettings = queryClient.getQueryData<Wallet>([
          "streamer",
          user?.id,
        ]);

        console.log({ settings });

        if (previousSettings) {
          queryClient.setQueryData<Wallet>(["streamer", user?.id], {
            ...previousSettings,
          });
        }

        return { previousSettings };
      },
      onError: (err, variables, context) => {
        if (context?.previousSettings) {
          queryClient.setQueryData<Wallet>(
            ["streamer", user?.id],
            context.previousSettings
          );
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries(["streamer", user?.id]);
      },
    }
  );
};

export default useAddWalletSetting;
