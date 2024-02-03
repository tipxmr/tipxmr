import BackButton from "~/components/BackButton";
import ViewWalletInput from "~/components/ViewWalletInput";
import { Separator } from "~/components/ui/separator";

export default async function RegistrationViewOnlyWalletPage() {
  return (
    <>
      <ViewWalletInput />

      <Separator className="my-4" />
      <BackButton />
    </>
  );
}
