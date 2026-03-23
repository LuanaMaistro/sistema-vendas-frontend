import type { ListProductFilters, Product, ProductService, Quantity, Result } from "@dibimo/core-lib";
import createApiClients from '../api/apiClientFactory';
import { convertProdutoDTOToProduct, convertProductToProdutoCreateDTO, convertProductToProdutoUpdateDTO } from './mappers/productMappers';

export default class ProductServiceImp implements ProductService {

  async Activate(id: string): Promise<Result> {
    const [productApi] = createApiClients('ProdutosApi')
    await productApi.apiProdutosIdInativarPatch(id)
    return {
      code: 200,
      success: true,
    }
  }

  async Deactivate(id: string): Promise<Result> {
    const [productApi] = createApiClients('ProdutosApi')
    await productApi.apiProdutosIdAtivarPatch(id)
    return {
      code: 200,
      success: true,
    }
  }



  async ListProducts(filters: ListProductFilters): Promise<Result<Array<Product>>> {

    if(!filters.onlyActives)
      return await this.List()

    const [productApi] = createApiClients('ProdutosApi')
    const resultApi = await productApi.apiProdutosAtivosGet()

    return {
      data: resultApi.data.map(convertProdutoDTOToProduct),
      code: 200,
      success: true,
    }
  }

  async Add(entity: Product): Promise<Result> {
    const [productApi] = createApiClients('ProdutosApi')
    await productApi.apiProdutosPost(convertProductToProdutoCreateDTO(entity))

    return {
      code: 200,
      success: true,
    }
  }

  async Remove(id: string): Promise<Result> {
    const [productApi] = createApiClients('ProdutosApi')
    await productApi.apiProdutosIdInativarPatch(id)

    return {
      code: 200,
      success: true,
    }
  }

  async Update(entity: Product): Promise<Result> {
    const [productApi] = createApiClients('ProdutosApi')
    await productApi.apiProdutosIdPut(entity.id!, convertProductToProdutoUpdateDTO(entity))

    return {
      code: 200,
      success: true,
    }
  }

  async List(): Promise<Result<Product[]>> {
    const [productApi] = createApiClients('ProdutosApi')
    const resultApi = await productApi.apiProdutosGet()

    return {
      data: resultApi.data.map(convertProdutoDTOToProduct),
      success: true,
      code: 200,
    }
  }

  async GetById(id: string): Promise<Result<Product>> {
    const [productApi] = createApiClients('ProdutosApi')
    const resultApi = await productApi.apiProdutosIdGet(id)

    return {
      success: true,
      code: 200,
      data: convertProdutoDTOToProduct(resultApi.data)
    }
  }

  async AddStock(id: string, quantity: Quantity): Promise<Result<Product>> {
    const [productApi] = createApiClients('ProdutosApi')
    const resultApi = await productApi.apiProdutosIdEstoqueAdicionarPatch(id, { quantidade: quantity.Value })
    return {
      success: true,
      code: 200,
      data: convertProdutoDTOToProduct(resultApi.data)
    }
  }

  async RemoveStock(id: string, quantity: Quantity): Promise<Result<Product>> {
    const [productApi] = createApiClients('ProdutosApi')
    const resultApi = await productApi.apiProdutosIdEstoqueRemoverPatch(id, { quantidade: quantity.Value })
    return {
      success: true,
      code: 200,
      data: convertProdutoDTOToProduct(resultApi.data)
    }
  }
}
