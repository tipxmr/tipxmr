import { FC } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Link from "next/link";

interface IInfoCard {
  title?: string;
  subtitle?: string;
  uptitle?: string;
  btnText?: string;
  link?: string;
  infos?: any;
  bodyText: string;
}

const InfoCard: FC<IInfoCard> = ({
  title,
  btnText,
  infos,
  subtitle,
  uptitle,
  link,
  bodyText,
}) => {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {uptitle}
        </Typography>
        <Typography variant="h5" component="div">
          {title}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {subtitle}
        </Typography>
        <Typography variant="body2">{bodyText}</Typography>
      </CardContent>
      {btnText && link && (
        <CardActions>
          <Link href={`${link}`}>
            <Button size="small">{btnText}</Button>
          </Link>
        </CardActions>
      )}
    </Card>
  );
};

export default InfoCard;
