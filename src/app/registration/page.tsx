"use client";

import type { NextPage } from "next/types";
import { useState } from "react";

import ViewWalletInput from "~/components/ViewWalletInput";

const RegistrationPage: NextPage = () => {
  const [registrationMode, setRegistrationMode] = useState<string | null>(null);
  const [registrationStep, setRegistrationStep] = useState<number>(0);

  const handleStepChange = (mode: string | null, step: number) => {
    setRegistrationMode(step === 0 ? null : mode);
    setRegistrationStep(step);
  };

  return (
    <div className="text-center">
      <h1 className="text-3xl">Register to TipXMR</h1>
      <p>{`You don't need to provide any personal data to use TipXMR.`}</p>
      {registrationStep === 0 && (
        <div className="mx-auto my-8 flex w-72 flex-col gap-4">
          <button className="btn-primary">Register with new wallet</button>
          <button className="btn-primary">Register with existing seed</button>
          <button
            className="btn-primary"
            onClick={() => handleStepChange("viewOnlyWallet", 1)}
          >
            Register with existing private view key
          </button>
        </div>
      )}
      {registrationMode === "viewOnlyWallet" && <ViewWalletInput />}
      {registrationStep > 0 && (
        <button
          className="btn-primary"
          onClick={() =>
            handleStepChange(registrationMode, registrationStep - 1)
          }
        >
          Go back
        </button>
      )}
    </div>
  );
};

export default RegistrationPage;
