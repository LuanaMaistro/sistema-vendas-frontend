import type { Email, Mobile, Phone } from "@dibimo/core-lib"
import type { ContatoDTO } from "../../api"

export const convertEmailToContatoDTO = (email: Email | undefined): ContatoDTO | undefined => {
  if (!email) return undefined

  const contatoDTO: ContatoDTO = {
    email: email.Value,
  }
  return contatoDTO
}

export const convertPhoneToContatoDTO = (phone: Phone | undefined): ContatoDTO | undefined => {
  if (!phone) return undefined

  const contatoDTO: ContatoDTO = {
    telefone: phone.Value,
  }
  return contatoDTO
}

export const convertMobileToContatoDTO = (mobile: Mobile | undefined): ContatoDTO | undefined => {
  if (!mobile) return undefined

  const contatoDTO: ContatoDTO = {
    celular: mobile.Value,
  }
  return contatoDTO
}


