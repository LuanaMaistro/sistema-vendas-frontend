import { fakerPT_BR as faker } from '@faker-js/faker'
import { CNPJ, type Customer, type CustomerService, type Result } from "@dibimo/core-lib";
import createApiClients from '../api/apiClientFactory';
import { convertClienteDTOToCustomer, convertCustomerToClienteCreateDTO, convertCustomerToClienteUpdateDTO } from './mappers/customerMappers';

faker.seed(123)

function createRandomCustomer(): Customer {

  return {
    id: faker.string.uuid(),
    name: faker.company.name(),
    Cnpj: CNPJ.create("15.250.180/0001-37"),
  }
}
let mockCustomers = Array.from({ length: 15 }, createRandomCustomer)

export default class CustomerServiceImp implements CustomerService {

  async Add(entity: Customer): Promise<Result> {
    const [customerApi] = createApiClients('ClientesApi')
    await customerApi.apiClientesPost(convertCustomerToClienteCreateDTO(entity))

    return {
      code: 200,
      success: true,
    }
  }

  async Remove(id: string): Promise<Result> {
    const [customerApi] = createApiClients('ClientesApi')
    await customerApi.apiClientesIdInativarPatch(id)

    return {
      code: 200,
      success: true,
    }
  }

  async Update(entity: Customer): Promise<Result> {
    const [customerApi] = createApiClients('ClientesApi')
    await customerApi.apiClientesIdPut(entity.id!, convertCustomerToClienteUpdateDTO(entity))

    return {
      code: 200,
      success: true,
    }
  }

  async List(): Promise<Result<Customer[]>> {
    const [customerApi] = createApiClients('ClientesApi')
    const resultApi = await customerApi.apiClientesGet()

    return {
      data: resultApi.data.map(convertClienteDTOToCustomer),
      success: true,
      code: 200,
    }
  }

  async GetById(id: string): Promise<Result<Customer>> {
    const [customerApi] = createApiClients('ClientesApi')
    const resultApi = await customerApi.apiClientesIdGet(id)

    return {
      success: true,
      code: 200,
      data: convertClienteDTOToCustomer(resultApi.data)
    }
  }

  private getCustomerIndex(customerId: string) {
    const result = mockCustomers.findIndex((c) => c.id! == customerId)
    if(result < 0) throw 'cliente não encontrado'
    return result
  }
}

