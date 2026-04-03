import { useState, useCallback } from 'react'
import dayjs from 'dayjs'
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

const service = new RelatoriosService()

export type TopOption = 5 | 10 | 15 | 30

interface RelatoriosState {
  totalPedidos: TotalPedidosDTO | null
  valorTotal: ValorTotalVendasDTO | null
  ticketMedio: TicketMedioDTO | null
  porProduto: ProdutoMaisVendidoDTO[]
  porCliente: ClienteCompradorDTO[]
  porCategoria: CategoriaMaisVendidaDTO[]
  estoque: RelatorioEstoqueDTO | null
  loading: boolean
}

export function useRelatorios() {
  const [dateRange, setDateRange] = useState<[Dayjs | null, Dayjs | null]>([
    dayjs().startOf('month'),
    dayjs().endOf('month'),
  ])
  const [topProduto, setTopProduto] = useState<TopOption>(10)
  const [topCliente, setTopCliente] = useState<TopOption>(10)
  const [topCategoria, setTopCategoria] = useState<TopOption>(10)

  const [state, setState] = useState<RelatoriosState>({
    totalPedidos: null,
    valorTotal: null,
    ticketMedio: null,
    porProduto: [],
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
    topCat: TopOption,
  ) => {
    setState(prev => ({ ...prev, loading: true }))
    const [inicio, fim] = range
    const di = toIso(inicio)
    const df = toIso(fim)

    try {
      const [totalPedidos, valorTotal, ticketMedio, porProduto, porCliente, porCategoria, estoque] = await Promise.all([
        service.getTotalPedidos(di, df),
        service.getValorTotal(di, df),
        service.getTicketMedio(di, df),
        service.getVendasPorProduto(di, df, topP),
        service.getVendasPorCliente(di, df, topC),
        service.getVendasPorCategoria(di, df, topCat),
        service.getEstoque(),
      ])
      setState({ totalPedidos, valorTotal, ticketMedio, porProduto, porCliente, porCategoria, estoque, loading: false })
    } catch {
      setState(prev => ({ ...prev, loading: false }))
    }
  }, [])

  const fetchPorProduto = useCallback(async (top: TopOption) => {
    const [inicio, fim] = dateRange
    const result = await service.getVendasPorProduto(toIso(inicio), toIso(fim), top)
    setState(prev => ({ ...prev, porProduto: result }))
  }, [dateRange])

  const fetchPorCliente = useCallback(async (top: TopOption) => {
    const [inicio, fim] = dateRange
    const result = await service.getVendasPorCliente(toIso(inicio), toIso(fim), top)
    setState(prev => ({ ...prev, porCliente: result }))
  }, [dateRange])

  const fetchPorCategoria = useCallback(async (top: TopOption) => {
    const [inicio, fim] = dateRange
    const result = await service.getVendasPorCategoria(toIso(inicio), toIso(fim), top)
    setState(prev => ({ ...prev, porCategoria: result }))
  }, [dateRange])

  const handleDateRangeChange = useCallback((range: [Dayjs | null, Dayjs | null] | null) => {
    const newRange: [Dayjs | null, Dayjs | null] = range ?? [null, null]
    setDateRange(newRange)
    fetchAll(newRange, topProduto, topCliente, topCategoria)
  }, [fetchAll, topProduto, topCliente, topCategoria])

  const handleTopProdutoChange = useCallback((top: TopOption) => {
    setTopProduto(top)
    fetchPorProduto(top)
  }, [fetchPorProduto])

  const handleTopClienteChange = useCallback((top: TopOption) => {
    setTopCliente(top)
    fetchPorCliente(top)
  }, [fetchPorCliente])

  const handleTopCategoriaChange = useCallback((top: TopOption) => {
    setTopCategoria(top)
    fetchPorCategoria(top)
  }, [fetchPorCategoria])

  useEffect(() => {
    fetchAll(dateRange, topProduto, topCliente, topCategoria)
  }, [])

  return {
    ...state,
    dateRange,
    topProduto,
    topCliente,
    topCategoria,
    handleDateRangeChange,
    handleTopProdutoChange,
    handleTopClienteChange,
    handleTopCategoriaChange,
  }
}
