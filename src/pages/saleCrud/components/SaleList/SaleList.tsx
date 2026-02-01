import { SaleStatus, type Sale } from "@dibimo/core-lib"
import { Collapse, Tag, Space, Button, Typography, Tooltip } from "antd"
import { CheckCircleOutlined, CloseCircleOutlined, PlusOutlined } from "@ant-design/icons"
import { useSaleCrudStore } from "../../SaleCrudStore"
import SaleItemsTable from "../SaleItemsTable"
import styles from './SaleList.module.css'
import AddItemModal from "./AddItemModal"

const { Text } = Typography

interface SaleListProps {
  onConfirmSale: (sale: Sale) => void
  onCancelSale: (sale: Sale) => void
}

export default function SaleList({ onConfirmSale, onCancelSale }: SaleListProps) {
  const { sales, loadSales } = useSaleCrudStore()

  const [addItemModalOpen, setAddItemModalOpen] = useState(false)
  const [selectedSale, setSelectedSale] = useState<Sale>()

  useEffect(() => {
    loadSales()
  }, [])

  const openAddItemModal = (sale: Sale) => {
    setSelectedSale(sale)
    setAddItemModalOpen(true)
  }

  const closeAddItemModal = () => {
    setAddItemModalOpen(false)
    setSelectedSale(undefined)
  }

  const getStatusTag = (status: SaleStatus) => {
    switch (status) {
      case SaleStatus.COMPLETED:
        return <Tag color="success">Confirmada</Tag>
      case SaleStatus.CANCELLED:
        return <Tag color="error">Cancelada</Tag>
      case SaleStatus.PENDING:
      default:
        return <Tag color="warning">Pendente</Tag>
    }
  }

  const isPending = (sale: Sale) => sale.status === SaleStatus.PENDING

  const items = sales.map((sale) => ({
    key: sale.id!,
    label: (
      <div className={styles.collapseHeader}>
        <Space size="large">
          <Text strong>Venda # código da venda</Text>
          <Text type="secondary">{formatDate(sale.date)}</Text>
          {getStatusTag(sale.status)}
          <Text>Total: {formatCurrency(sale.totalAmount)}</Text>
        </Space>
      </div>
    ),
    children: (
      <div className={styles.collapseContent}>
        <div className={styles.saleInfo}>
          <Space size="large">
            {sale.observations && <Text type="secondary">Obs: {sale.observations}</Text>}
          </Space>
        </div>

        <div className={styles.tableActions}>
          {isPending(sale) && (
            <Space>
              <Tooltip title="Adicionar item">
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  onClick={() => openAddItemModal(sale)}
                >
                  Adicionar Item
                </Button>
              </Tooltip>
            </Space>
          )}
        </div>

        <SaleItemsTable sale={sale} readonly={!isPending(sale)} />

        {isPending(sale) && (
          <div className={styles.saleActions}>
            <Space>
              <Button
                type="primary"
                icon={<CheckCircleOutlined />}
                onClick={() => onConfirmSale(sale)}
              >
                Confirmar Venda
              </Button>
              <Button
                danger
                icon={<CloseCircleOutlined />}
                onClick={() => onCancelSale(sale)}
              >
                Cancelar Venda
              </Button>
            </Space>
          </div>
        )}
      </div>
    ),
  }))

  return (
    <div className={styles.saleList}>
      <Collapse items={items} />

      {selectedSale && (
        <AddItemModal
          open={addItemModalOpen}
          onClose={closeAddItemModal}
          sale={selectedSale}
        />
      )}
    </div>
  )
}
