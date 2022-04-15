import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { createBlankDonation } from "~/lib/db/donation";
import { withSessionRoute } from "~/lib/withSession";

const handler: NextApiHandler = async (req, res) => {
  switch (req.method) {
    case "POST":
      handlePost(req, res);
      break;
    default:
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

const handlePost = async (
  request: NextApiRequest,
  response: NextApiResponse
) => {
  const user = request.session.user;

  if (!user || user.isLoggedIn === false) {
    response.status(401).json({
      message: "Not Authorized",
    });
    return;
  }

  const { id } = request.query;
  console.log(request.body);
  const { subaddress } = request.body?.data;

  if (!id) throw new Error("Provide a streamer id");
  if (!subaddress) throw new Error("We need a subaddress");

  try {
    const donation = await createBlankDonation(String(id), { subaddress });

    if (donation) {
      response.status(200).json({ donation });
      return;
    }

    throw new Error("This user does not exist");
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      const { message } = error;
      response
        .status(500)
        .json({ error: `failed to create streamer, ${message}` });
    }
    console.error(error);
  }
};

export default withSessionRoute(handler);
