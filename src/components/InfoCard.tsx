import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    CardMedia,
    Chip,
    Icon,
    Stack,
    Link,
    Typography,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info"

interface IProps {
    title: string,
    chipText: string,
    chipRef: string,
    heading: string,
    text: string,
    linkText: string,
    linkRef: string
}

function InfoCard({ title, chipText, chipRef, heading, text, linkText, linkRef }: IProps) {

    return (
        <Card>

            <CardHeader
                sx={{ display: 'flex', direction: 'row', justifyContent: 'space-around' }}
                title={
                    <Typography sx={{ fontSize: 14 }} color="text.secondary">
                        {title}
                    </Typography>
                }
                action={
                    <Chip label={chipText} component="a" href={chipRef} clickable color="info" />
                }
                disableTypography
            />

            <CardMedia
                component="img"
                height="194"
                image="https://via.placeholder.com/350x200"
            />

            <CardContent>
                <Stack spacing={2} direction="row" sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <InfoIcon color="info" />
                    <Typography variant="h4" component="div">
                        {heading}
                    </Typography>
                </Stack>

                <Typography color="text.secondary">
                    {text}
                </Typography>
            </CardContent>


            <CardActions sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 2 }}>
                {/* NOTE this needs to be checked, used the MUI Link component instead of Link from Next */}
                <Link href={linkRef} align="center" gutterBottom variant='subtitle1'>{linkText}</Link>
            </CardActions>

        </Card >
    );
}

export default InfoCard;
