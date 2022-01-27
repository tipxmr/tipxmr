import Button from "@mui/material/Button";
interface IButton {
    label: string;
    backgroundColor: string;
    handleClick: any;
}

const MyButton = ({
    label,
    handleClick,
}: IButton) => {
    return (
        <Button
            variant="contained"
            onClick={handleClick}
            type="button"
            color="primary"
        >
            {label}
        </Button>
    );
};

export default MyButton;
