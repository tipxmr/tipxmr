import { FC, FormEvent, Dispatch, SetStateAction } from 'react';
import Image from 'next/image'
import { Container, TextField, Box, Grid, Paper, Typography, List, ListItem, ListItemText, ListItemAvatar, Avatar, FormGroup, FormControlLabel, Checkbox, Button, Tooltip } from "@mui/material"
import TipxmrLogo from "~/img/logo.png"
import CreateIcon from '@mui/icons-material/Create';
import LockIcon from '@mui/icons-material/Lock';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import LanguageSelector from "~/components/LanguageSelector"
import { LoadingButton } from '@mui/lab';

interface IRegister {
    seedLang: string,
    setSeedLang: Dispatch<SetStateAction<string>>,
    seedPhrase: string,
    setSeedPhrase: Dispatch<SetStateAction<string>>,
    handleSubmit: (event: FormEvent<HTMLFormElement>) => void
}

const Register: FC<IRegister> = ({ seedLang, setSeedLang, seedPhrase, setSeedPhrase, handleSubmit }) => {
    const boxStyles = {
        /* marginTop: 8, */
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    }
    // TODO implement the color scheme here on the avatars. Also DRY
    return (
        <Container maxWidth="md">
            <Paper elevation={2} sx={{ p: 4 }}>
                <Box
                    sx={boxStyles}
                    component="form"
                    onSubmit={handleSubmit}
                >
                    <Box sx={{ justifyContent: "center", display: 'flex' }}>
                        <Image src={TipxmrLogo} alt="TipXMR Logo" width={250} height={50} />
                    </Box>
                    <Typography component="h1" variant="h5" align="center" mt={2}>
                        Register
                    </Typography>
                    <Grid container spacing={2} mt={3}>
                        <Grid item xs={12}>
                            <Box sx={{ display: "flex", justifyContent: "space-around", flexDirection: "row" }}>
                                <Tooltip placement="top" title="This name will not be visible to your audience">
                                    <TextField
                                        name="username"
                                        required
                                        id="username"
                                        label="Username"
                                        autoFocus
                                    />
                                </Tooltip>
                                <Tooltip placement="top" title="This is the name your audience will see">
                                    <TextField
                                        name="displayname"
                                        required
                                        id="displayname"
                                        label="Displayname"
                                        autoFocus
                                    />
                                </Tooltip>

                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={12} mt={3}>

                            <Box sx={boxStyles}>
                                <LanguageSelector language={seedLang} handleChange={setSeedLang} />
                            </Box>
                            {seedPhrase
                                ?
                                <Tooltip title="This is your XMR seed" placement="top">
                                    < Paper elevation={3} sx={{ mt: 3, p: 2, backgroundColor: "primary" }} >
                                        <Typography component="div" variant="overline" sx={{ fontSize: "1.1rem" }} align="center">{seedPhrase}</Typography>
                                    </Paper>
                                </Tooltip>
                                :
                                <LoadingButton loading variant="contained" color="primary" sx={{ mt: 2 }}>Testing</LoadingButton>
                            }
                        </Grid>
                        <Grid item xs={12}>
                            <List sx={{ width: '100%', mt: 4, bgcolor: 'background.paper' }}>
                                <ListItem>
                                    <ListItemAvatar >
                                        <Avatar sx={{ bgcolor: "#ffee58" }}>
                                            <CreateIcon color="success" />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary="Note down your seed phrase" secondary="You need to to sign into TipXMR" />
                                </ListItem>
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar sx={{ bgcolor: "#8bc34a" }}>
                                            <LockIcon />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary="Keep your seed secure" secondary="Don't lose it or show it to anybody. It is best kept offline." />
                                </ListItem>
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar sx={{ bgcolor: "#8bc34a" }}>
                                            <AccountBalanceWalletIcon />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary="These words hold your money!" secondary="It is the ultimate backup to your sweet Moneroj" />
                                </ListItem>
                            </List>
                        </Grid>
                    </Grid>

                    <Grid item xs={12} my={2}>
                        <FormControlLabel control={<Checkbox required value="understood" />} label={<Typography variant="subtitle2">I understand that I am responsible for my own security. TipXMR is not liable.</Typography>} />
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant="contained" color="primary" onClick={() => handleSubmit}>Create wallet and continue</Button>
                    </Grid>
                </Box>
            </Paper>
        </Container >
    );
}

export default Register;
