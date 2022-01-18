import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.body.hash === "aabbccddeeff") {
    res
      .status(200)
      .json({ id: 1, name: "J Smith", email: "jsmith@example.com" });
  } else {
    res.status(500).json(false);
  }
}
