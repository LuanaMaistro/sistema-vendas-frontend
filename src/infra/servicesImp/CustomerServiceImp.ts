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
    return {
      data: [
        this.createRandomCustomer()
      ],
      success: true,
      code: 200,
    }
  }

  private createRandomCustomer(): Customer {
    return {
      id: '1',
      name: 'Esse é um cliente de teste fixo apenas'
    }
  }
  GetById(id: string): Result<Customer> {
    throw new Error("Method not implemented.");
  }

}

