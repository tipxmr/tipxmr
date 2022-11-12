import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardHeader from "@mui/material/CardHeader";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import type { NextPage } from "next";
import Link from "next/link";
import useStreamers from "~/hooks/useStreamers";
import Redirect from "~/components/Redirect";
import { UpdateIcon } from "@radix-ui/react-icons";

const Donate: NextPage = () => {
  const { status, data: streamers, error } = useStreamers();

  if (status === "error" && error instanceof Error) {
    console.error({ error });
    return <Redirect to="/overview" />;
  }

  if (status === "loading") {
    return <UpdateIcon className="animate-spin" />;
  }

  return (
    <Container>
      <Grid container spacing={4}>
        {streamers &&
          streamers.map((streamer) => (
            <Grid item key={streamer.id} xs={12} sm={6} md={4}>
              <Card>
                <CardHeader title={streamer.name} />
                <CardActions>
                  <Link href={`/donate/${encodeURIComponent(streamer.name)}`}>
                    Donate
                  </Link>
                </CardActions>
              </Card>
            </Grid>
          ))}
      </Grid>
    </Container>
  );
};

export default Donate;
