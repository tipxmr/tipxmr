import type { DonationSetting } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

import useUser from "~/lib/useUser";

const useAddDonationSetting = () => {
  const queryClient = useQueryClient();
  const { user } = useUser();

  return useMutation({
    mutationFn: (donationSetting: Partial<DonationSetting>) =>
      axios.put(`/api/donation-settings/${user?.id}`, donationSetting),

    onMutate: async (donationSetting: Partial<DonationSetting>) => {
      await queryClient.cancelQueries(["streamer", user?.name]);
      const previousSettings = queryClient.getQueryData<DonationSetting>([
        "streamer",
        user?.name,
      ]);

      console.log({ donationSetting });

      if (previousSettings) {
        queryClient.setQueryData<DonationSetting>(["streamer", user?.name], {
          ...previousSettings,
        });
      }

      return { previousSettings };
    },
    onError: (err, variables, context) => {
      console.error(err);
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
  });
};

export default useAddDonationSetting;
