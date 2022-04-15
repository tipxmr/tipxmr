import { CircularProgress, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardHeader from "@mui/material/CardHeader";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import useStreamers from "~/hooks/useStreamers";

const Donate: NextPage = () => {
  const router = useRouter();
  const { status, data: streamers, error } = useStreamers();

  if (status === "error" && error instanceof Error) {
    console.error({ error });
    router.push("/overview");
    return <Typography variant="body1">There was an error</Typography>;
  }

  if (status === "loading") {
    return <CircularProgress />;
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
                  <Link
                    href={`/donate/${encodeURIComponent(streamer.name)}`}
                    passHref
                  >
                    <Button size="small" component="a">
                      Donate
                    </Button>
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
