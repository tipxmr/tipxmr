import BackButton from "~/components/BackButton";
import MaxWidthWrapper from "~/components/MaxWidthWrapper";
import UsernameForm from "./UsernameForm";
import { getServerAuthSession } from "~/server/auth";

export default async function UsernamePage() {
  const session = getServerAuthSession();

  return (
    <MaxWidthWrapper>
      <h1 className="mb-2 text-3xl">Register to TipXMR in one minute</h1>
      Session: {JSON.stringify(session)}
      <p>You don&apost need to provide any personal data to use TipXMR.</p>
      <UsernameForm />
      <BackButton />
    </MaxWidthWrapper>
  );
}
