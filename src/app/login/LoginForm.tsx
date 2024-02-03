"use client";

import { useState } from "react";

import FullWalletInput from "~/components/FullWalletInput";
import ViewWalletInput from "~/components/ViewWalletInput";
import { Button } from "~/components/ui/button";
import { Separator } from "~/components/ui/separator";

enum LoginMode {
  Initial = "initial",
  ViewOnlyWallet = "viewOnlyWallet",
  FullWallet = "fullWallet",
}

const LoginForm = () => {
  const [loginMode, setLoginMode] = useState<LoginMode>(LoginMode.Initial);

  const handleStepChange = (mode: LoginMode) => {
    setLoginMode(mode);
  };

  return (
    <>
      {loginMode === LoginMode.Initial && (
        <div className="mx-auto flex w-1/2 flex-col items-center justify-center gap-4">
          <Button
            onClick={() => handleStepChange(LoginMode.FullWallet)}
            className="w-full"
          >
            Login with your seed
          </Button>
          <Button
            onClick={() => handleStepChange(LoginMode.ViewOnlyWallet)}
            className="w-full"
          >
            Login with existing private view key
          </Button>
        </div>
      )}
      {loginMode === LoginMode.ViewOnlyWallet && <ViewWalletInput />}
      {loginMode === LoginMode.FullWallet && <FullWalletInput />}
      {loginMode !== LoginMode.Initial && (
        <>
          <Separator className="my-4" />
          <div className="mt-3">
            <Button
              variant="secondary"
              onClick={() => setLoginMode(LoginMode.Initial)}
            >
              Go back
            </Button>
          </div>
        </>
      )}
    </>
  );
};

export default LoginForm;
