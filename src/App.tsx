import { useState } from "react";
import "./App.css";
import data from "./data.json";

function App() {
  const [results, setResults] = useState<string[]>([""]);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value;

    if (!searchValue) {
      setResults([""]);
      return;
    }

    const entries = Object.entries(data);
    const results = entries
      .filter(([key]) => {
        const joinedKey = key.split("-").join("");

        return joinedKey.includes(searchValue.replace(/\s/g, ""));
      })
      .map((result) => result[1]);

    setResults(results);
  };

  return (
    <>
      <h1>Autocomplete</h1>
      <p className="read-the-docs">Building an autocomplete</p>
      <div>
        <label htmlFor="search">
          Search for something{" "}
          <input type="text" id="search" onChange={(e) => handleOnChange(e)} />
        </label>
      </div>
      <ul>
        {results?.map((result) => (
          <li>{result}</li>
        ))}
      </ul>
    </>
  );
}

export default App;
