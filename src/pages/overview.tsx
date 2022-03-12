import { Grid } from "@mui/material";
import Container from "@mui/material/Container";
import { Streamer } from "@prisma/client";
import type { NextPage } from "next";
import useSWR from "swr";
import StreamerCard from "~/components/StreamerCard";

const Home: NextPage = () => {
  const { data, error } = useSWR<Streamer[]>("/api/streamer");
  const streamers = data ?? [];

  return (
    <Container sx={{ py: 8 }}>
      <Grid container spacing={4}>
        {streamers.map((streamer) => (
          <Grid item key={streamer.id} xs={12} sm={6} md={4}>
            <StreamerCard streamer={streamer} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Home;
