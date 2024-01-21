import BackButton from "~/components/BackButton";
import MaxWidthWrapper from "~/components/MaxWidthWrapper";
import UsernameForm from "./UsernameForm";

export default async function UsernamePage() {
  return (
    <MaxWidthWrapper>
      <h1 className="mb-2 text-3xl">Register to TipXMR in one minute</h1>
      <p>You don't need to provide any personal data to use TipXMR.</p>
      <UsernameForm />
      <BackButton />
    </MaxWidthWrapper>
  );
}
