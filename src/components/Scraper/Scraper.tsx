import { useState } from "react";
import ScrapeCard from "../ScrapeCard/ScrapeCard";
import styles from "./Scraper.module.css";

const Scraper = () => {
  const [linkToScrape, setLinkToScrape] = useState("");

  const [isBankrupt, setIsBankrupt] = useState<undefined | boolean>();
  const [bankruptEvidence, setBankruptEvidence] = useState<string[]>([]);

  const [isFraud, setIsFraud] = useState<undefined | boolean>();
  const [fraudEvidence, setFraudEvidence] = useState<string[]>([]);

  const scrapeLink = async () => {
    const response = await fetch("/api/scrape", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ link: linkToScrape }),
    });

    const jsonResponse = await response.json();

    setBankruptEvidence(jsonResponse.bankrupt.evidence);
    setIsBankrupt(jsonResponse.bankrupt.result);

    setFraudEvidence(jsonResponse.fraud.evidence);
    setIsFraud(jsonResponse.fraud.result);
  };

  return (
    <div className={styles.container}>
      <input
        type="text"
        value={linkToScrape}
        onChange={(e) => setLinkToScrape(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && scrapeLink()}
        className={styles.input}
      />
      <div className={styles.cards}>
        <ScrapeCard
          cardName="Bankrupt"
          evidence={bankruptEvidence}
          guilty={isBankrupt}
        />

        <ScrapeCard
          cardName="Fraud"
          evidence={fraudEvidence}
          guilty={isFraud}
        />
      </div>
    </div>
  );
};

export default Scraper;
