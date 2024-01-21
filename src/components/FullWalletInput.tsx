"use client";

import { Streamer } from "@prisma/client";
import { useSetAtom } from "jotai";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { seedWordCount } from "~/lib/regex";
import { buildIdentifierHash, open } from "~/lib/xmr";
import { walletAtom } from "~/lib/store";

/* import Textarea from "./Textarea"; */
import { ShellIcon } from "lucide-react";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
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

const FormSchema = z.object({
  seed: z.string(),
});

interface FullWalletFormValues {
  seed: string;
}

interface FullWalletInputProps {
  login: (id: Streamer["id"]) => void;
}

const FullWalletInput = ({ login }: FullWalletInputProps) => {
  const setWallet = useSetAtom(walletAtom);
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    toast("Submitted values");
    if (!form.formState.isValid) return;
    setIsLoading(true);
    const wallet = await open(data.seed);
    const privateViewKey = await wallet.getPrivateViewKey();
    const primaryAddress = await wallet.getPrimaryAddress();
    console.log(
      "primaryAddress, privateViewKey:",
      primaryAddress,
      privateViewKey,
    );
    const id = buildIdentifierHash(privateViewKey, primaryAddress);
    signIn(id);
    setWallet(wallet);
    setIsLoading(false);
    return wallet;
  }

  const signIn = (id: string) => {
    try {
      login(id);
    } catch (reason) {
      console.error("An unexpected error happened:", reason);
    }
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-2/3 space-y-6"
        >
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
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </>
  );
};

export default FullWalletInput;
