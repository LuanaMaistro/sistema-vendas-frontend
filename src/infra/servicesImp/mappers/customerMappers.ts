import type { Customer } from "@dibimo/core-lib"
import type { ClienteCreateDTO } from "../../api"
import { convertAddressToEnderecoDTO } from "./addressMappers"
import { convertEmailToContatoDTO, convertMobileToContatoDTO, convertPhoneToContatoDTO } from "./contactMappers"

export const convertCustomerToClienteCreateDTO = (customer: Customer): ClienteCreateDTO => {
  const dto: ClienteCreateDTO = {
    nome: customer.name!,
    documento: customer.Cnpj?.Value || customer.Cpf?.Value!,
  }

  dto.enderecoPrincipal = convertAddressToEnderecoDTO(customer.address)
  dto.contatos = convertContactsToContatoDTO(customer)

  return dto
}

function convertContactsToContatoDTO(customer: Customer) {
  return [
    ...convertEmails(customer),
    ...convertPhones(customer),
    ...convertMobiles(customer),
  ].filter(c => c !== undefined)
}

function convertEmails(customer: Customer) {
  const alternativeEmails = customer.alternativeEmails || []

  return [
    convertEmailToContatoDTO(customer.email, true),
    ...alternativeEmails.map((e) => convertEmailToContatoDTO(e, false))
  ]
}

function convertPhones(customer: Customer) {
  const alternativePhones = customer.alternativePhones || []

  return [
    convertPhoneToContatoDTO(customer.phone, true),
    ...alternativePhones.map((p) => convertPhoneToContatoDTO(p, false))
  ]
}

function convertMobiles(customer: Customer) {
  const alternativeMobiles = customer.alternativeMobiles || []

  return [
    convertMobileToContatoDTO(customer.mobile, true),
    ...alternativeMobiles.map((m) => convertMobileToContatoDTO(m, false))
  ]
}

