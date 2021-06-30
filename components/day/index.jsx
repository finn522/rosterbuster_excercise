//Core
import React from "react";
//Styles
import styles from "./styles.module.scss";
//Helpers
import dateParser from "helpers/dateParser";

const Day = ({ date, children }) => {
  //Convert date object into readable dutch equivalent.
  const parseDate = (input) => {
    const dateItemConverted = new Intl.DateTimeFormat("nl-NL", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(dateParser(input));
    return dateItemConverted;
  };

  return (
    <>
      <div className={styles.bar}>
        <div className={styles.content}>{parseDate(date)}</div>
      </div>
      <div>{children}</div>
    </>
  );
};

export default Day;
