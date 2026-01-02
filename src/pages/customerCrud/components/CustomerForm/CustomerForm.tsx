import { Col, Form, Input, Row } from "antd";

export default function CustomerForm() {
  return (

    <div>
      <Form
        layout='vertical'
      >
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
      </Form>
    </div>
  )
}
