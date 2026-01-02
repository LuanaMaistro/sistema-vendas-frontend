import { CustomerType } from "@dibimo/core-lib";
import { Col, Form, Input, Row } from "antd";

interface CustomerFormProps {
  customerType: CustomerType
}

export default function CustomerForm({ customerType }: CustomerFormProps) {

  const legalPersonForm = (
    <Row gutter={16}>
      <Col span={12}>
        <Form.Item label="Razão social">
          <Input />
        </Form.Item>
      </Col>

      <Col span={12}>
        <Form.Item label="CNPJ">
          <Input />
        </Form.Item>
      </Col>

      <Col span={24}>
        <Form.Item label="E-mail">
          <Input />
        </Form.Item>
      </Col>
    </Row>
  )

  const naturalPerson = (
    <Row gutter={16}>
      <Col span={12}>
        <Form.Item label="Nome">
          <Input />
        </Form.Item>
      </Col>

      <Col span={12}>
        <Form.Item label="Sobrenome">
          <Input />
        </Form.Item>
      </Col>

      <Col span={12}>
        <Form.Item label="CPF">
          <Input />
        </Form.Item>
      </Col>

      <Col span={24}>
        <Form.Item label="E-mail">
          <Input />
        </Form.Item>
      </Col>
    </Row>
  )
  return (

    <div>
      <Form
        layout='vertical'
      >
        { customerType == CustomerType.LEGAL_PERSON ? legalPersonForm : naturalPerson }
      </Form>
    </div>
  )
}
