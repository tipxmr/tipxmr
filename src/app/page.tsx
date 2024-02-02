import Link from "next/link";
import MaxWidthWrapper from "~/components/MaxWidthWrapper";
import { buttonVariants } from "~/components/ui/button";

export default async function Home() {
  return (
    <MaxWidthWrapper>
      <div className="my-8 flex flex-col items-center justify-center  tracking-tighter">
        <h1 className="text-6xl font-bold text-primary">TipXMR</h1>
        <p className="text-muted-foreground">
          Monetize your streams with Monero!
        </p>
      </div>
      <div className="flex flex-col">
        <Link href="/overview" className={buttonVariants({ variant: "link" })}>
          See who&apos;s streaming &rarr;
        </Link>

        <Link href="/donate" className={buttonVariants({ variant: "link" })}>
          Want to donate? Follow me &rarr;
        </Link>
      </div>
    </MaxWidthWrapper>
  );
}
