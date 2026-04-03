import { left, right, type Either } from "@luanamaistro/core-lib";
import axios from "axios";

export interface AddressInfo {
  zipCode: string
  street: string
  neighborhood: string
  city: string
  state: string
}

interface ViaCepResponse {
  cep: string
  logradouro: string
  bairro: string
  localidade: string
  uf: string
  erro?: boolean
}

export const fetchAddressByZipCode = async (zipCode: string): Promise<Either<string, AddressInfo>> => {
  try {
    const cleanZipCode = zipCode.replace(/\D/g, '');

    if (cleanZipCode.length !== 8) {
      return left('CEP deve conter 8 dígitos');
    }

    const { data } = await axios.get<ViaCepResponse>(`https://viacep.com.br/ws/${cleanZipCode}/json/`);

    if (data.erro) {
      return left('CEP não encontrado');
    }

    const addressInfo: AddressInfo = {
      zipCode: data.cep,
      street: data.logradouro,
      neighborhood: data.bairro,
      city: data.localidade,
      state: data.uf
    };

    return right(addressInfo);
  } catch (error) {
    return left('Erro ao consultar CEP. Verifique sua conexão.');
  }
};
