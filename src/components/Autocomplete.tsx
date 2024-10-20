import { useState } from "react";
import searchData from "../data.json";
import styles from "./autocomplete.module.css";

export const Autocomplete = () => {
  const [results, setResults] = useState<string[]>([""]);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value;

    if (!searchValue) {
      setResults([""]);
      return;
    }

    const entries = Object.entries(searchData);
    const results = entries
      .filter(([key]) => {
        const joinedKey = key.split("-").join("");

        return joinedKey.includes(searchValue.toLowerCase().replace(/\s/g, ""));
      })
      .map((result) => result[1]);

    setResults(results);
  };

  return (
    <div className={styles["c-autocomplete"]}>
      <div>
        <label htmlFor="search">
          Search for something{" "}
          <input type="text" id="search" onChange={(e) => handleOnChange(e)} />
        </label>
      </div>
      <ul className={styles["c-autocomplete__results-container"]}>
        {results?.map((result) => (
          <li className={styles["c-autocomplete__result"]}>{result}</li>
        ))}
      </ul>
    </div>
  );
};
