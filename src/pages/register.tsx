import { NextPage } from "next";
import Register from "~/components/RegisterStepper";
import { ErrorBoundary } from "react-error-boundary";

const Home: NextPage = () => {
  return <Register />;
};

const Wrapper: NextPage = () => {
  return (
    <ErrorBoundary
      FallbackComponent={({ error }) => <div>{error.message}</div>}
      onError={console.log}
    >
      <Home />
    </ErrorBoundary>
  );
};

export default Wrapper;
