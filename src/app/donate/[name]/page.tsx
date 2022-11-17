import QrCode from "qrcode";

import NewDonation from "~/components/NewDonation";
import prisma from "~/lib/prisma";
import { createMoneroTransactionUri } from "~/lib/xmr";

async function toQrCode(data: string) {
  return QrCode.toDataURL(data, { scale: 25 });
}

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

  const transactionAddress =
    "46BeWrHpwXmHDpDEUmZBWZfoQpdc6HaERCNmx1pEYL2rAcuwufPN9rXHHtyUA4QVy66qeFQkn6sfK8aHYjA3jk3o1Bv16em";
  const transactionUri = createMoneroTransactionUri({
    address: transactionAddress,
    amount: 239.39014,
    description: "donation",
  });

  const code = await toQrCode(transactionUri);

  return <NewDonation streamer={streamer} code={code} />;
}

export default DonateTo;
