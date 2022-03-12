import { FC } from 'react';
import Typography from '@mui/material/Typography';
import Title from "~/components/Title"
interface ITipxmrWallet {
    balance: number,
    isSynced: boolean,
    height: number,
    percentDone: number,
    startHeight: number,
    endHeight: number,
    /* handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void */
}
const TipxmrWallet: FC<ITipxmrWallet> = ({ balance, isSynced, height, percentDone, startHeight, endHeight }) => {
    return (
        <>
            <Title>My Wallet</Title>
            <Typography component="p" variant="h4">
                Balance: {balance} XMR
            </Typography>
            <Typography color="text.secondary" sx={{ flex: 1 }}>
                Current Sync Height: {height}
            </Typography>
        </>

    );
}
export default TipxmrWallet
