import type { DonationSetting } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

import useUser from "~/lib/useUser";

const useAddDonationSetting = () => {
  const queryClient = useQueryClient();
  const { user } = useUser();

  return useMutation<DonationSetting, AxiosError, Partial<DonationSetting>>({
    mutationFn: (donationSetting) =>
      axios
        .put(`/api/donation-settings/${user?.id}`, donationSetting)
        .then((res) => res.data),

    onMutate: async (donationSetting) => {
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
    onError: (err) => {
      console.error(err);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["streamer", user?.name]);
    },
  });
};

export default useAddDonationSetting;
