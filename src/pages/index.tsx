import {
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
  Box,
} from "@mui/material";
import Container from "@mui/material/Container";
import type {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import Head from "next/head";
import useSWR from "swr";
import { Streamer } from "../data/types";
import { getStreamers } from "../lib/streamers";
import HorizontalCenter from "~/components/helper/HorizontalCenter";
import InfoCard from "~/components/InfoCard";
import IsOnlineBadge from "~/components/IsOnlineBadge";
import LanguageSelector from "~/components/LanguageSelector";
import StreamerCard from "~/components/StreamerCard";
import { useState } from "react";
import Footer from "~/components/Footer";

type Modify<T, R> = Omit<T, keyof R> & R;

type SerializedStreamer = Modify<
  Streamer,
  {
    createdAt: string;
    updatedAt: string;
  }
>;

type Props = {
  streamers: SerializedStreamer[];
};

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const streamers = await getStreamers();
  const serialized = streamers.map(({ createdAt, updatedAt, ...streamer }) => {
    return {
      ...streamer,
      createdAt: createdAt.toJSON(),
      updatedAt: updatedAt.toJSON(),
    };
  });

  return { props: { streamers: serialized } };
};

type ServerSideProps = InferGetServerSidePropsType<typeof getServerSideProps>;

async function fetchJson<T = any>(
  input: RequestInfo,
  init?: RequestInit
): Promise<T> {
  const response = await fetch(input, init);
  return response.json();
}

const Home: NextPage<ServerSideProps> = ({ streamers }) => {
  const { data, error } = useSWR<Streamer[]>("/api/streamers", fetchJson);
  const [language, setLanguage] = useState("English")

  console.log({ data });
  console.log({ streamers });

  return (
    <>
      <Head>
        <title>TipXMR</title>
      </Head>

      <Container sx={{ py: 8 }}>
        <Grid container spacing={4}>
          <Grid item xs={6}>
            <HorizontalCenter>
              <img src="https://via.placeholder.com/150" alt="Landing" />
            </HorizontalCenter>
          </Grid>

          <Grid item xs={6} sx={{ margin: "auto" }}>
            <Typography variant="h1" align="center">
              Monero Donations in your livestream
            </Typography>
          </Grid>

          <Grid item xs={3}>
            <InfoCard>Online</InfoCard>
            <IsOnlineBadge isOnline />
          </Grid>

          <Grid item xs={3}>
            <LanguageSelector
              language={language}
              handleChange={setLanguage}
            ></LanguageSelector>
          </Grid>
        </Grid>

        <Box sx={{
          mt: 8
        }} />

        <Grid container spacing={4}>
          {streamers.map((streamer) => (
            <Grid item key={streamer.id} xs={12} sm={6} md={4}>
              <StreamerCard streamer={streamer} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default Home;
