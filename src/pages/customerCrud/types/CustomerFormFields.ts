import type { CustomerType } from "@dibimo/core-lib";

export default interface CustomerFormFields {
  name?: string,
  surname?: string,
  email?: string,
  phone?: string,
  corporativeName?: string,
  cpnj?: string,
  cpf?: string,
  id?: string,
  customerType?: CustomerType,
}
