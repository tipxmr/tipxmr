import { useRouter } from "next/navigation";
import { signIn, signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

export default function useUser({
  // redirectTo = "",
  // redirectIfFound = false,
} = {}) {
  const router = useRouter();

  const { data: session } = useSession();

  async function login(identifierHash: string) {
    console.log("signing in in login", identifierHash);
    const response = await signIn("credentials", {
      identifierHash,
      redirect: false,
    });
    console.log("no error: ", response);

    if (response?.error) {
      router.push("/registration/username");
    } else {
      router.push("/dashboard");
    }
  }

  async function logout() {
    await signOut();
  }

  const user = session?.user && {
    isLoggedIn: Boolean(session),
    ...(session?.user ?? {}),
  };

  return {
    user,
    login,
    logout,
  };
}
