"use client";

/* import { useWebSocket } from "next-ws/client"; */
import { useCallback, useEffect, useState } from "react";
import { Button } from "./ui/button";
import { CredentialBox } from "./CredentialBox";
import { io } from "socket.io-client";

const CreateStreamerSubaddress = ({
  streamerName,
}: {
  streamerName: string;
}) => {
  const socket = io();
  const [subaddress, setSubaddress] = useState<string>(
    "no subaddress recieved",
  );

  const onCreateSubaddress = useCallback(
    (event: MessageEvent<Blob>) => void event.data.text().then(setSubaddress),
    [],
  );

  useEffect(() => {
    socket?.once("message", onCreateSubaddress);
    /* return () => socket?.removeListener("message", onCreateSubaddress); */
  }, [onCreateSubaddress, socket]);

  return (
    <div className="flex flex-col">
      <Button onClick={() => socket?.send("create-subaddress")}>
        Create Subaddress
      </Button>
      <CredentialBox text={subaddress} label={`${streamerName}'s address`} />
    </div>
  );
};

export default CreateStreamerSubaddress;
