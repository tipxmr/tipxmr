import { useAtom } from "jotai";
import { toLower } from "ramda";
import { ChangeEvent, FC } from "react";

import { displayNameAtom, userNameAtom } from "~/store";

import InfoCard from "../InfoCard";

const AccountCreation: FC = () => {
  const [userName, setUserName] = useAtom(userNameAtom);
  const [_, setDisplayName] = useAtom(displayNameAtom);

  const userNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const text = toLower(e.target.value);
    setUserName(text);
  };
  const displayNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const text = toLower(e.target.value);
    setDisplayName(text);
  };

  return (
    <div className="container mt-3 flex flex-col gap-2 p-4">
      <h3 className="text-center">Create your TipXMR account</h3>

      <InfoCard
        title="Set up your TipXMR account"
        subtitle="Almost there"
        bodyText="Choose a username and displayname for your account. The username is used in your personal donation url. The displayname can be more fun.. with 😀 emojis."
      />

      <div className="flex flex-row justify-around">
        <label>
          <input
            type="text"
            id="name"
            name="name"
            onChange={userNameChange}
            required
            placeholder="Username"
            autoFocus
          />
          <span className="block">
            Your URL {process.env.PLATFORM_URL}/donate/{userName}
          </span>
        </label>

        <label>
          <input
            type="text"
            id="alias"
            name="alias"
            onChange={displayNameChange}
            required
            placeholder="Displayname"
            autoFocus
          />
          <span className="block">This is the name your audience will see</span>
        </label>
      </div>
    </div>
  );
};

export default AccountCreation;
