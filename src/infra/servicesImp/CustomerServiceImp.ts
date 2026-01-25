import { fakerPT_BR as faker } from '@faker-js/faker'
import { CNPJ, CPF, type Customer, type CustomerService, type Result } from "@dibimo/core-lib";
import { type ClienteDTO } from '../api';
import createApiClients from '../api/apiClientFactory';
import { convertCustomerToClienteCreateDTO } from './mappers/customerMappers';

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

  Remove(id: string): Result {
    const customerIndex = this.getCustomerIndex(id)
    delete mockCustomers[customerIndex]
    mockCustomers = mockCustomers.filter(Boolean)
    return {
      code: 200,
      success: true,
    }
  }

  Update(entity: Customer): Result {
    const customerIndex = this.getCustomerIndex(entity.id!)
    const customerUpdated = { ...mockCustomers[customerIndex] }
    customerUpdated.Cpf = entity.Cpf
    customerUpdated.Cnpj = entity.Cnpj
    customerUpdated.name = entity.name
    mockCustomers[customerIndex] = customerUpdated
    return {
      code: 200,
      success: true,
    }
  }

  async List(): Promise<Result<Customer[]>> {


    const [customerApi] = createApiClients('ClientesApi')

    const resultApi = await customerApi.apiClientesGet()

    const toCustomer = (dto: ClienteDTO): Customer => {
      const result = {
        id: dto.id,
        name: dto.nome!,

      } as Customer

      const preencherDocumentos = (customer: Customer, dto: ClienteDTO) => {
        if(dto.tipoDocumento == "CNPJ") {
          customer.Cnpj = CNPJ.create(dto.documento!)
        }
        else {
          customer.Cpf = CPF.create(dto.documento!)
        }
      }

      preencherDocumentos(result, dto)
      return result
    }

    return {
      data: resultApi.data.map(toCustomer),
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

