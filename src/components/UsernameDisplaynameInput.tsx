"use client";

import { useAtomValue } from "jotai";
import { SubmitHandler, useForm } from "react-hook-form";

import useCreateUser from "~/hooks/useCreateUser";
import { truncatedHashIdAtom } from "~/store";

import Input from "./Input";
import Tooltip from "./Tooltip";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

const FormSchema = z.object({
  username: z.string(),
  displayname: z.string(),
});

const UsernameDisplaynameInput = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });
  const createUser = useCreateUser();
  const truncatedHashId = useAtomValue(truncatedHashIdAtom);
  const [isLoading, setIsLoading] = useState(false);

  async function handleAccountCreation(data: z.infer<typeof FormSchema>) {
    if (!form.formState.isValid) return;
    setIsLoading(true);

    createUser.mutate({
      id: truncatedHashId,
      name: data.username,
      alias: data.displayname,
    });
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleAccountCreation)}
          className="mx-auto flex flex-col gap-2"
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel></FormLabel>

                <FormControl>
                  <Input placeholder="primary Address" {...field} />
                </FormControl>
                <FormDescription>
                  Your primaryAddress for the streamer wallet on TipXMR
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="displayname"
            render={({ field }) => (
              <FormItem>
                <FormLabel></FormLabel>

                <FormControl>
                  <Input placeholder="primary Address" {...field} />
                </FormControl>
                <FormDescription>
                  Your primaryAddress for the streamer wallet on TipXMR
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </>
  );
};

export default UsernameDisplaynameInput;

const UsernameTooltip = () => (
  <>
    This name will be used by donators to find you on TipXMR (for example in the
    URL). Your username is unique and cannot be changed later on.
  </>
);

const DisplayTooltip = () => (
  <>
    How your name will be shown on the site. Here you can use 🤠 emojis and also
    tweak it later.
  </>
);
