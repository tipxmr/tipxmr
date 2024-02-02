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
import useUser from "~/lib/useUser";
import { signIn } from "next-auth/react";

const FormSchema = z.object({
  seed: z.string(),
});

const FullWalletInput = () => {
  const { login } = useUser({
    redirectTo: "/dashboard",
    redirectIfFound: true,
  });

  const setWallet = useSetAtom(walletAtom);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log({ form, data, isValid: form.formState.isValid });
    /* if (!form.formState.isValid) return; */
    toast("Submitted values");
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
    setWallet(wallet);

    const res = await signIn("credentials", { identifierHash: id });
    console.log({ res });
    setIsLoading(false);
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
