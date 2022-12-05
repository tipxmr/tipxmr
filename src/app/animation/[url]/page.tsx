import DonationAnimation from "~/components/DonationAnimation";
import prisma from "~/lib/prisma";

interface AnimationProps {
  params: {
    url: string;
  };
}

const donationList = [
  {
    amount: 2,
    message: "You are doing great",
    donor: "Satoshi Nakamoto",
    displayTimeSeconds: 3,
    giphyUrl: "",
  },
];

async function Animation({ params }: AnimationProps) {
  const animationSettings = await prisma.donationSetting.findFirstOrThrow({
    where: { url: params.url },
  });

  return (
    <div className="bg-transparent">
      <DonationAnimation donations={donationList} {...animationSettings} />
    </div>
  );
}

export default Animation;
