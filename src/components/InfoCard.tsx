import { FC } from "react"
import { Card } from "@mui/material";

interface IInfoCard {
    title: string,
    btnText: string,
    infos: any,
    children: any
}
const InfoCard: FC<IInfoCard> = ({ title, btnText, infos, children }) => {

    return (
        <Card>
            {children}
        </Card>
    );
}

export default InfoCard
