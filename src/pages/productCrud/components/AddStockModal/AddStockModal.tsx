import { Form, InputNumber, Modal } from "antd";
import type { Product } from "@dibimo/core-lib";
import application from "../../../../infra/applicationInstance";
import type StockMovementFormFields from "../../types/StockMovementFormFields";
import { useProductCrudStore } from "../../ProductCrudStore";
import useNotification from "../../../../hooks/notification/notification";

interface AddStockModalProps {
  open: boolean;
  onClose: () => void;
  product: Product | null;
}

export default function AddStockModal({ open, onClose, product }: AddStockModalProps) {
  const { loadProducts } = useProductCrudStore()
  const { notify } = useNotification()
  const [form] = Form.useForm<StockMovementFormFields>()

  const handleConfirm = async () => {
    const values = await form.validateFields()
    const response = await application.AddStock.execute({
      id: product!.id!,
      quantity: values.quantity,
    })

    notify(operationResultToNotification(response))

    if (eitherToBoolean(response)) {
      loadProducts()
      onClose()
      form.resetFields()
    }
  }

  const handleCancel = () => {
    form.resetFields()
    onClose()
  }

  return (
    <Modal
      title="Adicionar Estoque"
      open={open}
      onOk={handleConfirm}
      onCancel={handleCancel}
      okText="Confirmar"
      cancelText="Cancelar"
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="quantity"
          label="Quantidade a adicionar"
          rules={[{ required: true, message: 'Informe a quantidade' }]}
        >
          <InputNumber min={1} step={1} style={{ width: '100%' }} />
        </Form.Item>
      </Form>
    </Modal>
  )
}
