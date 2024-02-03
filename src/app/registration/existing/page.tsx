import BackButton from "~/components/BackButton";
import FullWalletInput from "~/components/FullWalletInput";
import { Separator } from "~/components/ui/separator";

export default async function RegistrationExistingPage() {
  return (
    <>
      <FullWalletInput />
      <Separator className="my-4" />
      <BackButton />
    </>
  );
}
