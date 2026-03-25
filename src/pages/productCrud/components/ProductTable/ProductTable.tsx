import type { Product } from "@dibimo/core-lib"
import { Space, Table, Tag, type TableColumnsType } from "antd"
import styles from './ProductTable.module.css'
import { useProductCrudStore } from "../../ProductCrudStore"
import { CheckCircleOutlined, DeleteOutlined, EditOutlined, MinusCircleOutlined, PlusCircleOutlined, StopOutlined } from "@ant-design/icons"
import ActionButton from "@/components/table/ActionButton/ActionButton"
import useTableScrollY from "@/hooks/useTableScrollY"

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
      title: "Nivel Estoque",
      render: (_, record) => {
        const colors = [
          '#4CAF50',
          '#8BC34A',
          '#CDDC39',
          '#FFC107',
          '#FF9800',
          '#F44336'
        ]
        const textoEstoque = [
          'Muito acima do mínimo',
          'Acima do mínimo',
          'Levemente acima do mínimo',
          'Próximo ao mínimo',
          'No limite mínimo',
          'Abaixo do mínimo'
        ]
        const color = colors[record.nivelEstoque]
        const texto = textoEstoque[record.nivelEstoque]
        return (
          <div>
          <div className={styles.indicator} style={{background: color}}></div>
          <div>{texto}</div>
          </div>
        )
      },
    },
    {
      title: "Nome",
      dataIndex: "name",
    },
    {
      title: "Código",
      dataIndex: "code",
    },
    {
      title: "Ativo",
      render: (_, record) => {
        const statusText = record.active ? "Sim" : "Não";
        const styles = record.active ? "success" : "red";
        return <Tag color={styles}>{statusText}</Tag>;
      },
    },
    {
      title: "Descrição",
      dataIndex: "description",
    },
    {
      title: "Preço",
      dataIndex: ["price", "Value"],
      render: (value: number) => `R$ ${value.toFixed(2)}`,
    },
    {
      title: "Quantidade",
      dataIndex: ["quantity", "Value"],
    },
    {
      title: "Qtd. Mínima",
      dataIndex: ["minimumQuantity", "Value"],
    },
    {
      title: "Ações",
      key: "actions",
      render: (_, product) => (
        <Space>
          <ActionButton
            onClick={() => editProduct(product)}
            icon={<EditOutlined />}
            tooltip="Editar"
          />

          <ActionButton
            onClick={() => deleteProduct(product)}
            icon={<DeleteOutlined />}
            tooltip="Deletar"
          />

          <ActionButton
            onClick={() => toggleProductStatus(product)}
            icon={product.active ? <StopOutlined /> : <CheckCircleOutlined />}
            tooltip={product.active ? "Inativar" : "Ativar"}
          />

          <ActionButton
            onClick={() => openAddStock(product)}
            icon={<PlusCircleOutlined />}
            tooltip="Adicionar estoque"
          />

          <ActionButton
            onClick={() => openRemoveStock(product)}
            icon={<MinusCircleOutlined />}
            tooltip="Remover estoque"
          />
        </Space>
      ),
    },
  ];

  const { containerRef, scrollY } = useTableScrollY(56);


  return (
    <div
      className={styles.productsTable}
      ref={containerRef}
    >
      <Table<Product>
        columns={columns}
        dataSource={products}
        scroll={{ y: scrollY }}
      />
    </div>


  )
}
