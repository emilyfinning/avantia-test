import { useEffect, useState } from "react";

const Scraper = () => {
  const [linkToScrape, setLinkToScrape] = useState("");

  const scrapeLink = async () => {
    const response = await fetch("/api/scrape", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ link: linkToScrape }),
    });

    const jsonResponse = await response.json();
    console.log("THE RESPONSE", jsonResponse);
  };

  return (
    <input
      type="text"
      value={linkToScrape}
      onChange={(e) => setLinkToScrape(e.target.value)}
      onKeyDown={(e) => e.key === "Enter" && scrapeLink()}
    />
  );
};

export default Scraper;
