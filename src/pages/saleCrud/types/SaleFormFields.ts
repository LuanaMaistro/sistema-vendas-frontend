export default interface SaleFormFields {
  customerId?: string
  observations?: string
  items?: SaleItemFormFields[]
}

export interface SaleItemFormFields {
  productId?: string
  quantity?: number
}
