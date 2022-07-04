import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { createStreamer } from "~/lib/db/streamer";

const handler: NextApiHandler = async (req, res) => {
  console.log(req.query);
  switch (req.method) {
    case "POST":
      streamerPostHandler(req, res);
      break;
    default:
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

const streamerPostHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { id, name, alias } = req.body;
  const result = await createStreamer(String(id), {
    name,
    alias,
    socket: `${Date.now()}`,
  });

  res.json({ isLoggedIn: true, ...result });
};

export default handler;
