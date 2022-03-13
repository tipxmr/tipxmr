import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Chip,
  Typography,
} from "@mui/material";
import { Streamer } from "@prisma/client";

const StreamerCard = ({ streamer }: { streamer: Streamer }) => {
  const { alias, name, status, isOnline } = streamer;

  return (
    <Card>
      <CardHeader
        title={
          <Typography sx={{ fontSize: 14 }} color="text.secondary">
            {alias}
          </Typography>
        }
        action={
          isOnline ? (
            <Chip label="Online" color="success" />
          ) : (
            <Chip label="Offline" color="error" />
          )
        }
      />
      <CardMedia component="img" image="https://via.placeholder.com/350x200" />
      <CardContent>
        <Typography variant="h5" component="div">
          {name}
        </Typography>

        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {status ?? "I ❤️ TipXMR"}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">watch now</Button>
      </CardActions>
    </Card>
  );
};

export default StreamerCard;
