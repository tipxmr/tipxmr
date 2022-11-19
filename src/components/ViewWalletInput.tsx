import { SubmitHandler, useForm } from "react-hook-form";

import { mainnetAddress } from "~/lib/regex";
import { createViewOnlyWallet } from "~/lib/xmr";

import Input from "./Input";

interface ViewWalletFormValues {
  primaryAddress: string;
  privateViewKey: string;
}

const ViewWalletInput = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ViewWalletFormValues>();

  const createWallet: SubmitHandler<ViewWalletFormValues> = async (
    data: ViewWalletFormValues
  ) => {
    console.log(data);
    const wallet = await createViewOnlyWallet(
      data.privateViewKey,
      data.primaryAddress
    );
    console.log(wallet);
    return wallet;
  };

  return (
    <>
      <form onSubmit={handleSubmit(createWallet)} className="mx-auto w-96">
        <Input
          label="Private View Key"
          name="privateViewKey"
          register={register}
          required={true}
          minLength={64}
          maxLength={64}
          errorMessage={errors?.["privateViewKey"]?.message?.toString()}
        ></Input>
        <Input
          label="Primary Address"
          name="primaryAddress"
          register={register}
          required={true}
          minLength={95}
          maxLength={95}
          pattern={mainnetAddress}
          errorMessage={errors?.["primaryAddress"]?.message?.toString()}
        ></Input>
        <input
          type="submit"
          value="Create Account"
          className="btn-primary my-4"
        />
      </form>
    </>
  );
};

export default ViewWalletInput;
