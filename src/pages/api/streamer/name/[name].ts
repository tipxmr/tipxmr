import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

const handler: NextApiHandler = async (req, res) => {
  switch (req.method) {
    case "GET":
      streamerGetHandler(req, res);
      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

const streamerGetHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const { name } = req.query;

    if (!name) {
      res.status(400).json({ error: "Missing name on request query" });
      throw Error("Provide a streamer name");
    }

    const streamer = await prisma?.streamer.findUniqueOrThrow({
      where: { name: String(name) },
    });

    res.status(200).json(streamer);
  } catch (reason) {
    res.status(500).json({ error: "Streamer could not be fetched", reason });
  }
};

export default handler;
