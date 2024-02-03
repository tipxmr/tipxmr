import MaxWidthWrapper from "~/components/MaxWidthWrapper";
import { api } from "~/trpc/server";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import Link from "next/link";
import { buttonVariants } from "~/components/ui/button";

export default async function TxHistoryPage() {
  const { donations, total } = await api.donation.getDonationHistory.query();
  return (
    <MaxWidthWrapper className="my-6">
      <h1 className="tip-h1">Your past donations ( {total} total )</h1>
      <Table>
        <TableCaption>A list of your recent received donations.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>paid</TableHead>
            <TableHead>amount</TableHead>
            <TableHead>message</TableHead>
            <TableHead>display time</TableHead>
            <TableHead>gif url</TableHead>
            <TableHead>donor name</TableHead>
            <TableHead>date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {donations.map(
            ({
              id,
              isPaid,
              amount,
              message,
              timestamp,
              displayTimeSeconds,
              giphyUrl,
              donor,
            }) => (
              <TableRow key={id}>
                <TableCell>{isPaid}</TableCell>
                <TableCell>{amount}</TableCell>
                <TableCell>{message}</TableCell>
                <TableCell>{displayTimeSeconds}</TableCell>
                <TableCell>
                  {giphyUrl ? (
                    <Link
                      href={giphyUrl}
                      className={buttonVariants({ variant: "link" })}
                    >
                      Go to
                    </Link>
                  ) : (
                    "❌"
                  )}
                </TableCell>
                <TableCell>{donor}</TableCell>
                <TableCell>{timestamp?.toDateString()}</TableCell>
              </TableRow>
            ),
          )}
        </TableBody>
      </Table>
    </MaxWidthWrapper>
  );
}
