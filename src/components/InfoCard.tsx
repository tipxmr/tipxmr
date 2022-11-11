import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Link from "next/link";

interface InfoCardProps {
  title?: string;
  subtitle?: string;
  uptitle?: string;
  btnText?: string;
  link?: string;
  infos?: any;
  bodyText: string;
}

const InfoCard = ({
  title,
  btnText,
  infos,
  subtitle,
  uptitle,
  link,
  bodyText,
}: InfoCardProps) => {
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
            <button className="btn-primary">{btnText}</button>
          </Link>
        </CardActions>
      )}
    </Card>
  );
};

export default InfoCard;
