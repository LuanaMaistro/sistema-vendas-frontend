import type { Product } from "@dibimo/core-lib"
import { Space, Table, type TableColumnsType } from "antd"
import styles from './ProductTable.module.css'
import { useProductCrudStore } from "../../ProductCrudStore"

interface ProductTableProps {
  editProduct: (p: Product) => void,
  deleteProduct: (p: Product) => void,
}

export default function ProductTable({ editProduct, deleteProduct }: ProductTableProps) {

  const { products, loadProducts } = useProductCrudStore()

  useEffect(() => {
    loadProducts()
  }, [])


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
      title: 'Ações',
      key: 'actions',
      render: (_, product) =>  (
        <Space>
          <a onClick={() => editProduct(product)}>Editar</a>
          <a onClick={() => deleteProduct(product)}>Deletar</a>
        </Space>
      )
    },
  ]


  return (
    <div
      className={styles.productsTable}
    >
      <Table<Product>
        scroll={{ y: 55 * 7 }}
        columns={columns}
        dataSource={products}
      />
    </div>


  )
}
