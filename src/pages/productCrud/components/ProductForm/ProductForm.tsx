import { Col, Form, Input, InputNumber, Row, type FormInstance, type FormProps } from "antd";
import type ProductFormFields from "../../types/ProductFormFields";

interface ProductFormProps {
  form: FormInstance<ProductFormFields>
  onFinish: FormProps['onFinish']
  isEdit: boolean
}

export default function ProductForm({ form, onFinish, isEdit }: ProductFormProps) {

  return (
    <div>
      <Form
        form={form}
        layout='vertical'
        onFinish={onFinish}
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name="name" label="Nome do produto">
              <Input />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item name="code" label="Código">
              <Input disabled={isEdit} />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item name="category" label="Categoria">
              <Input />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item name="description" label="Descrição">
              <Input.TextArea rows={4} />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item name="price" label="Preço">
              <InputNumber
                prefix="R$"
                min={0}
                step={0.01}
                style={{ width: '100%' }}
              />
            </Form.Item>
          </Col>

          {!isEdit && (
            <Col span={12}>
              <Form.Item name="quantity" label="Quantidade inicial">
                <InputNumber
                  min={0}
                  step={1}
                  style={{ width: '100%' }}
                />
              </Form.Item>
            </Col>
          )}

          <Col span={12}>
            <Form.Item name="minimumQuantity" label="Quantidade mínima">
              <InputNumber
                min={0}
                step={1}
                style={{ width: '100%' }}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  )
}
