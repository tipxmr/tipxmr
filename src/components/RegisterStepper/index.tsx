import { CheckIcon } from "@radix-ui/react-icons";
import clsx from "clsx";
import Image from "next/image";
import { FC, FormEvent, Suspense, useId, useState } from "react";

import TipxmrLogo from "~/img/logo.png";

import AccountCreation from "./AccountCreation";
import WalletCreation from "../FullWalletCreation";
import RegistrationInfo from "./RegistrationInfo";
import Success from "./Success";

interface RegisterProps {
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

const steps = [
  { icon: 1, label: "This is TipXMR" },
  { icon: 2, label: "Wallet creation" },
  { icon: 3, label: "Account creation" },
  { icon: 4, label: "Success" },
];

function getStepContent(step: number, seedLang?: string) {
  switch (step) {
    case 0:
      return <RegistrationInfo />;
    case 1:
      return (
        <Suspense fallback="Loading Wallet...">
          <WalletCreation />
        </Suspense>
      );
    case 2:
      return <AccountCreation />;
    case 3:
      return <Success />;
    default:
      throw new Error("Unknown step");
  }
}

function Step({ icon, label, done = false, disabled = false }) {
  return (
    <div className="px-2">
      <span className="pr-2">
        <span
          className={clsx(
            "inline-flex h-6 w-6 items-center justify-center rounded-full text-white",
            disabled ? "bg-gray-400" : "bg-blue-500"
          )}
        >
          {done ? <CheckIcon /> : icon}
        </span>
      </span>
      <span>{label}</span>
    </div>
  );
}

function Connector() {
  return <div className="flex-auto border-t"></div>;
}

function Stepper({ activeStep, className }) {
  return (
    <div className={clsx("flex flex-row items-center", className)}>
      {steps.map((step, index) => {
        return (
          <>
            {index === 0 ? null : <Connector />}
            <Step
              key={step.label}
              icon={step.icon}
              label={step.label}
              disabled={activeStep < index}
              done={activeStep > index}
            />
          </>
        );
      })}
    </div>
  );
}

import { Indicator, Root } from "@radix-ui/react-checkbox";

type CheckboxProps = {
  name?: string;
  label?: string;
  required?: boolean;
  onChange?: (value: boolean) => void;
  checked?: boolean;
  disabled?: boolean;
};

function Checkbox({
  name,
  label,
  required,
  onChange,
  checked,
  disabled,
}: CheckboxProps) {
  const id = useId();

  return (
    <div className="flex items-center">
      <Root
        id={id}
        className="flex h-5 w-5 items-center justify-center bg-gray-200"
        name={name}
        onCheckedChange={onChange}
        checked={checked}
        disabled={disabled}
        required={required}
      >
        <Indicator className="text-black">
          <CheckIcon />
        </Indicator>
      </Root>
      <label className="select-none pl-3" htmlFor={id}>
        {label}
      </label>
    </div>
  );
}

const Register: FC<RegisterProps> = ({ handleSubmit }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [infoUnderstood, setInfoUnderstood] = useState(false);
  const [accountUnderstood, setAccountUnderstood] = useState(false);
  const [seedWritten, setSeedWritten] = useState(false);
  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleInfoAgree = () => {
    setInfoUnderstood(!infoUnderstood);
  };
  const handleAccountAgree = () => {
    setAccountUnderstood(!accountUnderstood);
  };
  const handleSeedWritten = () => {
    setSeedWritten(!seedWritten);
  };

  // TODO: implement the color scheme here on the avatars. Also DRY
  return (
    <div className="container max-w-4xl">
      <form
        className="rounded bg-white p-4 drop-shadow-md"
        onSubmit={handleSubmit}
      >
        <div className="flex justify-center">
          <Image src={TipxmrLogo} alt="TipXMR Logo" width={250} height={50} />
        </div>

        <h2 className="mt-2 text-center">Register</h2>

        <Stepper activeStep={activeStep} className="pt-3 pb-5" />

        <div className="flex justify-end">
          {activeStep >= 1 && (
            <button className="btn-primary mt-3 ml-1" onClick={handleBack}>
              Back
            </button>
          )}
          {activeStep == 0 && (
            <button
              disabled={activeStep == 0 && infoUnderstood}
              onClick={handleNext}
              className="btn-primary disabled:bg-gray-400"
            >
              Next
            </button>
          )}

          {activeStep == 1 && (
            <button
              className="btn-primary mt-3 ml-1"
              disabled={activeStep == 1 && seedWritten}
              onClick={handleNext}
            >
              Next
            </button>
          )}
          {activeStep == 2 && (
            <button
              className="btn-primary mt-3 ml-1"
              disabled={activeStep == 2 && accountUnderstood}
              onClick={handleNext}
            >
              Next
            </button>
          )}
        </div>

        {getStepContent(activeStep)}

        {activeStep === 0 && (
          <div className="flex flex-row items-center justify-end">
            <Checkbox
              required
              onChange={handleInfoAgree}
              checked={infoUnderstood}
              label={<>I have read the above disclaimer.</>}
            />
          </div>
        )}

        {activeStep === 1 && (
          <div className="justify-left mx-auto mt-3 flex flex-row items-center">
            <Checkbox
              required
              name="seedWritten"
              onChange={handleSeedWritten}
              checked={seedWritten}
              label={
                <>
                  I have written down my seed phrase. I understand that I am
                  responsible for my own security. TipXMR is not liable.
                </>
              }
            />
            <label className="uppercase"></label>
          </div>
        )}

        {activeStep === 2 && (
          <div className="flex flex-row items-center justify-end">
            <Checkbox
              required
              onChange={handleAccountAgree}
              checked={accountUnderstood}
              label={<>I want to sign up to TipXMR.</>}
            />
          </div>
        )}

        {activeStep === 3 && (
          <div className="flex flex-row items-center justify-end">
            <Checkbox
              required
              name="understood"
              onChange={handleAccountAgree}
              label={
                <>
                  I understand that I am responsible for my own security. TipXMR
                  is not liable.
                </>
              }
            />
            <button className="btn-primary" type="submit">
              Create wallet and continue
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default Register;
