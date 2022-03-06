import { Button } from '@mui/material';
import { FC, Fragment } from 'react';
import { Title, NumberInput } from "~/components"

interface IDonationMask {
    streamerName: string,

}
const DonationMask: FC<IDonationMask> = ({ streamerName }) => {
    return (
        <Fragment>
            <Title>Donate to {streamerName}</Title>
            <NumberInput />
            <Button variant="contained" color="primary">Donate</Button>
        </Fragment>
    );
}

export default DonationMask;
