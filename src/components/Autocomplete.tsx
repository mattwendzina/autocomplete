import { useState } from "react";
import courseData from "../courses.json";
import styles from "./autocomplete.module.css";
import { debounce } from "../utils/debounce";

interface AutocompleteProps {
  minQueryLength?: number;
  resultsLimit?: number;
}

export const Autocomplete = (props: AutocompleteProps) => {
  const { minQueryLength = 0, resultsLimit = 0 } = props;
  const [results, setResults] = useState<string[]>([]);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value;

    if (minQueryLength > searchValue.length) {
      return;
    }

    if (!searchValue) {
      setResults([""]);
      return;
    }

    const entries = Object.entries(courseData);
    const results = entries
      .filter(([key]) => {
        const joinedKey = key.split("-").join("");
        return joinedKey.includes(searchValue.toLowerCase().replace(/\s/g, ""));
      })
      .map((result) => {
        return result[1];
      })
      .filter((_result, index) => {
        if (resultsLimit > 0 && resultsLimit <= index) {
          return false;
        }
        return true;
      });

    setResults(results);
  };

  const debouncedHandleChange = debounce(handleOnChange, 1000);

  return (
    <div className={styles["c-autocomplete"]}>
      <div>
        <label htmlFor="search">
          Search for something{" "}
          <input
            type="text"
            id="search"
            onChange={(e) => debouncedHandleChange(e)}
          />
        </label>
      </div>
      <ul className={styles["c-autocomplete__results-container"]}>
        {results?.map((result, index) => (
          <li key={index} className={styles["c-autocomplete__result"]}>
            {result}
          </li>
        ))}
      </ul>
    </div>
  );
};
