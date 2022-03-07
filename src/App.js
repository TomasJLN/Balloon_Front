import { AppRoute } from "./routes/AppRoute";
import "./App.css";
import { StrictMode } from "react";

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
