import { Card, Select, Space, Button } from "antd"
import { ClearOutlined } from "@ant-design/icons"
import { useCustomerCrudStore } from "../../CustomerCrudStore"
import styles from "./CustomerFilters.module.css"

const CustomerStatusOptions = [
  { label: 'Todos', value: false },
  { label: 'Ativos', value: true },
]

export default function CustomerFilters() {
  const { onlyActives, setOnlyActives, clearFilters } = useCustomerCrudStore()

  return (
    <Card className={styles.filtersCard} size="small">
      <Space wrap size="middle">
        <div className={styles.filterItem}>
          <span className={styles.filterLabel}>Status:</span>
          <Select
            options={CustomerStatusOptions}
            value={onlyActives}
            onChange={setOnlyActives}
            style={{ width: 150 }}
            placeholder="Filtrar por status"
          />
        </div>

        <Button
          icon={<ClearOutlined />}
          onClick={clearFilters}
        >
          Limpar Filtros
        </Button>
      </Space>
    </Card>
  )
}
