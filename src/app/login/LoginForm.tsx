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

  if (loginMode === LoginMode.Initial)
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-8">
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
    );

  return (
    <>
      {loginMode === LoginMode.ViewOnlyWallet && <ViewWalletInput />}
      {loginMode === LoginMode.FullWallet && <FullWalletInput />}
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
    </>
  );
};

export default LoginForm;
