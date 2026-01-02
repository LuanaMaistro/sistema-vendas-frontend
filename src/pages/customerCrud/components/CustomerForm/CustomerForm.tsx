import { CustomerType } from "@dibimo/core-lib";
import { Col, Form, Input, Row, type FormInstance, type FormProps } from "antd";

interface CustomerFormProps {
  customerType: CustomerType
  form: FormInstance
  onFinish: FormProps['onFinish']
}

export default function CustomerForm({ customerType, form, onFinish }: CustomerFormProps) {


  const legalPersonForm = (
    <Row gutter={16}>
      <Col span={12}>
        <Form.Item name="corporativeName" label="Razão social">
          <Input />
        </Form.Item>
      </Col>

      <Col span={12}>
        <Form.Item name="cnpj" label="CNPJ">
          <Input />
        </Form.Item>
      </Col>

      <Col span={24}>
        <Form.Item name="email" label="E-mail">
          <Input />
        </Form.Item>
      </Col>
    </Row>
  )

  const naturalPerson = (
    <Row gutter={16}>
      <Col span={12}>
        <Form.Item name="name" label="Nome">
          <Input />
        </Form.Item>
      </Col>

      <Col span={12}>
        <Form.Item name="surname" label="Sobrenome">
          <Input />
        </Form.Item>
      </Col>

      <Col span={12}>
        <Form.Item name="cpf" label="CPF">
          <Input />
        </Form.Item>
      </Col>

      <Col span={24}>
        <Form.Item name="email" label="E-mail">
          <Input />
        </Form.Item>
      </Col>
    </Row>
  )
  return (

    <div>
      <Form
        form={form}
        layout='vertical'
        onFinish={onFinish}
      >
        { customerType == CustomerType.LEGAL_PERSON ? legalPersonForm : naturalPerson }
      </Form>
    </div>
  )
}
