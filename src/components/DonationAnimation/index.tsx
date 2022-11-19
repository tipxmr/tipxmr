"use client"
import { DonationSetting } from "@prisma/client"
import useUser from "~/lib/useUser"

function DonationAnimation(props: DonationSetting) {
    const { user } = useUser()
    console.log({ user })
    return (<div>

        <h2> Here is a Animation url: {props.url}</h2>

        <p>{props.goalReached} goal reached</p>
        <p>{props.charLimit} charlimit</p>
    </div>)

}

export default DonationAnimation
