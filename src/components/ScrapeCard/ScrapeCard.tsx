import styles from "./ScrapeCard.module.css";

interface Props {
  cardName: string;
  evidence: string[];
  guilty: boolean | undefined;
}

const ScrapeCard = ({ cardName, evidence, guilty }: Props) => {
  return (
    <div>
      <div className={styles.titleContainer}>
        <div className={styles.title}>{cardName.toUpperCase()}</div>
        {guilty === undefined ? (
          <div />
        ) : (
          <div
            className={styles.guiltyIndicator}
            style={{ backgroundColor: guilty ? "red" : "green" }}
          >
            {guilty ? "GUILTY" : "NOT GUILTY"}
          </div>
        )}
      </div>
      <div className={styles.evidenceContainer}>
        {guilty ? (
          evidence.map((i, idx) => (
            <div key={`evidence-${idx}`}>{`...${i}...`}</div>
          ))
        ) : guilty === undefined ? (
          <div />
        ) : (
          <div>No evidence of {cardName}</div>
        )}
      </div>
    </div>
  );
};

export default ScrapeCard;
