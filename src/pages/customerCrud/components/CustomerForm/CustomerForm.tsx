import { CustomerType } from "@dibimo/core-lib";
import { Col, Divider, Form, Input, Row, type FormInstance, type FormProps } from "antd";
import type CustomerFormFields from "../../types/CustomerFormFields";
import Paragraph from "antd/es/typography/Paragraph";
import Title from "antd/es/typography/Title";

interface CustomerFormProps {
  customerType: CustomerType
  form: FormInstance<CustomerFormFields>
  onFinish: FormProps['onFinish']
}

export default function CustomerForm({ customerType, form, onFinish }: CustomerFormProps) {


  const cnpjInput = (
    <Col span={12}>
      <Form.Item name="cnpj" label="CNPJ">
        <Input />
      </Form.Item>
    </Col>
  )

  const cpfInput = (
    <Col span={12}>
      <Form.Item name="cpf" label="CPF">
        <Input />
      </Form.Item>
    </Col>
  )

  const isLegalPerson = customerType == CustomerType.LEGAL_PERSON

  return (

    <div>
      <Form
        form={form}
        layout='vertical'
        onFinish={onFinish}
      >
        <Row gutter={16}>
          <Col span={24}>
            <Title level={5}>Dados báscios</Title>
            <Paragraph>Dados básicos do cliente</Paragraph>
          </Col>

          <Col span={12}>
            <Form.Item name="name" label={isLegalPerson ? 'Razão social' : 'Nome completo'}>
              <Input />
            </Form.Item>
          </Col>
          { isLegalPerson ? cnpjInput : cpfInput }

        </Row>

        <Divider />

        <Row gutter={16}>

          <Col span={24}>
            <Title level={5}>Contato</Title>
            <Paragraph>Informações para contato com o cliente</Paragraph>
          </Col>

          <Col span={24}>
            <Form.Item name="email" label="E-mail principal">
              <Input />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item name="phone" label="Telefone">
              <Input />
            </Form.Item>

          </Col>
          <Col span={12}>
            <Form.Item name="mobile" label="Celular">
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Divider />

        <Row gutter={16}>
          <Col span={24}>
            <Title level={5}>Endereço</Title>
            <Paragraph>Endereço principal do cliente</Paragraph>
          </Col>

          <Col span={8}>
            <Form.Item name="zipCode" label="CEP">
              <Input />
            </Form.Item>
          </Col>

          <Col span={16}>
            <Form.Item name="street" label="Logradouro">
              <Input />
            </Form.Item>
          </Col>

          <Col span={4}>
            <Form.Item name="number" label="Número">
              <Input />
            </Form.Item>
          </Col>

          <Col span={20}>
            <Form.Item name="complement" label="Complemento">
              <Input />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item name="state" label="Estado">
              <Input />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item name="city" label="Cidade">
              <Input />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item name="neighborhood" label="Bairro">
              <Input />
            </Form.Item>
          </Col>



        </Row>
      </Form>
    </div>
  )
}
