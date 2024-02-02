import BackButton from "~/components/BackButton";
import MaxWidthWrapper from "~/components/MaxWidthWrapper";

import ViewWalletInput from "~/components/ViewWalletInput";

export default async function RegistrationViewOnlyWalletPage() {
  return (
    <MaxWidthWrapper className="my-6">
      <h1 className="mb-2 text-3xl">Register to TipXMR</h1>
      <p>{`You don't need to provide any personal data to use TipXMR.`}</p>
      <ViewWalletInput />
      <BackButton />
    </MaxWidthWrapper>
  );
}
