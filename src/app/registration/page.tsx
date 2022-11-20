"use client";

import type { NextPage } from "next/types";
import { useState } from "react";

import FullWalletInput from "~/components/FullWalletInput";
import FullWalletCreation from "~/components/RegisterStepper/FullWalletCreation";
import UsernameDisplaynameInput from "~/components/UsernameDisplaynameInput";
import ViewWalletInput from "~/components/ViewWalletInput";

export type RegistrationMode =
  | "fullWalletCreation"
  | "fullWallet"
  | "viewOnlyWallet";

const RegistrationPage: NextPage = () => {
  const [registrationMode, setRegistrationMode] =
    useState<RegistrationMode | null>(null);
  const [registrationStep, setRegistrationStep] = useState<number>(0);

  const handleStepChange = (mode: RegistrationMode | null, step: number) => {
    setRegistrationMode(step === 0 ? null : mode);
    setRegistrationStep(step);
  };

  return (
    <div className="container max-w-md text-center">
      <h1 className="mb-2 text-3xl">Register to TipXMR</h1>
      <p>{`You don't need to provide any personal data to use TipXMR.`}</p>
      {registrationStep === 0 && (
        <div className="mx-auto my-8 flex w-72 flex-col gap-4">
          <button
            className="btn-primary"
            onClick={() => handleStepChange("fullWalletCreation", 1)}
          >
            Register with new wallet
          </button>
          <button
            className="btn-primary"
            onClick={() => handleStepChange("fullWallet", 1)}
          >
            Register with existing seed
          </button>
          <button
            className="btn-primary"
            onClick={() => handleStepChange("viewOnlyWallet", 1)}
          >
            Register with existing private view key
          </button>
        </div>
      )}
      {registrationMode === "fullWalletCreation" && registrationStep === 1 && (
        <FullWalletCreation handleStepChange={handleStepChange} />
      )}
      {registrationMode === "viewOnlyWallet" && registrationStep === 1 && (
        <ViewWalletInput handleStepChange={handleStepChange} />
      )}
      {registrationMode === "fullWallet" && registrationStep === 1 && (
        <FullWalletInput handleStepChange={handleStepChange} />
      )}
      {registrationStep === 2 && <UsernameDisplaynameInput />}
      {registrationStep > 0 && (
        <button
          className="btn-primary mt-2 w-full"
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
