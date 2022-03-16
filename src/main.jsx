import * as ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { WeatherProvider } from "./Context";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <WeatherProvider>
      <App />
    </WeatherProvider>
  </React.StrictMode>
);
