import type { Product, ProductService, Result } from "@dibimo/core-lib";

export default class ProductServiceImp implements ProductService {
  Add(entity: Product): Result {
    throw new Error("Method not implemented.");
  }
  Remove(id: string): Result {
    throw new Error("Method not implemented.");
  }
  Update(entity: Product): Result {
    throw new Error("Method not implemented.");
  }
  List(): Result<Product[]> {
    throw new Error("Method not implemented.");
  }
  GetById(id: string): Result<Product> {
    throw new Error("Method not implemented.");
  }

}
