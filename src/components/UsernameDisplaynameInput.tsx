"use client";

import { useAtomValue } from "jotai";
import { SubmitHandler, useForm } from "react-hook-form";

import useCreateUser from "~/hooks/useCreateUser";
import { truncatedHashIdAtom } from "~/store";

import Input from "./Input";
import Tooltip from "./Tooltip";

interface UsernameDisplaynameValues {
  username: string;
  displayname: string;
}

const UsernameDisplaynameInput = () => {
  const {
    handleSubmit,
    control,
    formState: { isValid, isDirty },
  } = useForm<UsernameDisplaynameValues>({
    mode: "onChange",
    defaultValues: {
      username: "",
      displayname: "",
    },
  });
  const createUser = useCreateUser();
  const truncatedHashId = useAtomValue(truncatedHashIdAtom);

  const handleAccountCreation: SubmitHandler<UsernameDisplaynameValues> = (
    data: UsernameDisplaynameValues,
  ) => {
    if (!truncatedHashId) return;
    createUser.mutate({
      id: truncatedHashId,
      name: data.username,
      alias: data.displayname,
    });
  };

  return (
    <form
      onSubmit={handleSubmit(handleAccountCreation)}
      className="mx-auto flex flex-col gap-2"
    >
      <Tooltip content={<UsernameTooltip />}>
        <Input
          label="Username"
          name="username"
          type="text"
          control={control}
          rules={{
            required: { value: true, message: "Username is required" },
            minLength: {
              value: 4,
              message: "Your username has less than 4 characters",
            },
            maxLength: {
              value: 20,
              message: "Your username has more than 20 characters",
            },
          }}
        ></Input>
      </Tooltip>
      <Tooltip content={<DisplayTooltip />}>
        <Input
          label="Displayname"
          name="displayname"
          type="text"
          control={control}
          rules={{
            required: { value: true, message: "Displayname is required" },
            minLength: {
              value: 4,
              message: "Displayname has less than 4 characters",
            },
            maxLength: {
              value: 24,
              message: "Displayname has more than 24 characters",
            },
          }}
        ></Input>
      </Tooltip>
      <input
        type="submit"
        value="Create Account"
        disabled={!isDirty || !isValid}
        className="btn-primary my-4"
      />
    </form>
  );
};

export default UsernameDisplaynameInput;

const UsernameTooltip = () => (
  <>
    This name will be used by donators to find you on TipXMR (for example in the
    URL). Your username is unique and cannot be changed later on.
  </>
);

const DisplayTooltip = () => (
  <>
    How your name will be shown on the site. Here you can use 🤠 emojis and also
    tweak it later.
  </>
);
