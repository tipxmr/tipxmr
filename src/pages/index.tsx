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
