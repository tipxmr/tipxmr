"use client";

import { type Streamer } from "@prisma/client";
import { UpdateIcon } from "@radix-ui/react-icons";
import { useSetAtom } from "jotai";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";

import { primaryStagenetAddress } from "~/lib/regex";
import { walletAtom } from "~/lib/store";
import { buildIdentifierHash, createViewOnlyWallet } from "~/lib/xmr";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const FormSchema = z.object({
  primaryAddress: z.string(),
  privateViewKey: z.string(),
});

interface ViewWalletInputProps {
  login: (id: Streamer["id"]) => void;
}

const ViewWalletInput = ({ login }: ViewWalletInputProps) => {
  const setWallet = useSetAtom(walletAtom);
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const signIn = (id: string) => {
    try {
      login(id);
    } catch (reason) {
      console.error("An unexpected error happened:", reason);
    }
  };

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    if (!form.formState.isValid) return;
    setIsLoading(true);
    const wallet = await createViewOnlyWallet(
      data.privateViewKey,
      data.primaryAddress,
    );
    const privateViewKey = await wallet.getPrivateViewKey();
    const primaryAddress = await wallet.getPrimaryAddress();
    const id = buildIdentifierHash(privateViewKey, primaryAddress);
    signIn(id);
    setWallet(wallet);
    setIsLoading(false);
    return wallet;
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-2/3 space-y-6"
        >
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
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </>
  );
};

export default ViewWalletInput;
