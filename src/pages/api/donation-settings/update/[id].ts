import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { updateDonationSettings } from "~/lib/db/donationSettings";
import { withSessionRoute } from "~/lib/withSession";

const handler: NextApiHandler = async (req, res) => {
  switch (req.method) {
    case "POST":
      updateStreamerSettings(req, res);
      break;
    default:
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

async function updateStreamerSettings(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const user = request.session.user;

  if (!user || user.isLoggedIn === false) {
    response.status(401).json({
      message: "Not Authorized",
    });
    return;
  }

  try {
    const { body } = request;

    const { data } = body?.donationSettings;
    console.log("Data to db is: ", data);

    const result = await updateDonationSettings(String(user.id), data);

    response.status(200).json({ result });
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      const { message } = error;
      response
        .status(500)
        .json({ error: `failed to create streamer, ${message}` });
    }
    console.error(error);
  }
}

export default withSessionRoute(handler);
