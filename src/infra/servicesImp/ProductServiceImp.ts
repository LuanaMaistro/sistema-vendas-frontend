import { fakerPT_BR as faker } from '@faker-js/faker'
import { Price, Quantity, type Product, type ProductService, type Result } from "@dibimo/core-lib";

faker.seed(123)

function createRandomProduct(): Product {
  return {
    id: faker.string.uuid(),
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    code: faker.string.alphanumeric(10).toUpperCase(),
    price: Price.create(Number(faker.commerce.price())),
    quantity: Quantity.create(faker.number.int({ min: 0, max: 1000 }))
  }
}

let mockProducts = Array.from({ length: 15 }, createRandomProduct)

export default class ProductServiceImp implements ProductService {

  Add(entity: Product): Result {
    mockProducts.unshift(entity)

    return {
      code: 200,
      success: true,
    }
  }

  Remove(id: string): Result {
    const productIndex = this.getProductIndex(id)
    delete mockProducts[productIndex]
    mockProducts = mockProducts.filter(Boolean)
    return {
      code: 200,
      success: true,
    }
  }

  Update(entity: Product): Result {
    const productIndex = this.getProductIndex(entity.id!)
    const productUpdated = { ...mockProducts[productIndex] }
    productUpdated.name = entity.name
    productUpdated.description = entity.description
    productUpdated.code = entity.code
    productUpdated.price = entity.price
    productUpdated.quantity = entity.quantity

    mockProducts[productIndex] = productUpdated
    return {
      code: 200,
      success: true,
    }
  }

  List(): Result<Product[]> {
    return {
      data: [
        ...mockProducts
      ],
      success: true,
      code: 200,
    }
  }

  GetById(id: string): Result<Product> {
    return {
      success: true,
      code: 200,
      data: mockProducts[this.getProductIndex(id)]
    }
  }

  private getProductIndex(productId: string) {
    const result = mockProducts.findIndex((p) => p.id! == productId)
    if(result < 0) throw 'produto não encontrado'
    return result
  }
}
