import { DonationSetting } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import fetchJson from "~/lib/fetchJson";
import useUser from "~/lib/useUser";

type UpdateObject = {
  streamer?: string;
  data: {};
};
const useAddDonationSetting = () => {
  const queryClient = useQueryClient();
  const { user } = useUser();

  return useMutation(
    (donationSetting) => {
      const body = { donationSetting };
      return fetchJson(`/api/donation-settings/${user?.id}`, {
        method: "PUT",
        body,
      });
    },
    {
      onMutate: async (settings: UpdateObject) => {
        await queryClient.cancelQueries(["streamer", user?.name]);
        const previousSettings = queryClient.getQueryData<DonationSetting>([
          "streamer",
          user?.name,
        ]);

        console.log({ settings });

        if (previousSettings) {
          queryClient.setQueryData<DonationSetting>(["streamer", user?.name], {
            ...previousSettings,
          });
        }

        return { previousSettings };
      },
      onError: (err, variables, context) => {
        if (context?.previousSettings) {
          queryClient.setQueryData<DonationSetting>(
            ["streamer", user?.name],
            context.previousSettings
          );
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries(["streamer", user?.name]);
      },
    }
  );
};

export default useAddDonationSetting;
