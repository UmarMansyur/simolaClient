import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./app/store.ts";
import "flatpickr/dist/flatpickr.css";
import App from "./router/App.tsx";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Provider store={store}><App/></Provider>
  </BrowserRouter>
);
