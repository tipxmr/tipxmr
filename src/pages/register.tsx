import { NextPage } from "next";
import { useAtom } from "jotai"
import { useState, useEffect, FormEvent } from "react"
import { Register } from "~/components"
import { createWallet, getMnemonicHash } from "~/lib/xmr"
import { walletAtom } from "~/store"

const Home: NextPage = () => {
    const [seedLang, setSeedLang] = useState("English")
    const [newWallet, setNewWallet] = useAtom(walletAtom)
    const [seedPhrase, setSeedPhrase] = useState("")

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const data = new FormData(event.currentTarget);
        const understood = data.get('understood')
        if (!understood) {
            alert("Sorry, you must agree to proceed")
            return
        }

        // TODO create a new streamer in the tipxmr db with this
        const truncatedHashedSeed = getMnemonicHash(seedPhrase).slice(0, 11)

        // TODO navigate the streamer to the login
    }


    useEffect(() => {
        const walletCreator = async (seedLang: string) => {
            const seed = await createWallet(seedLang)
            setSeedPhrase(seed)
        }
        walletCreator(seedLang)

    }, [seedLang])


    // TODO when the seed language changes, a new seed should be generated
    // TODO prepare the handeling for submit (ie. open the wallet with the seed, create a new streamer entry in the db, log the streamer in)

    return (
        <Register
            seedLang={seedLang}
            setSeedLang={setSeedLang}
            handleSubmit={handleSubmit}
            seedPhrase={seedPhrase}
            setSeedPhrase={setSeedPhrase}
        />
    )
}

export default Home
