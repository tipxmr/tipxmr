import Link from "next/link";
import MaxWidthWrapper from "~/components/MaxWidthWrapper";
import { buttonVariants } from "~/components/ui/button";

export default async function Home() {
  return (
    <MaxWidthWrapper>
      <div className="my-8 flex flex-col items-center justify-center  tracking-tighter">
        <h1 className="text-6xl font-bold text-primary">
          Tip<span className="text-muted-foreground">XMR</span>
        </h1>
        <p className="text-muted-foreground">Monero-tize your stream!</p>
      </div>
      <div className="flex flex-col">
        <Link href="/streams" className={buttonVariants({ variant: "link" })}>
          See who&apos;s streaming &rarr;
        </Link>
      </div>
    </MaxWidthWrapper>
  );
}
