"use client";

import { useSetAtom } from "jotai";
import { useState } from "react";

import { buildIdentifierHash, open } from "~/lib/xmr";
import { walletAtom } from "~/lib/store";

/* import Textarea from "./Textarea"; */
import { Textarea } from "./ui/textarea";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import { signIn } from "next-auth/react";

const FormSchema = z.object({
  seed: z.string(),
});

const FullWalletInput = () => {
  const setWallet = useSetAtom(walletAtom);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    toast("Logging in & opening wallet...");
    setIsLoading(true);
    const wallet = await open(data.seed);
    const privateViewKey = await wallet.getPrivateViewKey();
    const primaryAddress = await wallet.getPrimaryAddress();
    const id = buildIdentifierHash(privateViewKey, primaryAddress);
    setWallet(wallet);

    await signIn("credentials", { identifierHash: id });
    setIsLoading(false);
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="seed"
            render={({ field }) => (
              <FormItem>
                <FormLabel></FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="your seed goes here"
                    className="h-24 font-mono"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Your seed for the streamer wallet on TipXMR
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={isLoading} variant="default" type="submit">
            Log in
          </Button>
        </form>
      </Form>
    </>
  );
};

export default FullWalletInput;
