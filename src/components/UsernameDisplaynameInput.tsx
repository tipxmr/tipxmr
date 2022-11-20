"use client";

import { useAtomValue } from "jotai";
import { SubmitHandler, useForm } from "react-hook-form";

import useCreateUser from "~/hooks/useCreateUser";
import { truncatedHashIdAtom } from "~/store";

import Input from "./Input";

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
  });
  const createUser = useCreateUser();
  const truncatedHashId = useAtomValue(truncatedHashIdAtom);

  const handleAccountCreation: SubmitHandler<UsernameDisplaynameValues> = (
    data: UsernameDisplaynameValues
  ) => {
    createUser.mutate({
      id: truncatedHashId,
      name: data.username,
      alias: data.displayname,
    });
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(handleAccountCreation)}
        className="mx-auto flex flex-col gap-2"
      >
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
        <input
          type="submit"
          value="Create Account"
          disabled={!isDirty || !isValid}
          className="btn-primary my-4"
        />
      </form>
    </>
  );
};

export default UsernameDisplaynameInput;
