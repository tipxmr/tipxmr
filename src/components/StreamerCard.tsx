import { Card, CardContent, CardHeader, Typography, Avatar } from "@mui/material"

function StreamerCard({ streamer }: any) {

    const { name, avatar } = streamer

    return (
        <Card>
            <CardHeader title={name}>
                <Avatar>AA</Avatar>
            </CardHeader>
            <CardContent>
                {/* <Typography variant='h2' align="center">
                    {name}
                </Typography>
 */}
            </CardContent>
        </Card>
    )
}

export default StreamerCard
