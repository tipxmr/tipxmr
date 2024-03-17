import CreateStreamerSubaddress from "~/components/CreateStreamerSubaddress";
import MaxWidthWrapper from "~/components/MaxWidthWrapper";
import { api } from "~/trpc/server";

interface Props {
  params: {
    streamerId: string;
  };
}

export default async function StreamerDetailPage({ params }: Props) {
  const streamerDetail = await api.streamer.getById.query({
    id: params.streamerId,
  });
  return (
    <MaxWidthWrapper>
      <>{streamerDetail.alias}</>
      <CreateStreamerSubaddress streamerName={streamerDetail.alias} />
    </MaxWidthWrapper>
  );
}
