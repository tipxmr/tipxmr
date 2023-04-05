import { FC, useState } from "react";

import PaymentSuccess from "../PaymentSuccess";
import PaymentForm from "./PaymentForm";
import PlanForm from "./PlanForm";

const steps = ["1. Select your plan", "2. Payment", "3. Start streaming!"];

function getStepContent(step: number) {
  const dummyAddress =
    "73Ajo8zALxQdaj4UJHprYXGrxurbMtxnZiJnLaXhFQ7GKyGNgsG95LqNyRLQiaXKfMbRe5gTdnHVJV5qWJRc58x2QfyuEBz";
  switch (step) {
    case 0:
      return <PlanForm />;
    case 1:
      return <PaymentForm />;
    case 2:
      return <PaymentSuccess amount={2} address={dummyAddress} />;
    default:
      throw new Error("Unknown step");
  }
}
const Invoice: FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const orderNo = "#2001539";
  return (
    <div className="tip-border rounded-lg px-2 py-5">
      <div className="flex flex-row justify-center space-x-5">
        {steps.map((label) => (
          <div key={label}>
            <p>{label}</p>
          </div>
        ))}
      </div>
      {activeStep === steps.length ? (
        <>
          <h2>Thank you for your order.</h2>
          <p>
            Your order number is {orderNo}. We have emailed your order
            confirmation, and will send you an update when your order has
            shipped.
          </p>
        </>
      ) : (
        <>
          {getStepContent(activeStep)}
          <div className="flex flex-col">
            {activeStep !== 0 && (
              <button className="btn-primary ml-1 mt-3" onClick={handleBack}>
                Back
              </button>
            )}
            <button className="btn-primary ml-1 mt-3" onClick={handleNext}>
              {activeStep === steps.length - 1 ? "Place order" : "Next"}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Invoice;
