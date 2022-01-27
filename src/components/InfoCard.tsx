import { Card } from "@mui/material";

const InfoCard = ({ title, btnText, infos, children }: any) => {

    return (
        <Card>
            {children}
        </Card>
    );
}

export default InfoCard
