import type { ServicesFactories } from "@dibimo/core-lib";
import CustomerServiceImp from "./CustomerServiceImp";
import ProductServiceImp from "./ProductServiceImp";

export const serviceFactory = {
  CustomerService: () => new CustomerServiceImp(),
  ProductService: () => new ProductServiceImp()

} as ServicesFactories

