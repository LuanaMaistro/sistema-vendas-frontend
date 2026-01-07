import { fold, type Customer } from "@dibimo/core-lib";
import { create } from "zustand";
import application from "../../infra/applicationInstance";

interface CustomerCrudStoreState {
  customers: Customer[],
  loadCustomers: () => Promise<void>,
}


export const useCustomerCrudStore = create<CustomerCrudStoreState>((set, get) => ({
  customers: [],
  loadCustomers: async () => {
    const response = await application.ListCustomers.execute()
    const customers = fold(response, () => [], (customers: Customer[]) => customers)

    set({ customers: customers })
  }
}))

