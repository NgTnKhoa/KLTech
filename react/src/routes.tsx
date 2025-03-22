import { createBrowserRouter } from "react-router-dom";
import App from "@/App.tsx";

export const routes = createBrowserRouter([
  {path: "/", element: <App/>},
]);