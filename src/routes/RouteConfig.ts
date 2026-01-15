import type { JSX } from "react";

export default interface RouteConfig {
  path: string,
  element: JSX.Element,
  title: string,
  icon?: JSX.Element
}

