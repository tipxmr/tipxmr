import { redirect } from "next/navigation";
import MaxWidthWrapper from "~/components/MaxWidthWrapper";
import { getServerAuthSession } from "~/server/auth";

export default async function RegistrationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerAuthSession();
  if (session?.user?.id) redirect("/dashboard");

  return (
    <MaxWidthWrapper className="mt-6">
      <h1 className="tip-h1 mb-2">Register to TipXMR</h1>
      <p>{`You don't need to provide any personal data to use TipXMR.`}</p>
      {children}
    </MaxWidthWrapper>
  );
}
