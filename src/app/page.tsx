import Link from "next/link";
import MaxWidthWrapper from "~/components/MaxWidthWrapper";
import { buttonVariants } from "~/components/ui/button";
import { Separator } from "~/components/ui/separator";

export default async function Home() {
  return (
    <MaxWidthWrapper>
      <div className="my-8 flex flex-col items-center justify-center  tracking-tighter">
        <h1 className="text-6xl font-bold text-primary">
          Tip<span className="text-muted-foreground">XMR</span>
        </h1>
        <p className="text-muted-foreground">Monero-tize your stream!</p>
      </div>
      <div>
        <h2 className="text-3xl font-semibold">
          Monero-tize your streams in minutes!
        </h2>
        <p className="text-muted-foreground">
          TipXMR allows you to painlessly integrate Monero in your livestreams.
          Your viewers can send messages to be displayed directly in your OBS
          video feed!
        </p>
        <Separator className="my-8" />
        <h3 className="mb-2 text-xl font-semibold">How it works:</h3>
        <ul className="list-decimal space-y-4">
          <li>
            <span className="font-semibold">Create your TipXMR account:</span>{" "}
            In a few clicks you can generate a new wallet directly in your
            browser and use it to create your TipXMR account.
          </li>
          <li>
            <span className="font-semibold">Pick your payment plan:</span> Pick
            between the cheap basic plan of the fully featured premium plan.
            Then pay the invoice to activate your account.
          </li>
          <li>
            <span className="font-semibold">Configure OBS:</span> Once your
            account is activated you can simply include your animation URL into
            your OBS video. This URL will display the incoming donations.
          </li>
          <li>
            <span className="font-semibold">🎉 Profit:</span> That&apos;s it.
            It&apos;s that simple.
          </li>
        </ul>
      </div>
      <div className="mt-6 flex flex-col">
        <Link href="/streams" className={buttonVariants({ variant: "link" })}>
          See who&apos;s streaming &rarr;
        </Link>
      </div>
    </MaxWidthWrapper>
  );
}
