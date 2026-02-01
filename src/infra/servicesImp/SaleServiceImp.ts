import type { ListSaleFilters, PaymentMethod, Result, Sale, SaleItem, SaleService } from "@dibimo/core-lib";
import createApiClients from '../api/apiClientFactory';
import {
  convertPaymentMethodToString,
  convertSaleItemToItemVendaCreateDTO,
  convertSaleStatusToString,
  convertSaleToVendaCreateDTO,
  convertVendaDTOToSale
} from './mappers/saleMappers';

export default class SaleServiceImp implements SaleService {

  async ListSales(filters: ListSaleFilters): Promise<Result<Array<Sale>>> {
    const [vendasApi] = createApiClients('VendasApi')

    if (filters.customerId) {
      const resultApi = await vendasApi.apiVendasClienteClienteIdGet(filters.customerId)
      return {
        data: resultApi.data.map(convertVendaDTOToSale),
        code: 200,
        success: true,
      }
    }

    if (filters.status) {
      const statusString = convertSaleStatusToString(filters.status)
      const resultApi = await vendasApi.apiVendasStatusStatusGet(statusString)
      return {
        data: resultApi.data.map(convertVendaDTOToSale),
        code: 200,
        success: true,
      }
    }

    if (filters.startDate && filters.endDate) {
      const resultApi = await vendasApi.apiVendasPeriodoGet(filters.startDate, filters.endDate)
      return {
        data: resultApi.data.map(convertVendaDTOToSale),
        code: 200,
        success: true,
      }
    }

    return await this.List()
  }

  async ConfirmSale(saleId: string, paymentMethod: PaymentMethod): Promise<Result<Sale>> {
    const [vendasApi] = createApiClients('VendasApi')
    const resultApi = await vendasApi.apiVendasIdConfirmarPost(saleId, {
      formaPagamento: convertPaymentMethodToString(paymentMethod)
    })

    return {
      success: true,
      code: 200,
      data: convertVendaDTOToSale(resultApi.data)
    }
  }

  async CancelSale(saleId: string): Promise<Result<Sale>> {
    const [vendasApi] = createApiClients('VendasApi')
    const resultApi = await vendasApi.apiVendasIdCancelarPost(saleId)

    return {
      success: true,
      code: 200,
      data: convertVendaDTOToSale(resultApi.data)
    }
  }

  async AddItem(saleId: string, item: SaleItem): Promise<Result<Sale>> {
    const [vendasApi] = createApiClients('VendasApi')
    const resultApi = await vendasApi.apiVendasIdItensPost(
      saleId,
      convertSaleItemToItemVendaCreateDTO(item)
    )

    return {
      success: true,
      code: 200,
      data: convertVendaDTOToSale(resultApi.data)
    }
  }

  async RemoveItem(saleId: string, itemId: string): Promise<Result<Sale>> {
    const [vendasApi] = createApiClients('VendasApi')
    const resultApi = await vendasApi.apiVendasIdItensItemIdDelete(saleId, itemId)

    return {
      success: true,
      code: 200,
      data: convertVendaDTOToSale(resultApi.data)
    }
  }

  async UpdateItemQuantity(saleId: string, itemId: string, quantity: number): Promise<Result<Sale>> {
    const [vendasApi] = createApiClients('VendasApi')
    const resultApi = await vendasApi.apiVendasIdItensItemIdQuantidadePatch(saleId, itemId, quantity)

    return {
      success: true,
      code: 200,
      data: convertVendaDTOToSale(resultApi.data)
    }
  }

  async Add(entity: Sale): Promise<Result> {
    const [vendasApi] = createApiClients('VendasApi')
    await vendasApi.apiVendasPost(convertSaleToVendaCreateDTO(entity))

    return {
      code: 200,
      success: true,
    }
  }

  async Remove(id: string): Promise<Result> {
    const [vendasApi] = createApiClients('VendasApi')
    await vendasApi.apiVendasIdCancelarPost(id)

    return {
      code: 200,
      success: true,
    }
  }

  async Update(_entity: Sale): Promise<Result> {
    return {
      code: 200,
      success: true,
    }
  }

  async List(): Promise<Result<Sale[]>> {
    const [vendasApi] = createApiClients('VendasApi')
    const resultApi = await vendasApi.apiVendasGet()

    return {
      data: resultApi.data.map(convertVendaDTOToSale),
      success: true,
      code: 200,
    }
  }

  async GetById(id: string): Promise<Result<Sale>> {
    const [vendasApi] = createApiClients('VendasApi')
    const resultApi = await vendasApi.apiVendasIdGet(id)

    return {
      success: true,
      code: 200,
      data: convertVendaDTOToSale(resultApi.data)
    }
  }
}
