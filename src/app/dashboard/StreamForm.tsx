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
import { type z } from "zod";
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
import { toast } from "sonner";
import { UpdateStream } from "~/schemas";

const FormSchema = UpdateStream;

const StreamForm = () => {
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
    mutate(data);
  }

  return (
    <div className="rounded-md border border-border p-4">
      <h2 className="text-right text-xl font-semibold tracking-tight">
        Stream settings
      </h2>
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
                  The URL where your stream is viewable. On your public TipXMR
                  stream page we will link to your stream and try to embed the
                  video!
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
                  What language is spoken on your stream. This allows TipXMR
                  donators to discover your stream more easily.
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
                    <SelectItem value="selfhosted">
                      Self-hosted (or other)
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  Where do you stream? If you provide this information it will
                  be easier for us to embed the video. If you are self-hosting
                  your stream, this may not work.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Separator className="my-2" />
          <div className="flex flex-1  justify-center">
            <Button disabled={isLoading} variant="default" type="submit">
              Update stream settings
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default StreamForm;
