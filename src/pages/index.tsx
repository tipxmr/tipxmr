import Container from "@mui/material/Container";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import type {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import Head from "next/head";
import useSWR from "swr";
import { Streamer } from "../data/types";
import { getStreamers } from "../lib/streamers";

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

  console.log({ data });
  console.log({ streamers });

  return (
    <Container>
      <Head>
        <title>TipXMR</title>
      </Head>

      <List>
        {streamers.map((streamer) => (
          <ListItem key={streamer.id} disablePadding>
            <ListItemButton>
              <ListItemText primary={streamer.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default Home;
