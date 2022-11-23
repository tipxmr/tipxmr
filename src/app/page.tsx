"use client";

import { Streamer } from "@prisma/client";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import HorizontalCenter from "~/components/helper/HorizontalCenter";
import HeroUnit from "~/components/HeroUnit";
import InfoCard from "~/components/InfoCard";
import IsOnlineBadge from "~/components/IsOnlineBadge";
import LanguageSelector from "~/components/LanguageSelector";

type Modify<T, R> = Omit<T, keyof R> & R;

type SerializedStreamer = Modify<
  Streamer,
  {
    updatedAt: string;
  }
>;

interface Props {
  streamers: SerializedStreamer[];
}

const Home: NextPage<Props> = () => {
  /* useUser({ redirectTo: "/dashboard", redirectIfFound: true }); */

  return (
    <>
      <Head>
        <title>TipXMR</title>
      </Head>

      <HeroUnit title="TipXMR" text="Monetize your streams with Monero!" />

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
    </>
  );
};

export default Home;
