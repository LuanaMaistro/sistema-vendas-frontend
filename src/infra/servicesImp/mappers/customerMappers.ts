import { CNPJ, CPF, Email, Mobile, Phone, type Customer } from "@dibimo/core-lib"
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
  if(!dto.contatos) return;

  assingDefaultContacts(dto, customer)
  assingAlternativeContacts(dto, customer)

}

function assingDefaultContacts(dto: ClienteDTO, customer: Customer) {
  if(!dto.contatos) return;

  const defaultContacts = dto.contatos!.filter(c => c.principal)

  const defaultEmail = defaultContacts.find(c => c.tipo == 'Email')
  const defaultPhone = defaultContacts.find(c => c.tipo == 'Telefone')
  const defaultMobile = defaultContacts.find(c => c.tipo == 'Celular')

  if(defaultEmail) customer.email = Email.create(defaultEmail.valor!)
  if(defaultPhone) customer.phone = Phone.create(defaultPhone.valor!)
  if(defaultMobile) customer.mobile = Mobile.create(defaultMobile.valor!)
}

function assingAlternativesAddresses(dto: ClienteDTO, customer: Customer) {
  if(!dto.enderecosSecundarios) return

  customer.alternativeAddresses = dto.enderecosSecundarios
    .map(convertEnderecoDTOToAddress)
    .filter(a => a !== undefined)
}

function assingAlternativeContacts(dto: ClienteDTO, customer: Customer) {
  if(!dto.contatos) return;
  const alternativeContacts = dto.contatos!.filter(c => !c.principal)
    .filter(c => c.valor)

  customer.alternativeEmails = alternativeContacts.filter(c => c.tipo == 'Email')
    .map(c => Email.create(c.valor!))

  customer.alternativePhones = alternativeContacts.filter(c => c.tipo == 'Telefone')
    .map(c => Phone.create(c.valor!))

  customer.alternativeMobiles = alternativeContacts.filter(c => c.tipo == 'Celular')
    .map(c => Mobile.create(c.valor!))
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

