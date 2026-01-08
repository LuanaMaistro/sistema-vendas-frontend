import { fakerPT_BR as faker } from '@faker-js/faker'
import { CNPJ, CPF, type Customer, type CustomerService, type Result } from "@dibimo/core-lib";

faker.seed(123)

function createRandomCustomer(): Customer {

  return {
    id: faker.string.uuid(),
    name: faker.company.name(),
    Cnpj: CNPJ.create("15.250.180/0001-37"),
    CustomerContact: {
      email: faker.internet.email(),
      phone: faker.phone.number({ style: "national" })
    }
  }
}
const mockCustomers = Array.from({ length: 15 }, createRandomCustomer)

export default class CustomerServiceImp implements CustomerService {
  Add(entity: Customer): Result {
    mockCustomers.unshift(entity)

    return {
      code: 200,
      success: true,
    }
  }
  Remove(id: string): Result {
    throw new Error("Method not implemented.");
  }
  Update(entity: Customer): Result {
    const customerIndex = this.getCustomerIndex(entity.id!)
    const customerUpdated = { ...mockCustomers[customerIndex] }
    customerUpdated.Cpf = entity.Cpf
    customerUpdated.Cnpj = entity.Cnpj
    customerUpdated.name = entity.name
    if(!customerUpdated.CustomerContact) {
      customerUpdated.CustomerContact = {
        email: entity.CustomerContact?.email,
        phone: entity.CustomerContact?.phone,
      }
    }
    else {
      customerUpdated.CustomerContact!.email = entity.CustomerContact?.email
      customerUpdated.CustomerContact!.phone = entity.CustomerContact?.phone

    }
    return {
      code: 200,
      success: true,
    }
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
    return {
      success: true,
      code: 200,
      data: mockCustomers[this.getCustomerIndex(id)]
    }
  }

  private getCustomerIndex(customerId: string) {
    const result = mockCustomers.findIndex((c) => c.id! == customerId)
    if(result < 0) throw 'cliente não encontrado'
    return result
  }
}

