import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { createDonation, getDonation } from "~/lib/db/donation";

const handler: NextApiHandler = async (req, res) => {
  console.log(req.query);
  switch (req.method) {
    case "GET":
      donationGetHandler(req, res);
      break;
    case "POST":
      donationPostHandler(req, res);
      break;
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

const donationGetHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { name } = req.query;
  const result = await getDonation(String(name));

  res.json(result);
};

const donationPostHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { name: id } = req.query;
  const { data } = req.body;
  console.log("subaddres before donation: ", data?.subaddress);
  const result = await createDonation(String(id), data);

  res.json(result);
};

export default handler;
