import type { NextApiRequest, NextApiResponse } from "next";
import { readFileSync } from "node:fs";
import path from "node:path";

const handler = async (
  request: NextApiRequest,
  response: NextApiResponse
): Promise<void> => {
  console.log("info  - /api/hello has been called");
  try {
    const templateFile = path.join(process.cwd(), "emails", "default.mjml");
    const emailTemplate = readFileSync(templateFile, "utf8");
    response.status(200).json({ emailTemplate });
  } catch (error) {
    console.log("error - Error when calling hello.ts");
    console.dir(error);
    response.status(500).end();
  }
};

export default handler;
