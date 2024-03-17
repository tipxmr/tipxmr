"use client";

import { useWebSocket } from "next-ws/client";
import { useCallback, useEffect, useState } from "react";
import { Button } from "./ui/button";
import { CredentialBox } from "./CredentialBox";

const CreateStreamerSubaddress = ({
  streamerName,
}: {
  streamerName: string;
}) => {
  const ws = useWebSocket();
  const [subaddress, setSubaddress] = useState<string>(
    "no subaddress recieved",
  );

  const onCreateSubaddress = useCallback(
    (event: MessageEvent<Blob>) => void event.data.text().then(setSubaddress),
    [],
  );

  useEffect(() => {
    ws?.addEventListener("message", onCreateSubaddress);
    return () => ws?.removeEventListener("message", onCreateSubaddress);
  }, [onCreateSubaddress, ws]);

  return (
    <div className="flex flex-col">
      <Button onClick={() => ws?.send("create-subaddress")}>
        Create Subaddress
      </Button>
      <CredentialBox text={subaddress} label={`${streamerName}'s address`} />
    </div>
  );
};

export default CreateStreamerSubaddress;
