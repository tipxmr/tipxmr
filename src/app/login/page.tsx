import MaxWidthWrapper from "~/components/MaxWidthWrapper";
import LoginForm from "~/app/login/LoginForm";
import { getServerAuthSession } from "~/server/auth";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const session = await getServerAuthSession();
  if (session?.user?.id) redirect("/dashboard");

  return (
    <MaxWidthWrapper className="my-6">
      <LoginForm />
    </MaxWidthWrapper>
  );
}
