import type { Recommendation } from '@dibimo/core-lib'
import type { RecomendacaoItemDTO } from '../../api'

export function convertRecomendacaoItemDTOToRecommendation(dto: RecomendacaoItemDTO): Recommendation {
  return {
    productId: dto.produtoId!,
    productName: dto.produtoNome!,
    category: dto.categoria ?? undefined,
    unitPrice: dto.precoUnitario!,
  }
}
