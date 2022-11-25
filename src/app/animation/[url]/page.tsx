import DonationAnimation from "~/components/DonationAnimation";
import prisma from "~/lib/prisma";

interface Props {
  params: {
    url: string;
  };
}

async function Animation({ params }: Props) {
  const { url } = params;

  const animationSettings = await prisma.donationSetting.findFirstOrThrow({
    where: { url: url },
  });

  const animationProps = animationSettings;

  return (
    <div className="max-w-md bg-transparent">
      <DonationAnimation {...animationProps} />
    </div>
  );
}

export default Animation;
