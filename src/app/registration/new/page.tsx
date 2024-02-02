import BackButton from "~/components/BackButton";

import FullWalletCreation from "~/components/FullWalletCreation";
import MaxWidthWrapper from "~/components/MaxWidthWrapper";

export default async function RegistrationNewPage() {
  return (
    <MaxWidthWrapper className="my-6">
      <h1 className="mb-2 text-3xl">Register to TipXMR</h1>
      <p>{`You don't need to provide any personal data to use TipXMR.`}</p>
      <FullWalletCreation />
      <BackButton />
    </MaxWidthWrapper>
  );
}
