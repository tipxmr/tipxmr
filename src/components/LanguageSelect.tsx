"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

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

interface LanguageSelectorProps {
  language: string;
  onChange: (language: string) => void;
}

function LanguageSelect({ language, onChange }: LanguageSelectorProps) {
  return (
    <Select value={language} onValueChange={onChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Please select your seed language" />
      </SelectTrigger>
      <SelectContent>
        {languages.map((language) => (
          <SelectItem value={language}>
            {convertFlag(language)} {language}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export default LanguageSelect;
