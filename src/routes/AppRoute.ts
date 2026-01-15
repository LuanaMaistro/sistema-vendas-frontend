import type { JSX } from "react";

export default interface AppRoute {
  path: string,
  element: JSX.Element,
  title: string,
  icon?: JSX.Element
}

