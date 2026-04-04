import { createApplicationInstance } from "@luanamaistro/core-lib";
import { serviceFactory } from "./servicesImp/serviceFactiory";

const application = createApplicationInstance(serviceFactory)

export default application;

