import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "pages/api/auth/[...nextauth]";

export async function useSession() {
  const session = await unstable_getServerSession(authOptions);
  return session;
}
