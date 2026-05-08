import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { Home } from "./views/Home";
import { Control } from "./views/Control";
import { Commands } from "./views/Commands";
import { Processes } from "./views/Processes";
import { Screenshots } from "./views/Screenshots";
import { Logs } from "./views/Logs";
import { Diagnostics } from "./views/Diagnostics";
import { Settings } from "./views/Settings";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "control", Component: Control },
      { path: "commands", Component: Commands },
      { path: "processes", Component: Processes },
      { path: "screenshots", Component: Screenshots },
      { path: "logs", Component: Logs },
      { path: "diagnostics", Component: Diagnostics },
      { path: "settings", Component: Settings },
    ],
  },
]);
