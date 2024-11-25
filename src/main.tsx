import ReactDOM from "react-dom/client";
import App from "./App";
import { RoleProvider } from "./context/RoleProvider";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <RoleProvider>
    <App />
  </RoleProvider>
);
