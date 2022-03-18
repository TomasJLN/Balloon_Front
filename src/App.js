import { AppRoute } from "./routes/AppRoute";
import { StrictMode } from "react";
import "./App.css";

function App() {
  return (
    <div className="App">
      <StrictMode>
        <AppRoute />
      </StrictMode>
    </div>
  );
}

export default App;
