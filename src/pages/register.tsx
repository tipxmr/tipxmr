import { NextPage } from "next";
import { useState } from "react"
import Register from "~/components/Register"

const Home: NextPage = () => {
    const [seedLang, setSeedLang] = useState("English")
    const [seedPhrase, setSeedPhrase] = useState("")
    const handleSubmit = () => { }

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
