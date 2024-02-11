"use client";
import { useForm } from "react-hook-form";
import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { z } from "zod";
import { api } from "~/trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { truncatedHashIdAtom } from "~/lib/store";
import { useAtomValue } from "jotai";
import { signIn } from "next-auth/react";
import { generateUsername } from "unique-username-generator";

const FormSchema = z.object({
  name: z
    .string()
    .min(4, { message: "Username must be at least 4 characters long" })
    .max(20, { message: "Username cannot be longer than 20 characters" }),

  alias: z
    .string()
    .min(4, { message: "Username must be at least 4 characters long" })
    .max(20, { message: "Username cannot be longer than 20 characters" }),
});

const UsernameForm = () => {
  const truncatedHashId = useAtomValue(truncatedHashIdAtom);
  const randomUsername = generateUsername();

  const { mutate, isLoading, error } = api.streamer.create.useMutation({
    onSuccess: async () => {
      await signIn("credentials", { identifierHash: truncatedHashId });
    },
    onError: () => {
      console.error({ error });
      toast(error?.message);
    },
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: randomUsername,
      alias: randomUsername,
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    if (!truncatedHashId) return;
    mutate({ ...data, id: truncatedHashId });
    toast("Great, hold on a sec, while we create your account!");
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="my-4 flex flex-col justify-center space-y-8 rounded-md border p-4"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Cool-usernamer123" {...field} />
              </FormControl>
              <FormDescription>
                This is your TipXMR specific username. It will be used to
                construct your donation URL.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="alias"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Displayname</FormLabel>
              <FormControl>
                <Input placeholder="Cool-usernamer" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name. This name can also contain
                emojis! 🤠
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isLoading}>
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default UsernameForm;
