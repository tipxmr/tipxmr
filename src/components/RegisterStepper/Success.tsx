import { useAtom } from "jotai";
import { FC } from "react";

import { displayNameAtom, userNameAtom } from "~/store";

const Success: FC = () => {
  const [displayName] = useAtom(displayNameAtom);
  const [userName] = useAtom(userNameAtom);

  return (
    <div className="container mt-3 rounded p-2 shadow">
      {/* <Grid container spacing={2} mt={3}> */}
      <h3 className="text-center">Confirm your Account creation</h3>

      <ul className="p-3">
        <li className="mb-3">Username: {userName}</li>
        <li className="mb-3">Display Name: {displayName}</li>
      </ul>
    </div>
  );
};

export default Success;
