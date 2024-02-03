import Link from "next/link";
import MaxWidthWrapper from "~/components/MaxWidthWrapper";
import { buttonVariants } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { api } from "~/trpc/server";

export default async function StreamsPage() {
  const onlineStreamers = await api.streamer.online.query();
  return (
    <MaxWidthWrapper className="my-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {onlineStreamers.map((streamer) => (
          <div className="" key={streamer.id}>
            <Card>
              <CardHeader>
                <CardTitle>{streamer.name}</CardTitle>
              </CardHeader>
              <CardContent></CardContent>
              <CardFooter>
                <Link
                  href={`/streams/${streamer.id}`}
                  className={buttonVariants({ variant: "link" })}
                >
                  Watch stream & donate &rarr;
                </Link>
              </CardFooter>
            </Card>
          </div>
        ))}
      </div>
    </MaxWidthWrapper>
  );
}
