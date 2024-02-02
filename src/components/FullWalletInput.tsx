"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useSetAtom } from "jotai";
import { LightbulbIcon } from "lucide-react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { walletAtom } from "~/lib/store";
import { buildIdentifierHash, open } from "~/lib/xmr";
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
import { Textarea } from "~/components/ui/textarea";

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
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col items-center justify-center space-y-6"
        >
          <FormField
            control={form.control}
            name="seed"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xl">Seed Login</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="lopped ladder voyage debut agreed taunts owed oneself linen..."
                    className="h-24 font-mono"
                    {...field}
                  />
                </FormControl>
                <FormDescription className="flex flex-row items-center">
                  <LightbulbIcon
                    className="mr-2 text-destructive-foreground"
                    size={69}
                  />
                  <p>
                    We highly recommend that you use the wallet for TipXMR
                    exclusively for TipXMR and no other business. Entering a
                    seed phrase into a browser is usually considered bad
                    practice and can lead to a compromised seed phrase. <br />{" "}
                    Read more about this in{" "}
                    <Link
                      className="underline hover:text-foreground"
                      href="/setup"
                    >
                      the ideal setup for TipXMR.
                    </Link>
                  </p>
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
