import { Grid, Paper } from "@mui/material";
import { FC } from "react";
import PaymentSuccess from "../PaymentSuccess";
import PaymentForm from "./PaymentForm";
import PlanForm from "./PlanForm";

interface IInvoice {}

const steps = ["Choose plan", "Payment", "Success"];

function getStepContent(step: number) {
  switch (step) {
    case 0:
      return <PlanForm />;
    case 1:
      return <PaymentForm />;
    case 2:
      return (
        <PaymentSuccess
          amount={2}
          address="73Ajo8zALxQdaj4UJHprYXGrxurbMtxnZiJnLaXhFQ7GKyGNgsG95LqNyRLQiaXKfMbRe5gTdnHVJV5qWJRc58x2QfyuEBz"
        />
      );
    default:
      throw new Error("Unknown step");
  }
}
const Invoice: FC<IInvoice> = ({}) => {
  return (
    <Paper>
      <Grid container>
        <Grid item></Grid>
      </Grid>
    </Paper>
  );
};

export default Invoice;
