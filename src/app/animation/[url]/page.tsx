import DonationAnimation from "~/components/DonationAnimation";
import prisma from "~/lib/prisma";

interface Props {
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

async function Animation({ params }: Props) {
  const { url } = params;

  const animationSettings = await prisma.donationSetting.findFirstOrThrow({
    where: { url: url },
  });

  const animationProps = animationSettings;

  return (
    <div className="max-w-md bg-transparent">
      <DonationAnimation donations={donationList} {...animationProps} />
    </div>
  );
}

export default Animation;
