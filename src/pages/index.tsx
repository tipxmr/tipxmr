import {
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
  Box
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

type Props = {
  streamers: Streamer[];
};

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const streamers = await getStreamers();
  return { props: { streamers } };
};

type ServerSideProps = InferGetServerSidePropsType<typeof getServerSideProps>;

const fetcher = (...args: unknown[]) =>
  fetch(...args).then((res) => res.json());

const Home: NextPage<ServerSideProps> = ({ streamers }) => {
  const { data, error } = useSWR("/api/streamers", fetcher);
  const [language, setLanguage] = useState("English");

  console.log({ data });
  console.log({ streamers });

  return (
    <Box sx={{display: 'flex', flexDirection:'column', minHeight: '100vh'}}>
      <Head>
        <title>TipXMR</title>
      </Head>
      <Box>
        <Grid container justifyContent="center" alignItems="center" spacing={4}>
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

          <Grid item xs={6}>
            {/* Example for using data from swr */}
            <List>
              {streamers.map((streamer) => (
                <ListItem key={streamer.id} alignItems="center">
                  <StreamerCard streamer={streamer}>Test</StreamerCard>
                </ListItem>
              ))}
            </List>
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
      </Box>
    </Box>
  );
};

export default Home;
