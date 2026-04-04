import { useState, useCallback } from 'react'
import type { Dayjs } from 'dayjs'
import type {
  TotalPedidosDTO,
  ValorTotalVendasDTO,
  TicketMedioDTO,
  ProdutoMaisVendidoDTO,
  ClienteCompradorDTO,
  CategoriaMaisVendidaDTO,
  RelatorioEstoqueDTO,
} from '../../../infra/api/api'
import RelatoriosService from '../../../infra/servicesImp/RelatoriosService'
import { useDashboardFilterStore, type TopOption } from '../DashboardFilterStore'

const service = new RelatoriosService()

interface RelatoriosState {
  totalPedidos: TotalPedidosDTO | null
  valorTotal: ValorTotalVendasDTO | null
  ticketMedio: TicketMedioDTO | null
  porProduto: ProdutoMaisVendidoDTO[]
  porReceitaQuantidade: ProdutoMaisVendidoDTO[]
  porCliente: ClienteCompradorDTO[]
  porCategoria: CategoriaMaisVendidaDTO[]
  estoque: RelatorioEstoqueDTO | null
  loading: boolean
}

export function useRelatorios() {
  const {
    dateRange,
    topProduto,
    topReceitaQuantidade,
    topCliente,
    setDateRange,
    setTopProduto,
    setTopReceitaQuantidade,
    setTopCliente,
  } = useDashboardFilterStore()

  const [state, setState] = useState<RelatoriosState>({
    totalPedidos: null,
    valorTotal: null,
    ticketMedio: null,
    porProduto: [],
    porReceitaQuantidade: [],
    porCliente: [],
    porCategoria: [],
    estoque: null,
    loading: false,
  })

  const toIso = (d: Dayjs | null) => d?.toISOString() ?? undefined

  const fetchAll = useCallback(async (
    range: [Dayjs | null, Dayjs | null],
    topP: TopOption,
    topC: TopOption,
    topRQ: TopOption,
  ) => {
    setState(prev => ({ ...prev, loading: true }))
    const [inicio, fim] = range
    const di = toIso(inicio)
    const df = toIso(fim)

    try {
      const [totalPedidos, valorTotal, ticketMedio, porProduto, porReceitaQuantidade, porCliente, porCategoria, estoque] = await Promise.all([
        service.getTotalPedidos(di, df),
        service.getValorTotal(di, df),
        service.getTicketMedio(di, df),
        service.getVendasPorProduto(di, df, topP),
        service.getVendasPorProduto(di, df, topRQ),
        service.getVendasPorCliente(di, df, topC),
        service.getVendasPorCategoria(di, df),
        service.getEstoque(),
      ])
      setState({ totalPedidos, valorTotal, ticketMedio, porProduto, porReceitaQuantidade, porCliente, porCategoria, estoque, loading: false })
    } catch {
      setState(prev => ({ ...prev, loading: false }))
    }
  }, [])

  const fetchPorProduto = useCallback(async (top: TopOption) => {
    const [inicio, fim] = dateRange
    const result = await service.getVendasPorProduto(toIso(inicio), toIso(fim), top)
    setState(prev => ({ ...prev, porProduto: result }))
  }, [dateRange])

  const fetchReceitaQuantidade = useCallback(async (top: TopOption) => {
    const [inicio, fim] = dateRange
    const result = await service.getVendasPorProduto(toIso(inicio), toIso(fim), top)
    setState(prev => ({ ...prev, porReceitaQuantidade: result }))
  }, [dateRange])

  const fetchPorCliente = useCallback(async (top: TopOption) => {
    const [inicio, fim] = dateRange
    const result = await service.getVendasPorCliente(toIso(inicio), toIso(fim), top)
    setState(prev => ({ ...prev, porCliente: result }))
  }, [dateRange])


  const handleDateRangeChange = useCallback((range: [Dayjs | null, Dayjs | null] | null) => {
    const newRange: [Dayjs | null, Dayjs | null] = range ?? [null, null]
    setDateRange(newRange)
    fetchAll(newRange, topProduto, topCliente, topReceitaQuantidade)
  }, [fetchAll, topProduto, topCliente, topReceitaQuantidade, setDateRange])

  const handleTopProdutoChange = useCallback((top: TopOption) => {
    setTopProduto(top)
    fetchPorProduto(top)
  }, [fetchPorProduto, setTopProduto])

  const handleTopClienteChange = useCallback((top: TopOption) => {
    setTopCliente(top)
    fetchPorCliente(top)
  }, [fetchPorCliente, setTopCliente])

  const handleTopReceitaQuantidadeChange = useCallback((top: TopOption) => {
    setTopReceitaQuantidade(top)
    fetchReceitaQuantidade(top)
  }, [fetchReceitaQuantidade, setTopReceitaQuantidade])

  useEffect(() => {
    fetchAll(dateRange, topProduto, topCliente, topReceitaQuantidade)
  }, [])

  return {
    ...state,
    dateRange,
    topProduto,
    topReceitaQuantidade,
    topCliente,
    handleDateRangeChange,
    handleTopProdutoChange,
    handleTopReceitaQuantidadeChange,
    handleTopClienteChange,
  }
}
