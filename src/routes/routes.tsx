import { ShoppingCartOutlined, TagOutlined, UserOutlined } from "@ant-design/icons";
import CustomerCrudPage from "../pages/customerCrud/CustomerCrudPage";
import type RouteConfig from "./RouteConfig";
import ProductCrudPage from "../pages/productCrud/ProductCrudPage";
import SaleCrudPage from "../pages/saleCrud/SaleCrudPage";

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
  },
  {
    path: 'sales',
    title: 'Gestão de vendas',
    element: <SaleCrudPage />,
    icon: <ShoppingCartOutlined />
  }
]
