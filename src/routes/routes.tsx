import { UserOutlined } from "@ant-design/icons";
import CustomerCrudPage from "../pages/customerCrud/CustomerCrudPage";
import type RouteConfig from "./RouteConfig";

export const routesConfigs: Array<RouteConfig> = [
  {
    path: 'customers',
    title: 'Gestão de clientes',
    element: <CustomerCrudPage />,
    icon: <UserOutlined />
  }
]
