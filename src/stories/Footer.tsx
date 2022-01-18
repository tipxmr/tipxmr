import useSWR from "swr";
import StarIcon from "@mui/icons-material/Star";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

interface IFooter {
  backgroundColor: string;
}

const Footer = ({ backgroundColor }: IFooter) => {
  const { data, error } = useSWR(
    "https://api.github.com/repos/tipxmr/tipxmr",
    fetcher
  );
  if (error) return "An error has occurred.";
  if (!data) return "Loading...";
  return (
    <div>
      <span>
        <StarIcon></StarIcon>
        {data.stargazers_count}
      </span>
    </div>
  );
};

export default Footer;
