import NewDonation from "~/components/NewDonation";
import prisma from "~/lib/prisma";

interface Params {
  name: string;
}

interface Props {
  params: Params;
}

async function DonateTo({ params }: Props) {
  const { name } = params;

  const streamer = await prisma.streamer.findUniqueOrThrow({
    where: {
      name,
    },
  });

  return <NewDonation streamer={streamer} />;
}

export default DonateTo;
