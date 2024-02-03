"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useSetAtom } from "jotai";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

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
import { walletAtom } from "~/lib/store";
import { buildIdentifierHash, createViewOnlyWallet } from "~/lib/xmr";
import { Separator } from "./ui/separator";

const FormSchema = z.object({
  primaryAddress: z.string(),
  privateViewKey: z.string(),
});

const ViewWalletInput = () => {
  const setWallet = useSetAtom(walletAtom);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    toast("Logging in & opening wallet...");
    setIsLoading(true);

    const wallet = await createViewOnlyWallet(
      data.privateViewKey,
      data.primaryAddress,
    );
    const privateViewKey = await wallet.getPrivateViewKey();
    const primaryAddress = await wallet.getPrimaryAddress();
    const id = buildIdentifierHash(privateViewKey, primaryAddress);
    setWallet(wallet);
    await signIn(id);

    setIsLoading(false);
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="primaryAddress"
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
            name="privateViewKey"
            render={({ field }) => (
              <FormItem>
                <FormLabel></FormLabel>
                <FormControl>
                  <Input placeholder="Private view key" {...field} />
                </FormControl>
                <FormDescription>
                  Your private view key for the streamer wallet on TipXMR
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-center">
            {" "}
            <Button disabled={isLoading} variant="default" type="submit">
              Log in
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};

export default ViewWalletInput;
