import Link from "next/link";

import FullWalletCreation from "~/components/FullWalletCreation";
import MaxWidthWrapper from "~/components/MaxWidthWrapper";
import { buttonVariants } from "~/components/ui/button";

export default async function RegistrationNewPage() {
  return (
    <MaxWidthWrapper className="my-6">
      <h1 className="mb-2 text-3xl">Register to TipXMR</h1>
      <p>{`You don't need to provide any personal data to use TipXMR.`}</p>
      <FullWalletCreation />
      <Link
        href="/registration"
        className={buttonVariants({ variant: "secondary" })}
      >
        Go back
      </Link>
    </MaxWidthWrapper>
  );
}
