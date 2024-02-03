import Image from "next/image";
import Link from "next/link";
import MaxWidthWrapper from "~/components/MaxWidthWrapper";
import { AspectRatio } from "~/components/ui/aspect-ratio";
import { buttonVariants } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { api } from "~/trpc/server";

export default async function StreamsPage() {
  const onlineStreamers = await api.streamer.online.query();
  return (
    <MaxWidthWrapper className="my-6">
      <h1 className="tip-h1">Currently streaming</h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {onlineStreamers.map((streamer) => (
          <div className="" key={streamer.id}>
            <Card>
              <CardHeader>
                <AspectRatio ratio={16 / 9} className="rounded-md">
                  <Image
                    src="https://via.placeholder.com/350x200.png"
                    className="rounded-md object-contain"
                    alt={`${streamer.alias}-thumbnail`}
                    fill
                  />
                </AspectRatio>
                <CardTitle>{streamer.name}</CardTitle>
                <CardDescription>{streamer.stream?.category}</CardDescription>
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
