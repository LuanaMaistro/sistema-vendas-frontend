import { create } from 'zustand'
import dayjs from 'dayjs'
import type { Dayjs } from 'dayjs'

export type TopOption = 5 | 10 | 15 | 30

interface DashboardFilterState {
  dateRange: [Dayjs | null, Dayjs | null]
  topProduto: TopOption
  topReceitaQuantidade: TopOption
  topCliente: TopOption
  setDateRange: (range: [Dayjs | null, Dayjs | null]) => void
  setTopProduto: (top: TopOption) => void
  setTopReceitaQuantidade: (top: TopOption) => void
  setTopCliente: (top: TopOption) => void
  resetFilters: () => void
}

const initialDateRange: [Dayjs | null, Dayjs | null] = [
  dayjs().startOf('month'),
  dayjs().endOf('month'),
]

export const useDashboardFilterStore = create<DashboardFilterState>((set) => ({
  dateRange: initialDateRange,
  topProduto: 10,
  topReceitaQuantidade: 10,
  topCliente: 10,

  setDateRange: (range) => set({ dateRange: range }),
  setTopProduto: (top) => set({ topProduto: top }),
  setTopReceitaQuantidade: (top) => set({ topReceitaQuantidade: top }),
  setTopCliente: (top) => set({ topCliente: top }),

  resetFilters: () =>
    set({
      dateRange: initialDateRange,
      topProduto: 10,
      topReceitaQuantidade: 10,
      topCliente: 10,
    }),
}))
