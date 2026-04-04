import { PaymentMethod, type Sale } from "@luanamaistro/core-lib"
import { Modal, Radio, Space, Typography } from "antd"

const { Text } = Typography

interface ConfirmSaleModalProps {
  open: boolean
  sale?: Sale
  paymentMethod: PaymentMethod
  onPaymentMethodChange: (method: PaymentMethod) => void
  onConfirm: () => void
  onCancel: () => void
}

const paymentMethodOptions = [
  { value: PaymentMethod.PIX, label: 'PIX' },
  { value: PaymentMethod.CREDIT_CARD, label: 'Cartão de Crédito' },
  { value: PaymentMethod.DEBIT_CARD, label: 'Cartão de Débito' },
  { value: PaymentMethod.BANK_TRANSFER, label: 'Transferência' },
  { value: PaymentMethod.TICKET, label: 'Boleto' },
]

export default function ConfirmSaleModal({
  open,
  sale,
  paymentMethod,
  onPaymentMethodChange,
  onConfirm,
  onCancel
}: ConfirmSaleModalProps) {

  return (
    <Modal
      title="Confirmar Venda"
      open={open}
      onOk={onConfirm}
      onCancel={onCancel}
      okText="Confirmar"
      cancelText="Cancelar"
    >
      <Space orientation="vertical" size="large" style={{ width: '100%' }}>
        {sale && (
          <div>
            <Text strong>Valor Total: </Text>
            <Text>{formatCurrency(sale.totalAmount)}</Text>
          </div>
        )}

        <div>
          <Text strong style={{ display: 'block', marginBottom: 12 }}>
            Forma de Pagamento:
          </Text>
          <Radio.Group
            value={paymentMethod}
            onChange={(e) => onPaymentMethodChange(e.target.value)}
          >
            <Space direction="vertical">
              {paymentMethodOptions.map(option => (
                <Radio key={option.value} value={option.value}>
                  {option.label}
                </Radio>
              ))}
            </Space>
          </Radio.Group>
        </div>
      </Space>
    </Modal>
  )
}
