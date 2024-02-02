import BackButton from "~/components/BackButton";

import FullWalletInput from "~/components/FullWalletInput";
import MaxWidthWrapper from "~/components/MaxWidthWrapper";

export default async function RegistrationExistingPage() {
  return (
    <MaxWidthWrapper className="my-6">
      <h1 className="mb-2 text-3xl">Register to TipXMR</h1>
      <p>{`You don't need to provide any personal data to use TipXMR.`}</p>
      <FullWalletInput />
      <BackButton />
    </MaxWidthWrapper>
  );
}
