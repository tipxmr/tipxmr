"use client";

import { Streamer } from "@prisma/client";
import type {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import HorizontalCenter from "~/components/helper/HorizontalCenter";
import HeroUnit from "~/components/HeroUnit";
import InfoCard from "~/components/InfoCard";
import IsOnlineBadge from "~/components/IsOnlineBadge";
import LanguageSelector from "~/components/LanguageSelector";
import { getStreamers } from "~/lib/db/streamer";

type Modify<T, R> = Omit<T, keyof R> & R;

type SerializedStreamer = Modify<
  Streamer,
  {
    updatedAt: string;
  }
>;

type Props = {
  streamers: SerializedStreamer[];
};

// export const getServerSideProps: GetServerSideProps<Props> = async () => {
//   const streamers = await getStreamers();
//   const serialized = streamers.map(({ updatedAt, ...streamer }) => {
//     return {
//       ...streamer,
//       updatedAt: updatedAt.toJSON(),
//     };
//   });

//   return { props: { streamers: serialized } };
// };

type ServerSideProps = InferGetServerSidePropsType<typeof getServerSideProps>;

const Home: NextPage<ServerSideProps> = () => {
  /* useUser({ redirectTo: "/dashboard", redirectIfFound: true }); */
  const [language, setLanguage] = useState("English");

  return (
    <>
      <Head>
        <title>TipXMR</title>
      </Head>

      <div className="container py-8">
        <div className="grid grid-cols-4">
          <div className="col-span-2">
            <HorizontalCenter>
              <Image
                alt="Landing"
                src="https://picsum.photos/150"
                width={150}
                height={150}
              />
            </HorizontalCenter>
          </div>

          <div className="col-span-2 m-auto">
            <HeroUnit
              title="TipXMR"
              text="Monetize your streams with Monero!"
            />
          </div>

          <div>
            <InfoCard bodyText="Online" />
            <IsOnlineBadge isOnline />
          </div>

          <div>
            <LanguageSelector language={language} onChange={setLanguage} />
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4">
          <Link
            href="/overview"
            className="text-sky-600 no-underline hover:underline"
          >
            See who&apos;s streaming
          </Link>

          <Link
            href="/donate"
            className="text-sky-600 no-underline hover:underline"
          >
            Want to donate? Follow me
          </Link>
        </div>
      </div>
    </>
  );
};

export default Home;
