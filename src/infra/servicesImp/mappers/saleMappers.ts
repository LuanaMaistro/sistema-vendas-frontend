import { PaymentMethod, type Sale, type SaleItem, SaleStatus } from "@luanamaistro/core-lib"
import type { ItemVendaCreateDTO, ItemVendaDTO, VendaCreateDTO, VendaDTO } from "../../api"

export const convertVendaDTOToSale = (dto: VendaDTO): Sale => {
  return {
    id: dto.id!,
    customerId: dto.clienteId!,
    date: dto.dataVenda ? new Date(dto.dataVenda) : undefined,
    totalAmount: dto.valorTotal,
    status: convertStatusToEnum(dto.status!),
    paymentMethod: convertPaymentMethodToEnum(dto.formaPagamento!),
    observations: dto.observacao!,
    items: dto.itens?.map(convertItemVendaDTOToSaleItem) || []
  }
}

export const convertItemVendaDTOToSaleItem = (dto: ItemVendaDTO): SaleItem => {
  return {
    id: dto.id,
    productId: dto.produtoId,
    productName: dto.produtoNome!,
    quantity: dto.quantidade || 0,
    unitPrice: dto.precoUnitario,
    totalPrice: dto.subtotal
  }
}

export const convertSaleToVendaCreateDTO = (sale: Sale): VendaCreateDTO => {
  return {
    clienteId: sale.customerId,
    observacao: sale.observations,
    itens: sale.items?.map(convertSaleItemToItemVendaCreateDTO)
  }
}

export const convertSaleItemToItemVendaCreateDTO = (item: SaleItem): ItemVendaCreateDTO => {
  return {
    produtoId: item.productId,
    quantidade: item.quantity
  }
}

const convertStatusToEnum = (status?: string): SaleStatus => {
  switch(status?.toUpperCase()) {
    case 'COMPLETED':
    case 'CONFIRMADA':
      return SaleStatus.COMPLETED
    case 'CANCELLED':
    case 'CANCELADA':
      return SaleStatus.CANCELLED
    case 'PENDING':
    case 'PENDENTE':
    default:
      return SaleStatus.PENDING
  }
}

const convertPaymentMethodToEnum = (method?: string): PaymentMethod => {
  switch(method?.toUpperCase()) {
    case 'CREDIT_CARD':
    case 'CARTAO_CREDITO':
      return PaymentMethod.CREDIT_CARD
    case 'DEBIT_CARD':
    case 'CARTAO_DEBITO':
      return PaymentMethod.DEBIT_CARD
    case 'PIX':
      return PaymentMethod.PIX
    case 'BANK_TRANSFER':
    case 'TRANSFERENCIA':
      return PaymentMethod.BANK_TRANSFER
    case 'TICKET':
    case 'BOLETO':
      return PaymentMethod.TICKET
    default:
      return PaymentMethod.PIX
  }
}

export const convertPaymentMethodToString = (method: PaymentMethod): string => {
  switch(method) {
    case PaymentMethod.CREDIT_CARD:
      return 'CARTAOCREDITO'
    case PaymentMethod.DEBIT_CARD:
      return 'CARTAODEBITO'
    case PaymentMethod.PIX:
      return 'PIX'
    case PaymentMethod.BANK_TRANSFER:
      return 'TRANSFERENCIA'
    case PaymentMethod.TICKET:
      return 'BOLETO'
    default:
      return 'PIX'
  }
}

export const convertSaleStatusToString = (status: SaleStatus): string => {
  switch(status) {
    case SaleStatus.COMPLETED:
      return 'CONFIRMADA'
    case SaleStatus.CANCELLED:
      return 'CANCELADA'
    case SaleStatus.PENDING:
    default:
      return 'PENDENTE'
  }
}
