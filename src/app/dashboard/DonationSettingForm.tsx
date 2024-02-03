"use client";

import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "~/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Button } from "~/components/ui/button";
import { api } from "~/trpc/react";
import { Separator } from "~/components/ui/separator";
import { Streamer } from "@prisma/client";
import { toast } from "sonner";
import { UpdateDonationSetting } from "~/schemas";

const FormSchema = UpdateDonationSetting;

interface Props {
  streamerId: Streamer["id"];
}
const DonationSettingForm = ({ streamerId }: Props) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });
  const { mutate, isLoading } = api.donationSetting.update.useMutation({
    onSuccess: async () => {
      toast("Successfully updated donation settings");
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    mutate({ ...data, id: streamerId });
  }

  return (
    <div className="rounded-md border border-border p-4">
      <h2 className="text-right text-xl font-semibold tracking-tight">
        Donation settings
      </h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="secondPrice"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price per second of showtime</FormLabel>
                <FormControl>
                  <Input defaultValue={field.value} type="number" {...field} />
                </FormControl>
                <FormDescription>
                  You can set the showtime second price. Donators can select how
                  long their message should show. 0 disables this functionality.
                  Messages will be then shown for 5 seconds.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Separator className="my-2" />

          <FormField
            control={form.control}
            name="charPrice"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price per character</FormLabel>
                <FormControl>
                  <Input defaultValue={field.value} type="number" {...field} />
                </FormControl>
                <FormDescription>
                  You can set an price per character in the donation message. 0
                  disables this functionality, then donators can send messages
                  as long as the set with the "Character limit"
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Separator className="my-2" />
          <FormField
            control={form.control}
            name="charLimit"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Character limit</FormLabel>
                <FormControl>
                  <Input defaultValue={field.value} type="number" {...field} />
                </FormControl>
                <FormDescription>
                  Set a maximum message length here. If set to 0, the default
                  value is 140.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Separator className="my-2" />
          <FormField
            control={form.control}
            name="minAmount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Minimum donation amount</FormLabel>
                <FormControl>
                  <Input defaultValue={field.value} type="number" {...field} />
                </FormControl>
                <FormDescription>
                  Set a minimum donation amount. For donation messages to be
                  shown in the stream they have to be higher than this
                  threshold. If used in combination with other prices (charPrice
                  or secondPrice) this value serves as a lower bound, meaning
                  all donations will cost this amount at a minimum.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Separator className="my-2" />
          <FormField
            control={form.control}
            name="gifsMinAmount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Minimum donation amount for gifs</FormLabel>
                <FormControl>
                  <Input defaultValue={field.value} type="number" {...field} />
                </FormControl>
                <FormDescription>
                  The amount a user has to pay at a minimum to send a gif to the
                  stream. Currently, this is still a pipedream.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Separator className="my-2" />
          <FormField
            control={form.control}
            name="goal"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Goal amount</FormLabel>
                <FormControl>
                  <Input defaultValue={field.value} type="number" {...field} />
                </FormControl>
                <FormDescription>
                  Set a goal amount for the stream. All donations will count
                  toward the goal amount. This will also show a constant
                  progress bar for you to include in the stream.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Separator className="my-2" />
          <FormField
            control={form.control}
            name="size"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Animation size</FormLabel>
                <FormControl>
                  <Input defaultValue={field.value} type="number" {...field} />
                </FormControl>
                <FormDescription>
                  How big the animation should be. Not sure if we need this.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Separator className="my-2" />
          <div className="flex flex-1 justify-center">
            <Button disabled={isLoading} variant="default" type="submit">
              Update settings
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default DonationSettingForm;
