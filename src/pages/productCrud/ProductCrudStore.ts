import { fold, type Product } from "@dibimo/core-lib";
import { create } from "zustand";
import application from "../../infra/applicationInstance";

interface ProductCrudStoreState {
  products: Product[],
  loadProducts: () => Promise<void>,
}


export const useProductCrudStore = create<ProductCrudStoreState>((set, get) => ({
  products: [],
  loadProducts: async () => {
    const response = await application.ListProducts.execute()
    const products = fold(response, () => [], (products: Product[]) => products)

    set({ products: products })
  }
}))
