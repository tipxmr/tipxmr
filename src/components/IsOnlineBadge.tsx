import Button from "@mui/material/Button";

interface IIsOnlineBadge {
    isOnline: boolean;
}

const IsOnlineBadge = ({ isOnline }: IIsOnlineBadge) => {
    return (
        <Button
            variant={isOnline ? "contained" : "outlined"}
            color={isOnline ? "success" : "error"}
        >
            {isOnline ? "online" : "offline"}
        </Button>
    );
};

export default IsOnlineBadge;
