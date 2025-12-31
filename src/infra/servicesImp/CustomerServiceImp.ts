import { CNPJ, type Customer, type CustomerService, type Result } from "@dibimo/core-lib";

function createRandomCustomer(): Customer {

  return {
    id: '1',
    name: 'Esse é um cliente de teste fixo apenas',
    Cnpj: CNPJ.create("47.185.159/0001-91"),
    CustomerContact: {
      email: 'diogobissolimoreno@gmail.com',
      phone: ''
    }
  }
}
const mockCustomers = [
  createRandomCustomer(),
  createRandomCustomer(),
  createRandomCustomer(),
  createRandomCustomer(),
  createRandomCustomer(),
  createRandomCustomer(),
]

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
        ...mockCustomers
      ],
      success: true,
      code: 200,
    }
  }

  GetById(id: string): Result<Customer> {
    throw new Error("Method not implemented.");
  }

}

