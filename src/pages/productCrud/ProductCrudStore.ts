import { fold, type Product } from "@luanamaistro/core-lib";
import { create } from "zustand";
import application from "../../infra/applicationInstance";

interface ProductFilters {
  nome?: string
  categoria?: string
  onlyActives: boolean
}

interface ProductCrudStoreState {
  products: Product[],
  filters: ProductFilters,
  setNomeFilter: (nome?: string) => void,
  setCategoriaFilter: (categoria?: string) => void,
  setOnlyActives: (onlyActives: boolean) => void,
  loadProducts: () => Promise<void>,
}


export const useProductCrudStore = create<ProductCrudStoreState>((set, get) => ({
  products: [],
  filters: {
    onlyActives: false,
  },
  setNomeFilter: (nome?: string) => {
    set(state => ({ filters: { ...state.filters, nome } }))
    get().loadProducts()
  },
  setCategoriaFilter: (categoria?: string) => {
    set(state => ({ filters: { ...state.filters, categoria } }))
    get().loadProducts()
  },
  setOnlyActives: (onlyActives: boolean) => {
    set(state => ({ filters: { ...state.filters, onlyActives } }))
    get().loadProducts()
  },
  loadProducts: async () => {
    const { filters } = get()
    const response = await application.ListProducts.execute(filters)
    const products = fold(response, () => [], (products: Product[]) => products)

    set({ products: products })
  }
}))
