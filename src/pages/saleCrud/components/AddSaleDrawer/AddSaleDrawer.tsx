import { Button, Drawer, Form, Input, Space, InputNumber, Table, type TableColumnsType } from "antd"
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons"
import CustomerSelect from "../../../../components/CustomerSelect"
import ProductSelect from "../../../../components/ProductSelect"
import application from "../../../../infra/applicationInstance"
import { useSaleCrudStore } from "../../SaleCrudStore"
import useNotification from "../../../../hooks/notification/notification"
import type { Customer } from "@dibimo/core-lib"
import styles from './AddSaleDrawer.module.css'

interface AddSaleDrawerProps {
  open: boolean
  onClose: () => void
}

interface SaleFormFields {
  customerId?: string
  observations?: string
}

interface ItemRow {
  key: string
  productId?: string
  quantity: number
}

export default function AddSaleDrawer({ open, onClose }: AddSaleDrawerProps) {
  const { loadSales } = useSaleCrudStore()
  const { notify } = useNotification()

  const [form] = Form.useForm<SaleFormFields>()
  const [items, setItems] = useState<ItemRow[]>([{ key: '1', quantity: 1 }])
  const [selectedCustomer, setSelectedCustomer] = useState<Customer>()

  const addItem = () => {
    const newKey = String(Date.now())
    setItems([...items, { key: newKey, quantity: 1 }])
  }

  const removeItem = (key: string) => {
    if (items.length <= 1) return
    setItems(items.filter(item => item.key !== key))
  }

  const updateItem = (key: string, field: keyof ItemRow, value: unknown) => {
    setItems(items.map(item =>
      item.key === key ? { ...item, [field]: value } : item
    ))
  }

  const handleSubmit = async (values: SaleFormFields) => {
    if (!selectedCustomer) {
      notify({ type: 'error', message: 'Selecione um cliente' })
      return
    }

    const validItems = items.filter(item => item.productId && item.quantity > 0)
    if (validItems.length === 0) {
      notify({ type: 'error', message: 'Adicione ao menos um item' })
      return
    }

    const result = await application.CreateSale.execute({
      customer: selectedCustomer,
      items: validItems.map(item => ({
        productId: item.productId!,
        quantity: item.quantity
      })),
      observations: values.observations
    })

    notify(operationResultToNotification(result))

    if (eitherToBoolean(result)) {
      clearForm()
      onClose()
      loadSales()
    }
  }

  const clearForm = () => {
    form.resetFields()
    setItems([{ key: '1', quantity: 1 }])
    setSelectedCustomer(undefined)
  }

  const handleClose = () => {
    clearForm()
    onClose()
  }

  const columns: TableColumnsType<ItemRow> = [
    {
      title: 'Produto',
      key: 'productId',
      render: (_, record) => (
        <ProductSelect
          value={record.productId}
          onProductChange={(product) => updateItem(record.key, 'productId', product?.id)}
          style={{ width: '100%' }}
        />
      )
    },
    {
      title: 'Quantidade',
      key: 'quantity',
      width: 120,
      render: (_, record) => (
        <InputNumber
          min={1}
          value={record.quantity}
          onChange={(value) => updateItem(record.key, 'quantity', value || 1)}
          style={{ width: '100%' }}
        />
      )
    },
    {
      title: '',
      key: 'actions',
      width: 60,
      render: (_, record) => (
        <Button
          type="text"
          danger
          icon={<DeleteOutlined />}
          onClick={() => removeItem(record.key)}
          disabled={items.length <= 1}
        />
      )
    }
  ]

  const extraActions = (
    <Space>
      <Button onClick={() => form.submit()} type="primary">
        Criar Venda
      </Button>
    </Space>
  )

  return (
    <Drawer
      title="Nova Venda"
      open={open}
      onClose={handleClose}
      extra={extraActions}
      size={720}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
      >
        <Form.Item
          name="customerId"
          label="Cliente"
          rules={[{ required: true, message: 'Selecione um cliente' }]}
        >
          <CustomerSelect
            onCustomerChange={(customer) => {
              form.setFieldValue('customerId', customer?.id)
              setSelectedCustomer(customer)
            }}
          />
        </Form.Item>

        <Form.Item
          name="observations"
          label="Observações"
        >
          <Input.TextArea rows={2} placeholder="Observações da venda (opcional)" />
        </Form.Item>

        <div className={styles.itemsSection}>
          <div className={styles.itemsHeader}>
            <span className={styles.itemsTitle}>Itens da Venda</span>
            <Button
              type="dashed"
              icon={<PlusOutlined />}
              onClick={addItem}
            >
              Adicionar Item
            </Button>
          </div>

          <Table
            columns={columns}
            dataSource={items}
            pagination={false}
            rowKey="key"
            size="small"
          />
        </div>
      </Form>
    </Drawer>
  )
}
