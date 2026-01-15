import CustomerCrudPage from "../pages/customerCrud/CustomerCrudPage";
import type AppRoute from "./AppRoute";

export const routesConfigs: Array<AppRoute> = [
  {
    path: 'customers',
    title: 'Gestão de clientes',
    element: <CustomerCrudPage />
  }
]
