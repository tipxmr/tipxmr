import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { UrlObject } from "url";

type Url = UrlObject | string;

const Redirect = ({ to }: { to: Url }) => {
  const router = useRouter();

  useEffect(() => {
    router.push(to);
  }, [router, to]);

  return null;
};

export default Redirect;
