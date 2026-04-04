import { Address } from "@luanamaistro/core-lib";
import type { EnderecoDTO } from "../../api";

export const convertEnderecoDTOToAddress = (dto: EnderecoDTO | undefined): Address | undefined => {
  if (!dto) return undefined

  return Address.create(
    dto.logradouro!,
    dto.numero!,
    dto.complemento || undefined,
    dto.bairro!,
    dto.cidade!,
    dto.uf!,
    dto.cep!
  )
}

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

