import type { Address } from "@dibimo/core-lib";
import type { EnderecoDTO } from "../../api";

export const convertAddressToEnderecoDTO = (address: Address | undefined): EnderecoDTO | undefined => {
  if (!address) return undefined

  return {
    bairro: address.neighborhood,
    cep: address.zipCode,
    cidade: address.city,
    complemento: address.complement,
    uf: address.state,
    logradouro: address.street,
    numero: address.number,
  }

}

