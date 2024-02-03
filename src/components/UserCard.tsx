"use client";

import { type Streamer } from "@prisma/client";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { buttonVariants } from "./ui/button";
import { cn } from "~/lib/utils";

interface Props {
  user: Streamer;
}

const UserCard = ({ user }: Props) => {
  const creationDate = user?.createdAt as unknown as string; //  its a string, typescript thinks otherwise
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-3xl">
          Welcome, {user?.alias ?? "anon"}
        </CardTitle>
        <CardDescription>
          Here is some information about your TipXMR account
        </CardDescription>
        <CardContent>
          <ul>
            <li>
              Username:{" "}
              <span className="font-semibold tracking-wider">{user?.name}</span>
            </li>
            <li>
              DisplayName:{" "}
              <span className="font-semibold tracking-wider">
                {user?.alias}
              </span>
            </li>

            <li>
              Account created:{" "}
              <span className="font-semibold tracking-wider">
                {new Date(creationDate).toDateString()}
              </span>
            </li>

            <li>
              Online:{" "}
              <span className="font-semibold tracking-wider">
                {user?.isOnline ? "true" : "false"}
              </span>
            </li>

            <li>
              Socket:{" "}
              <span className="font-semibold tracking-wider">
                {user?.socket ?? "no socket"}
              </span>
            </li>

            <li>
              Status:{" "}
              <span className="font-semibold tracking-wider">
                {user?.status}
              </span>
            </li>
          </ul>
        </CardContent>
        <CardFooter className="justify-end">
          <Link
            href="/dashboard/tx-history"
            className={cn(buttonVariants({ variant: "link" }), "text-xl")}
          >
            Go to donation history &rarr;
          </Link>
        </CardFooter>
      </CardHeader>
    </Card>
  );
};

export default UserCard;
