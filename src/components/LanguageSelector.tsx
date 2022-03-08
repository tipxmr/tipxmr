import { FC } from "react"
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

interface ILanguageSelector {
    language: string;
    handleChange: any;
}

const LanguageSelector: FC<ILanguageSelector> = ({
    language: string,
    handleChange,
}) => {
    const languages = [
        "Dutch",
        "English",
        "Esperanto",
        "French",
        "German",
        "Italian",
        "Japanese",
        "Portuguese",
        "Russian",
        "Spanish",
    ];

    const convertFlag = (language: string) => {
        switch (language) {
            case "German":
                return "🇩🇪";
            case "French":
                return "🇲🇫";
            case "Esperanto":
                return "🏴‍☠️";
            case "Spanish":
                return "🇪🇦";
            case "Russian":
                return "🇷🇺";
            case "Italian":
                return "🇮🇹";
            case "Japanese":
                return "🇯🇵";
            case "Portuguese":
                return "🇵🇹";
            case "Dutch":
                return "🇳🇱";
            default:
                return "🇬🇧";
        }
    };

    const languageItems = languages.map((language) => {
        return (
            <MenuItem key={language} value={language}>{`${convertFlag(
                language
            )} ${language}`}</MenuItem>
        );
    });

    return (
        <FormControl>
            <InputLabel id="seed-language">Seed Language</InputLabel>
            <Select
                labelId="seed-language"
                id="seed-language-select"
                defaultValue='English'
                label="Language"
                onChange={handleChange}
                sx={{ minWidth: "200px" }}
            >
                {languageItems}
            </Select>
        </FormControl>
    );
};

export default LanguageSelector;
