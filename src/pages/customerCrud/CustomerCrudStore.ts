import { fold, type Customer } from "@luanamaistro/core-lib";
import { create } from "zustand";
import application from "../../infra/applicationInstance";

interface CustomerCrudStoreState {
  customers: Customer[],
  onlyActives: boolean,
  setOnlyActives: (onlyActives: boolean) => void,
  loadCustomers: () => Promise<void>,
}


export const useCustomerCrudStore = create<CustomerCrudStoreState>((set, get) => ({
  customers: [],
  onlyActives: false,
  setOnlyActives: (onlyActives: boolean) => {
    set({ onlyActives })
    get().loadCustomers()
  },
  loadCustomers: async () => {
    const { onlyActives } = get()
    const response = await application.ListCustomers.execute({ onlyActives })
    const customers = fold(response, () => [], (customers: Customer[]) => customers)

    set({ customers: customers })
  }
}))

