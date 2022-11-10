import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Header } from "./components/layout";
import ListService from "./components/ListService";
import PointOfView from "./components/PointOfView";

function App() {
  return (
    <div class="container pb-5">
      <Header />
      <PointOfView />
      <ListService />
    </div>
  );
}

export default App;
