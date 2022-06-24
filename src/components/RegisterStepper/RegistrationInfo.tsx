import { Box } from "@mui/material";
import { FC } from "react";
import InfoCard from "../InfoCard";

interface RegistrationInfoProps {}

const infos = [
  {
    title: "Your wallet in your bowser",
    subtitle: "With this great power comes great responsibility.",
    bodyText:
      "The magic of TipXMR is that your wallet is running on your machine and your machine only. Become uncensorable in monetizing your streams.",
    btnText: "Learn more about Monero and wallet security",
    link: "https://getmonero.org/downloads",
  },
  {
    title: "Monero donations in your Livestream",
    bodyText:
      "TipXMR empowers you to receive Monero donations from your viewers and display the donations in real time in your stream. Start monetizing your livestreams today!",
  },
  {
    title: "You are responsible for your funds!",
    bodyText:
      "We cannot babysit your personal OP-Sec. You and you alone control your funds and are therefore responsible for your security. We recommend to always withdraw your entire balance to another wallet when your streaming is done.",
    btnText: "Learn more about operational security",
    link: "/security",
  },
];

const RegistrationInfo: FC<RegistrationInfoProps> = ({}) => {
  return (
    <>
      {infos.map(({ title, subtitle, bodyText, link, btnText }) => (
        <Box sx={{ m: 2 }}>
          <InfoCard
            title={title}
            subtitle={subtitle}
            bodyText={bodyText}
            btnText={btnText}
            link={link}
          />
        </Box>
      ))}
    </>
  );
};

export default RegistrationInfo;
