import { Grid, List, ListItem, ListItemButton, ListItemText, Typography } from "@mui/material";
import Container from "@mui/material/Container";

import { Streamer } from "@prisma/client";
import type {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import Head from "next/head";
import useSWR from "swr";
import { getStreamers } from "../lib/streamers";
import HorizontalCenter from "~/components/helper/HorizontalCenter"
import InfoCard from "~/components/InfoCard"
import IsOnlineBadge from "~/components/IsOnlineBadge"
import LanguageSelector from "~/components/LanguageSelector"
import StreamerCard from "~/components/StreamerCard"
import { useState } from "react";


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
    <Container>

      <Head><title>TipXMR</title></Head>

      <Grid container alignItems="center">

        <Grid item xs={6}>

          {/* <img src={landingIcon} alt="Logo" /> */}
          <HorizontalCenter>
            <img src="https://via.placeholder.com/150" alt="Landing" />
          </HorizontalCenter>

        </Grid>


        <Grid item xs={6} sx={{ margin: "auto" }}>

          <Typography variant="h1" align="center">
            Monero Donations in your livestream
          </Typography>

        </Grid>


        <Grid item>

          {/* Example for using data from swr */}
          <List>
            {streamers.map((streamer) => (
              <ListItem key={streamer.id} disablePadding>
                <StreamerCard streamer={streamer}>Test</StreamerCard>
              </ListItem>
            ))}
          </List>

        </Grid>


        <Grid item>

          <InfoCard>Online</InfoCard>
          <IsOnlineBadge isOnline>Online</IsOnlineBadge>

        </Grid>

        <Grid item xs={12}>

          <LanguageSelector language={language} handleChange={setLanguage}></LanguageSelector>

        </Grid>

      </Grid>

    </Container>
  )
};

export default Home;
