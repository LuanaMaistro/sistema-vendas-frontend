import type { Product } from "@luanamaistro/core-lib"
import { Dropdown, Space, Table, Tag, type TableColumnsType } from "antd"
import styles from './ProductTable.module.css'
import { useProductCrudStore } from "../../ProductCrudStore"
import { CheckCircleOutlined, DeleteOutlined, EditOutlined, MinusCircleOutlined, PlusCircleOutlined, StopOutlined } from "@ant-design/icons"
import ActionButton from "@/components/table/ActionButton/ActionButton"
import useTableScrollY from "@/hooks/useTableScrollY"
import StockIndicator from "../StockIndicator/StockIndicator"

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

  const { products, loadProducts, setCategoriaFilter } = useProductCrudStore()

  useEffect(() => {
    loadProducts()
  }, [loadProducts])


  const textoEstoque = [
    'Muito acima do mínimo',
    'Acima do mínimo',
    'Levemente acima do mínimo',
    'Próximo ao mínimo',
    'No limite mínimo',
    'Abaixo do mínimo'
  ]

  const columns: TableColumnsType<Product> = [
    {
      title: "Nivel Estoque",
      render: (_, record) => (
        <StockIndicator
          level={record.nivelEstoque}
          text={textoEstoque[record.nivelEstoque]}
        />
      ),
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
      title: "Categoria",
      dataIndex: "category",
      render: (_, record) => (
        <Dropdown
          menu={{
            items: [{
              key: 'filter',
              label: 'Filtrar por essa categoria',
              onClick: () => {
                setCategoriaFilter(record.category)
              }
            }]
          }}
          trigger={['contextMenu']}
        >
          <span>{record.category}</span>
        </Dropdown>
      ),
    },
    {
      title: "Data de Registro",
      render: (_, record) => formatDate(record.registrationDate),
    },
    {
      title: "Ativo",
      render: (_, record) => {
        const statusText = record.active ? "Sim" : "Não";
        const statusStyle = record.active ? "success" : "red";
        return <Tag color={statusStyle}>{statusText}</Tag>;
      },
    },
    {
      title: "Descrição",
      dataIndex: "description",
    },
    {
      title: "Preço",
      dataIndex: ["price", "Value"],
      render: (value: number) => formatCurrency(value),
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
       fixed: "right",
       width: 220,
       render: (_, product) => (
         <Space>
           <ActionButton
             onClick={() => editProduct(product)}
             icon={<EditOutlined />}
             tooltip="Editar"
             color="blue"
           />

           <ActionButton
             onClick={() => deleteProduct(product)}
             icon={<DeleteOutlined />}
             tooltip="Deletar"
             danger
             color="red"
           />

           <ActionButton
             onClick={() => toggleProductStatus(product)}
             icon={product.active ? <StopOutlined /> : <CheckCircleOutlined />}
             tooltip={product.active ? "Inativar" : "Ativar"}
             color={product.active ? "red" : "green"}
           />

           <ActionButton
             onClick={() => openAddStock(product)}
             icon={<PlusCircleOutlined />}
             tooltip="Adicionar estoque"
             color="blue"
             data-tour="botao_estoque"
           />

           <ActionButton
             onClick={() => openRemoveStock(product)}
             icon={<MinusCircleOutlined />}
             tooltip="Remover estoque"
             color="blue"
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
      data-tour="tabela_produtos"
    >
       <Table<Product>
         columns={columns}
         dataSource={products}
         scroll={{ x: 1400, y: scrollY }}
       />
    </div>
  )
}
