import { Card, Form, Select } from "antd";
import { CustomerTypeOptions } from "../../../../types/enums/customer";

export default function CustomerFilters() {
  return (
      <Card>
        <Form>
          <Form.Item label="Tipo de cliente">
            <Select options={CustomerTypeOptions}/>
          </Form.Item>
        </Form>
      </Card>
  )
}
