"use client";

import Link from "next/link";
import type { NextPage } from "next/types";

import useUser from "~/lib/useUser";
import Tooltip from "~/components/Tooltip";

const RegistrationPage: NextPage = () => {
  useUser({
    redirectTo: "/dashboard",
    redirectIfFound: true,
  });

  return (
    <div className="container max-w-md text-center">
      <h1 className="mb-2 text-3xl">Register to TipXMR</h1>
      <p>{`You don't need to provide any personal data to use TipXMR.`}</p>

      <div className="mx-auto my-8 flex w-72 flex-col gap-4">
        <Tooltip tooltip={NewWalletTooltip()}>
          <Link href="/registration/new">
            <button className="btn-primary w-full">
              Register with new wallet
            </button>
          </Link>
        </Tooltip>
        <Tooltip tooltip={ViewKeyTooltip()}>
          <Link href="/registration/view-only">
            <button className="btn-primary w-full">
              Register with existing private view key
            </button>
          </Link>
        </Tooltip>
        <Tooltip tooltip={ExistingSeedTooltip()}>
          <Link href="/registration/existing">
            <button className="btn-primary w-full">
              Register with existing seed
            </button>
          </Link>
        </Tooltip>
      </div>
    </div>
  );
};

export default RegistrationPage;

const NewWalletTooltip = () => (
  <>
    <strong>Recommended: </strong>Create a fresh wallet for TipXMR donations.
    This ensures separation of concerns for your wallets. The new wallet is
    generated in <em>your</em> browser. TipXMR can never see your seed phrase.
  </>
);

const ViewKeyTooltip = () => (
  <>
    <strong>Advanced: </strong>
    Minimal setup to receive live donations. With this option your private spend
    key is never exposed. However, you should still create a fresh wallet for
    TipXMR use.
  </>
);

const ExistingSeedTooltip = () => (
  <>
    <strong>Discouraged: </strong>Entering a seed with XMR on it is a bad idea.
    You should not mix a personal wallet with your TipXMR donations. If you
    choose this option, you should create a new wallet yourself.
  </>
);
