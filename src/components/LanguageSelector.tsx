import { ChangeEvent, FC, useCallback } from "react";
import { FormControl, MenuItem, TextField } from "@mui/material";

interface LanguageSelectorProps {
  language: string;
  onChange: (language: string) => void;
}
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

const LanguageSelector: FC<LanguageSelectorProps> = ({
  language,
  onChange,
}) => {
  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  }, []);

  const languageItems = languages.map((language) => {
    return (
      <MenuItem key={language} value={language}>{`${convertFlag(
        language
      )} ${language}`}</MenuItem>
    );
  });

  return (
    <FormControl>
      <TextField
        id="seed-language-select"
        select
        defaultValue={"English"}
        label="Seed Language"
        onChange={handleChange}
        helperText="Please select your seed language"
      >
        {languageItems}
      </TextField>
    </FormControl>
  );
};

export default LanguageSelector;
