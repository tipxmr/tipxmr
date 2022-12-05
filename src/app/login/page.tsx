"use client";

import type { NextPage } from "next/types";
import { useState } from "react";

import FullWalletInput from "~/components/FullWalletInput";
import ViewWalletInput from "~/components/ViewWalletInput";
import useUser from "~/lib/useUser";

import { RegistrationMode } from "../registration/page";

export type LoginMode = Exclude<RegistrationMode, "fullWalletCreation">;

const LoginPage: NextPage = () => {
  const [loginMode, setLoginMode] = useState<LoginMode | null>(null);

  const handleStepChange = (mode: LoginMode) => {
    setLoginMode(mode);
  };

  const { login } = useUser({
    redirectTo: "/dashboard",
    redirectIfFound: true,
  });

  return (
    <div className="container max-w-md text-center">
      <h1 className="mb-2 text-3xl">Login to TipXMR</h1>
      <p>{`You don't need to provide any personal data to use TipXMR.`}</p>
      {loginMode === null && (
        <div className="mx-auto my-8 flex w-72 flex-col gap-4">
          <button
            className="btn-primary"
            onClick={() => handleStepChange("fullWallet")}
          >
            Login with your seed
          </button>
          <button
            className="btn-primary"
            onClick={() => handleStepChange("viewOnlyWallet")}
          >
            Login with existing private view key
          </button>
        </div>
      )}
      {loginMode === "viewOnlyWallet" && <ViewWalletInput login={login} />}
      {loginMode === "fullWallet" && <FullWalletInput login={login} />}
      {loginMode !== null && (
        <button
          className="btn-primary mt-2 w-full"
          onClick={() => setLoginMode(null)}
        >
          Go back
        </button>
      )}
    </div>
  );
};

export default LoginPage;
