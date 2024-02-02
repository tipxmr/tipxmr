"use client";

import { useRouter } from "next/navigation";
import { Button } from "~/components/ui/button";

const BackButton = () => {
  const router = useRouter();
  return <Button onClick={() => router.back()}>Go back</Button>;
};

export default BackButton;
