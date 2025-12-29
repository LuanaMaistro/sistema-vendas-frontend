import { createApplicationInstance } from "@dibimo/core-lib";
import { serviceFactory } from "./serviceFactiory";

const application = createApplicationInstance(serviceFactory)

export default application;

