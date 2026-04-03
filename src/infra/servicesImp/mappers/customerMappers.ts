import { CNPJ, CPF, Email, Mobile, Phone, type Customer } from "@luanamaistro/core-lib"
import type { ClienteCreateDTO, ClienteDTO, ClienteUpdateDTO } from "../../api"
import { convertAddressToEnderecoDTO, convertEnderecoDTOToAddress } from "./addressMappers"
import { convertEmailToContatoDTO, convertMobileToContatoDTO, convertPhoneToContatoDTO } from "./contactMappers"
import type CustomerFormFields from "@/pages/customerCrud/types/CustomerFormFields"

export const convertClienteDTOToCustomer = (dto: ClienteDTO): Customer => {
  const customer: Customer = {
    name: dto.nome!,
    id: dto.id!,
    active: dto.ativo
  }

  assignDocument(dto, customer)
  assingAddress(dto, customer)
  assingAlternativesAddresses(dto, customer)
  assingContacts(dto, customer)

  return customer
}

function assingContacts(dto: ClienteDTO, customer: Customer) {
  assingDefaultContacts(dto, customer)

  if(!dto.contatosSecundarios) return;
    assingAlternativeContacts(dto, customer)

}

function assingDefaultContacts(dto: ClienteDTO, customer: Customer) {
  if(dto.contatoPrincipal?.email) customer.email = Email.create(dto.contatoPrincipal?.email)
  if(dto.contatoPrincipal?.telefone) customer.phone = Phone.create(dto.contatoPrincipal?.telefone)
  if(dto.contatoPrincipal?.celular) customer.mobile = Mobile.create(dto.contatoPrincipal?.celular)
}

function assingAlternativesAddresses(dto: ClienteDTO, customer: Customer) {
  if(!dto.enderecosSecundarios) return

  customer.alternativeAddresses = dto.enderecosSecundarios
    .map(convertEnderecoDTOToAddress)
    .filter(a => a !== undefined)
}

function assingAlternativeContacts(dto: ClienteDTO, customer: Customer) {
  if(!dto.contatosSecundarios) return;
  const alternativeContacts = dto.contatosSecundarios!

  customer.alternativeEmails = alternativeContacts.filter(c => c.email)
    .map(c => Email.create(c.email!))

  customer.alternativePhones = alternativeContacts.filter(c => c.telefone)
    .map(c => Phone.create(c.telefone!))

  customer.alternativeMobiles = alternativeContacts.filter(c => c.celular)
    .map(c => Mobile.create(c.celular!))
}

function assignDocument(dto: ClienteDTO, customer: Customer) {
  if(dto.tipoDocumento == "CNPJ") {
    customer.Cnpj = CNPJ.create(dto.documento!)
  }
  else {
    customer.Cpf = CPF.create(dto.documento!)
  }
}

function assingAddress(dto: ClienteDTO, customer: Customer) {
  if(!dto.enderecoPrincipal) return

  customer.address = convertEnderecoDTOToAddress(dto.enderecoPrincipal)
}

export const convertCustomerToClienteCreateDTO = (customer: Customer): ClienteCreateDTO => {
  const dto: ClienteCreateDTO = {
    nome: customer.name!,
    documento: customer.Cnpj?.Value || customer.Cpf?.Value!,
    contatoPrincipal: {
      email: customer.email?.Value,
      celular: customer.mobile?.Value,
      telefone: customer.phone?.Value,
    }
  }

  dto.enderecoPrincipal = convertAddressToEnderecoDTO(customer.address)
  dto.contatosSecundarios = convertContactsToContatoDTO(customer)

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
    convertEmailToContatoDTO(customer.email),
    ...alternativeEmails.map((e) => convertEmailToContatoDTO(e))
  ]
}

function convertPhones(customer: Customer) {
  const alternativePhones = customer.alternativePhones || []

  return [
    convertPhoneToContatoDTO(customer.phone),
    ...alternativePhones.map((p) => convertPhoneToContatoDTO(p))
  ]
}

function convertMobiles(customer: Customer) {
  const alternativeMobiles = customer.alternativeMobiles || []

  return [
    convertMobileToContatoDTO(customer.mobile),
    ...alternativeMobiles.map((m) => convertMobileToContatoDTO(m))
  ]
}

export const convertCustomerToFormFields = (customer: Customer): CustomerFormFields => {
  return {
    id: customer.id,
    name: customer.name,
    cpf: customer.Cpf?.Value,
    cnpj: customer.Cnpj?.Value,
    email: customer.email?.Value,
    phone: customer.phone?.Value,
    mobile: customer.mobile?.Value,
    street: customer.address?.street,
    number: customer.address?.number,
    complement: customer.address?.complement,
    neighborhood: customer.address?.neighborhood,
    city: customer.address?.city,
    state: customer.address?.state,
    zipCode: customer.address?.zipCode
  }
}

export const convertCustomerToClienteUpdateDTO = (customer: Customer): ClienteUpdateDTO => {
  return {
    nome: customer.name,
    enderecoPrincipal: convertAddressToEnderecoDTO(customer.address)
  }
}

