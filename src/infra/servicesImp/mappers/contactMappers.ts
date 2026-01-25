import type { Email, Mobile, Phone } from "@dibimo/core-lib"
import type { ContatoDTO } from "../../api"

export const convertEmailToContatoDTO = (email: Email | undefined, isDefault: boolean = false): ContatoDTO | undefined => {
  if (!email) return undefined

  const contatoDTO: ContatoDTO = {
    principal: isDefault,
    tipo: 'Email',
    valor: email.Normalized
  }
  return contatoDTO
}

export const convertPhoneToContatoDTO = (phone: Phone | undefined, isDefault: boolean = false): ContatoDTO | undefined => {
  if (!phone) return undefined

  const contatoDTO: ContatoDTO = {
    principal: isDefault,
    tipo: 'Telefone',
    valor: phone.Value
  }
  return contatoDTO
}

export const convertMobileToContatoDTO = (mobile: Mobile | undefined, isDefault: boolean = false): ContatoDTO | undefined => {
  if (!mobile) return undefined

  const contatoDTO: ContatoDTO = {
    principal: isDefault,
    tipo: 'Celular',
    valor: mobile.Value
  }
  return contatoDTO
}


