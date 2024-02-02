"use client";

import { useState } from "react";

import FullWalletInput from "~/components/FullWalletInput";
import ViewWalletInput from "~/components/ViewWalletInput";
import { Button } from "~/components/ui/button";

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
        <div className="flex flex-col items-center justify-center gap-4">
          <Button onClick={() => handleStepChange(LoginMode.FullWallet)}>
            Login with your seed
          </Button>
          <Button onClick={() => handleStepChange(LoginMode.ViewOnlyWallet)}>
            Login with existing private view key
          </Button>
        </div>
      )}
      {loginMode === LoginMode.ViewOnlyWallet && <ViewWalletInput />}
      {loginMode === LoginMode.FullWallet && <FullWalletInput />}
      {loginMode !== LoginMode.Initial && (
        <div className="mt-3">
          <Button
            variant="secondary"
            onClick={() => setLoginMode(LoginMode.Initial)}
          >
            Go back
          </Button>
        </div>
      )}
    </>
  );
};

export default LoginForm;
