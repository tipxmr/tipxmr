import useSWR from "swr";
import StarIcon from "@mui/icons-material/Star";
import { Box } from "@mui/material";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

interface IFooter {
  backgroundColor?: string;
}

const Footer = ({ backgroundColor }: IFooter) => {
  const { data, error } = useSWR(
    "https://api.github.com/repos/tipxmr/tipxmr",
    fetcher
  );
  if (error) return <div>An error has occurred.</div>;
  if (!data) return <div>Loading...</div>;
  return (
    <Box sx={{backgroundColor, flex: '1', overflow: 'auto'}}>
      <span>
        <StarIcon />
        {data.stargazers_count}
      </span>
    </Box>
  );
};

export default Footer;
