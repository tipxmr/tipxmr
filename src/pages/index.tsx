import Container from "@mui/material/Container";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { Streamer } from "@prisma/client";
import type {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import Head from "next/head";
import useSWR from "swr";
import { getStreamers } from "../lib/streamers";

type Props = {
  streamers: Partial<Streamer>[];
};

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const streamers = await getStreamers();
  const serialized = streamers.map(({createdAt, updatedAt, ...streamer}) => {
    return {
      ...streamer,
      createdAt: createdAt.toJSON(),
      updatedAt: updatedAt.toJSON()
    }
  })

  return { props: { streamers: serialized } };
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
