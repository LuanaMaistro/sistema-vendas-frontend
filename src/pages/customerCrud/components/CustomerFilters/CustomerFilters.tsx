import { Card, Form, Select } from "antd";
import { useCustomerCrudStore } from "../../CustomerCrudStore";

const CustomerStatusOptions = [
  { label: 'Todos', value: false },
  { label: 'Ativos', value: true },
]

export default function CustomerFilters() {
  const { onlyActives, setOnlyActives } = useCustomerCrudStore()

  return (
    <Card>
      <Form>
        <Form.Item label="Status do cliente">
          <Select
            options={CustomerStatusOptions}
            value={onlyActives}
            onChange={setOnlyActives}
          />
        </Form.Item>
      </Form>
    </Card>
  )
}
