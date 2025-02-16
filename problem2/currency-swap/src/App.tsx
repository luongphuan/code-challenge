import { useState } from "react";
import "./App.css";
import CurrencySwapForm from "./components/CurrencySwapForm";


function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <CurrencySwapForm />
    </>
  );
}

export default App;
