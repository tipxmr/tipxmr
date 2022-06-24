import { Grid } from "@mui/material";
import Container from "@mui/material/Container";
import type { NextPage } from "next";
import StreamerCard from "~/components/StreamerCard";
import useStreamers from "~/hooks/useStreamers";

const Home: NextPage = () => {
  const { status, data: streamers, error } = useStreamers();

  if (status === "loading") {
    return <span>Loading...</span>;
  }

  if (status === "error" && error instanceof Error) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <Container sx={{ py: 8 }}>
      <Grid container spacing={4}>
        {streamers &&
          streamers.map((streamer) => (
            <Grid item key={streamer.id} xs={12} sm={6} md={4}>
              <StreamerCard streamer={streamer} />
            </Grid>
          ))}
      </Grid>
    </Container>
  );
};

export default Home;
