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

const FormSchema = z.object({
  url: z
    .string()
    .max(100, { message: "Maximum 100 characters allowed" })
    .optional(),
  platform: z
    .enum(["youtube", "twitch", "chaturbate", "selfhosted"])
    .optional(),
  language: z.enum(["english", "german", "french", "italian"]).optional(),
});

interface Props {
  streamerId: Streamer["id"];
}
const StreamForm = ({ streamerId }: Props) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });
  const { mutate, isLoading } = api.stream.update.useMutation({
    onSuccess: async () => {
      toast("Successfully updated stream settings");
    },
    onError: async (error) => {
      console.error(error);
      toast("Something went wrong!");
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    mutate({ ...data, id: streamerId });
  }

  return (
    <div className="rounded-md border border-border p-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="url"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your stream URL</FormLabel>
                <FormControl>
                  <Input placeholder="https://..." {...field} />
                </FormControl>
                <FormDescription>
                  The URL where your stream is viewable
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Separator className="my-2" />
          <FormField
            control={form.control}
            name="language"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Stream language</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select the language" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="english">English</SelectItem>
                    <SelectItem value="german">German</SelectItem>
                    <SelectItem value="italian">Italian</SelectItem>
                    <SelectItem value="french">French</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  What language is spoken on your stream
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Separator className="my-2" />
          <FormField
            control={form.control}
            name="platform"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your stream platform</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select the platform" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="youtube">YouTube</SelectItem>
                    <SelectItem value="twitch">Twitch</SelectItem>
                    <SelectItem value="chaturbate">Chaturbate</SelectItem>
                    <SelectItem value="selfhosted">Selfhosted</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>Where do you stream?</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button disabled={isLoading} variant="default" type="submit">
            Update settings
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default StreamForm;
