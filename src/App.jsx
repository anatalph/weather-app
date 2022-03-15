import "./App.css";
import { usePromiseTracker } from "react-promise-tracker";
import Loader from "react-promise-loader";
import LocationSearch from "./components/LocationSearch";
import CurrentLocation from "./components/CurrentLocation";
import PrevDayStats from "./components/PrevDayStats";
import CurrentStats from "./components/CurrentStats";

function App() {
  return (
    <div className="App">
      <Loader
        promiseTracker={usePromiseTracker}
        color={"#3d5e61"}
        background={"rgba(70,174,247,.75)"}
      />
      <LocationSearch />
      <CurrentLocation />
      <CurrentStats />
      <PrevDayStats />
    </div>
  );
}

export default App;
