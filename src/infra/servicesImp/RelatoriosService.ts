import type {
  TotalPedidosDTO,
  ValorTotalVendasDTO,
  TicketMedioDTO,
  ProdutoMaisVendidoDTO,
  ClienteCompradorDTO,
  CategoriaMaisVendidaDTO,
  RelatorioEstoqueDTO,
} from '../api/api'
import createApiClients from '../api/apiClientFactory'

export default class RelatoriosService {
  private get api() {
    const [client] = createApiClients('RelatoriosApi')
    return client
  }

  async getTotalPedidos(dataInicio?: string, dataFim?: string): Promise<TotalPedidosDTO> {
    const result = await this.api.apiRelatoriosVendasTotalPedidosGet(dataInicio, dataFim)
    return result.data
  }

  async getValorTotal(dataInicio?: string, dataFim?: string): Promise<ValorTotalVendasDTO> {
    const result = await this.api.apiRelatoriosVendasValorTotalGet(dataInicio, dataFim)
    return result.data
  }

  async getTicketMedio(dataInicio?: string, dataFim?: string): Promise<TicketMedioDTO> {
    const result = await this.api.apiRelatoriosVendasTicketMedioGet(dataInicio, dataFim)
    return result.data
  }

  async getVendasPorProduto(dataInicio?: string, dataFim?: string, top?: number): Promise<ProdutoMaisVendidoDTO[]> {
    const result = await this.api.apiRelatoriosVendasPorProdutoGet(dataInicio, dataFim, top)
    return result.data
  }

  async getVendasPorCliente(dataInicio?: string, dataFim?: string, top?: number): Promise<ClienteCompradorDTO[]> {
    const result = await this.api.apiRelatoriosVendasPorClienteGet(dataInicio, dataFim, top)
    return result.data
  }

  async getVendasPorCategoria(dataInicio?: string, dataFim?: string, top?: number): Promise<CategoriaMaisVendidaDTO[]> {
    const result = await this.api.apiRelatoriosVendasPorCategoriaGet(dataInicio, dataFim, top)
    return result.data
  }

  async getEstoque(): Promise<RelatorioEstoqueDTO> {
    const result = await this.api.apiRelatoriosEstoqueGet()
    return result.data
  }
}
