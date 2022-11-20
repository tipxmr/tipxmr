import * as Checkbox from "@radix-ui/react-checkbox";
import { CheckIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";
import { FormEvent } from "react";

import TipxmrLogo from "~/img/logo.png";

import SeedInput from "./SeedInput";

interface LoginProps {
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

const Login = ({ handleSubmit }: LoginProps) => {
  return (
    <div className="container max-w-xl">
      <div className="mt-8 flex flex-col items-center">
        <div className="rounded border border-solid border-gray-200 bg-white p-4">
          <div className="flex justify-center">
            <Image src={TipxmrLogo} alt="TipXMR Logo" width={250} height={50} />
          </div>
          <h2 className="mt-2 text-center">Login</h2>
          <form noValidate className="mt-1" onSubmit={handleSubmit}>
            <SeedInput />

            <div className="flex items-center">
              <Checkbox.Root
                name="understood"
                className="flex h-5 w-5 bg-gray-200"
              >
                <Checkbox.Indicator className="text-black">
                  <CheckIcon />
                </Checkbox.Indicator>
              </Checkbox.Root>
              <label className="pl-3">
                I understand that I am responsible for my own security and
                TipXMR has no liability
              </label>
            </div>

            <div className="flex items-center">
              <Checkbox.Root
                name="remember"
                className="flex h-5 w-5 bg-gray-200"
              >
                <Checkbox.Indicator className="text-black">
                  <CheckIcon />
                </Checkbox.Indicator>
              </Checkbox.Root>
              <label className="pl-3">Remember me</label>
            </div>

            <div className="flex flex-row items-center justify-between">
              <button className="btn-primary mt-3 mb-2 block" type="submit">
                Let&apos;s go!
              </button>
              <Link href="/register">Don&apos;t have an account yet?</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Login;
