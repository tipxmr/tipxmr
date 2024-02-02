import BackButton from "~/components/BackButton";
import UsernameForm from "~/app/registration/username/UsernameForm";

export default async function UsernamePage() {
  return (
    <>
      <UsernameForm />
      <BackButton />
    </>
  );
}
