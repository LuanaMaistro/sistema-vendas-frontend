import type { Sale } from "@luanamaistro/core-lib"
import { Modal, Form, InputNumber, Space } from "antd"
import ProductSelect from "../../../../components/ProductSelect"
import application from "../../../../infra/applicationInstance"
import { useSaleCrudStore } from "../../SaleCrudStore"
import useNotification from "../../../../hooks/notification/notification"

interface AddItemModalProps {
  open: boolean
  onClose: () => void
  sale: Sale
}

interface AddItemFormFields {
  productId: string
  quantity: number
}

export default function AddItemModal({ open, onClose, sale }: AddItemModalProps) {
  const { loadSales } = useSaleCrudStore()
  const { notify } = useNotification()
  const [form] = Form.useForm<AddItemFormFields>()

  const handleSubmit = async (values: AddItemFormFields) => {
    const result = await application.AddItemToSale.execute({
      saleId: sale.id!,
      productId: values.productId,
      quantity: values.quantity
    })

    notify(operationResultToNotification(result))

    if (eitherToBoolean(result)) {
      form.resetFields()
      onClose()
      loadSales()
    }
  }

  const handleClose = () => {
    form.resetFields()
    onClose()
  }

  return (
    <Modal
      title="Adicionar Item à Venda"
      open={open}
      onCancel={handleClose}
      onOk={() => form.submit()}
      okText="Adicionar"
      cancelText="Cancelar"
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{ quantity: 1 }}
      >
        <Space direction="vertical" style={{ width: '100%' }} size="middle">
          <Form.Item
            name="productId"
            label="Produto"
            rules={[{ required: true, message: 'Selecione um produto' }]}
          >
            <ProductSelect
              onProductChange={(product) => form.setFieldValue('productId', product?.id)}
            />
          </Form.Item>

          <Form.Item
            name="quantity"
            label="Quantidade"
            rules={[{ required: true, message: 'Informe a quantidade' }]}
          >
            <InputNumber min={1} style={{ width: '100%' }} />
          </Form.Item>
        </Space>
      </Form>
    </Modal>
  )
}
