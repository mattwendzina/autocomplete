import "./App.css";
import { Autocomplete } from "./components/Autocomplete";

function App() {
  return (
    <>
      <h1>Autocomplete</h1>
      <p className="read-the-docs">Building an autocomplete</p>
      <Autocomplete minQueryLength={2} resultsLimit={2} />
    </>
  );
}

export default App;
