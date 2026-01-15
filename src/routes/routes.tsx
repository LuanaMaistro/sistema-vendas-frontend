import { TagOutlined, UserOutlined } from "@ant-design/icons";
import CustomerCrudPage from "../pages/customerCrud/CustomerCrudPage";
import type RouteConfig from "./RouteConfig";
import ProductCrudPage from "../pages/productCrud/ProductCrudPage";

export const routesConfigs: Array<RouteConfig> = [
  {
    path: 'customers',
    title: 'Gestão de clientes',
    element: <CustomerCrudPage />,
    icon: <UserOutlined />
  },
  {
    path: 'products',
    title: 'Gestão de produtos',
    element: <ProductCrudPage />,
    icon: <TagOutlined />
  }
]
