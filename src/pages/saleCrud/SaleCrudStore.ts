import { fold, SaleStatus, type Sale } from "@dibimo/core-lib";
import { create } from "zustand";
import application from "../../infra/applicationInstance";

interface SaleCrudStoreState {
  sales: Sale[]
  statusFilter?: SaleStatus
  customerIdFilter?: string
  startDateFilter?: string
  endDateFilter?: string
  setStatusFilter: (status?: SaleStatus) => void
  setCustomerIdFilter: (customerId?: string) => void
  setDateFilters: (startDate?: string, endDate?: string) => void
  clearFilters: () => void
  loadSales: () => Promise<void>
}

export const useSaleCrudStore = create<SaleCrudStoreState>((set, get) => ({
  sales: [],
  statusFilter: undefined,
  customerIdFilter: undefined,
  startDateFilter: undefined,
  endDateFilter: undefined,

  setStatusFilter: (status?: SaleStatus) => {
    set({ statusFilter: status })
    get().loadSales()
  },

  setCustomerIdFilter: (customerId?: string) => {
    set({ customerIdFilter: customerId })
    get().loadSales()
  },

  setDateFilters: (startDate?: string, endDate?: string) => {
    set({ startDateFilter: startDate, endDateFilter: endDate })
    get().loadSales()
  },

  clearFilters: () => {
    set({
      statusFilter: undefined,
      customerIdFilter: undefined,
      startDateFilter: undefined,
      endDateFilter: undefined
    })
    get().loadSales()
  },

  loadSales: async () => {
    const { statusFilter, customerIdFilter, startDateFilter, endDateFilter } = get()

    const hasFilters = statusFilter || customerIdFilter || (startDateFilter && endDateFilter)

    const response = hasFilters
      ? await application.ListSales.execute({
          status: statusFilter,
          customerId: customerIdFilter,
          startDate: startDateFilter,
          endDate: endDateFilter
        })
      : await application.ListSales.execute()

    const sales = fold(response, () => [], (sales: Sale[]) => sales)
    set({ sales })
  }
}))
