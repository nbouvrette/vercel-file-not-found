import type { NextApiRequest, NextApiResponse } from "next";
import { readFileSync } from "node:fs";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log("info  - /api/hello has been called");
  try {
    const emailTemplate = readFileSync("emails/default.mjml", "utf8");
    res.status(200).json({ emailTemplate });
  } catch (error) {
    console.log("error - Error when calling hello.ts");
    console.dir(error);
    res.status(500).end();
  }
}
