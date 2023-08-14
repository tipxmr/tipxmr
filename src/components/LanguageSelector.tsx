import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@radix-ui/react-icons";
import * as Select from "@radix-ui/react-select";

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

const LanguageSelector = ({ language, onChange }: LanguageSelectorProps) => {
  return (
    <Select.Root
      value={language}
      defaultValue="English"
      onValueChange={onChange}
    >
      <Select.Trigger className="inline-flex items-center justify-center gap-2 rounded-sm bg-slate-200 p-2 hover:bg-slate-300">
        <Select.Value placeholder="Please select your seed language" />
        <Select.Icon className="SelectIcon">
          <ChevronDownIcon />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content className="overflow-hidden bg-slate-200">
          <Select.ScrollUpButton className="item-center flex cursor-default justify-center bg-slate-200">
            <ChevronUpIcon />
          </Select.ScrollUpButton>

          <Select.Viewport className="p-1">
            {languages.map((language) => (
              <Select.Item
                key={language}
                className="relative flex cursor-pointer select-none items-center bg-slate-200 p-2 hover:bg-slate-400"
                value={language}
              >
                <Select.ItemText>{`${convertFlag(
                  language,
                )} ${language}`}</Select.ItemText>
                <Select.ItemIndicator>
                  <CheckIcon />
                </Select.ItemIndicator>
              </Select.Item>
            ))}
          </Select.Viewport>

          <Select.ScrollDownButton className="item-center flex cursor-default justify-center bg-slate-200">
            <ChevronDownIcon />
          </Select.ScrollDownButton>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
};

export default LanguageSelector;
