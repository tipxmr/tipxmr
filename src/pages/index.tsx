import type {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import Head from "next/head";
import { Streamer } from "../data/types";
import prisma from "../lib/prisma";

type Props = {
  streamers: Streamer[];
};

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const streamers = await prisma.streamer.findMany({});
  return { props: { streamers } };
};

type ServerSideProps = InferGetServerSidePropsType<typeof getServerSideProps>;

const Home: NextPage<ServerSideProps> = ({ streamers }) => {
  return (
    <div>
      <Head>
        <title>TipXMR</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <ul>
          {streamers.map((streamer) => (
            <li key={streamer.id}>{streamer.name}</li>
          ))}
        </ul>
      </main>
    </div>
  );
};

export default Home;
