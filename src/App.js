import {BrowserRouter } from "react-router-dom";
import { Provider} from "react-redux";
import Root from "./common/Root";
import Store from "./redux/Store";
import './App.css';


function App() {
  return (
    <Provider store={Store}>
      <BrowserRouter>
        <Root />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
