import type { Product } from "@dibimo/core-lib"
import { Space, Table, Tag, type TableColumnsType } from "antd"
import styles from './ProductTable.module.css'
import { useProductCrudStore } from "../../ProductCrudStore"

interface ProductTableProps {
  editProduct: (p: Product) => void,
  deleteProduct: (p: Product) => void,
  toggleProductStatus: (p: Product) => void,
  openAddStock: (p: Product) => void,
  openRemoveStock: (p: Product) => void,
}

export default function ProductTable({
  editProduct,
  deleteProduct,
  toggleProductStatus,
  openAddStock,
  openRemoveStock }: ProductTableProps) {

  const { products, loadProducts } = useProductCrudStore()

  useEffect(() => {
    loadProducts()
  }, [loadProducts])


  const columns: TableColumnsType<Product> = [
    {
      title: 'Nome',
      dataIndex: 'name'
    },
    {
      title: 'Código',
      dataIndex: 'code',
    },
    {
      title: 'Ativo',
      render: (_, record) => {
        const statusText = record.active ? 'Sim' : 'Não'
        const styles = record.active ? 'success' : 'red'
        return (
          <Tag color={styles}>
            {statusText}
          </Tag>
        )
      }
    },
    {
      title: 'Descrição',
      dataIndex: 'description'
    },
    {
      title: 'Preço',
      dataIndex: ['price', 'Value'],
      render: (value: number) => `R$ ${value.toFixed(2)}`
    },
    {
      title: 'Quantidade',
      dataIndex: ['quantity', 'Value']
    },
    {
      title: 'Qtd. Mínima',
      dataIndex: ['minimumQuantity', 'Value']
    },
    {
      title: 'Ações',
      key: 'actions',
      render: (_, product) =>  (
        <Space>
          <a onClick={() => editProduct(product)}>Editar</a>
          <a onClick={() => deleteProduct(product)}>Deletar</a>
          <a onClick={() => toggleProductStatus(product)}>{product.active ? 'Inativar' : 'Ativar'}</a>
          <a onClick={() => openAddStock(product)}>+ Estoque</a>
          <a onClick={() => openRemoveStock(product)}>- Estoque</a>
        </Space>
      )
    },
  ]


  return (
    <div
      className={styles.productsTable}
    >
      <Table<Product>
        columns={columns}
        dataSource={products}
      />
    </div>


  )
}
