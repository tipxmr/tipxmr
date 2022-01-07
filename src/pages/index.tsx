import type { GetServerSideProps, InferGetServerSidePropsType, NextPage } from "next";
import Head from "next/head";
import { Streamer } from "../data/types";

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch("http://localhost:3001/api/streamer");
  const streamers: Streamer[] = await res.json();
  return { props: {streamers} };
};

const Home: NextPage = ({
  streamers,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <div>
      <Head>
        <title>TipXMR</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <ul>
          {streamers.map((streamer: Streamer) => (
            <li key={streamer.id}>{streamer.name}</li>
          ))}
        </ul>
      </main>
    </div>
  );
};

export default Home;
