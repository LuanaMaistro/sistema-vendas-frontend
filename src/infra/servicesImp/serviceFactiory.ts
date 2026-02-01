import type { ServicesFactories } from "@dibimo/core-lib";
import CustomerServiceImp from "./CustomerServiceImp";
import ProductServiceImp from "./ProductServiceImp";
import SaleServiceImp from "./SaleServiceImp";

export const serviceFactory = {
  CustomerService: () => new CustomerServiceImp(),
  ProductService: () => new ProductServiceImp(),
  SaleService: () => new SaleServiceImp()

} as ServicesFactories

