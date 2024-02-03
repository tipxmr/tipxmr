import MaxWidthWrapper from "~/components/MaxWidthWrapper";
import LoginForm from "~/app/login/LoginForm";
import { getServerAuthSession } from "~/server/auth";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const session = await getServerAuthSession();
  if (session?.user?.id) redirect("/dashboard");

  return (
    <MaxWidthWrapper className="my-6">
      <h1 className="tip-h1 mb-2">Login to TipXMR</h1>
      <p>{`You don't need to provide any personal data to use TipXMR.`}</p>

      <MaxWidthWrapper className="flex flex-col items-center justify-center py-8">
        <LoginForm />
      </MaxWidthWrapper>
    </MaxWidthWrapper>
  );
}
