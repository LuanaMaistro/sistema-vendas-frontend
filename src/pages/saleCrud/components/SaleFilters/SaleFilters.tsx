import { SaleStatus } from "@dibimo/core-lib"
import { Card, Space, Select, DatePicker, Button } from "antd"
import { ClearOutlined } from "@ant-design/icons"
import { useSaleCrudStore } from "../../SaleCrudStore"
import CustomerSelect from "../../../../components/CustomerSelect"
import type { Dayjs } from "dayjs"
import styles from './SaleFilters.module.css'

const { RangePicker } = DatePicker

const statusOptions = [
  { value: SaleStatus.PENDING, label: 'Pendente' },
  { value: SaleStatus.COMPLETED, label: 'Confirmada' },
  { value: SaleStatus.CANCELLED, label: 'Cancelada' },
]

export default function SaleFilters() {
  const {
    statusFilter,
    customerIdFilter,
    setStatusFilter,
    setCustomerIdFilter,
    setDateFilters,
    clearFilters
  } = useSaleCrudStore()

  const handleDateChange = (dates: [Dayjs | null, Dayjs | null] | null) => {
    if (dates && dates[0] && dates[1]) {
      setDateFilters(
        dates[0].format('YYYY-MM-DD'),
        dates[1].format('YYYY-MM-DD')
      )
    } else {
      setDateFilters(undefined, undefined)
    }
  }

  return (
    <Card className={styles.filtersCard} size="small">
      <Space wrap size="middle">
        <div className={styles.filterItem}>
          <span className={styles.filterLabel}>Status:</span>
          <Select
            value={statusFilter}
            onChange={setStatusFilter}
            options={statusOptions}
            style={{ width: 150 }}
            placeholder="Filtrar por status"
            allowClear
          />
        </div>

        <div className={styles.filterItem}>
          <span className={styles.filterLabel}>Cliente:</span>
          <CustomerSelect
            value={customerIdFilter}
            onCustomerChange={(customer) => setCustomerIdFilter(customer?.id)}
            style={{ width: 250 }}
            allowClear
          />
        </div>

        <div className={styles.filterItem}>
          <span className={styles.filterLabel}>Período:</span>
          <RangePicker
            onChange={handleDateChange}
            format="DD/MM/YYYY"
            allowClear
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
