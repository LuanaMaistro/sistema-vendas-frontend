import { Price, Quantity, type Product } from "@dibimo/core-lib"
import type { ProdutoCreateDTO, ProdutoDTO, ProdutoUpdateDTO } from "../../api"

export const convertProdutoDTOToProduct = (dto: ProdutoDTO): Product => {
  const product: Product = {
    id: dto.id!,
    name: dto.nome!,
    code: dto.codigo!,
    description: dto.descricao!,
    price: Price.create(dto.precoUnitario!),
    quantity: Quantity.create(dto.quantidade ?? 0),
    minimumQuantity: Quantity.create(dto.quantidadeMinima ?? 0),
    category: dto.categoria,
    active: dto.ativo!,
    registrationDate: dto.dataCadastro,
    nivelEstoque: dto.nivelEstoque!
  }

  return product
}

export const convertProductToProdutoCreateDTO = (product: Product): ProdutoCreateDTO => {
  return {
    codigo: product.code,
    nome: product.name,
    descricao: product.description,
    precoUnitario: product.price?.Value,
    categoria: product.category,
    quantidade: product.quantity?.Value ?? 0,
    quantidadeMinima: product.minimumQuantity?.Value ?? 0
  }
}

export const convertProductToProdutoUpdateDTO = (product: Product): ProdutoUpdateDTO => {
  return {
    nome: product.name,
    descricao: product.description,
    precoUnitario: product.price?.Value,
    categoria: product.category,
    quantidadeMinima: product.minimumQuantity?.Value ?? 0
  }
}
