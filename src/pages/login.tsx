import { NextPage } from "next";
import { Login } from "~/components"
import { getMnemonicHash } from "~/lib/xmr"

const LoginPage: NextPage = () => {

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const seed = data.get('seed')
        const hashedSeed = getMnemonicHash(seed)
        // eslint-disable-next-line no-console
        console.log({
            hashedSeed,
        });
    };


    return (
        <Login handleSubmit={handleSubmit} />
    )
}

export default LoginPage
