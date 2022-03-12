import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardHeader from "@mui/material/CardHeader";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { Streamer } from "@prisma/client";
import type {
  NextPage
} from "next";
import Link from "next/link";
import useSWR from "swr";

const Donate: NextPage = () => {
  const { data: streamers = [] } = useSWR<Streamer[]>("/api/streamer");

  return (
    <Container>
      <Grid container spacing={4}>
        {streamers.map((streamer) => (
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
