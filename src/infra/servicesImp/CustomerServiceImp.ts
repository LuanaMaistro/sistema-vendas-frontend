import type { Customer, CustomerService, Result } from "@dibimo/core-lib";
import createApiClients from '../api/apiClientFactory';
import { convertClienteDTOToCustomer, convertCustomerToClienteCreateDTO, convertCustomerToClienteUpdateDTO } from './mappers/customerMappers';

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
}

