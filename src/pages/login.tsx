import { NextPage } from "next";
import { Login } from "~/components"
import { getMnemonicHash } from "~/lib/xmr"
import useUser from "~/lib/useUser"
import { useEffect } from "react";
import fetchJson, { FetchError } from "~/lib/fetchJson";
import { useRouter } from "next/router"
import { User } from "./api/user";

const LoginPage: NextPage = () => {
    const { user: session, mutateUser } = useUser()
    const router = useRouter()

    useEffect(() => {
        if (session && session.isLoggedIn) {
            router.push('/dashboard')
        }
    }, [session])


    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const seed = data.get('seed')
        const truncatedHashedSeed = getMnemonicHash(seed).slice(0, 11)
        const body = {
            hash: truncatedHashedSeed,
        };

        try {
            const user = await fetchJson<User>("/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });
            mutateUser(user);
        } catch (reason) {
            if (reason instanceof FetchError) {
                console.error(reason);
            } else {
                console.error("An unexpected error happened:", reason);
            }
        }


    };



    return (
        <Login handleSubmit={handleSubmit} />
    )
}

export default LoginPage
