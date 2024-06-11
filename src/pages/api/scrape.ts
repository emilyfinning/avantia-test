import type { NextApiRequest, NextApiResponse } from "next";

const evidenceCharLimit = 40;

const getArticle = async (link: string) => {
  const res = await fetch(link);
  const text = await res.text();
  return text.toLowerCase();
};

const getEvidence = (word: string, text: string) => {
  let occurences = 0;
  const occurenceIndexes = [] as Number[];
  const occurenceEvidence = [] as string[];

  let lastOccurence = text.indexOf(word);

  while (lastOccurence !== -1) {
    occurences++;
    occurenceIndexes.push(lastOccurence);

    let startIndex = lastOccurence;
    let charCount = 0;

    while (
      text[startIndex - 1] !== ">" &&
      charCount < evidenceCharLimit &&
      startIndex > 0
    ) {
      startIndex--;
      charCount++;
    }

    let endIndex = lastOccurence + word.length;
    charCount = 0;

    while (
      text[endIndex + 1] !== "<" &&
      charCount < evidenceCharLimit &&
      endIndex < text.length
    ) {
      endIndex++;
      charCount++;
    }

    occurenceEvidence.push(text.slice(startIndex, endIndex));

    lastOccurence = text.indexOf(word, lastOccurence + 1);
  }

  const setEvidence = Array.from(new Set(occurenceEvidence)).filter(
    (evidence) =>
      !evidence.includes("/") &&
      !evidence.includes("+") &&
      !evidence.includes("-") &&
      !evidence.includes("_"),
  );

  return setEvidence;
};

type ScrapeEvidence = {
  result: boolean;
  evidence: string[];
};

type Response = {
  message: string;
  bankrupt: ScrapeEvidence;
  fraud: ScrapeEvidence;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response>,
) {
  const article = await getArticle(req.body.link);
  const bankrupcy = getEvidence("bankrupt", article);
  const fraud = getEvidence("fraud", article);
  res.status(200).json({
    message: "Done",
    bankrupt: { result: bankrupcy.length > 0, evidence: bankrupcy },
    fraud: { result: fraud.length > 0, evidence: fraud },
  });
}
