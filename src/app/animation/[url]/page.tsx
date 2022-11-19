import DonationAnimation from "~/components/DonationAnimation"
import prisma from "~/lib/prisma"

interface Props {
    params: {
        url: string;
    }
}

async function Animation({ params }: Props) {
    const { url } = params

    const animationSettings = await prisma.donationSetting.findFirstOrThrow({ where: { url: url } })

    return (<>
        <DonationAnimation {...animationSettings} />
    </>)
}

export default Animation
