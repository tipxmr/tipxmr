import { ThemeProvider } from "@mui/material/styles";
import theme from "../src/styles/theme";
import * as NextImage from "next/image"

const OriginalNextImage = NextImage.default

Object.defineProperty(NextImage, "default", {
  configurable: true,
  value: (props) => (
    <OriginalNextImage
      {...props}
      unoptimized
    />
  ),
})

// FIXME: SB in combination with MUI themes isn't working as intended
// https://github.com/react-theming/storybook-addon/issues/39
export const decorators = [
  (Story) => (
    <ThemeProvider theme={theme}>
      <Story />
    </ThemeProvider>
  ),
];

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
