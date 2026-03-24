import type { Customer, CustomerService, ListCustomerFilters, Recommendation, Result } from "@dibimo/core-lib";
import createApiClients from '../api/apiClientFactory';
import { convertClienteDTOToCustomer, convertCustomerToClienteCreateDTO, convertCustomerToClienteUpdateDTO } from './mappers/customerMappers';
import { convertRecomendacaoItemDTOToRecommendation } from './mappers/recommendationMappers';

export default class CustomerServiceImp implements CustomerService {

  async ToogleActiveStatus(customer: Customer): Promise<Result> {
    const [customerApi] = createApiClients('ClientesApi')

    if (customer.active)
      await customerApi.apiClientesIdInativarPatch(customer.id!)
    else
      await customerApi.apiClientesIdAtivarPatch(customer.id!)

    return {
      code: 200,
      success: true,
    }
  }

  async ListCustomers(filters: ListCustomerFilters): Promise<Result<Array<Customer>>> {

    if(!filters.onlyActives)
      return await this.List()

    const [customerApi] = createApiClients('ClientesApi')
    const resultApi = await customerApi.apiClientesAtivosGet()

    return {
      data: resultApi.data.map(convertClienteDTOToCustomer),
      code: 200,
      success: true,
    }
  }

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

  async GetRecommendations(customerId: string, quantidade?: number): Promise<Result<Array<Recommendation>>> {
    const [recomendacoesApi] = createApiClients('RecomendacoesApi')
    const result = await recomendacoesApi.apiRecomendacoesClienteClienteIdGet(customerId, quantidade)

    return {
      data: (result.data.itens ?? []).map(convertRecomendacaoItemDTOToRecommendation),
      success: true,
      code: 200,
    }
  }
}

