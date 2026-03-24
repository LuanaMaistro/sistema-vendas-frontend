import { ShoppingCartOutlined, TagOutlined, UserOutlined } from "@ant-design/icons";
import CustomerCrudPage from "../pages/customerCrud/CustomerCrudPage";
import type RouteConfig from "./RouteConfig";
import ProductCrudPage from "../pages/productCrud/ProductCrudPage";
import SaleCrudPage from "../pages/saleCrud/SaleCrudPage";

export const routesConfigs: Array<RouteConfig> = [
  {
    path: 'customers',
    title: 'Clientes',
    element: <CustomerCrudPage />,
    icon: <UserOutlined />,
    section: 'Cadastros'
  },
  {
    path: 'products',
    title: 'Produtos',
    element: <ProductCrudPage />,
    icon: <TagOutlined />,
    section: 'Cadastros'
  },
  {
    path: 'sales',
    title: 'Vendas',
    element: <SaleCrudPage />,
    icon: <ShoppingCartOutlined />,
    section: 'Operações'
  }
]
