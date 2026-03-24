import type { Customer, Recommendation } from '@dibimo/core-lib'
import { Drawer, List, Spin, Typography } from 'antd'
import application from '@/infra/applicationInstance'
import useNotification from '@/hooks/notification/notification'

interface RecommendationsDrawerProps {
  open: boolean
  onClose: () => void
  customer: Customer
}

export default function RecommendationsDrawer({ open, onClose, customer }: RecommendationsDrawerProps) {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([])
  const [loading, setLoading] = useState(false)
  const { notify } = useNotification()

  useEffect(() => {
    if (!open || !customer?.id) return

    setLoading(true)
    application.GetCustomerRecommendations.execute({ customerId: customer.id, quantidade: 5 })
      .then(result => {
        fold(
          result,
          () => notify({ type: 'error', message: 'Erro ao carregar recomendações' }),
          data => setRecommendations(data ?? [])
        )
      })
      .finally(() => setLoading(false))
  }, [open, customer?.id])

  return (
    <Drawer
      title={`Recomendações — ${customer?.name ?? ''}`}
      open={open}
      onClose={onClose}
      width={500}
    >
      <Spin spinning={loading}>
        <List
          dataSource={recommendations}
          locale={{ emptyText: 'Nenhuma recomendação disponível' }}
          renderItem={item => (
            <List.Item>
              <List.Item.Meta
                title={item.productName}
                description={item.category ?? 'Sem categoria'}
              />
              <Typography.Text strong>
                {item.unitPrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              </Typography.Text>
            </List.Item>
          )}
        />
      </Spin>
    </Drawer>
  )
}
