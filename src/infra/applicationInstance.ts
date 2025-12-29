import { createApplicationInstance } from "@dibimo/core-lib";
import { serviceFactory } from "./servicesImp/serviceFactiory";

const application = createApplicationInstance(serviceFactory)

export default application;

