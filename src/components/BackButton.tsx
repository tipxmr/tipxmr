"use client";

import { useRouter } from "next/navigation";
import { Button } from "~/components/ui/button";

const BackButton = () => {
  const router = useRouter();
  return (
    <Button variant={"secondary"} onClick={() => router.back()}>
      Go back
    </Button>
  );
};

export default BackButton;
