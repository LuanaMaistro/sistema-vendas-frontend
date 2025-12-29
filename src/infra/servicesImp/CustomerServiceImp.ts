import type { Customer, CustomerService, Result } from "@dibimo/core-lib";

export default class CustomerServiceImp implements CustomerService {
  Add(entity: Customer): Result {
    throw new Error("Method not implemented.");
  }
  Remove(id: string): Result {
    throw new Error("Method not implemented.");
  }
  Update(entity: Customer): Result {
    throw new Error("Method not implemented.");
  }
  List(): Result<Customer[]> {
    throw new Error("Method not implemented.");
  }
  GetById(id: string): Result<Customer> {
    throw new Error("Method not implemented.");
  }

}

