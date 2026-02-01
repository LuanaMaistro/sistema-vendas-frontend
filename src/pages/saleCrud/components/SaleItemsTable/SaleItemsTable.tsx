import type { Sale, SaleItem } from "@dibimo/core-lib"
import { Table, type TableColumnsType, Space, InputNumber, Button, Popconfirm } from "antd"
import { DeleteOutlined } from "@ant-design/icons"
import application from "../../../../infra/applicationInstance"
import { useSaleCrudStore } from "../../SaleCrudStore"
import useNotification from "../../../../hooks/notification/notification"

interface SaleItemsTableProps {
  sale: Sale
  readonly?: boolean
}

export default function SaleItemsTable({ sale, readonly = false }: SaleItemsTableProps) {
  const { loadSales } = useSaleCrudStore()
  const { notify } = useNotification()


  let timer: any
  const handleQuantityChange = async (item: SaleItem, quantity: number) => {
    if (quantity <= 0) return

    clearTimeout(timer)

    timer = setTimeout(async () => {
      const result = await application.UpdateItemQuantity.execute({
        saleId: sale.id!,
        itemId: item.id!,
        quantity
      })
      notify(operationResultToNotification(result))
      loadSales()
    }, 500)

  }



  const handleRemoveItem = async (item: SaleItem) => {
    const result = await application.RemoveItemFromSale.execute({
      saleId: sale.id!,
      itemId: item.id!
    })

    notify(operationResultToNotification(result))
    loadSales()
  }

  const columns: TableColumnsType<SaleItem> = [
    {
      title: 'Produto',
      dataIndex: 'productName',
      key: 'productName',
    },
    {
      title: 'Quantidade',
      key: 'quantity',
      width: 150,
      render: (_, record) => {
        if (readonly) {
          return record.quantity
        }
        return (
          <InputNumber
            min={1}
            value={record.quantity}
            onChange={(value) => handleQuantityChange(record, value || 1)}
          />
        )
      }
    },
    {
      title: 'Preço Unitário',
      dataIndex: 'unitPrice',
      key: 'unitPrice',
      render: (value) => value?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) || '-'
    },
    {
      title: 'Subtotal',
      dataIndex: 'totalPrice',
      key: 'totalPrice',
      render: (value) => value?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) || '-'
    },
    ...(!readonly ? [{
      title: 'Ações',
      key: 'actions',
      width: 100,
      render: (_: unknown, record: SaleItem) => (
        <Space>
          <Popconfirm
            title="Remover item?"
            description="Deseja remover este item da venda?"
            onConfirm={() => handleRemoveItem(record)}
            okText="Sim"
            cancelText="Não"
          >
            <Button
              type="text"
              danger
              icon={<DeleteOutlined />}
            />
          </Popconfirm>
        </Space>
      )
    }] : [])
  ]

  return (
    <Table<SaleItem>
      columns={columns}
      dataSource={sale.items}
      rowKey="id"
      pagination={false}
      size="small"
    />
  )
}
