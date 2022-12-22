import type { NextApiRequest, NextApiResponse } from "next";
import { readFileSync } from "node:fs";
import path from "node:path";
import { getMessages } from "next-multilingual/messages";

const handler = async (
  request: NextApiRequest,
  response: NextApiResponse
): Promise<void> => {
  console.log("info  - /api/hello has been called");

  const locales = ["en-US", "fr-CA"];
  // Random locale
  const locale = locales[Math.round(Math.random())];

  try {
    const messages = getMessages(locale);
    const templateFile = path.join(process.cwd(), "emails", "default.mjml");
    const emailTemplate = readFileSync(templateFile, "utf8");
    response
      .status(200)
      .json({ locale, message: messages.format("helloKey"), emailTemplate });
  } catch (error) {
    console.log("error - Error when calling hello.ts");
    console.dir(error);
    response.status(500).end();
  }
};

export default handler;
