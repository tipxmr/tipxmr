import { NextPage } from "next";
import { useState, useEffect } from "react"
import { Register } from "~/components"
import { createWallet } from "~/lib/xmr"

const Home: NextPage = () => {
    const [seedLang, setSeedLang] = useState("English")
    const [seedPhrase, setSeedPhrase] = useState("")
    const handleSubmit = () => { }
    // TODO generate a seed with the provided seed language

    /* useEffect(() => {

* }, [seedLang])

 */
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
